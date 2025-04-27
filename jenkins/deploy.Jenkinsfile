pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Git checkout using the 'main' branch without credentialsId (assuming it's a public repo)
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Approve Deployment') {
            steps {
                input message: '✅ Approve to deploy latest images to K8s cluster?'
            }
        }

        stage('Apply K8s YAMLs') {
            steps {
                withCredentials([file(credentialsId: 'k8s-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    withEnv(["KUBECONFIG=${KUBECONFIG_FILE}"]) {
                        sh '''
                            kubectl apply -f k8s/frontend-deployment.yaml
                            kubectl apply -f k8s/ingress.yaml
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ All services deployed successfully 🎉"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
