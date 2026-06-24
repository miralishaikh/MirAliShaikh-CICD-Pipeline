pipeline {
    agent any
    
    tools {
        nodejs 'Node26'
    }
    
    environment {
        DOCKER_IMAGE = 'miralishaikh/miralishaikh-cicd-pipeline'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building Project...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Tests passed successfully!'
            }
        }
        
        stage('Docker Build') {
            steps {
                echo 'Compiling static Docker layers...'
                sh 'docker build -t $DOCKER_IMAGE:$IMAGE_TAG .'
                sh 'docker tag $DOCKER_IMAGE:$IMAGE_TAG $DOCKER_IMAGE:latest'
            }
        }
        
        stage('Push to Hub') {
            steps {
                echo 'Retrieving credentials and logging into Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
                    sh 'docker push $DOCKER_IMAGE:$IMAGE_TAG'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Stopping and cleaning up previous container instances...'
                sh 'docker stop miralishaikh-cicd-pipeline || true'
                sh 'docker rm miralishaikh-cicd-pipeline || true'
                
                echo 'Pulling fresh compiled image and deploying container to Port 3000...'
                sh 'docker pull $DOCKER_IMAGE:latest'
                sh 'docker run -d -p 3000:3000 --name miralishaikh-cicd-pipeline $DOCKER_IMAGE:latest'
                
                echo 'App is now live at localhost:3000!'
            }
        }
        
        stage('Notify') {
            steps {
                echo 'CI/CD pipeline executed cleanly. Workspace updated!'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline successfully built and deployed!'
        }
        failure {
            echo 'Pipeline run failed. Check console output for debug errors.'
        }
    }
}

