import express from 'express'
import deployRoutes from './routes/deploy.routes'

const app = express()

app.use(express.json())
app.use('/api', deployRoutes)

export default app
