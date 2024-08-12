import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { dataRouter } from './routes/data';

const app = new Hono()

app.use('/*', cors())

app.route("/api/v1/", dataRouter); 

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
