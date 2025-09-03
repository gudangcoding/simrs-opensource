import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        license_number: '',
        department: '',
        shift: '',
        is_available: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/nurses')
    }

    return (
        <AuthenticatedLayout header="Add Nurse">
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/nurses" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Nurses
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="User" htmlFor="user_id" required>
                            <Select id="user_id" value={data.user_id} onChange={(e) => setData('user_id', e.target.value)} required error={errors.user_id}>
                                <option value="">Select user</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="License Number" htmlFor="license_number" required>
                            <Input id="license_number" value={data.license_number} onChange={(e) => setData('license_number', e.target.value)} required error={errors.license_number} />
                        </Field>

                        <Field label="Department" htmlFor="department" required>
                            <Input id="department" value={data.department} onChange={(e) => setData('department', e.target.value)} required error={errors.department} />
                        </Field>

                        <Field label="Shift" htmlFor="shift">
                            <Input id="shift" value={data.shift} onChange={(e) => setData('shift', e.target.value)} error={errors.shift} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} label="Available" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/nurses" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Nurse'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


