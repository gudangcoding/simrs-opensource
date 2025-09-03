import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ nurses, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'name', label: 'Name', render: (_, row) => row.user?.name },
        { key: 'license_number', label: 'License #' },
        { key: 'department', label: 'Department' },
        { key: 'shift', label: 'Shift' },
        {
            key: 'is_available',
            label: 'Available',
            render: (value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {value ? 'Yes' : 'No'}
                </span>
            ),
        },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this nurse?')) return
        setDeleteId(item.id)
        router.delete(`/nurses/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Nurses">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Nurses</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage registered nurses.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/nurses/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Nurse
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={nurses}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/nurses/${id}`}
                    editRoute={(id) => `/nurses/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


