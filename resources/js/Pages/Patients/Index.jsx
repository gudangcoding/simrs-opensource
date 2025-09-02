import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ patients, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        {
            key: 'medical_record_number',
            label: 'Medical Record #',
            sortable: true,
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
        },
        {
            key: 'birth_date',
            label: 'Birth Date',
            sortable: true,
            render: (value) => new Date(value).toLocaleDateString(),
        },
        {
            key: 'gender',
            label: 'Gender',
            sortable: true,
            render: (value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    value === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                    {value}
                </span>
            ),
        },
        {
            key: 'phone',
            label: 'Phone',
            sortable: true,
        },
        {
            key: 'is_active',
            label: 'Status',
            sortable: true,
            render: (value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ]

    const handleDelete = (patient) => {
        if (!confirm(`Are you sure you want to delete ${patient.name}?`)) return
        setDeleteId(patient.id)
        router.delete(`/patients/${patient.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteId(null),
        })
    }

    return (
        <AuthenticatedLayout header="Patients">
            <FlashMessage />
            
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all patients in the system.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        href="/patients/create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Patient
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={patients}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/patients/${id}`}
                    editRoute={(id) => `/patients/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}
