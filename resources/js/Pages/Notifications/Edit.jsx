import { useForm, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea, Checkbox } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Edit({ notification, users }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: notification.user_id,
        title: notification.title,
        message: notification.message,
        type: notification.type || '',
        is_read: notification.is_read,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/notifications/${notification.id}`)
    }

    return (
        <AuthenticatedLayout header={`Edit Notification #${notification.id}`}>
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/notifications" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Notifications
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

                        <Field label="Title" htmlFor="title" required>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required error={errors.title} />
                        </Field>

                        <Field label="Type" htmlFor="type">
                            <Input id="type" value={data.type} onChange={(e) => setData('type', e.target.value)} error={errors.type} />
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Message" htmlFor="message" required>
                                <Textarea id="message" rows={3} value={data.message} onChange={(e) => setData('message', e.target.value)} required error={errors.message} />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Checkbox id="is_read" checked={data.is_read} onChange={(e) => setData('is_read', e.target.checked)} label="Mark as read" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/notifications" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Updating...' : 'Update Notification'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


