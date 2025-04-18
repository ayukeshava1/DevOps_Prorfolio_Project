pipeline {
  agent { label 'master' }

  environment {
    KUBECONFIG = credentials('k8s-kubeconfig') // Jenkins secret
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
      }
    }

    stage('Clean up old deployment') {
      steps {
        script {
          // Only delete if namespace exists
          sh '''
          if kubectl get ns portfolio; then
            echo "🔄 Deleting all resources in portfolio namespace..."
            kubectl delete all --all -n portfolio || true
            kubectl delete pvc --all -n portfolio || true
          fi
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Create namespace if it doesn't exist
          sh 'kubectl get ns portfolio || kubectl create ns portfolio'

          // Apply YAMLs in order
          sh 'kubectl apply -f k8s/postgres-secret.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-pvc.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-service.yaml -n portfolio'
          sh 'kubectl apply -f k8s/backend-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/backend-service.yaml -n portfolio'
          sh 'kubectl apply -f k8s/frontend-deployment.yaml -n portfolio'
          sh 'kubectl apply -f k8s/frontend-service.yaml -n portfolio'
          sh 'kubectl apply -f k8s/ingress.yaml -n portfolio || true'
        }
      }
    }

    stage('Verify Rollout Status') {
      steps {
        script {
          // Wait for successful rollout
          sh 'kubectl rollout status deployment/postgres -n portfolio'
          sh 'kubectl rollout status deployment/backend-deployment -n portfolio'
          sh 'kubectl rollout status deployment/frontend-deployment -n portfolio'
        }
      }
    }

    stage('Check Status') {
      steps {
        script {
          sh 'kubectl get all -n portfolio'
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment to Kubernetes successful."
    }
    failure {
      echo "❌ Deployment failed. Rolling back..."

      // Try rollback if deployment failed
      script {
        sh 'kubectl rollout undo deployment/backend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/frontend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/postgres -n portfolio || true'
      }
    }
  }
}
