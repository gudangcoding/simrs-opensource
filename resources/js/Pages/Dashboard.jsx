import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { 
    UserGroupIcon, 
    UserIcon, 
    CalendarDaysIcon, 
    DocumentTextIcon,
    CurrencyDollarIcon,
    BeakerIcon
} from '@heroicons/react/24/outline'

export default function Dashboard({ stats }) {
    const statCards = [
        {
            name: 'Total Patients',
            value: stats?.totalPatients || 0,
            icon: UserGroupIcon,
            color: 'bg-blue-500',
        },
        {
            name: 'Total Doctors',
            value: stats?.totalDoctors || 0,
            icon: UserIcon,
            color: 'bg-green-500',
        },
        {
            name: 'Today Appointments',
            value: stats?.todayAppointments || 0,
            icon: CalendarDaysIcon,
            color: 'bg-yellow-500',
        },
        {
            name: 'Pending Prescriptions',
            value: stats?.pendingPrescriptions || 0,
            icon: DocumentTextIcon,
            color: 'bg-purple-500',
        },
        {
            name: 'Monthly Revenue',
            value: `$${stats?.monthlyRevenue || 0}`,
            icon: CurrencyDollarIcon,
            color: 'bg-indigo-500',
        },
        {
            name: 'Lab Tests Today',
            value: stats?.labTestsToday || 0,
            icon: BeakerIcon,
            color: 'bg-red-500',
        },
    ]

    return (
        <AuthenticatedLayout header="Dashboard">
            <FlashMessage />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => (
                    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`p-3 rounded-md ${card.color}`}>
                                        <card.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {card.name}
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {card.value}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Appointments</h3>
                    <div className="space-y-3">
                        {stats?.recentAppointments?.map((appointment) => (
                            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{appointment.patient_name}</p>
                                    <p className="text-sm text-gray-500">Dr. {appointment.doctor_name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900">{appointment.time}</p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        appointment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        )) || (
                            <p className="text-gray-500 text-center py-4">No recent appointments</p>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/patients/create"
                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                        >
                            <div className="text-center">
                                <UserGroupIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">Add Patient</p>
                            </div>
                        </a>
                        <a
                            href="/appointments/create"
                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                        >
                            <div className="text-center">
                                <CalendarDaysIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">New Appointment</p>
                            </div>
                        </a>
                        <a
                            href="/medical-records/create"
                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                        >
                            <div className="text-center">
                                <DocumentTextIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">Medical Record</p>
                            </div>
                        </a>
                        <a
                            href="/prescriptions/create"
                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                        >
                            <div className="text-center">
                                <BeakerIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm font-medium text-gray-700">New Prescription</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
