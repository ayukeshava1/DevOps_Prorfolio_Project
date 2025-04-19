pipeline {
    agent { label 'master' }

    environment {
        FRONTEND_IMAGE = "ayuleshava/frontend-app"
        BACKEND_IMAGE = "ayuleshava/backend-app"
        KUBECONFIG_CRED_ID = 'k8s-kubeconfig'
        NAMESPACE = "default"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build & Push Backend Image') {
            steps {
                dir('backend') {
                    script {
                        docker.build("${BACKEND_IMAGE}:latest")
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                            docker.image("${BACKEND_IMAGE}:latest").push()
                        }
                    }
                }
            }
        }

        stage('Build & Push Frontend Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${FRONTEND_IMAGE}:latest")
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                            docker.image("${FRONTEND_IMAGE}:latest").push()
                        }
                    }
                }
            }
        }

        stage('Deploy to Remote Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED_ID}", variable: 'KUBECONFIG')]) {
                    withEnv(["KUBECONFIG=$KUBECONFIG"]) {
                        sh """
                            echo '🚀 Applying Kubernetes manifests...'
                            kubectl apply -f k8s/postgres.yaml --namespace=${NAMESPACE}
                            kubectl apply -f k8s/backend.yaml --namespace=${NAMESPACE}
                            kubectl apply -f k8s/frontend.yaml --namespace=${NAMESPACE}
                        """
                    }
                }
            }
        }

        stage('Verify Pod Status & Rollback if Needed') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED_ID}", variable: 'KUBECONFIG')]) {
                    withEnv(["KUBECONFIG=$KUBECONFIG"]) {
                        script {
                            def crashDetected = false
                            def crashStatus = sh(
                                script: "kubectl get pods --namespace=${NAMESPACE} -o jsonpath='{.items[*].status.containerStatuses[*].state.waiting.reason}'",
                                returnStdout: true
                            ).trim()

                            if (crashStatus.contains("CrashLoopBackOff")) {
                                crashDetected = true
                            }

                            if (crashDetected) {
                                echo "❌ CrashLoopBackOff detected! Initiating rollback..."
                                sh """
                                    kubectl delete deployment backend-deployment --namespace=${NAMESPACE} || true
                                    kubectl delete deployment frontend-deployment --namespace=${NAMESPACE} || true
                                """
                                error("Crash detected. Rollback completed.")
                            } else {
                                echo "✅ All pods healthy. No rollback required."
                            }
                        }
                    }
                }
            }
        }

        stage('Verify Services') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED_ID}", variable: 'KUBECONFIG')]) {
                    withEnv(["KUBECONFIG=$KUBECONFIG"]) {
                        sh 'kubectl get svc --namespace=${NAMESPACE}'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment completed successfully!"
        }
        failure {
            echo "🚨 Build failed. Please check logs."
        }
    }
}
