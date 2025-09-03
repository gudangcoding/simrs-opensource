import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ appointment, patients, doctors }) {
    const { data, setData, put, processing, errors } = useForm({
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        status: appointment.status,
        complaint: appointment.complaint || '',
        notes: appointment.notes || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/appointments/${appointment.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Appointment #${appointment.id}`}>
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/appointments" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Appointments
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="Patient" htmlFor="patient_id" required>
                            <Select id="patient_id" value={data.patient_id} onChange={(e) => setData('patient_id', e.target.value)} required error={errors.patient_id}>
                                <option value="">Select patient</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Doctor" htmlFor="doctor_id" required>
                            <Select id="doctor_id" value={data.doctor_id} onChange={(e) => setData('doctor_id', e.target.value)} required error={errors.doctor_id}>
                                <option value="">Select doctor</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Date" htmlFor="appointment_date" required>
                            <Input id="appointment_date" type="date" value={data.appointment_date} onChange={(e) => setData('appointment_date', e.target.value)} required error={errors.appointment_date} />
                        </Field>

                        <Field label="Time" htmlFor="appointment_time" required>
                            <Input id="appointment_time" type="time" value={data.appointment_time} onChange={(e) => setData('appointment_time', e.target.value)} required error={errors.appointment_time} />
                        </Field>

                        <Field label="Status" htmlFor="status" required>
                            <Select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} required error={errors.status}>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no-show">No Show</option>
                            </Select>
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Complaint" htmlFor="complaint">
                                <Textarea id="complaint" rows={3} value={data.complaint} onChange={(e) => setData('complaint', e.target.value)} error={errors.complaint} />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field label="Notes" htmlFor="notes">
                                <Textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} error={errors.notes} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/appointments" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


