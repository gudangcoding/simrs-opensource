export function Label({ htmlFor, children, className = "" }) {
    return (
        <label 
            htmlFor={htmlFor} 
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
        >
            {children}
        </label>
    )
}

export function Input({ 
    type = "text", 
    id, 
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    disabled = false,
    className = "",
    error,
    ...props 
}) {
    return (
        <div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export function Textarea({ 
    id, 
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    disabled = false,
    rows = 3,
    className = "",
    error,
    ...props 
}) {
    return (
        <div>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export function Select({ 
    id, 
    name, 
    value, 
    onChange, 
    options = [], 
    placeholder = "Pilih...",
    required = false, 
    disabled = false,
    className = "",
    error,
    optionLabel = "label",
    optionValue = "value",
    ...props 
}) {
    return (
        <div>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option[optionValue]} value={option[optionValue]}>
                        {option[optionLabel]}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export function Checkbox({ 
    id, 
    name, 
    checked, 
    onCheckedChange, 
    label, 
    required = false, 
    disabled = false,
    className = "",
    ...props 
}) {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                required={required}
                disabled={disabled}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${className}`}
                {...props}
            />
            {label && (
                <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                    {label}
                </label>
            )}
        </div>
    )
}

export function RadioGroup({ 
    name, 
    value, 
    onChange, 
    options = [], 
    required = false, 
    disabled = false,
    className = "",
    optionLabel = "label",
    optionValue = "value",
    ...props 
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            {options.map((option) => (
                <div key={option[optionValue]} className="flex items-center">
                    <input
                        type="radio"
                        id={`${name}-${option[optionValue]}`}
                        name={name}
                        value={option[optionValue]}
                        checked={value === option[optionValue]}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
                            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                        {...props}
                    />
                    <label 
                        htmlFor={`${name}-${option[optionValue]}`} 
                        className="ml-2 text-sm text-gray-700"
                    >
                        {option[optionLabel]}
                    </label>
                </div>
            ))}
        </div>
    )
}

export function DateInput({ 
    id, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    className = "",
    error,
    ...props 
}) {
    return (
        <div>
            <input
                type="date"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export function TimeInput({ 
    id, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    className = "",
    error,
    ...props 
}) {
    return (
        <div>
            <input
                type="time"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

export function FileInput({ 
    id, 
    name, 
    onChange, 
    accept, 
    required = false, 
    disabled = false,
    className = "",
    error,
    ...props 
}) {
    return (
        <div>
            <input
                type="file"
                id={id}
                name={name}
                onChange={onChange}
                accept={accept}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

// Field wrapper component
export function Field({ label, htmlFor, children, required, className = "" }) {
    return (
        <div className={className}>
            <div className="flex items-center justify-between">
                <Label htmlFor={htmlFor}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
            </div>
            {children}
        </div>
    )
}

// Input with leading icon slot
export function InputWithIcon({ id, icon: Icon, type = 'text', value, onChange, placeholder, required, disabled, error, className = "" }) {
    return (
        <div>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
                />
            </div>
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    )
}

// Re-export SmartSelect
export { default as SmartSelect } from './SmartSelect'


