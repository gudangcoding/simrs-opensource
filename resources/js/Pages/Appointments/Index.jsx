import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ appointments, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'date', label: 'Date', render: (_, row) => new Date(row.appointment_date).toLocaleDateString() },
        { key: 'appointment_time', label: 'Time' },
        { key: 'patient', label: 'Patient', render: (_, row) => row.patient?.name },
        { key: 'doctor', label: 'Doctor', render: (_, row) => row.doctor?.user?.name },
        { key: 'status', label: 'Status', render: (v) => (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                v === 'scheduled' ? 'bg-blue-100 text-blue-800' : v === 'completed' ? 'bg-green-100 text-green-800' : v === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>{v}</span>
        ) },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this appointment?')) return
        setDeleteId(item.id)
        router.delete(`/appointments/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Appointments">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Appointments</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage appointments.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/appointments/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Appointment
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={appointments}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/appointments/${id}`}
                    editRoute={(id) => `/appointments/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


