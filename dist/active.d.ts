import { FTPCredentials } from './helpers';
export declare function uploadToServer(ftpCredentials: FTPCredentials, remotePath: string, localPath: any): Promise<boolean>;
export declare function downloadFromServer(ftpCredentials: FTPCredentials, remotePath: string): Promise<string>;
