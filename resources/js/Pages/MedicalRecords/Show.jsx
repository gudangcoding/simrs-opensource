import { Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function Show({ record }) {
    return (
        <AuthenticatedLayout header={`Medical Record #${record.id}`}>
            <FlashMessage />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/medical-records" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Medical Records
                    </Link>
                    <Link href={`/medical-records/${record.id}/edit`} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit Record
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Patient</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.patient?.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.doctor?.user?.name}</dd>
                            </div>
                            {record.appointment && (
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Appointment</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">#{record.appointment.id}</dd>
                                </div>
                            )}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Chief Complaint</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{record.chief_complaint}</dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{record.diagnosis}</dd>
                            </div>
                            {record.treatment && (
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Treatment</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{record.treatment}</dd>
                                </div>
                            )}
                            {record.prescription && (
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Prescription</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">{record.prescription}</dd>
                                </div>
                            )}
                            {record.follow_up_date && (
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Follow Up</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(record.follow_up_date).toLocaleDateString()}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}


