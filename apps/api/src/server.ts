import fastify from 'fastify';
import cors from '@fastify/cors';

import { SearchCityResult } from '@repo/models';
import { HTTPService } from '@repo/services/http';

import type { ISearchQuery, IReply } from './types';
import { loadEnvFile } from 'node:process';

const server = fastify({
  logger: true,
})

try {
  loadEnvFile()
} catch (error) {
  server.log.warn('No .env file found, relying on environment variables')
}

server.register(cors, {
  origin: '*',
})

const httpService = new HTTPService('https://api.openweathermap.org')
const API_KEY = process.env.OPENWEATHERMAP_API_KEY

if (!API_KEY) {
  server.log.error('OPENWEATHERMAP_API_KEY is not set in environment variables')
  process.exit(1)
}

type SearchCityRequest = { 
  Querystring: ISearchQuery; 
  Reply: IReply<SearchCityResult[]>;
}

server.get<SearchCityRequest>('/api/search', async (request, reply) => {
  const { city } = request.query

  const { data, error } = await httpService.get<SearchCityResult[]>(`/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
  
  if (data) {
    return reply.code(200).send(data)
  }

  server.log.error(`Error fetching city data: ${error}`)
  return reply.code(500).send({ message: 'Failed to fetch city data' })
})

const start = async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000

  try {
    await server.listen({ port })

    server.log.info(`Server is listening at port ${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
