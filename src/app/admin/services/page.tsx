'use client'

import { useEffect, useState } from 'react'
import { useServiceStore } from '@/store/useServiceStore'
import { Service } from '@prisma/client'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

export default function ServicesManagement() {
  const { services, loading, fetchServices, deleteService } = useServiceStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id)
    }
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleAdd = () => {
    setSelectedService(null)
    setShowModal(true)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage all your services
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Service
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {loading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && filteredServices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No services found
                </td>
              </tr>
            )}
            {!loading &&
              filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {service.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {service.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {service.category || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        service.featured
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {service.featured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => handleEdit(service)}
                      className="mr-3 text-blue-600 hover:text-blue-900 dark:text-blue-400"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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

      {/* Service Modal (placeholder for now) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-900">
            <h2 className="mb-4 text-2xl font-bold">
              {selectedService ? 'Edit Service' : 'Add Service'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Service form will be implemented here
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 rounded-lg bg-gray-200 px-4 py-2 dark:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
