import { exec } from 'child_process'
import { Request, Response } from 'express'
import util from 'util'

const execPromise = util.promisify(exec)

const root = async (req: Request, res: Response) => {
  res.send('Welcome index page.')
}

const deploy = async (req: Request, res: Response) => {
  try {
    const { stdout, stderr } = await execPromise(`
      git pull origin main &&
      docker-compose up -d --build --no-deps my-app
    `)

    if (stderr) {
      console.error(`stderr: ${stderr}`)
      res.status(500).send(`Error: ${stderr}`)
    } else {
      console.log(`stdout: ${stdout}`)
      res.status(200).send(`Deployment successful: ${stdout}`)
    }
  } catch (error) {
    console.error(`exec error: ${error}`)
    res.status(500).send(`Deployment failed: ${error}`)
  }
}

export const deployController = {
  root,
  deploy,
}
