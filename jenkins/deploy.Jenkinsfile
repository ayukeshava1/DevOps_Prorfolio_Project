pipeline {
    agent { label 'master' }  // Use Jenkins master node for kubectl

    environment {
        KUBE_CONFIG_CREDENTIAL_ID = 'k8s-kubeconfig'   // Jenkins credential ID for kubeconfig file
        NAMESPACE = 'keshava-project'                  // Kubernetes namespace
    }

    stages {
        stage('Checkout Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
            }
        }

        stage('Apply K8s Manifests') {
            steps {
                withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG_FILE')]) {
                    script {
                        try {
                            sh """
                                export KUBECONFIG=$KUBECONFIG_FILE

                                # Create namespace if it doesn't exist
                                kubectl get ns ${NAMESPACE} || kubectl create ns ${NAMESPACE}

                                # Apply all K8s manifests
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-secret.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-pvc.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-service.yaml

                                kubectl apply -n ${NAMESPACE} -f k8s/backend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/backend-service.yaml

                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-service.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/ingress.yaml

                            """
                        } catch (err) {
                            error("❌ Deployment failed: ${err}")
                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            echo "⚠️ Deployment failed — cleaning up resources..."

            withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIAL_ID}", variable: 'KUBECONFIG_FILE')]) {
                sh """
                    export KUBECONFIG=$KUBECONFIG_FILE

                    # Delete all resources in the namespace created by Jenkins
                    kubectl delete all --all -n ${NAMESPACE}
                """
            }
        }
    }
}
