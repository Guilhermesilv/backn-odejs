import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { perguntarGemini } from '../lib/gemini'

export async function aiChat(app: FastifyInstance) {
  app.post('/trips/:tripId/ai-chat', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      }),
      body: z.object({
        pergunta: z.string().min(3),
      }),
    },
    handler: async (request, reply) => {
      const { tripId } = request.params as { tripId: string }
      const { pergunta } = request.body as { pergunta: string }

      const trip = await prisma.trip.findUnique({ where: { id: tripId } })
      if (!trip) return reply.status(404).send({ error: 'Viagem não encontrada' })

      const resposta = await perguntarGemini(pergunta, trip.destination)
      return { resposta }
    }
  })
}
