'use client'

import { useState } from 'react'
import { useQuotationStore } from '@/store/useQuotationStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'

interface QuotationFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  items: {
    productId?: string
    serviceId?: string
    quantity: number
    description: string
  }[]
}

export default function QuotationForm() {
  const { createQuotation, loading } = useQuotationStore()
  const [formData, setFormData] = useState<QuotationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    items: [{ quantity: 1, description: '' }],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const toastId = toast.loading('Submitting your quotation request...')

    try {
      const result = await createQuotation(formData)
      if (result) {
        toast.success('Quotation request submitted successfully! We\'ll get back to you soon.', {
          id: toastId,
          duration: 5000,
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          items: [{ quantity: 1, description: '' }],
        })
      } else {
        toast.error('Failed to submit quotation request. Please try again.', {
          id: toastId,
        })
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', {
        id: toastId,
      })
    }
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { quantity: 1, description: '' }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254 700 000000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name (optional)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Additional Message</Label>
          <Textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Any additional information about your request..."
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Items Requested *
            </label>
            <button
              type="button"
              onClick={addItem}
              className="text-sm text-primary hover:underline"
            >
              + Add Item
            </button>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="mb-4 space-y-3 rounded-lg border p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Item {index + 1}
                </span>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <div className="md:col-span-3">
                  <input
                    type="text"
                    placeholder="Item description *"
                    required
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Qty"
                    min="1"
                    required
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Submitting...' : 'Request Quotation'}
        </button>
      </form>
    </div>
  )
}
