pipeline {
  agent any

  environment {
    KUBECONFIG = credentials('k8s-kubeconfig') // Reference your K8s credentials from Jenkins
  }

  stages {
    stage('Build') {
      steps {
        script {
          // Docker build & push, other build steps
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Apply the Kubernetes manifests (assuming they're stored in the repo)
          sh 'kubectl apply -f k8s/namespace.yaml'
          sh 'kubectl apply -f k8s/postgres-secret.yaml'
          sh 'kubectl apply -f k8s/postgres-pvc.yaml'
          sh 'kubectl apply -f k8s/postgres-deployment.yaml'
          sh 'kubectl apply -f k8s/postgres-service.yaml'
          sh 'kubectl apply -f k8s/backend-deployment.yaml'
          sh 'kubectl apply -f k8s/frontend-deployment.yaml'
          sh 'kubectl apply -f k8s/ingress.yaml'
        }
      }
    }

    stage('Post-deployment Checks') {
      steps {
        script {
          // Verify deployment success
          sh 'kubectl get pods -n jenkins'
          // You can use curl to verify app is accessible after deployment
        }
      }
    }
  }

  post {
    success {
      // Send notifications or other post-deployment steps
    }
    failure {
      // Handle failure scenarios
    }
  }
}
