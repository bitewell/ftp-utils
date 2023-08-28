import { FTPCredentials } from "./helpers";
export declare function listAll(ftpCredentials: FTPCredentials, remotePath: string): Promise<Array<any>>;
export declare function checkExistsPath(ftpCredentials: FTPCredentials, remotePath: string): Promise<boolean>;
export declare function removePath(ftpCredentials: FTPCredentials, remotePath: string): Promise<boolean>;
