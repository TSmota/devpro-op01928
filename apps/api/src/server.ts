import fastify from 'fastify';
import cors from '@fastify/cors';

import { registerWeatherRoutes } from './weather/weather.routes.js';
import { getEnvVariable, validateEnv } from './envs.js';

// Validate environment variables before starting
try {
  validateEnv()
} catch (error) {
  console.error('Environment validation failed:', error instanceof Error ? error.message : error)
  process.exit(1)
}

const server = fastify({
  logger: true,
})

// Parse allowed origins from environment variable
const allowedOrigins = getEnvVariable('ALLOWED_ORIGINS', 'http://localhost:5173').split(',').map(origin => origin.trim())

server.register(cors, {
  origin: allowedOrigins,
})

registerWeatherRoutes(server)

const start = async () => {
  const port = Number(getEnvVariable('PORT', '3000'))
  server.log.info(`Starting server on port ${port}...`)
  server.log.info(`CORS enabled for origins: ${allowedOrigins.join(', ')}`)

  try {
    await server.listen({ host: '0.0.0.0', port })

    server.log.info(`Server is listening at port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
