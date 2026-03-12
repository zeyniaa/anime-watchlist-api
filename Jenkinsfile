pipeline {
    agent any

    environment {-

    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/zeyniaa/anime-watchlist-api.git'
                branch: 'master'
            }
        }

        stage('Inject ENV') {
            steps {
                withCredentials([file(credentialsid: 'env-file', variable: 'ENVFILE')]) {
                    sh '''
                    rm -f .env
                    cp "$ENVFILE" .env
                    chmod 600.env
                    '''
                }
            }
        }

        stage('Build Docker') {
            steps {
                sh 'docker compose build'
            }
        }
    }
    
    stage ('Deploy') {
        steps {
            sh '''
            docker compose down || true
            docker compose up -d --build
            docker ps
            '''
        }
    }
}