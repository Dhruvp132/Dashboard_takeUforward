import { Hono } from 'hono'
import { handle } from '@hono/node-server/vercel'
import { cors } from 'hono/cors'
import { dataRouter } from './routes/data'

const app = new Hono().basePath('/api')

// Enable CORS for all routes
app.use('/*', cors())

// Use the data router for versioned API routes
app.route('/api/v1/', dataRouter)

// Define additional routes
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  })
})

// Export the handler for Vercel
export default handle(app)
