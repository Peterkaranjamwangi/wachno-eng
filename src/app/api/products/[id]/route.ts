import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { updateProductSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

type RouteParams = {
  params: {
    id: string
  }
}

// GET /api/products/[id] - Get a single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return errorResponse(new Error('Product not found'), 'Product not found', 404)
    }

    return successResponse(product)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch product')
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = updateProductSchema.parse(body)

    const product = await prisma.product.update({
      where: { id: params.id },
      data: validatedData,
    })

    return successResponse(product)
  } catch (error) {
    return errorResponse(error, 'Failed to update product')
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    })

    return successResponse({ message: 'Product deleted successfully' })
  } catch (error) {
    return errorResponse(error, 'Failed to delete product')
  }
}
