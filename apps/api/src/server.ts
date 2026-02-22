import fastify from 'fastify';
import cors from '@fastify/cors';

import { registerWeatherRoutes } from './weather/weather.routes.js';
import { getEnvVariable } from './envs.js';

const server = fastify({
  logger: true,
})

server.register(cors, {
  origin: '*',
})

registerWeatherRoutes(server)

const start = async () => {
  const port = Number(getEnvVariable('PORT', '3000'))

  try {
    await server.listen({ port })

    server.log.info(`Server is listening at port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
