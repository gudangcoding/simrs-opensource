import { Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function Show({ schedule }) {
    return (
        <AuthenticatedLayout header={`Schedule #${schedule.id}`}>
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/schedules" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Schedules
                    </Link>
                    <Link href={`/schedules/${schedule.id}/edit`} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit Schedule
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            {[
                                ['Doctor', schedule.doctor?.user?.name],
                                ['Day', schedule.day_of_week],
                                ['Start', schedule.start_time],
                                ['End', schedule.end_time],
                                ['Max Patients', schedule.max_patients ?? '-'],
                                ['Active', schedule.is_active ? 'Yes' : 'No'],
                            ].map(([label, value], idx) => (
                                <div key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                                    <dt className="text-sm font-medium text-gray-500">{label}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}


