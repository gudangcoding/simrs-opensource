import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { 
    Bars3Icon, 
    XMarkIcon,
    HomeIcon,
    UserGroupIcon,
    UserIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    BeakerIcon,
    CurrencyDollarIcon,
    BellIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function AuthenticatedLayout({ children, header }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [openGroups, setOpenGroups] = useState({
        'Overview': true,
        'Data Master': true,
        'Operations': false,
        'Finance': false,
        'System': false,
    })
    const { auth } = usePage().props

    // Role-based navigation configuration
    const getNavigationGroups = (userRole) => {
        const allGroups = [
            {
                title: 'Overview',
                items: [
                    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
                ],
            },
            {
                title: 'Data Master',
                items: [
                    { name: 'Patients', href: '/patients', icon: UserGroupIcon, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
                    { name: 'Doctors', href: '/doctors', icon: UserIcon, roles: ['admin'] },
                    { name: 'Nurses', href: '/nurses', icon: UserIcon, roles: ['admin'] },
                    { name: 'Departments', href: '/departments', icon: BuildingOfficeIcon, roles: ['admin'] },
                    { name: 'Rooms', href: '/rooms', icon: BuildingOfficeIcon, roles: ['admin'] },
                ],
            },
            {
                title: 'Operations',
                items: [
                    { name: 'Appointments', href: '/appointments', icon: CalendarDaysIcon, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
                    { name: 'Medical Records', href: '/medical-records', icon: DocumentTextIcon, roles: ['admin', 'doctor', 'nurse'] },
                    { name: 'Medicines', href: '/medicines', icon: BeakerIcon, roles: ['admin', 'doctor', 'nurse'] },
                    { name: 'Prescriptions', href: '/prescriptions', icon: DocumentTextIcon, roles: ['admin', 'doctor'] },
                    { name: 'Lab Results', href: '/lab-results', icon: BeakerIcon, roles: ['admin', 'doctor', 'nurse'] },
                    { name: 'Schedules', href: '/schedules', icon: CalendarDaysIcon, roles: ['admin', 'doctor'] },
                ],
            },
            {
                title: 'Finance',
                items: [
                    { name: 'Payments', href: '/payments', icon: CurrencyDollarIcon, roles: ['admin', 'receptionist'] },
                    { name: 'Insurances', href: '/insurances', icon: CurrencyDollarIcon, roles: ['admin', 'receptionist'] },
                ],
            },
            {
                title: 'System',
                items: [
                    { name: 'Notifications', href: '/notifications', icon: BellIcon, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
                ],
            },
        ]

        // Filter groups and items based on user role
        return allGroups.map(group => ({
            ...group,
            items: group.items.filter(item => item.roles.includes(userRole))
        })).filter(group => group.items.length > 0)
    }

    const navigationGroups = getNavigationGroups(auth.user?.role || 'guest')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-xl font-bold text-gray-900">SIMRS LKP Naura</h1>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-4 px-2 py-4">
                        {navigationGroups.map((group) => (
                            <div key={group.title} className="space-y-1">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-2 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                    onClick={() => setOpenGroups({ ...openGroups, [group.title]: !openGroups[group.title] })}
                                >
                                    <span>{group.title}</span>
                                    {openGroups[group.title] ? (
                                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                                {openGroups[group.title] && (
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold text-gray-900">SIMRS LKP Naura</h1>
                    </div>
                    <nav className="flex-1 space-y-4 px-2 py-4">
                        {navigationGroups.map((group) => (
                            <div key={group.title} className="space-y-1">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-2 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                                    onClick={() => setOpenGroups({ ...openGroups, [group.title]: !openGroups[group.title] })}
                                >
                                    <span>{group.title}</span>
                                    {openGroups[group.title] ? (
                                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                                {openGroups[group.title] && (
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        {auth.user?.name?.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{auth.user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{auth.user?.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1" />
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <BellIcon className="h-6 w-6" />
                            </button>
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center gap-x-2 focus:outline-none"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-sm font-medium text-gray-700">
                                            {auth.user?.name?.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="hidden sm:block text-sm text-gray-700">{auth.user?.name}</span>
                                </button>
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/password/change"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <Cog6ToothIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            Change Password
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            Logout
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {header && (
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">{header}</h1>
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
