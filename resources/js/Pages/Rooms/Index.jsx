import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import DataTable from '@/Components/DataTable'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Index({ rooms, pagination }) {
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        { key: 'room_number', label: 'Room #' },
        { key: 'room_type', label: 'Type' },
        { key: 'department', label: 'Department', render: (_, row) => row.department?.name },
        { key: 'bed_capacity', label: 'Beds' },
        { key: 'current_occupancy', label: 'Occupied' },
        { key: 'price_per_day', label: 'Price/Day' },
        { key: 'is_available', label: 'Available', render: (v) => (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${v ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{v ? 'Yes' : 'No'}</span>
        ) },
    ]

    const handleDelete = (item) => {
        if (!confirm('Delete this room?')) return
        setDeleteId(item.id)
        router.delete(`/rooms/${item.id}`, { preserveScroll: true, onFinish: () => setDeleteId(null) })
    }

    return (
        <AuthenticatedLayout header="Rooms">
            <FlashMessage />

            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Rooms</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage hospital rooms.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/rooms/create" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Room
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <DataTable
                    data={rooms}
                    columns={columns}
                    onDelete={handleDelete}
                    deleteRoute={() => true}
                    viewRoute={(id) => `/rooms/${id}`}
                    editRoute={(id) => `/rooms/${id}/edit`}
                    pagination={pagination}
                />
            </div>
        </AuthenticatedLayout>
    )
}


