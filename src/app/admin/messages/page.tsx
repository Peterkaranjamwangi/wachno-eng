'use client'

import { useEffect, useState } from 'react'
import { useMessageStore } from '@/store/useMessageStore'
import { Search, Eye, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function MessagesManagement() {
  const { messages, loading, fetchMessages, deleteMessage, updateMessage } = useMessageStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    fetchMessages()
  }, [])

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || message.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(id)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    await updateMessage(id, { status })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'READ':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'REPLIED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Messages Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage customer messages
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="ALL">All Status</option>
          <option value="UNREAD">Unread</option>
          <option value="READ">Read</option>
          <option value="REPLIED">Replied</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Messages Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {loading && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filteredMessages.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No messages found
                </td>
              </tr>
            )}
            {!loading &&
              filteredMessages.map((message) => (
                <tr key={message.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {message.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {message.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {message.subject || 'No subject'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="max-w-xs truncate">
                      {message.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {format(new Date(message.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={message.status}
                      onChange={(e) => handleStatusChange(message.id, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(message.status)}`}
                    >
                      <option value="UNREAD">Unread</option>
                      <option value="READ">Read</option>
                      <option value="REPLIED">Replied</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button className="mr-3 text-blue-600 hover:text-blue-900 dark:text-blue-400">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
