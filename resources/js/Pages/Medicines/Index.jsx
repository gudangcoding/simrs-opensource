import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ medicines, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'generic_name', label: 'Generic' },
        { key: 'category', label: 'Category' },
        { key: 'dosage_form', label: 'Form' },
        { key: 'strength', label: 'Strength' },
        { key: 'unit', label: 'Unit' },
        { key: 'stock_quantity', label: 'Stock' },
        { key: 'price_per_unit', label: 'Price' },
        { key: 'expiry_date', label: 'Expiry', render: (v) => (v ? new Date(v).toLocaleDateString() : '-') },
        { key: 'is_active', label: 'Active', render: (v) => (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${v ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{v ? 'Yes' : 'No'}</span>
        ) },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this medicine?')) return
        setDeleteId(item.id)
        router.delete(`/medicines/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Medicines">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Medicines</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage medicines and stock.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/medicines/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Medicine
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={medicines}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/medicines/${id}`}
                    editRoute={(id) => `/medicines/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


