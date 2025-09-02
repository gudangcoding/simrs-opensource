import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { route as ziggyRoute } from 'ziggy-js'
import { Ziggy } from './ziggyRoutes'

import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'SIMRS'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el)
        if (typeof window !== 'undefined') {
            window.route = (name, params = {}, absolute = false, config = Ziggy) =>
                ziggyRoute(name, params, absolute, config)
        }
        root.render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})
