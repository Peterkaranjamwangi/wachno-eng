import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { updateServiceSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

type RouteParams = {
  params: {
    id: string
  }
}

// GET /api/services/[id] - Get a single service
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    })

    if (!service) {
      return errorResponse(new Error('Service not found'), 'Service not found', 404)
    }

    return successResponse(service)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch service')
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = updateServiceSchema.parse(body)

    const service = await prisma.service.update({
      where: { id: params.id },
      data: validatedData,
    })

    return successResponse(service)
  } catch (error) {
    return errorResponse(error, 'Failed to update service')
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    })

    return successResponse({ message: 'Service deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Failed to delete service')
  }
}
