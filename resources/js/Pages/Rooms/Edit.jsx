import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Input, Select, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ room, departments }) {
    const { data, setData, put, processing, errors } = useForm({
        room_number: room.room_number,
        room_type: room.room_type,
        department_id: room.department_id,
        bed_capacity: room.bed_capacity,
        current_occupancy: room.current_occupancy || '',
        price_per_day: room.price_per_day || '',
        is_available: room.is_available,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/rooms/${room.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Room: ${room.room_number}`}>
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/rooms" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Rooms
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="Room Number" htmlFor="room_number" required>
                            <Input id="room_number" value={data.room_number} onChange={(e) => setData('room_number', e.target.value)} required error={errors.room_number} />
                        </Field>

                        <Field label="Room Type" htmlFor="room_type" required>
                            <Input id="room_type" value={data.room_type} onChange={(e) => setData('room_type', e.target.value)} required error={errors.room_type} />
                        </Field>

                        <Field label="Department" htmlFor="department_id" required>
                            <Select id="department_id" value={data.department_id} onChange={(e) => setData('department_id', e.target.value)} required error={errors.department_id}>
                                <option value="">Select department</option>
                                {departments.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Bed Capacity" htmlFor="bed_capacity" required>
                            <Input id="bed_capacity" type="number" value={data.bed_capacity} onChange={(e) => setData('bed_capacity', e.target.value)} required error={errors.bed_capacity} />
                        </Field>

                        <Field label="Current Occupancy" htmlFor="current_occupancy">
                            <Input id="current_occupancy" type="number" value={data.current_occupancy} onChange={(e) => setData('current_occupancy', e.target.value)} error={errors.current_occupancy} />
                        </Field>

                        <Field label="Price per Day" htmlFor="price_per_day">
                            <Input id="price_per_day" type="number" value={data.price_per_day} onChange={(e) => setData('price_per_day', e.target.value)} error={errors.price_per_day} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} label="Available" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/rooms" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Room'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


