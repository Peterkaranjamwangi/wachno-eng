import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { quotationSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

// GET /api/quotations - List all quotations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    const where: any = {}
    if (status) where.status = status
    if (email) where.email = email

    const quotations = await prisma.quotation.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
            service: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(quotations)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch quotations')
  }
}

// POST /api/quotations - Create a new quotation
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = quotationSchema.parse(body)

    const { items, ...quotationData } = validatedData

    const quotation = await prisma.quotation.create({
      data: {
        ...quotationData,
        items: {
          create: items,
        },
      },
      include: {
        items: {
          include: {
            product: true,
            service: true,
          },
        },
      },
    })

    return successResponse(quotation, 201)
  } catch (error) {
    return errorResponse(error, 'Failed to create quotation')
  }
}
