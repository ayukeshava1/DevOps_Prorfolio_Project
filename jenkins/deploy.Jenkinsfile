pipeline {
    agent { label 'master' }  // Executes on Jenkins master

    environment {
        FRONTEND_IMAGE = "ayuleshava/frontend-app"
        BACKEND_IMAGE = "ayuleshava/backend-app"
        KUBECONFIG_CRED_ID = 'k8s-kubeconfig'
        NAMESPACE = "default"
    }

    stages {
        stage('Checkout') {
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

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: "${KUBECONFIG_CRED_ID}", variable: 'KUBECONFIG')]) {
                    withEnv(["KUBECONFIG=$KUBECONFIG"]) {
                        sh """
                        kubectl apply -f k8s/postgres.yaml
                        kubectl apply -f k8s/backend.yaml
                        kubectl apply -f k8s/frontend.yaml
                        """
                    }
                }
            }
        }

        stage('Verify Pods & Rollback if Needed') {
            steps {
                script {
                    def crashFound = false

                    def podStatus = sh(
                        script: "kubectl get pods -o jsonpath='{.items[*].status.containerStatuses[*].state.waiting.reason}'",
                        returnStdout: true
                    ).trim()

                    if (podStatus.contains("CrashLoopBackOff")) {
                        crashFound = true
                    }

                    if (crashFound) {
                        echo "❌ Crash detected. Rolling back..."
                        sh "kubectl delete deployment backend-deployment || true"
                        sh "kubectl delete deployment frontend-deployment || true"
                        error("CrashLoopBackOff found. Rollback done.")
                    } else {
                        echo "✅ No crash detected. Proceeding..."
                    }
                }
            }
        }

        stage('Verify Services') {
            steps {
                sh 'kubectl get svc'
            }
        }
    }

    post {
        failure {
            echo '🚨 Pipeline failed. Check error logs!'
        }
        success {
            echo '✅ Deployment successful and verified!'
        }
    }
}
