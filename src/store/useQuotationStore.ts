import { create } from 'zustand'
import { Quotation, QuotationItem, Product, Service } from '@prisma/client'

type QuotationWithItems = Quotation & {
  items: (QuotationItem & {
    product: Product | null
    service: Service | null
  })[]
}

interface QuotationState {
  quotations: QuotationWithItems[]
  loading: boolean
  error: string | null
  fetchQuotations: (filters?: { status?: string; email?: string }) => Promise<void>
  fetchQuotationById: (id: string) => Promise<QuotationWithItems | null>
  createQuotation: (data: any) => Promise<QuotationWithItems | null>
  updateQuotation: (id: string, data: any) => Promise<QuotationWithItems | null>
  deleteQuotation: (id: string) => Promise<boolean>
}

export const useQuotationStore = create<QuotationState>((set) => ({
  quotations: [],
  loading: false,
  error: null,

  fetchQuotations: async (filters) => {
    set({ loading: true, error: null })
    try {
      const queryParams = new URLSearchParams()
      if (filters?.status) queryParams.append('status', filters.status)
      if (filters?.email) queryParams.append('email', filters.email)

      const response = await fetch(`/api/quotations?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        set({ quotations: result.data, loading: false })
      } else {
        set({ error: result.error, loading: false })
      }
    } catch (error) {
      set({ error: 'Failed to fetch quotations', loading: false })
    }
  },

  fetchQuotationById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/quotations/${id}`)
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to fetch quotation', loading: false })
      return null
    }
  },

  createQuotation: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({ quotations: [result.data, ...state.quotations] }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to create quotation', loading: false })
      return null
    }
  },

  updateQuotation: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          quotations: state.quotations.map((q) => (q.id === id ? result.data : q)),
        }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to update quotation', loading: false })
      return null
    }
  },

  deleteQuotation: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/quotations/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          quotations: state.quotations.filter((q) => q.id !== id),
        }))
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: 'Failed to delete quotation', loading: false })
      return false
    }
  },
}))
