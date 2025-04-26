pipeline {
    agent { label 'slave1' }

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds') // DockerHub credentials (from Jenkins)
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '🔨 Building Docker image...'
                    dir('frontend') {
                        sh 'docker build -t ayuleshava/frontend-app:latest .'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo '📦 Pushing Docker image to DockerHub...'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push ayuleshava/frontend-app:latest
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and Push completed successfully!'
        }
        failure {
            echo '❌ Build or Push failed!'
        }
    }
}
