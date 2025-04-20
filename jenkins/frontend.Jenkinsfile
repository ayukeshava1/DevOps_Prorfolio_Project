pipeline {
    agent { label 'slave1' }  // Runs only on slave1

    environment {
        IMAGE_NAME = "ayuleshava/frontend-app"
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker system prune -f'
                }
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${IMAGE_NAME}:latest")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        docker.image("${IMAGE_NAME}").push('latest')
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "Frontend pipeline failed!"
        }
    }
}
