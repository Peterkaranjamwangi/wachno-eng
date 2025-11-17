import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { updateQuotationSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

type RouteParams = {
  params: {
    id: string
  }
}

// GET /api/quotations/[id] - Get a single quotation
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true,
            service: true,
          },
        },
      },
    })

    if (!quotation) {
      return errorResponse(new Error('Quotation not found'), 'Quotation not found', 404)
    }

    return successResponse(quotation)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch quotation')
  }
}

// PUT /api/quotations/[id] - Update a quotation (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = updateQuotationSchema.parse(body)

    const updateData: any = { ...validatedData }

    // If status is being changed to REPLIED, set respondedAt
    if (validatedData.status && ['QUOTED', 'REPLIED'].includes(validatedData.status)) {
      updateData.respondedAt = new Date()
    }

    const quotation = await prisma.quotation.update({
      where: { id: params.id },
      data: updateData,
      include: {
        items: {
          include: {
            product: true,
            service: true,
          },
        },
      },
    })

    return successResponse(quotation)
  } catch (error) {
    return errorResponse(error, 'Failed to update quotation')
  }
}

// DELETE /api/quotations/[id] - Delete a quotation
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.quotation.delete({
      where: { id: params.id },
    })

    return successResponse({ message: 'Quotation deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Failed to delete quotation')
  }
}
