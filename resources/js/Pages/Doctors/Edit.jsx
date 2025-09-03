import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ doctor, users }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: doctor.user_id,
        specialization: doctor.specialization,
        license_number: doctor.license_number,
        experience_years: doctor.experience_years || '',
        consultation_fee: doctor.consultation_fee || '',
        is_available: doctor.is_available,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/doctors/${doctor.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Doctor: ${doctor.user?.name}`}> 
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/doctors" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Doctors
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

                        <Field label="Specialization" htmlFor="specialization" required>
                            <Input id="specialization" value={data.specialization} onChange={(e) => setData('specialization', e.target.value)} required error={errors.specialization} />
                        </Field>

                        <Field label="License Number" htmlFor="license_number" required>
                            <Input id="license_number" value={data.license_number} onChange={(e) => setData('license_number', e.target.value)} required error={errors.license_number} />
                        </Field>

                        <Field label="Experience (years)" htmlFor="experience_years">
                            <Input id="experience_years" type="number" value={data.experience_years} onChange={(e) => setData('experience_years', e.target.value)} error={errors.experience_years} />
                        </Field>

                        <Field label="Consultation Fee" htmlFor="consultation_fee">
                            <Input id="consultation_fee" type="number" value={data.consultation_fee} onChange={(e) => setData('consultation_fee', e.target.value)} error={errors.consultation_fee} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_available" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} label="Available" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/doctors" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Doctor'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


