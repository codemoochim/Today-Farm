pipeline {
    agent any
    environment {
                DOCKER_REGISTRY = "codemoochim"
                DOCKER_REPO_NAME = "smart-farm-be"
                // DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
                DOCKER_IMAGE_TAG = "latest"
                // DOCKER_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_REPO_NAME}:${DOCKER_IMAGE_TAG}"
                }
    stages {
        stage ('Checkout') {
            steps {
                checkout scm
            }
        }
        stage ('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 18.13.0') {
                    echo "Running tests..."
                    sh 'node -v'
                    sh 'npm install'
                    // sh 'npm run lint'
                    // sh 'npm run test'
                }
            }
        }
        stage ('Build Docker Image') {
            steps {
                script { 
                    echo "Building Docker image..."
                    def dockerfile = 'Dockerfile'
                    def image = docker.build("smart-farm", "-f ${dockerfile} .")
                }
            }
        }
        // stage ('Push Docker Image') {
        //     steps {
        //         script { 
        //             // withCredentials([usernamePassword(credentialsId: 'Docker-hub-sando', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        //             echo "Pushing Docker image..."
        //             withDockerRegistry(credentialsId: 'Docker-hub-sando', url: 'https://registry.hub.docker.com') {
        //             // def image = docker.image("${DOCKER_IMAGE}")
        //             // image.push()
        //             sh 'docker push ${DOCKER_IMAGE}'
        //             }
        //         }
        //     }
        // }

        stage('Push Docker Image') {
            steps {
                script {
                        echo "Pushing Docker image..."
                        withDockerRegistry(credentialsId: 'Docker-hub-sando', url: 'https://registry.hub.docker.com') {
                            sh "docker tag smart-farm codemoochim/smart-farm"
                            sh "docker push codemoochim/smart-farm"
                            // sh "docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${DOCKER_REPO_NAME}"
                            // sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}"
                        }
                }
            }
        }

        stage ('Remove Docker Container') {
            steps {
                script {
                    echo "Removing Docker container..."
                    sh 'docker rm -f server-team02 || true'
                }
            }
        }
        stage ('Deploy Docker Image') {
            steps {
                script {
                    echo "Deploy Docker Image..."
                    sh 'docker run -d --name server-team02 -p 5000:5000 ${env.DOCKER_IMAGE}'
                }
            }
        }
    }
}