'use client'

import { useState } from 'react'
import { useQuotationStore } from '@/store/useQuotationStore'

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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const result = await createQuotation(formData)
      if (result) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          items: [{ quantity: 1, description: '' }],
        })
      } else {
        setError('Failed to submit quotation request. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
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
        {success && (
          <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">
            Thank you! Your quotation request has been submitted successfully. We'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Additional Message
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
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
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Request Quotation'}
        </button>
      </form>
    </div>
  )
}
