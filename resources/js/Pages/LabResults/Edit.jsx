import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ labResult, patients, doctors, labTests, medicalRecords }) {
    const { data, setData, put, processing, errors } = useForm({
        medical_record_id: labResult.medical_record_id,
        patient_id: labResult.patient_id,
        doctor_id: labResult.doctor_id,
        lab_test_id: labResult.lab_test_id,
        test_date: labResult.test_date,
        result_value: labResult.result_value,
        result_status: labResult.result_status,
        notes: labResult.notes || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/lab-results/${labResult.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Lab Result #${labResult.id}`}>
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
                            <div>
                                <label htmlFor="patient_id" className="block text-sm font-medium text-gray-700">Patient *</label>
                                <select id="patient_id" value={data.patient_id} onChange={(e) => setData('patient_id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                    <option value="">Select patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                                {errors.patient_id && <p className="mt-1 text-sm text-red-600">{errors.patient_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="doctor_id" className="block text-sm font-medium text-gray-700">Doctor *</label>
                                <select id="doctor_id" value={data.doctor_id} onChange={(e) => setData('doctor_id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                    <option value="">Select doctor</option>
                                    {doctors.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.doctor_id && <p className="mt-1 text-sm text-red-600">{errors.doctor_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="medical_record_id" className="block text-sm font-medium text-gray-700">Medical Record *</label>
                                <select id="medical_record_id" value={data.medical_record_id} onChange={(e) => setData('medical_record_id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                    <option value="">Select medical record</option>
                                    {medicalRecords.map(m => (
                                        <option key={m.id} value={m.id}>#{m.id} - Patient {m.patient_id}</option>
                                    ))}
                                </select>
                                {errors.medical_record_id && <p className="mt-1 text-sm text-red-600">{errors.medical_record_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="lab_test_id" className="block text-sm font-medium text-gray-700">Lab Test *</label>
                                <select id="lab_test_id" value={data.lab_test_id} onChange={(e) => setData('lab_test_id', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                    <option value="">Select lab test</option>
                                    {labTests.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                {errors.lab_test_id && <p className="mt-1 text-sm text-red-600">{errors.lab_test_id}</p>}
                            </div>

                            <div>
                                <label htmlFor="test_date" className="block text-sm font-medium text-gray-700">Test Date *</label>
                                <input type="datetime-local" id="test_date" value={data.test_date?.slice(0, 16) || ''} onChange={(e) => setData('test_date', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                                {errors.test_date && <p className="mt-1 text-sm text-red-600">{errors.test_date}</p>}
                            </div>

                            <div>
                                <label htmlFor="result_value" className="block text-sm font-medium text-gray-700">Result Value *</label>
                                <input type="text" id="result_value" value={data.result_value} onChange={(e) => setData('result_value', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                                {errors.result_value && <p className="mt-1 text-sm text-red-600">{errors.result_value}</p>}
                            </div>

                            <div>
                                <label htmlFor="result_status" className="block text-sm font-medium text-gray-700">Status *</label>
                                <select id="result_status" value={data.result_status} onChange={(e) => setData('result_status', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                                    <option value="pending">Pending</option>
                                    <option value="normal">Normal</option>
                                    <option value="abnormal">Abnormal</option>
                                    <option value="critical">Critical</option>
                                </select>
                                {errors.result_status && <p className="mt-1 text-sm text-red-600">{errors.result_status}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                                <textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/lab-results" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Result'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


