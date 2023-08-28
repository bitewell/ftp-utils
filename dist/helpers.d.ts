export interface FTPCredentials {
    host: any;
    user: any;
    password: any;
    port: any;
    secure: any;
    enviroment: any;
}
export declare function getFullPath(enviroment: string, remotePath: string): string;
