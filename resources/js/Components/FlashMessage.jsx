import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function FlashMessage() {
    const { flash } = usePage().props
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (flash.message || flash.error || flash.success) {
            setShow(true)
            const timer = setTimeout(() => {
                setShow(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [flash])

    if (!show || (!flash.message && !flash.error && !flash.success)) {
        return null
    }

    const getMessageType = () => {
        if (flash.error) return 'error'
        if (flash.success) return 'success'
        return 'info'
    }

    const getMessage = () => {
        return flash.error || flash.success || flash.message
    }

    const getIcon = () => {
        switch (getMessageType()) {
            case 'error':
                return <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            case 'success':
                return <CheckCircleIcon className="h-5 w-5 text-green-400" />
            default:
                return <InformationCircleIcon className="h-5 w-5 text-blue-400" />
        }
    }

    const getBgColor = () => {
        switch (getMessageType()) {
            case 'error':
                return 'bg-red-50 border-red-200'
            case 'success':
                return 'bg-green-50 border-green-200'
            default:
                return 'bg-blue-50 border-blue-200'
        }
    }

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBgColor()} border rounded-md p-4 shadow-lg`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {getIcon()}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                        {getMessage()}
                    </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600"
                            onClick={() => setShow(false)}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
