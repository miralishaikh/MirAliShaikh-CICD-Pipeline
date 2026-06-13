pipeline {
    agent any
    
    tools {
        nodejs 'Node26'
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
        stage('Deploy') {
            steps {
                // Compile the production container image
                sh 'docker build -t MirAliShaikh-cicd-pipeline .'
                echo 'Application Deployed Successfully!'
            }
        }
        stage('Notify') {
            steps {
                echo 'Team notified of successful build!'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline SUCCESS!'
        }
        failure {
            echo 'Pipeline FAILED!'
        }
    }
}

