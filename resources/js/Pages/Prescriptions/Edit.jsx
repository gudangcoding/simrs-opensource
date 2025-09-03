import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ prescription, patients, doctors, medicalRecords }) {
    const { data, setData, put, processing, errors } = useForm({
        medical_record_id: prescription.medical_record_id || '',
        patient_id: prescription.patient_id,
        doctor_id: prescription.doctor_id,
        prescription_date: prescription.prescription_date,
        status: prescription.status,
        total_amount: prescription.total_amount || '',
        notes: prescription.notes || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/prescriptions/${prescription.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Prescription #${prescription.id}`}>
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/prescriptions" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Prescriptions
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

                        <Field label="Medical Record" htmlFor="medical_record_id">
                            <Select id="medical_record_id" value={data.medical_record_id} onChange={(e) => setData('medical_record_id', e.target.value)} error={errors.medical_record_id}>
                                <option value="">Select record</option>
                                {medicalRecords.map(m => (
                                    <option key={m.id} value={m.id}>#{m.id} - Patient {m.patient_id}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Date" htmlFor="prescription_date" required>
                            <Input id="prescription_date" type="datetime-local" value={data.prescription_date?.slice(0, 16) || ''} onChange={(e) => setData('prescription_date', e.target.value)} required error={errors.prescription_date} />
                        </Field>

                        <Field label="Status" htmlFor="status" required>
                            <Select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} required error={errors.status}>
                                <option value="pending">Pending</option>
                                <option value="dispensed">Dispensed</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                        </Field>

                        <Field label="Total Amount" htmlFor="total_amount">
                            <Input id="total_amount" type="number" value={data.total_amount} onChange={(e) => setData('total_amount', e.target.value)} error={errors.total_amount} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Notes" htmlFor="notes">
                                <Textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} error={errors.notes} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/prescriptions" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Prescription'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


