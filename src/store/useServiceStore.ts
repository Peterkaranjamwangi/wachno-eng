import { create } from 'zustand'
import { Service } from '@prisma/client'

interface ServiceState {
  services: Service[]
  loading: boolean
  error: string | null
  fetchServices: (filters?: { category?: string; featured?: boolean }) => Promise<void>
  fetchServiceById: (id: string) => Promise<Service | null>
  createService: (data: any) => Promise<Service | null>
  updateService: (id: string, data: any) => Promise<Service | null>
  deleteService: (id: string) => Promise<boolean>
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async (filters) => {
    set({ loading: true, error: null })
    try {
      const queryParams = new URLSearchParams()
      if (filters?.category) queryParams.append('category', filters.category)
      if (filters?.featured !== undefined) queryParams.append('featured', String(filters.featured))

      const response = await fetch(`/api/services?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        set({ services: result.data, loading: false })
      } else {
        set({ error: result.error, loading: false })
      }
    } catch (error) {
      set({ error: 'Failed to fetch services', loading: false })
    }
  },

  fetchServiceById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/services/${id}`)
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to fetch service', loading: false })
      return null
    }
  },

  createService: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({ services: [result.data, ...state.services] }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to create service', loading: false })
      return null
    }
  },

  updateService: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? result.data : s)),
        }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to update service', loading: false })
      return null
    }
  },

  deleteService: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        }))
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: 'Failed to delete service', loading: false })
      return false
    }
  },
}))
