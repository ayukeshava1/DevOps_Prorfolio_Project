pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ayuleshava/devops-frontend:latest"  // Docker image name
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                // Git checkout using the 'main' branch without credentialsId (using public repo)
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh 'npm install'  // Install dependencies for the frontend
                }
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
                    '''  // Building Docker image and pushing it
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
