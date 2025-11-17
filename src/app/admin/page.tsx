'use client'

import { useEffect, useState } from 'react'
import { Package, Wrench, FileText, MessageSquare } from 'lucide-react'
import { useProductStore } from '@/store/useProductStore'
import { useServiceStore } from '@/store/useServiceStore'
import { useQuotationStore } from '@/store/useQuotationStore'
import { useMessageStore } from '@/store/useMessageStore'

export default function AdminDashboard() {
  const { products, fetchProducts } = useProductStore()
  const { services, fetchServices } = useServiceStore()
  const { quotations, fetchQuotations } = useQuotationStore()
  const { messages, fetchMessages } = useMessageStore()

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalServices: 0,
    pendingQuotations: 0,
    unreadMessages: 0,
  })

  useEffect(() => {
    fetchProducts()
    fetchServices()
    fetchQuotations()
    fetchMessages()
  }, [])

  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalServices: services.length,
      pendingQuotations: quotations.filter((q) => q.status === 'PENDING').length,
      unreadMessages: messages.filter((m) => m.status === 'UNREAD').length,
    })
  }, [products, services, quotations, messages])

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Wrench,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Quotations',
      value: stats.pendingQuotations,
      icon: FileText,
      color: 'bg-yellow-500',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'bg-red-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to the admin dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="rounded-lg bg-white p-6 shadow dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Quotations */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Recent Quotations
          </h2>
          <div className="space-y-4">
            {quotations.slice(0, 5).map((quotation) => (
              <div
                key={quotation.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 dark:border-gray-800"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {quotation.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quotation.email}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    quotation.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : quotation.status === 'QUOTED'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : quotation.status === 'ACCEPTED'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {quotation.status}
                </span>
              </div>
            ))}
            {quotations.length === 0 && (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No quotations yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Recent Messages
          </h2>
          <div className="space-y-4">
            {messages.slice(0, 5).map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 dark:border-gray-800"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {message.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {message.subject || 'No subject'}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    message.status === 'UNREAD'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : message.status === 'READ'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : message.status === 'REPLIED'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.status}
                </span>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No messages yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
