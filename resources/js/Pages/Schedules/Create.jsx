import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        doctor_id: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
        max_patients: '',
        is_active: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/schedules')
    }

    return (
        <AuthenticatedLayout header="Add Schedule">
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/schedules" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Schedules
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="Doctor" htmlFor="doctor_id" required>
                            <Select id="doctor_id" value={data.doctor_id} onChange={(e) => setData('doctor_id', e.target.value)} required error={errors.doctor_id}>
                                <option value="">Select doctor</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Day of Week" htmlFor="day_of_week" required>
                            <Select id="day_of_week" value={data.day_of_week} onChange={(e) => setData('day_of_week', e.target.value)} required error={errors.day_of_week}>
                                {['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                                    <option key={d} value={d}>{d || 'Select day'}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Start Time" htmlFor="start_time" required>
                            <Input id="start_time" type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} required error={errors.start_time} />
                        </Field>

                        <Field label="End Time" htmlFor="end_time" required>
                            <Input id="end_time" type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} required error={errors.end_time} />
                        </Field>

                        <Field label="Max Patients" htmlFor="max_patients">
                            <Input id="max_patients" type="number" value={data.max_patients} onChange={(e) => setData('max_patients', e.target.value)} error={errors.max_patients} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} label="Active" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/schedules" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


