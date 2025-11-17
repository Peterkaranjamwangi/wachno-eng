import { create } from 'zustand'
import { Product } from '@prisma/client'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: (filters?: { category?: string; featured?: boolean; inStock?: boolean }) => Promise<void>
  fetchProductById: (id: string) => Promise<Product | null>
  createProduct: (data: any) => Promise<Product | null>
  updateProduct: (id: string, data: any) => Promise<Product | null>
  deleteProduct: (id: string) => Promise<boolean>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (filters) => {
    set({ loading: true, error: null })
    try {
      const queryParams = new URLSearchParams()
      if (filters?.category) queryParams.append('category', filters.category)
      if (filters?.featured !== undefined) queryParams.append('featured', String(filters.featured))
      if (filters?.inStock !== undefined) queryParams.append('inStock', String(filters.inStock))

      const response = await fetch(`/api/products?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        set({ products: result.data, loading: false })
      } else {
        set({ error: result.error, loading: false })
      }
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false })
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`)
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to fetch product', loading: false })
      return null
    }
  },

  createProduct: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({ products: [result.data, ...state.products] }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to create product', loading: false })
      return null
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? result.data : p)),
        }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to update product', loading: false })
      return null
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: 'Failed to delete product', loading: false })
      return false
    }
  },
}))
