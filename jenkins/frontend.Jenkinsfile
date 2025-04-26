pipeline {
    agent { label 'slave1' }

    environment {
        DOCKER_IMAGE = "ayuleshava/frontend-app:latest"
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build and Push Docker Image') {
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
