import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ patients }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        payment_type: '',
        reference_id: '',
        reference_type: '',
        amount: '',
        payment_method: 'cash',
        payment_status: 'pending',
        payment_date: '',
        notes: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/payments')
    }

    return (
        <AuthenticatedLayout header="Add Payment">
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/payments" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Payments
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

                        <Field label="Payment Type" htmlFor="payment_type" required>
                            <Input id="payment_type" value={data.payment_type} onChange={(e) => setData('payment_type', e.target.value)} required error={errors.payment_type} />
                        </Field>

                        <Field label="Reference ID" htmlFor="reference_id">
                            <Input id="reference_id" type="number" value={data.reference_id} onChange={(e) => setData('reference_id', e.target.value)} error={errors.reference_id} />
                        </Field>

                        <Field label="Reference Type" htmlFor="reference_type">
                            <Input id="reference_type" value={data.reference_type} onChange={(e) => setData('reference_type', e.target.value)} error={errors.reference_type} />
                        </Field>

                        <Field label="Amount" htmlFor="amount" required>
                            <Input id="amount" type="number" value={data.amount} onChange={(e) => setData('amount', e.target.value)} required error={errors.amount} />
                        </Field>

                        <Field label="Payment Method" htmlFor="payment_method" required>
                            <Select id="payment_method" value={data.payment_method} onChange={(e) => setData('payment_method', e.target.value)} required error={errors.payment_method}>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="transfer">Transfer</option>
                                <option value="insurance">Insurance</option>
                            </Select>
                        </Field>

                        <Field label="Payment Status" htmlFor="payment_status" required>
                            <Select id="payment_status" value={data.payment_status} onChange={(e) => setData('payment_status', e.target.value)} required error={errors.payment_status}>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </Select>
                        </Field>

                        <Field label="Payment Date" htmlFor="payment_date" required>
                            <Input id="payment_date" type="datetime-local" value={data.payment_date} onChange={(e) => setData('payment_date', e.target.value)} required error={errors.payment_date} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Notes" htmlFor="notes">
                                <Textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} error={errors.notes} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/payments" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


