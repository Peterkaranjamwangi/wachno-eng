import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  )
}

export function errorResponse(
  error: unknown,
  defaultMessage: string = 'An error occurred',
  status: number = 500
) {
  console.error('API Error:', error)

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: error.errors,
      },
      { status: 400 }
    )
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: 'A record with this unique field already exists',
          field: error.meta?.target,
        },
        { status: 409 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'Record not found',
        },
        { status: 404 }
      )
    }
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status }
    )
  }

  return NextResponse.json(
    {
      success: false,
      error: defaultMessage,
    },
    { status }
  )
}

export async function parseRequestBody<T>(request: Request): Promise<T> {
  try {
    return await request.json()
  } catch {
    throw new Error('Invalid JSON in request body')
  }
}
