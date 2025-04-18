pipeline {
  agent { label 'master' }

  environment {
    KUBECONFIG = credentials('k8s-kubeconfig') // Secret file credentials in Jenkins
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Ensure namespace exists
          sh 'kubectl get ns portfolio || kubectl create ns portfolio'

          // Apply manifests in the portfolio namespace
          sh 'kubectl apply -f k8s/postgres-secret.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-pvc.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-service.yaml -n portfolio'
          sh 'kubectl apply -f k8s/backend-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/backend-service.yaml -n portfolio'
          sh 'kubectl apply -f k8s/frontend-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/frontend-service.yaml -n portfolio'
          
          // Optional: Apply ingress if available; if not, ignore error
          sh 'kubectl apply -f k8s/ingress.yaml -n portfolio || true'
        }
      }
    }

    stage('Verify') {
      steps {
        script {
          sh 'kubectl get pods -n portfolio'
          sh 'kubectl get svc -n portfolio'
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment to Kubernetes successful."
    }
    failure {
      echo "❌ Deployment failed. Check pipeline logs."
    }
  }
}
