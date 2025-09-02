import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function DataTable({ 
    data, 
    columns, 
    onEdit, 
    onDelete, 
    onView,
    editRoute,
    deleteRoute,
    viewRoute,
    searchable = true,
    pagination = null 
}) {
    const [sortField, setSortField] = useState('')
    const [sortDirection, setSortDirection] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const filteredData = data.filter(item => {
        if (!searchTerm) return true
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortField) return 0
        
        const aValue = a[sortField]
        const bValue = b[sortField]
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            {searchable && (
                <div className="px-4 py-5 sm:p-6">
                    <div className="max-w-md">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            )}
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.label}</span>
                                        {column.sortable && (
                                            <div className="flex flex-col">
                                                <ChevronUpIcon 
                                                    className={`h-3 w-3 ${sortField === column.key && sortDirection === 'asc' ? 'text-gray-900' : 'text-gray-400'}`} 
                                                />
                                                <ChevronDownIcon 
                                                    className={`h-3 w-3 -mt-1 ${sortField === column.key && sortDirection === 'desc' ? 'text-gray-900' : 'text-gray-400'}`} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedData.map((item, index) => (
                            <tr key={item.id || index} className="hover:bg-gray-50">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        {viewRoute && (
                                            <Link
                                                href={viewRoute(item.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                        )}
                                        {editRoute && (
                                            <Link
                                                href={editRoute(item.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                        )}
                                        {deleteRoute && (
                                            <button
                                                onClick={() => onDelete && onDelete(item)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {pagination.from} to {pagination.to} of {pagination.total} results
                        </div>
                        <div className="flex space-x-2">
                            {pagination.links.map((link, index) => (
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1 text-sm rounded-md ${
                                            link.active 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm rounded-md bg-white text-gray-400 opacity-50 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
