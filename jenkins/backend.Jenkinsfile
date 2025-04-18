pipeline {
    agent { label 'slave2' }

    environment {
        IMAGE_NAME = "ayuleshava/backend-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    script {
                        def tag = "${env.BUILD_NUMBER}"
                        // Build the image using the build number as a tag
                        docker.build("${IMAGE_NAME}:${tag}")
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    def tag = "${env.BUILD_NUMBER}"
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                        // Push the image tagged with build number, and also update "latest"
                        docker.image("${IMAGE_NAME}:${tag}").push()
                        docker.image("${IMAGE_NAME}:${tag}").push("latest")
                    }
                }
            }
        }
    }
}
