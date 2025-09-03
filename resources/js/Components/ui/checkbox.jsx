import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Checkbox = forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            ref={ref}
            className={cn(
                'h-4 w-4 rounded border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            checked={checked}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            {...props}
        />
    )
})
Checkbox.displayName = 'Checkbox'

export { Checkbox }
