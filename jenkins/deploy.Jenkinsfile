pipeline {
  agent { label 'master' }

  environment {
    KUBECONFIG = credentials('k8s-kubeconfig')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/ayukeshava1/DevOps_Prorfolio_Project.git'
      }
    }

    stage('Prepare Namespace') {
      steps {
        script {
          sh 'kubectl get ns portfolio || kubectl create ns portfolio'
        }
      }
    }

    stage('Apply Secrets and PVCs') {
      steps {
        script {
          sh 'kubectl apply -f k8s/postgres-secret.yaml -n portfolio'
          sh 'kubectl apply -f k8s/postgres-pvc.yaml -n portfolio'
        }
      }
    }

    stage('Apply Deployments and Services') {
      steps {
        script {
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

    stage('Verify Rollouts') {
      steps {
        script {
          sh 'kubectl rollout status deployment/postgres -n portfolio || true'
          sh 'kubectl rollout status deployment/backend-deployment -n portfolio || true'
          sh 'kubectl rollout status deployment/frontend-deployment -n portfolio || true'
        }
      }
    }

    stage('Check Status') {
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
      echo "✅ Deployment succeeded."
    }

    failure {
      echo "❌ Deployment failed. Attempting rollback..."
      script {
        // Only rollback the app-specific deployments
        sh 'kubectl rollout undo deployment/backend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/frontend-deployment -n portfolio || true'
        sh 'kubectl rollout undo deployment/postgres -n portfolio || true'
      }
    }
  }
}
