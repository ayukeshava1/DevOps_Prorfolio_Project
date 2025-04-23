pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ayuleshava/devops-backend:latest"  // Docker image name
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Checkout') {
            steps {
                // Git checkout using the 'main' branch without credentialsId (using public repo)
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build & Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
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
            echo "✅ Backend image built and pushed: ${DOCKER_IMAGE}"
        }
        failure {
            echo "❌ Backend build failed"
        }
    }
}
