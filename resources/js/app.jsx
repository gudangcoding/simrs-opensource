import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { route } from 'ziggy-js'
import { Ziggy } from './ziggyRoutes'

import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'SIMRS'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el)
        root.render(<App {...props} route={(name, params, absolute, config = Ziggy) => route(name, params, absolute, config)} />)
    },
    progress: {
        color: '#4B5563',
    },
})
