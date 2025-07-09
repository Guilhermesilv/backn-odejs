import fastify from 'fastify'
import cors from '@fastify/cors'
import { createTrip } from './routes/create-trip'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { confirmTrip } from './routes/confirm-trip'
import { confirmParticipants } from './routes/confirm-participant'
import { createActivity } from './routes/create-activity'
import { getActivities } from './routes/get-activities'
import { createLink } from './routes/create-link'
import { getLinks } from './routes/get-links'
import { getParticipants } from './routes/get-participants'
import { createInvite } from './routes/create-invite'
import { updateTrip } from './routes/update-trip'
import { getTripDetails } from './routes/get-trip-details'
import { getParticipant } from './routes/get-participant'
import { errorHandler } from './error-handler'
import { env } from './env'

const app = fastify({
  logger: env.NODE_ENV === 'production' ? true : false,
})

// CORS configuration for production
app.register(cors, {
  origin: env.NODE_ENV === 'production' ? env.WEB_BASE_URL : true,
  credentials: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

// Health check endpoint
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Register routes
app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipants)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.get('/', async () => {
  return { status: 'ok', message: 'API online!' }
})

const start = async () => {
  try {
    await app.listen({ 
      port: env.PORT,
      host: env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
    })
    console.log(`🚀 Server running on port ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
