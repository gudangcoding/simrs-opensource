import { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Alert, AlertDescription } from '@/Components/ui/alert'
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export default function Profile({ auth }) {
    const [isEditing, setIsEditing] = useState(false)
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: auth.user.phone || '',
        address: auth.user.address || '',
        birth_date: auth.user.birth_date || '',
        gender: auth.user.gender || '',
    })

    const submit = (e) => {
        e.preventDefault()
        put('/profile', {
            onSuccess: () => {
                setIsEditing(false)
                reset()
            },
        })
    }

    const cancelEdit = () => {
        setIsEditing(false)
        reset()
    }

    return (
        <AuthenticatedLayout header="Profile">
            <Head title="Profile" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <UserCircleIcon className="h-12 w-12 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">{auth.user.name}</CardTitle>
                                <CardDescription className="text-lg capitalize">
                                    Role: {auth.user.role}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Profile Form */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Informasi Profil</CardTitle>
                                <CardDescription>
                                    Kelola informasi profil Anda
                                </CardDescription>
                            </div>
                            {!isEditing && (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Edit Profil
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            className="pl-10"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            className="pl-10"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Nomor Telepon</Label>
                                    <div className="relative">
                                        <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            className="pl-10"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Birth Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            className="pl-10"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    {errors.birth_date && (
                                        <p className="text-sm text-red-600">{errors.birth_date}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Jenis Kelamin</Label>
                                    <select
                                        id="gender"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-sm text-red-600">{errors.gender}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <div className="relative">
                                        <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <textarea
                                            id="address"
                                            rows={3}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancelEdit}
                                        disabled={processing}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Account Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status Akun</CardTitle>
                        <CardDescription>
                            Informasi status akun Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-600">Status Akun</span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    auth.user.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {auth.user.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-600">Bergabung Sejak</span>
                                <span className="text-sm text-gray-900">
                                    {new Date(auth.user.created_at).toLocaleDateString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
