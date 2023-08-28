import path from "path"

export interface FTPCredentials {
    host: any,
    user: any,
    password: any,
    port: any,
    secure: any,
    enviroment: any
}

export function getFullPath(enviroment: string, remotePath: string) : string {
    let prefix = enviroment == 'test' ? `test` : `prod`
    return path.join(prefix, remotePath)
}