import { create } from 'zustand'
import { Message } from '@prisma/client'

interface MessageState {
  messages: Message[]
  loading: boolean
  error: string | null
  fetchMessages: (filters?: { status?: string; email?: string }) => Promise<void>
  fetchMessageById: (id: string) => Promise<Message | null>
  createMessage: (data: any) => Promise<Message | null>
  updateMessage: (id: string, data: any) => Promise<Message | null>
  deleteMessage: (id: string) => Promise<boolean>
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async (filters) => {
    set({ loading: true, error: null })
    try {
      const queryParams = new URLSearchParams()
      if (filters?.status) queryParams.append('status', filters.status)
      if (filters?.email) queryParams.append('email', filters.email)

      const response = await fetch(`/api/messages?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        set({ messages: result.data, loading: false })
      } else {
        set({ error: result.error, loading: false })
      }
    } catch (error) {
      set({ error: 'Failed to fetch messages', loading: false })
    }
  },

  fetchMessageById: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/messages/${id}`)
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to fetch message', loading: false })
      return null
    }
  },

  createMessage: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({ messages: [result.data, ...state.messages] }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to create message', loading: false })
      return null
    }
  },

  updateMessage: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          messages: state.messages.map((m) => (m.id === id ? result.data : m)),
        }))
        return result.data
      } else {
        set({ error: result.error })
        return null
      }
    } catch (error) {
      set({ error: 'Failed to update message', loading: false })
      return null
    }
  },

  deleteMessage: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      set({ loading: false })
      if (result.success) {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }))
        return true
      } else {
        set({ error: result.error })
        return false
      }
    } catch (error) {
      set({ error: 'Failed to delete message', loading: false })
      return false
    }
  },
}))
