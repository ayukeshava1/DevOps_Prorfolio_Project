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
          sh '''
          if kubectl get ns portfolio; then
            echo "🔄 Deleting old resources..."
            kubectl get all -n portfolio
            kubectl delete all --all -n portfolio || true
            kubectl delete pvc --all -n portfolio || true
            kubectl delete deployments --all -n portfolio || true
            kubectl delete services --all -n portfolio || true
            kubectl delete ingress --all -n portfolio || true
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

          // Apply YAMLs in order with validation
          sh '''
          kubectl apply -f k8s/postgres-secret.yaml -n portfolio
          kubectl apply -f k8s/postgres-pvc.yaml -n portfolio
          kubectl apply -f k8s/postgres-deployment.yaml -n portfolio
          kubectl apply -f k8s/postgres-service.yaml -n portfolio
          kubectl apply -f k8s/backend-deployment.yaml -n portfolio
          kubectl apply -f k8s/backend-service.yaml -n portfolio
          kubectl apply -f k8s/frontend-deployment.yaml -n portfolio
          kubectl apply -f k8s/frontend-service.yaml -n portfolio
          kubectl apply -f k8s/ingress.yaml -n portfolio || true
          '''
        }
      }
    }

    stage('Verify Rollout Status') {
      steps {
        script {
          // Wait for successful rollout with timeout
          sh '''
          kubectl rollout status deployment/postgres -n portfolio --timeout=5m
          kubectl rollout status deployment/backend-deployment -n portfolio --timeout=5m
          kubectl rollout status deployment/frontend-deployment -n portfolio --timeout=5m
          '''
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
      // Improved rollback logic
      script {
        sh 'kubectl rollout undo deployment/backend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/frontend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/postgres -n portfolio || true'
      }
    }
  }
}
