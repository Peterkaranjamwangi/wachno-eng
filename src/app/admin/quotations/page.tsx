'use client'

import { useEffect, useState } from 'react'
import { useQuotationStore } from '@/store/useQuotationStore'
import { Search, Eye, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function QuotationsManagement() {
  const { quotations, loading, fetchQuotations, deleteQuotation, updateQuotation } = useQuotationStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    fetchQuotations()
  }, [])

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quotation.company?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || quotation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      await deleteQuotation(id)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    await updateQuotation(id, { status })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'REVIEWING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'QUOTED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quotations Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage and respond to quotation requests
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
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
          <option value="PENDING">Pending</option>
          <option value="REVIEWING">Reviewing</option>
          <option value="QUOTED">Quoted</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Quotations Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Items
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
            {!loading && filteredQuotations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No quotations found
                </td>
              </tr>
            )}
            {!loading &&
              filteredQuotations.map((quotation) => (
                <tr key={quotation.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {quotation.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {quotation.email}
                    </div>
                    {quotation.phone && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {quotation.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {quotation.company || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {quotation.items.length} item(s)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {format(new Date(quotation.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={quotation.status}
                      onChange={(e) => handleStatusChange(quotation.id, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(quotation.status)}`}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWING">Reviewing</option>
                      <option value="QUOTED">Quoted</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button className="mr-3 text-blue-600 hover:text-blue-900 dark:text-blue-400">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(quotation.id)}
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
