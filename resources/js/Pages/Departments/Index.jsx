import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ departments, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'headDoctor', label: 'Head Doctor', render: (_, row) => row.head_doctor?.user?.name || row.headDoctor?.user?.name },
        { key: 'description', label: 'Description' },
        { key: 'is_active', label: 'Active', render: (v) => (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${v ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{v ? 'Active' : 'Inactive'}</span>
        ) },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this department?')) return
        setDeleteId(item.id)
        router.delete(`/departments/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Departments">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Departments</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage hospital departments.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/departments/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Department
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={departments}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/departments/${id}`}
                    editRoute={(id) => `/departments/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


