import Client from 'ftp'
import { FTPCredentials, getFullPath } from './helpers'
import { checkExistsPath } from './passive'

function getActiveClient(ftpCredentials: FTPCredentials) : Client{
    let client = new Client()

    client.connect({
        host: ftpCredentials.host,
        user: ftpCredentials.user,
        password: ftpCredentials.password,
    })

    return client
}


export async function uploadToServer(ftpCredentials: FTPCredentials, remotePath: string, localPath: any) : Promise<boolean> {
    let client : Client = getActiveClient(ftpCredentials)

    return new Promise((resolve, _) => {
        client.on('ready', function() {
            client.put(localPath, getFullPath(ftpCredentials.enviroment, remotePath), function(err) {
                if (err) {
                    console.log(err)
                    client.end()
                    resolve(false)
                }
                
                client.end()
                resolve(true)
            })
        })
    })
}


export async function downloadFromServer(ftpCredentials: FTPCredentials, remotePath: string) : Promise<string> {
    let exists = await checkExistsPath(ftpCredentials, remotePath)
    if(!exists){
        throw new Error("File not found!")
    }
    let client : Client = getActiveClient(ftpCredentials)
    let chunks: Array<any> = []
    let counter: number = 1
    return new Promise((resolve, reject) => {
        client.on('ready', function() {
            client.get(getFullPath(ftpCredentials.enviroment, remotePath), function(err, stream) {
                if (err) {
                    console.log(err)
                    reject(err)
                }

                if(!stream){
                    resolve('')
                }

                stream.on('data', (chunk) => {
                    console.log(`${counter} -> New data...`)
                    chunks.push(Buffer.from(chunk))
                    counter += 1
                })
                
                stream.on('error', (err) => {
                    console.log(err)
                    reject(err)
                })
                
                stream.once('close', function() { 
                    console.log('File done')
                    client.end()
                    let out = Buffer.concat(chunks).toString('utf8')
                    resolve(out)
                })
            })
        })
    })
}