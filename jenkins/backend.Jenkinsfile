pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ayuleshava/devops-backend:latest"
        DOCKER_BUILDKIT = "1"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build & Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt'
                }
            }
        }

        stage('Build Container Image') {
            steps {
                dir('backend') {
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
            echo "✅ Backend image built and pushed: ${DOCKER_IMAGE}"
        }
        failure {
            echo "❌ Backend build failed"
        }
    }
}
