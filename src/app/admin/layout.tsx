import Sidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Admin Dashboard - Wachno Engineering',
  description: 'Manage products, services, quotations, and messages',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
