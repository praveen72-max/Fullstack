pipeline {
  agent any

  environment {
    DOCKERHUB_CREDS = credentials('dockerhub')       // Jenkins credentials for DockerHub
    SSH_DEPLOY = credentials('deploy-ssh')           // Jenkins credentials for EC2 SSH key
    REPO = 'yourdockeruser/fullstack-demo'           // Replace with your DockerHub repo name
    SERVER_IP = '54.163.20.72'                       // Your EC2 public IP
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/praveen72-max/Fullstack.git'
      }
    }

    stage('Build and Push Docker Images') {
      steps {
        script {
          // Build + push backend
          dir('backend') {
            sh 'docker build -t ${REPO}:backend-${BUILD_NUMBER} .'
            sh 'echo "${DOCKERHUB_CREDS_PSW}" | docker login -u "${DOCKERHUB_CREDS_USR}" --password-stdin'
            sh 'docker push ${REPO}:backend-${BUILD_NUMBER}'
          }

          // Build + push frontend
          dir('frontend') {
            sh 'docker build -t ${REPO}:frontend-${BUILD_NUMBER} .'
            sh 'docker push ${REPO}:frontend-${BUILD_NUMBER}'
          }
        }
      }
    }

    stage('Deploy to EC2 Server') {
      steps {
        sh """
        ssh -o StrictHostKeyChecking=no -i ${SSH_DEPLOY} ubuntu@${SERVER_IP} '
          cd /home/ubuntu/Fullstack &&
          sudo docker-compose pull &&
          sudo docker-compose up -d'
        """
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed.'
    }
  }
}