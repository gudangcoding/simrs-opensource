import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Field, Label, Input, Select, Textarea, DateInput } from '@/Components/Form'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ patients, doctors, labTests, medicalRecords }) {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_id: '',
        patient_id: '',
        doctor_id: '',
        lab_test_id: '',
        test_date: '',
        result_value: '',
        result_status: 'pending',
        notes: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/lab-results')
    }

    return (
        <AuthenticatedLayout header="Add Lab Result">
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/lab-results" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Lab Results
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Result Details</h3>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                            <Field label="Medical Record" htmlFor="medical_record_id" required>
                                <Select id="medical_record_id" value={data.medical_record_id} onChange={(e) => setData('medical_record_id', e.target.value)} required error={errors.medical_record_id}>
                                    <option value="">Select medical record</option>
                                    {medicalRecords.map(m => (
                                        <option key={m.id} value={m.id}>#{m.id} - Patient {m.patient_id}</option>
                                    ))}
                                </Select>
                            </Field>

                            <Field label="Lab Test" htmlFor="lab_test_id" required>
                                <Select id="lab_test_id" value={data.lab_test_id} onChange={(e) => setData('lab_test_id', e.target.value)} required error={errors.lab_test_id}>
                                    <option value="">Select lab test</option>
                                    {labTests.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </Select>
                            </Field>

                            <Field label="Test Date" htmlFor="test_date" required>
                                <Input id="test_date" type="datetime-local" value={data.test_date} onChange={(e) => setData('test_date', e.target.value)} required error={errors.test_date} />
                            </Field>

                            <Field label="Result Value" htmlFor="result_value" required>
                                <Input id="result_value" value={data.result_value} onChange={(e) => setData('result_value', e.target.value)} required error={errors.result_value} />
                            </Field>

                            <Field label="Status" htmlFor="result_status" required>
                                <Select id="result_status" value={data.result_status} onChange={(e) => setData('result_status', e.target.value)} required error={errors.result_status}>
                                    <option value="pending">Pending</option>
                                    <option value="normal">Normal</option>
                                    <option value="abnormal">Abnormal</option>
                                    <option value="critical">Critical</option>
                                </Select>
                            </Field>

                            <div className="sm:col-span-2">
                                <Field label="Notes" htmlFor="notes">
                                    <Textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} error={errors.notes} />
                                </Field>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/lab-results" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Result'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


