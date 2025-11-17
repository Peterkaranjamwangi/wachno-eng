import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { updateMessageSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

type RouteParams = {
  params: {
    id: string
  }
}

// GET /api/messages/[id] - Get a single message
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const message = await prisma.message.findUnique({
      where: { id: params.id },
    })

    if (!message) {
      return errorResponse(new Error('Message not found'), 'Message not found', 404)
    }

    return successResponse(message)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch message')
  }
}

// PUT /api/messages/[id] - Update a message
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = updateMessageSchema.parse(body)

    const updateData: any = { ...validatedData }

    // If status is being changed to READ or REPLIED, set readAt
    if (validatedData.status && ['READ', 'REPLIED'].includes(validatedData.status)) {
      updateData.readAt = new Date()
    }

    const message = await prisma.message.update({
      where: { id: params.id },
      data: updateData,
    })

    return successResponse(message)
  } catch (error) {
    return errorResponse(error, 'Failed to update message')
  }
}

// DELETE /api/messages/[id] - Delete a message
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.message.delete({
      where: { id: params.id },
    })

    return successResponse({ message: 'Message deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Failed to delete message')
  }
}
