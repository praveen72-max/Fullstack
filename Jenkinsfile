pipeline {
  agent any
  environment {
    DOCKERHUB_CREDS = credentials('dockerhub')
    SSH_DEPLOY = credentials('deploy-ssh')
    REPO = 'yourdockeruser/fullstack-demo'
  }
  stages {
    stage('Build images') {
      steps {
        dir('backend') {
          sh 'docker build -t ${REPO}:backend-${BUILD_NUMBER} .'
          sh 'docker login -u ${DOCKERHUB_CREDS_USR} -p ${DOCKERHUB_CREDS_PSW}'
          sh 'docker push ${REPO}:backend-${BUILD_NUMBER}'
        }
        dir('frontend') {
          sh 'docker build -t ${REPO}:frontend-${BUILD_NUMBER} .'
          sh 'docker push ${REPO}:frontend-${BUILD_NUMBER}'
        }
      }
    }
    stage('Deploy to server') {
      steps {
        sh "ssh -o StrictHostKeyChecking=no -i ${SSH_DEPLOY} ubuntu@${SERVER_IP} 'cd /root/app && docker-compose pull && docker-compose up -d'"
      }
    }
  }
}