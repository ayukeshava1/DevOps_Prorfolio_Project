pipeline {
    agent { label 'master' }

    environment {
        DOCKER_IMAGE = "ayuleshava/devops-frontend:latest"
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                        buildctl build \
                          --frontend dockerfile.v0 \
                          --local context=. \
                          --local dockerfile=. \
                          --output type=image,name=${DOCKER_IMAGE},push=true
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend image built and pushed: ${DOCKER_IMAGE}"
        }
        failure {
            echo "❌ Build failed"
        }
    }
}





pipeline {
    agent { label 'slave1' }  // This job runs only on slave1

    environment {
        IMAGE_NAME = "ayuleshava/frontend-app"
    }

    stages {
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
                        docker.image("${IMAGE_NAME}:latest").push()
                    }
                }
            }
        }
    }
}


