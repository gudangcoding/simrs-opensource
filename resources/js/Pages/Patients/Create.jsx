import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        medical_record_number: '',
        name: '',
        birth_date: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        blood_type: '',
        allergies: '',
        medical_history: '',
        insurance_number: '',
        insurance_type: '',
        is_active: true,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/patients')
    }

    return (
        <AuthenticatedLayout header="Add New Patient">
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
                            <div>
                                <label htmlFor="medical_record_number" className="block text-sm font-medium text-gray-700">
                                    Medical Record Number *
                                </label>
                                <input
                                    type="text"
                                    id="medical_record_number"
                                    value={data.medical_record_number}
                                    onChange={(e) => setData('medical_record_number', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.medical_record_number && (
                                    <p className="mt-1 text-sm text-red-600">{errors.medical_record_number}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                                    Birth Date *
                                </label>
                                <input
                                    type="date"
                                    id="birth_date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                                {errors.birth_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                    Gender *
                                </label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && (
                                    <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <textarea
                                id="address"
                                rows={3}
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700">
                                    Emergency Contact Name
                                </label>
                                <input
                                    type="text"
                                    id="emergency_contact_name"
                                    value={data.emergency_contact_name}
                                    onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.emergency_contact_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="emergency_contact_phone" className="block text-sm font-medium text-gray-700">
                                    Emergency Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    id="emergency_contact_phone"
                                    value={data.emergency_contact_phone}
                                    onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.emergency_contact_phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.emergency_contact_phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700">
                                    Blood Type
                                </label>
                                <select
                                    id="blood_type"
                                    value={data.blood_type}
                                    onChange={(e) => setData('blood_type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Blood Type</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                                {errors.blood_type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.blood_type}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="insurance_type" className="block text-sm font-medium text-gray-700">
                                    Insurance Type
                                </label>
                                <input
                                    type="text"
                                    id="insurance_type"
                                    value={data.insurance_type}
                                    onChange={(e) => setData('insurance_type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.insurance_type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.insurance_type}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                                Allergies
                            </label>
                            <textarea
                                id="allergies"
                                rows={3}
                                value={data.allergies}
                                onChange={(e) => setData('allergies', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="List any known allergies..."
                            />
                            {errors.allergies && (
                                <p className="mt-1 text-sm text-red-600">{errors.allergies}</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <label htmlFor="medical_history" className="block text-sm font-medium text-gray-700">
                                Medical History
                            </label>
                            <textarea
                                id="medical_history"
                                rows={3}
                                value={data.medical_history}
                                onChange={(e) => setData('medical_history', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Previous medical conditions, surgeries, etc..."
                            />
                            {errors.medical_history && (
                                <p className="mt-1 text-sm text-red-600">{errors.medical_history}</p>
                            )}
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
                            {processing ? 'Creating...' : 'Create Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
