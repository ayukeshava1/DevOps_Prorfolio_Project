pipeline {
    agent { label 'master' }  // Use Jenkins master node for kubectl

    environment {
        KUBE_CONFIG_CREDENTIAL_ID = 'k8s-kubeconfig'  // Jenkins kubeconfig credential ID
        NAMESPACE = 'keshava-project'  // Kubernetes namespace
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

                                # Ensure namespace exists before applying resources
                                kubectl create ns ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

                                # Apply secrets first to avoid missing env variables
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-secret.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/fastapi-secret.yaml

                                # Apply persistent storage configurations
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-pvc.yaml

                                # Apply PostgreSQL resources
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/postgres-service.yaml

                                # Apply backend resources (FastAPI)
                                kubectl apply -n ${NAMESPACE} -f k8s/backend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/backend-service.yaml

                                # Apply frontend resources (React)
                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-deployment.yaml
                                kubectl apply -n ${NAMESPACE} -f k8s/frontend-service.yaml

                                # Apply Ingress routing
                                kubectl apply -n ${NAMESPACE} -f k8s/ingress.yaml

                                # Ensure deployments are running successfully
                                kubectl rollout status deployment fastapi-backend -n ${NAMESPACE}
                                kubectl rollout status deployment frontend -n ${NAMESPACE}
                                kubectl rollout status deployment postgres -n ${NAMESPACE}
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
                    kubectl delete ns ${NAMESPACE}  # Delete the namespace for full cleanup
                """
            }
        }
    }
}
