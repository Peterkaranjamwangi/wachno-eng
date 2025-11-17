import { z } from 'zod'

// Product validations
export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  paragraph: z.string().min(1, 'Paragraph is required'),
  image: z.string().url('Must be a valid URL'),
  images: z.array(z.string().url()).default([]),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
})

export const updateProductSchema = productSchema.partial()

// Service validations
export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  paragraph: z.string().min(1, 'Paragraph is required'),
  image: z.string().url('Must be a valid URL'),
  images: z.array(z.string().url()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
})

export const updateServiceSchema = serviceSchema.partial()

// Quotation validations
export const quotationItemSchema = z.object({
  productId: z.string().optional(),
  serviceId: z.string().optional(),
  quantity: z.number().int().positive().default(1),
  description: z.string().optional(),
  price: z.number().positive().optional(),
})

export const quotationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  items: z.array(quotationItemSchema).min(1, 'At least one item is required'),
})

export const updateQuotationSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'COMPLETED']).optional(),
  totalAmount: z.number().positive().optional(),
  notes: z.string().optional(),
})

// Message validations
export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
})

export const updateMessageSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']).optional(),
  notes: z.string().optional(),
})

export type ProductInput = z.infer<typeof productSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ServiceInput = z.infer<typeof serviceSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type QuotationInput = z.infer<typeof quotationSchema>
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>
