import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/validations'
import { successResponse, errorResponse, parseRequestBody } from '@/lib/api-utils'

// GET /api/products - List all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const inStock = searchParams.get('inStock')

    const where: any = {}
    if (category) where.category = category
    if (featured) where.featured = featured === 'true'
    if (inStock) where.inStock = inStock === 'true'

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(products)
  } catch (error) {
    return errorResponse(error, 'Failed to fetch products')
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request)
    const validatedData = productSchema.parse(body)

    const product = await prisma.product.create({
      data: validatedData,
    })

    return successResponse(product, 201)
  } catch (error) {
    return errorResponse(error, 'Failed to create product')
  }
}
