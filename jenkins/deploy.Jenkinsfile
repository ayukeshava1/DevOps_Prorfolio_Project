pipeline {
    agent { label 'master' }  // Use Jenkins master node for kubectl

    environment {
        KUBE_CONFIG_CREDENTIAL_ID = 'k8s-kubeconfig'  // Jenkins kubeconfig credential ID
        NAMESPACE = 'keshava-project'  // Kubernetes namespace
        REPO_URL = 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
        REPO_FOLDER = 'DevOps_Prorfolio_Project'
    }

    stages {
        stage('Checkout Repo') {
            steps {
                script {
                    if (!fileExists(REPO_FOLDER)) {
                        git branch: 'main', url: REPO_URL
                    }
                }
            }
        }

        stage('Deploy Kubernetes Services & Applications') {
            steps {
                withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG_FILE')]) {
                    script {
                        try {
                            sh """
                                set -e  # Stop execution on error
                                export KUBECONFIG=${KUBECONFIG_FILE}

                                # Deploy PostgreSQL resources
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-service.yaml

                                # Deploy FastAPI backend
                                kubectl apply -n ${NAMESPACE} -f k8s/backend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/backend-service.yaml

                                # Deploy React frontend
                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-service.yaml
                            """
                        } catch (err) {
                            error("❌ Deployment failed: ${err}")
                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "⚠️ Deployment failed — cleaning up resources..."

            withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG_FILE')]) {
                sh """
                    export KUBECONFIG=$KUBECONFIG_FILE

                    # Delete all resources in the namespace created by Jenkins
                    kubectl delete all --all -n ${NAMESPACE} || true
                """
            }
        }
    }
}
