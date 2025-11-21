pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "ayuleshava/frontend-app:latest"
        BACKEND_IMAGE = "ayuleshava/backend-app:latest"
        K8S_NAMESPACE = "portfolio"
    }

    stages {
        stage('Pull Frontend Image') {
            steps {
                script {
                    echo "Pulling Frontend Docker image..."
                    sh "docker pull ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Pull Backend Image') {
            steps {
                script {
                    echo "Pulling Backend Docker image..."
                    sh "docker pull ${BACKEND_IMAGE}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."

                    // Apply Kubernetes manifest for frontend deployment
                    sh """
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                    """

                    // Apply Kubernetes manifest for backend deployment
                    sh """
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/backend-service.yaml
                    """
                }
            }
        }
    }
}
