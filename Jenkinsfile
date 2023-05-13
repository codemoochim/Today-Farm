pipeline {
    agent any
    environment {
                DOCKER_REGISTRY = "codemoochim"
                DOCKER_REPO_NAME = "smart-farm-be"
                DOCKER_IMAGE_NAME = "smart-farm-be"
                DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
                DOCKER_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

                }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                // git branch: 'main', changelog: false, credentialsId: 'sando', poll: false, url: 'git@kdt-gitlab.elice.io:iot_track/class_01/iot_project/team2/smart-farm-be.git'
            }
        }
        stage ('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 18.13.0') {
                    echo "Running tests..."
                    sh 'node -v'sh 'npm install'
                    // sh 'npm run lint'
                    // sh 'npm run test'
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                script {
                    echo "Building and pushing Docker image..."
                    def dockerfile = 'Dockerfile'
                    def image = docker.build("${env.DOCKER_IMAGE}", "-f ${dockerfile} .")
                    image.push()
                }
            }
        }
        stage('Remove Docker Container') {
            steps {
                script {
                    echo "Removing Docker container..."
                    sh 'docker rm -f server-team02 || true'
                }
            }
        }
        stage('Deploy Docker Image') {
            steps {
                script {
                  echo "Deploy Docker Image..."
                  sh 'docker run -d --name server-team02 -p 5000:5000 ${env.DOCKER_IMAGE}'
                }
            }
        }
    }
}
