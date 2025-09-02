import { useState } from 'react'
import { Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ labResults, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        {
            key: 'test_date',
            label: 'Test Date',
            sortable: true,
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            key: 'patient',
            label: 'Patient',
            render: (_, row) => row.patient?.name,
        },
        {
            key: 'doctor',
            label: 'Doctor',
            render: (_, row) => row.doctor?.user?.name,
        },
        {
            key: 'lab_test',
            label: 'Lab Test',
            render: (_, row) => row.lab_test?.name || row.labTest?.name,
        },
        {
            key: 'result_value',
            label: 'Result',
        },
        {
            key: 'result_status',
            label: 'Status',
            render: (value) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    value === 'normal' ? 'bg-green-100 text-green-800' :
                    value === 'abnormal' ? 'bg-yellow-100 text-yellow-800' :
                    value === 'critical' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            ),
        },
    ]

    const handleDelete = (item) => {
        if (confirm('Delete this lab result?')) {
            setDeleteId(item.id)
            // Hook up delete with a form or axios if needed
        }
    }

    return (
        <AuthenticatedLayout header="Lab Results">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Lab Results</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Review and manage laboratory results.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        href="/lab-results/create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Result
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={labResults}
                    columns={columns}
                    onDelete={handleDelete}
                    viewRoute={(id) => `/lab-results/${id}`}
                    editRoute={(id) => `/lab-results/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


