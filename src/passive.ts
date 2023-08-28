import path from "path"
import { Client as PassiveClient, FileInfo } from "basic-ftp"
import { FTPCredentials, getFullPath } from "./helpers"

function getPassiveClient(ftpCredentials: FTPCredentials) : Promise<PassiveClient>{
    return new Promise((resolve, reject) => {
        let client = new PassiveClient()
        client.access(ftpCredentials).then(() => {
            resolve(client)
        })
        .catch((err: any) => {
            reject(err)
        })
    })
}

export async function listAll(ftpCredentials: FTPCredentials, remotePath: string) : Promise<Array<any>>{
    let output = []
    let client: PassiveClient = await getPassiveClient(ftpCredentials)
    let fullPath = getFullPath(ftpCredentials.enviroment, remotePath)
    output = await client.list(fullPath)
    output = output.map((item: FileInfo) => path.join(fullPath, item.name))
    client.close()
    return output
}

export async function checkExistsPath(ftpCredentials: FTPCredentials, remotePath: string): Promise<boolean> {
    let parts: Array<string> = remotePath.split("/")
    //console.log(parts)
    let parentDir: string = parts.slice(0, parts.length-1).join('/')
    //console.info(parentDir)
    let files: Array<string> = await listAll(ftpCredentials, parentDir)
    //console.info(files)
    let fullPath = getFullPath(ftpCredentials.enviroment, remotePath)
    //console.info(fullPath, remotePath)
    return files.includes(fullPath)
}

export async function removePath(ftpCredentials: FTPCredentials, remotePath: string) : Promise<boolean> {
    let exists = await checkExistsPath(ftpCredentials, remotePath)
    if(!exists){
        throw new Error("File not found!")
    }
    let fullPath = getFullPath(ftpCredentials.enviroment, remotePath)
    let client: PassiveClient = await getPassiveClient(ftpCredentials)
    await client.remove(fullPath).then(() => client.close())
    return true
}