export function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
            {children}
        </label>
    )
}

export function Input({ id, type = 'text', value, onChange, placeholder, required, disabled, error }) {
    return (
        <div>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export function Select({ id, value, onChange, children, required, disabled, error }) {
    return (
        <div>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
            >
                {children}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export function Textarea({ id, rows = 3, value, onChange, placeholder, required, disabled, error }) {
    return (
        <div>
            <textarea
                id={id}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export function Checkbox({ id, checked, onChange, label, error }) {
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            {label && (
                <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                    {label}
                </label>
            )}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export function Field({ label, htmlFor, children, required }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <Label htmlFor={htmlFor}>{label}{required && ' *'}</Label>
            </div>
            {children}
        </div>
    )
}

// New: Input with leading icon slot
export function InputWithIcon({ id, icon: Icon, type = 'text', value, onChange, placeholder, required, disabled, error }) {
    return (
        <div>
            <div className="mt-1 relative rounded-md shadow-sm">
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
                    className={`block w-full rounded-md pl-10 sm:text-sm ${
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

// New: Date input with proper formatting helpers
export function DateInput({ id, value, onChange, required, error }) {
    // value expected ISO string or 'YYYY-MM-DD' / 'YYYY-MM-DDTHH:mm'
    return (
        <Input id={id} type="date" value={value} onChange={onChange} required={required} error={error} />
    )
}

// New: File upload
export function FileUpload({ id, onChange, accept, multiple = false, error }) {
    return (
        <div>
            <input
                id={id}
                type="file"
                onChange={onChange}
                accept={accept}
                multiple={multiple}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}


