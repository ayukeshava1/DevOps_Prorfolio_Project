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
                        // Using buildctl to build the image with BuildKit
                        sh '''
                            echo "Building image with buildctl..."
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
                script {
                    // Push the image to the registry (DockerHub in this case)
                    sh '''
                        echo "Pushing image to registry..."
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

    post {
        success {
            echo "✅ Successfully built and pushed ${IMAGE_NAME}:latest"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
