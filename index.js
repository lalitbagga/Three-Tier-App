const express = require('express')
const client = require('prom-client')
const app = express()
const port = 3000

const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Three Tier App' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})