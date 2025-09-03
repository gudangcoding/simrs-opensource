import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Alert, AlertDescription } from '@/Components/ui/alert'
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ChangePassword({ auth, status }) {
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        put('/password/change', {
            onSuccess: () => {
                reset()
            },
        })
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    return (
        <AuthenticatedLayout header="Ganti Password">
            <Head title="Ganti Password" />
            
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Ganti Password</CardTitle>
                        <CardDescription>
                            Ubah password akun Anda untuk keamanan yang lebih baik
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <Alert className="mb-6">
                                <AlertDescription>{status}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <Label htmlFor="current_password">Password Saat Ini</Label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="current_password"
                                        type={showPasswords.current ? 'text' : 'password'}
                                        className="pl-10 pr-10"
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        required
                                        placeholder="Masukkan password saat ini"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        onClick={() => togglePasswordVisibility('current')}
                                    >
                                        {showPasswords.current ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.current_password && (
                                    <p className="text-sm text-red-600">{errors.current_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password Baru</Label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPasswords.new ? 'text' : 'password'}
                                        className="pl-10 pr-10"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="Masukkan password baru"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPasswords.new ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    Password minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
                                </p>
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password_confirmation"
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        className="pl-10 pr-10"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="Konfirmasi password baru"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPasswords.confirm ? <EyeSlashIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-900 mb-2">
                                    Persyaratan Password:
                                </h4>
                                <ul className="text-xs text-blue-800 space-y-1">
                                    <li>• Minimal 8 karakter</li>
                                    <li>• Mengandung huruf besar dan kecil</li>
                                    <li>• Mengandung angka</li>
                                    <li>• Mengandung simbol khusus (!@#$%^&*)</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Mengubah Password...' : 'Ubah Password'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Security Tips */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Tips Keamanan Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p>Jangan gunakan password yang sama dengan akun lain</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p>Jangan bagikan password dengan siapapun</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p>Ganti password secara berkala (setiap 3-6 bulan)</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p>Gunakan password manager untuk menyimpan password dengan aman</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
