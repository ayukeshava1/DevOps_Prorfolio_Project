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

        stage('Build Image with BuildKit') {
            steps {
                dir('frontend') {
                    script {
                        echo 'Building image with buildctl...'
                        sh '''
                            buildctl build \
                            --frontend dockerfile.v0 \
                            --local context=. \
                            --local dockerfile=. \
                            --output type=image,name=ayuleshava/frontend-app:latest,push=false
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
                        sh """
                            buildctl build \
                            --frontend dockerfile.v0 \
                            --local context=. \
                            --local dockerfile=. \
                            --output type=image,name=ayuleshava/frontend-app:latest,push=true \
                            --build-arg DOCKER_USERNAME=${DOCKERHUB_CREDS_USR} \
                            --build-arg DOCKER_PASSWORD=${DOCKERHUB_CREDS_PSW}
                        """
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
