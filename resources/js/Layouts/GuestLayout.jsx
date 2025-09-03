import { Head } from '@inertiajs/react'

export default function GuestLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={title} />
            {children}
        </div>
    )
}
