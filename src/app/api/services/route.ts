import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

// GET /api/services - List all services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: any = {}
    if (category) where.category = category
    if (featured) where.featured = featured === 'true'

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(services)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch services')
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data: validatedData,
    })

    return successResponse(service, 201)
  } catch (error) {
    return errorResponse(error, 'Failed to create service')
  }
}
