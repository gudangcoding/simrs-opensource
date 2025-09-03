import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ patients, doctors, appointments }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        doctor_id: '',
        appointment_id: '',
        chief_complaint: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        vital_signs: {},
        lab_results: {},
        follow_up_date: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/medical-records')
    }

    return (
        <AuthenticatedLayout header="Add Medical Record">
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/medical-records" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Medical Records
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

                        <Field label="Appointment" htmlFor="appointment_id">
                            <Select id="appointment_id" value={data.appointment_id} onChange={(e) => setData('appointment_id', e.target.value)} error={errors.appointment_id}>
                                <option value="">Select appointment</option>
                                {appointments.map(a => (
                                    <option key={a.id} value={a.id}>{a.label}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Follow Up Date" htmlFor="follow_up_date">
                            <Input id="follow_up_date" type="date" value={data.follow_up_date} onChange={(e) => setData('follow_up_date', e.target.value)} error={errors.follow_up_date} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Chief Complaint" htmlFor="chief_complaint" required>
                                <Textarea id="chief_complaint" rows={3} value={data.chief_complaint} onChange={(e) => setData('chief_complaint', e.target.value)} required error={errors.chief_complaint} />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field label="Diagnosis" htmlFor="diagnosis" required>
                                <Textarea id="diagnosis" rows={3} value={data.diagnosis} onChange={(e) => setData('diagnosis', e.target.value)} required error={errors.diagnosis} />
                            </Field>
                        </div>

                        <div className="sm:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field label="Treatment" htmlFor="treatment">
                                <Textarea id="treatment" rows={3} value={data.treatment} onChange={(e) => setData('treatment', e.target.value)} error={errors.treatment} />
                            </Field>
                            <Field label="Prescription" htmlFor="prescription">
                                <Textarea id="prescription" rows={3} value={data.prescription} onChange={(e) => setData('prescription', e.target.value)} error={errors.prescription} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/medical-records" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Record'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


