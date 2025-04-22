pipeline {
    agent { label 'slave2' }  // Runs only on slave2

    environment {
        IMAGE_NAME = "your-dockerhub-username/frontend-app"  // Replace with your Docker Hub repository
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up unused Docker resources..."
                    sh 'docker system prune -f || true'  // Safely clear unused Docker resources
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    echo "Fetching the latest code from GitHub..."
                    git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {  // Navigate to the frontend directory
                    script {
                        echo "Building the Docker image for the frontend..."
                        sh 'docker build -t ${IMAGE_NAME}:latest .'  // Build the Docker image
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing the Docker image to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        sh 'docker push ${IMAGE_NAME}:latest'  // Push the image to Docker Hub
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Frontend pipeline completed successfully! Docker image pushed to Docker Hub."
        }
        failure {
            echo "Frontend pipeline failed. Please check the logs for details."
        }
    }
}
