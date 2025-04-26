pipeline {
    agent { label 'slave1' }

    environment {
        IMAGE_NAME = "ayuleshava/frontend-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Build Image with BuildKit') {
            steps {
                dir('frontend') {
                    script {
                        echo "Building image with buildctl..."
                        // Ensure the Dockerfile is in the correct path
                        sh '''
                            buildctl build \
                                --frontend dockerfile.v0 \
                                --local context=. \
                                --local dockerfile=. \
                                --output type=image,name=${IMAGE_NAME}:latest,push=false
                        '''
                    }
                }
            }
        }

        stage('Push to Registry') {
            steps {
                dir('frontend') {
                    script {
                        echo "Pushing image to registry..."
                        // Ensure the Dockerfile is in the correct path
                        sh '''
                            buildctl build \
                                --frontend dockerfile.v0 \
                                --local context=. \
                                --local dockerfile=. \
                                --output type=image,name=${IMAGE_NAME}:latest,push=true
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Successfully built and pushed ${IMAGE_NAME}:latest"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
