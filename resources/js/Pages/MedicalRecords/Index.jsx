import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ records, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'patient', label: 'Patient', render: (_, row) => row.patient?.name },
        { key: 'doctor', label: 'Doctor', render: (_, row) => row.doctor?.user?.name },
        { key: 'chief_complaint', label: 'Chief Complaint' },
        { key: 'diagnosis', label: 'Diagnosis' },
        { key: 'follow_up_date', label: 'Follow Up', render: (v) => (v ? new Date(v).toLocaleDateString() : '-') },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this medical record?')) return
        setDeleteId(item.id)
        router.delete(`/medical-records/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Medical Records">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Medical Records</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage medical records.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/medical-records/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Record
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={records}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/medical-records/${id}`}
                    editRoute={(id) => `/medical-records/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


