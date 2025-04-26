pipeline {
    agent { label 'slave2' }

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds') // DockerHub credentials
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }


        stage('Build Docker Image') {
            steps {
                script {
                    echo '🔨 Building Docker image for backend...'
                    dir('backend') {
                        sh 'docker build -t ayuleshava/devops-backend:latest .'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo '📦 Pushing backend Docker image to DockerHub...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push ayuleshava/devops-backend:latest
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Backend image built and pushed successfully!'
        }
        failure {
            echo '❌ Backend build or push failed!'
        }
    }
}
