pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing modules'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests'
                bat 'npm test' 
            }
        }
    }
    
    post {
        always {
            echo 'Selesai menjalankan pipeline.'
        }
        success {
            echo 'Berhasil'
        }
        failure {
            echo 'Error'
        }
    }
}