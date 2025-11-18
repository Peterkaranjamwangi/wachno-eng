'use client'

import { useState } from 'react'
import { useMessageStore } from '@/store/useMessageStore'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const { createMessage, loading } = useMessageStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const toastId = toast.loading('Sending your message...')

    try {
      const result = await createMessage(formData)
      if (result) {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          id: toastId,
          duration: 5000,
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        toast.error('Failed to send message. Please try again.', {
          id: toastId,
        })
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.', {
        id: toastId,
      })
    }
  }

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200 md:mb-6 lg:text-3xl">
            Send Us a Message
          </h2>
          <p className="mx-auto max-w-screen-md text-gray-500 md:text-lg">
            Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name *</Label>
                <Input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 700 000000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <LoadingSpinner size="sm" />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
