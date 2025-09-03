import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Input, Select, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        generic_name: '',
        category: '',
        dosage_form: '',
        strength: '',
        unit: '',
        stock_quantity: 0,
        minimum_stock: 0,
        price_per_unit: '',
        expiry_date: '',
        supplier: '',
        is_active: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/medicines')
    }

    return (
        <AuthenticatedLayout header="Add Medicine">
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/medicines" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Medicines
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="Name" htmlFor="name" required>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required error={errors.name} />
                        </Field>

                        <Field label="Generic Name" htmlFor="generic_name">
                            <Input id="generic_name" value={data.generic_name} onChange={(e) => setData('generic_name', e.target.value)} error={errors.generic_name} />
                        </Field>

                        <Field label="Category" htmlFor="category">
                            <Input id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} error={errors.category} />
                        </Field>

                        <Field label="Dosage Form" htmlFor="dosage_form">
                            <Input id="dosage_form" value={data.dosage_form} onChange={(e) => setData('dosage_form', e.target.value)} error={errors.dosage_form} />
                        </Field>

                        <Field label="Strength" htmlFor="strength">
                            <Input id="strength" value={data.strength} onChange={(e) => setData('strength', e.target.value)} error={errors.strength} />
                        </Field>

                        <Field label="Unit" htmlFor="unit">
                            <Input id="unit" value={data.unit} onChange={(e) => setData('unit', e.target.value)} error={errors.unit} />
                        </Field>

                        <Field label="Stock Quantity" htmlFor="stock_quantity" required>
                            <Input id="stock_quantity" type="number" value={data.stock_quantity} onChange={(e) => setData('stock_quantity', e.target.value)} required error={errors.stock_quantity} />
                        </Field>

                        <Field label="Minimum Stock" htmlFor="minimum_stock">
                            <Input id="minimum_stock" type="number" value={data.minimum_stock} onChange={(e) => setData('minimum_stock', e.target.value)} error={errors.minimum_stock} />
                        </Field>

                        <Field label="Price per Unit" htmlFor="price_per_unit">
                            <Input id="price_per_unit" type="number" value={data.price_per_unit} onChange={(e) => setData('price_per_unit', e.target.value)} error={errors.price_per_unit} />
                        </Field>

                        <Field label="Expiry Date" htmlFor="expiry_date">
                            <Input id="expiry_date" type="date" value={data.expiry_date} onChange={(e) => setData('expiry_date', e.target.value)} error={errors.expiry_date} />
                        </Field>

                        <Field label="Supplier" htmlFor="supplier">
                            <Input id="supplier" value={data.supplier} onChange={(e) => setData('supplier', e.target.value)} error={errors.supplier} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} label="Active" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/medicines" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Medicine'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


