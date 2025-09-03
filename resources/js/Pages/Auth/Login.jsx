import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Checkbox } from '@/Components/ui/checkbox'
import { Alert, AlertDescription } from '@/Components/ui/alert'
import { EyeIcon, EyeSlashIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import GuestLayout from '@/Layouts/GuestLayout'

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false)
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout title="Login">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <LockClosedIcon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Masuk ke SIMRS
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sistem Informasi Manajemen Rumah Sakit
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center">Login</CardTitle>
                        <CardDescription className="text-center">
                            Masukkan kredensial Anda untuk mengakses sistem
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <Alert className="mb-4">
                                <AlertDescription>{status}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        className="pl-10"
                                        placeholder="nama@email.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="pl-10 pr-10"
                                        placeholder="Masukkan password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <Label htmlFor="remember" className="ml-2 text-sm">
                                        Ingat saya
                                    </Label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Hubungi administrator untuk membuat akun baru
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        © 2024 SIMRS. Semua hak dilindungi.
                    </p>
                </div>
            </div>
        </div>
        </GuestLayout>
    )
}
