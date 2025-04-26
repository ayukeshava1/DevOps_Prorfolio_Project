pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')  // DockerHub credentials
    }
    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Image with Docker CLI') {
            steps {
                dir('frontend') {
                    script {
                        echo 'Building image with Docker CLI...'
                        sh '''
                            docker build -t ayuleshava/frontend-app:latest .
                        '''
                    }
                }
            }
        }

        stage('Push to Registry') {
            steps {
                dir('frontend') {
                    script {
                        echo 'Pushing image to registry...'
                        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh """
                                echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                                docker push ayuleshava/frontend-app:latest
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo '❌ Build failed!'
        }
    }
}
