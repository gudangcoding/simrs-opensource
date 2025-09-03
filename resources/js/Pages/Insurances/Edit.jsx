import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Input, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ insurance }) {
    const { data, setData, put, processing, errors } = useForm({
        name: insurance.name,
        type: insurance.type || '',
        coverage_percentage: insurance.coverage_percentage || '',
        is_active: insurance.is_active,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/insurances/${insurance.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Insurance: ${insurance.name}`}>
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/insurances" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Insurances
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="Name" htmlFor="name" required>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required error={errors.name} />
                        </Field>

                        <Field label="Type" htmlFor="type">
                            <Input id="type" value={data.type} onChange={(e) => setData('type', e.target.value)} error={errors.type} />
                        </Field>

                        <Field label="Coverage (%)" htmlFor="coverage_percentage">
                            <Input id="coverage_percentage" type="number" value={data.coverage_percentage} onChange={(e) => setData('coverage_percentage', e.target.value)} error={errors.coverage_percentage} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} label="Active" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/insurances" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Insurance'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


