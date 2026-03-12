pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/zeyniaa/anime-watchlist-api.git',
                branch: 'master'
            }
        }

        stage('Inject ENV') {
            steps {
                withCredentials([file(credentialsId: 'env-file', variable: 'ENVFILE')]) {
                    bat """
                    if exist .env del .env
                    copy "%ENVFILE%" .env
                    """
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                bat """
                docker compose down || ver > nul
                docker compose up -d --build
                docker ps
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline Berhasil!'
        }
        failure {
            echo 'Pipeline Gagal'
        }
    }
}