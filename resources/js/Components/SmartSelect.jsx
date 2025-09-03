import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Alert, AlertDescription } from '@/Components/ui/alert'

export default function SmartSelect({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Pilih...",
    searchable = true,
    required = false,
    disabled = false,
    error,
    onAdd,
    onEdit,
    addFormTitle = "Tambah Data Baru",
    editFormTitle = "Edit Data",
    addFormFields = [],
    editFormFields = [],
    showAddButton = true,
    showEditButton = true,
    className = "",
    optionLabel = "name",
    optionValue = "id"
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [formData, setFormData] = useState({})

    // Filter options based on search term
    const filteredOptions = options.filter(option => 
        option[optionLabel]?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Get selected option object
    useEffect(() => {
        if (value && options.length > 0) {
            const selected = options.find(option => option[optionValue] == value)
            setSelectedOption(selected)
        } else {
            setSelectedOption(null)
        }
    }, [value, options, optionValue])

    // Initialize form data
    useEffect(() => {
        if (showEditForm && selectedOption) {
            const initialData = {}
            editFormFields.forEach(field => {
                initialData[field.name] = selectedOption[field.name] || ""
            })
            setFormData(initialData)
        } else if (showAddForm) {
            const initialData = {}
            addFormFields.forEach(field => {
                initialData[field.name] = ""
            })
            setFormData(initialData)
        }
    }, [showAddForm, showEditForm, selectedOption, addFormFields, editFormFields])

    const handleSelect = (option) => {
        onChange(option[optionValue])
        setIsOpen(false)
        setSearchTerm("")
    }

    const handleAdd = () => {
        setShowAddForm(true)
        setIsOpen(false)
    }

    const handleEdit = () => {
        setShowEditForm(true)
        setIsOpen(false)
    }

    const handleFormSubmit = async (e, isEdit = false) => {
        e.preventDefault()
        
        try {
            if (isEdit) {
                await onEdit(formData, selectedOption[optionValue])
                setShowEditForm(false)
            } else {
                const newId = await onAdd(formData)
                if (newId) {
                    onChange(newId)
                }
                setShowAddForm(false)
            }
            setFormData({})
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }

    const handleCancel = () => {
        setShowAddForm(false)
        setShowEditForm(false)
        setFormData({})
    }

    // Handle click outside modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel()
        }
    }

    // Handle ESC key
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape' && (showAddForm || showEditForm)) {
                handleCancel()
            }
        }

        if (showAddForm || showEditForm) {
            document.addEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey)
            document.body.style.overflow = 'unset'
        }
    }, [showAddForm, showEditForm])

    const renderForm = (isEdit = false) => {
        const fields = isEdit ? editFormFields : addFormFields
        const title = isEdit ? editFormTitle : addFormTitle
        const submitText = isEdit ? "Update" : "Tambah"

        return (
            <div 
                className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[9999] p-4"
                onClick={handleBackdropClick}
            >
                <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
                        <CardDescription className="text-gray-600">
                            {isEdit ? "Edit data yang dipilih" : "Tambah data baru"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={(e) => handleFormSubmit(e, isEdit)} className="space-y-4">
                            {fields.map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                        {field.label}
                                        {field.required !== false && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                                            rows={field.rows || 3}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                                            required={field.required !== false}
                                            placeholder={field.placeholder}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                            value={formData[field.name] || ""}
                                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                                            required={field.required !== false}
                                        >
                                            <option value="">Pilih {field.label}</option>
                                            {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <Input
                                            id={field.name}
                                            type={field.type || "text"}
                                            value={formData[field.name] || ""}
                                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                                            required={field.required !== false}
                                            placeholder={field.placeholder}
                                            className="bg-white text-gray-900 placeholder-gray-500"
                                        />
                                    )}
                                </div>
                            ))}
                            
                            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                >
                                    {submitText}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <Label htmlFor="smart-select">{label}</Label>
            
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        disabled 
                            ? 'bg-gray-100 cursor-not-allowed' 
                            : 'bg-white hover:bg-gray-50 cursor-pointer'
                    } ${
                        error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={disabled}
                >
                    <span className={`${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
                        {selectedOption ? selectedOption[optionLabel] : placeholder}
                    </span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Action Buttons */}
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {showAddButton && (
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={handleAdd}
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="Tambah baru"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    )}
                    
                    {showEditButton && selectedOption && (
                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={handleEdit}
                            className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit data"
                        >
                            <PencilIcon className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {searchable && (
                        <div className="p-2 border-b border-gray-200">
                            <Input
                                type="text"
                                placeholder="Cari..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full"
                                autoFocus
                            />
                        </div>
                    )}
                    
                    <div className="py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option[optionValue]}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                >
                                    {option[optionLabel]}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500 text-center">
                                {searchTerm ? "Tidak ada hasil" : "Tidak ada data"}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}

            {/* Add Form Modal */}
            {showAddForm && renderForm(false)}

            {/* Edit Form Modal */}
            {showEditForm && renderForm(true)}
        </div>
    )
}
