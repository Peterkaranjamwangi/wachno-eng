import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { messageSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

// GET /api/messages - List all messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    const where: any = {}
    if (status) where.status = status
    if (email) where.email = email

    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(messages)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch messages')
  }
}

// POST /api/messages - Create a new message
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = messageSchema.parse(body)

    const message = await prisma.message.create({
      data: validatedData,
    })

    return successResponse(message, 201)
  } catch (error) {
    return errorResponse(error, 'Failed to create message')
  }
}
