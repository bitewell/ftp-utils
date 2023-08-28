import { FTPCredentials } from "."

const ftpCredentials : FTPCredentials = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT,
    enviroment: process.env.ENV_TYPE,
    secure: false,
}

//console.log(ftpCredentials)
