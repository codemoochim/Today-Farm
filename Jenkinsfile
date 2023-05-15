pipeline {
    agent any
    stages {
            stage('Checkout') {
            steps {
                echo "Cloning..."
                checkout scm
                // git branch: 'feat/cicd', 
                // credentialsId: 'sando', 
                // url: 'git@kdt-gitlab.elice.io:iot_track/class_01/iot_project/team2/smart-farm-be.git'
            }
        }
        stage ('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 18.13.0') {
                    echo "Running tests..."
                    sh 'node -v'
                    sh 'npm install'
                }
            }
        }
        stage ('Build and Push Docker Image') {
            steps {
                script { 
                    echo "Building Docker image..."
                    sh "docker build -t codemoochim/smart-farm-be:${env.BUILD_ID} -f Dockerfile ."
                    echo "Pushing Docker image..."
                    docker.withRegistry("", "Docker-hub-sando"){
                        sh "docker push codemoochim/smart-farm-be:${env.BUILD_ID}"
                    }
                }
            }
        }
        
        stage ('Remove Docker Container') {
            steps {
                script {
                    echo "Removing Docker container..."
                    // sh "docker rm -f server-team02 || true"
                }
            }
        }
        stage ('Deploy Docker Image') {
            steps {
                script {
                    echo "Deploy Docker Image..."
                    sh "docker run -d --name server-team02 -p 3001:3001 --env-file /home/elice/.env codemoochim/smart-farm-be:${env.BUILD_ID}"
                }
            }
        }
    }
}