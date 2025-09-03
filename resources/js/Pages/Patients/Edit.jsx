import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Field, Label, Input, Select, Textarea, Checkbox, InputWithIcon } from '@/Components/Form'
import { PhoneIcon } from '@heroicons/react/24/outline'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ patient }) {
    const { data, setData, put, processing, errors } = useForm({
        medical_record_number: patient.medical_record_number,
        name: patient.name,
        birth_date: patient.birth_date,
        gender: patient.gender,
        phone: patient.phone || '',
        email: patient.email || '',
        address: patient.address || '',
        emergency_contact_name: patient.emergency_contact_name || '',
        emergency_contact_phone: patient.emergency_contact_phone || '',
        blood_type: patient.blood_type || '',
        allergies: patient.allergies || '',
        medical_history: patient.medical_history || '',
        insurance_number: patient.insurance_number || '',
        insurance_type: patient.insurance_type || '',
        is_active: patient.is_active,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/patients/${patient.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Patient: ${patient.name}`}>
            <FlashMessage />
            
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/patients"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Patients
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field label="Medical Record Number" htmlFor="medical_record_number" required>
                                <Input id="medical_record_number" value={data.medical_record_number} onChange={(e) => setData('medical_record_number', e.target.value)} required error={errors.medical_record_number} />
                            </Field>

                            <Field label="Full Name" htmlFor="name" required>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required error={errors.name} />
                            </Field>

                            <Field label="Birth Date" htmlFor="birth_date" required>
                                <Input id="birth_date" type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} required error={errors.birth_date} />
                            </Field>

                            <Field label="Gender" htmlFor="gender" required>
                                <Select id="gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)} required error={errors.gender}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>
                            </Field>

                            <Field label="Phone Number" htmlFor="phone">
                                <InputWithIcon id="phone" icon={PhoneIcon} type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} error={errors.phone} />
                            </Field>

                            <Field label="Email Address" htmlFor="email">
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                            </Field>
                        </div>

                        <div className="mt-6">
                            <Field label="Address" htmlFor="address">
                                <Textarea id="address" rows={3} value={data.address} onChange={(e) => setData('address', e.target.value)} error={errors.address} />
                            </Field>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field label="Emergency Contact Name" htmlFor="emergency_contact_name">
                                <Input id="emergency_contact_name" value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} error={errors.emergency_contact_name} />
                            </Field>

                            <Field label="Emergency Contact Phone" htmlFor="emergency_contact_phone">
                                <Input id="emergency_contact_phone" type="tel" value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} error={errors.emergency_contact_phone} />
                            </Field>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field label="Blood Type" htmlFor="blood_type">
                                <Select id="blood_type" value={data.blood_type} onChange={(e) => setData('blood_type', e.target.value)} error={errors.blood_type}>
                                    <option value="">Select Blood Type</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </Select>
                            </Field>

                            <Field label="Insurance Type" htmlFor="insurance_type">
                                <Input id="insurance_type" value={data.insurance_type} onChange={(e) => setData('insurance_type', e.target.value)} error={errors.insurance_type} />
                            </Field>
                        </div>

                        <div className="mt-6">
                            <Field label="Allergies" htmlFor="allergies">
                                <Textarea id="allergies" rows={3} value={data.allergies} onChange={(e) => setData('allergies', e.target.value)} placeholder="List any known allergies..." error={errors.allergies} />
                            </Field>
                        </div>

                        <div className="mt-6">
                            <Field label="Medical History" htmlFor="medical_history">
                                <Textarea id="medical_history" rows={3} value={data.medical_history} onChange={(e) => setData('medical_history', e.target.value)} placeholder="Previous medical conditions, surgeries, etc..." error={errors.medical_history} />
                            </Field>
                        </div>

                        <div className="mt-6">
                            <Checkbox id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} label="Active Patient" />
                            {errors.is_active && <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link
                            href="/patients"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
