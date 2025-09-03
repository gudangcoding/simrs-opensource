import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { SmartSelect } from '@/Components/Form'

export default function SmartSelectDemo() {
    const [selectedPatient, setSelectedPatient] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState('')

    // Mock data untuk testing
    const mockPatients = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
    ]

    const mockDoctors = [
        { id: 1, name: 'Dr. Alice Brown' },
        { id: 2, name: 'Dr. Charlie Wilson' },
        { id: 3, name: 'Dr. Diana Davis' },
    ]

    // Mock handlers
    const handleAddPatient = async (formData) => {
        console.log('Adding patient:', formData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const newId = Math.max(...mockPatients.map(p => p.id)) + 1
        mockPatients.push({ id: newId, name: formData.name })
        return newId
    }

    const handleEditPatient = async (formData, patientId) => {
        console.log('Editing patient:', patientId, formData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const patient = mockPatients.find(p => p.id == patientId)
        if (patient) {
            patient.name = formData.name
        }
    }

    const handleAddDoctor = async (formData) => {
        console.log('Adding doctor:', formData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const newId = Math.max(...mockDoctors.map(d => d.id)) + 1
        mockDoctors.push({ id: newId, name: formData.name })
        return newId
    }

    const handleEditDoctor = async (formData, doctorId) => {
        console.log('Editing doctor:', doctorId, formData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const doctor = mockDoctors.find(d => d.id == doctorId)
        if (doctor) {
            doctor.name = formData.name
        }
    }

    return (
        <AuthenticatedLayout header="SmartSelect Demo">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">SmartSelect Component Demo</h2>
                    <p className="text-gray-600 mb-6">
                        Demo komponen SmartSelect dengan fitur tambah dan edit data relasi.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Patient Selection */}
                        <div>
                            <h3 className="text-md font-medium mb-2">Patient Selection</h3>
                            <SmartSelect
                                label="Pilih Patient"
                                value={selectedPatient}
                                onChange={setSelectedPatient}
                                options={mockPatients}
                                placeholder="Pilih patient..."
                                onAdd={handleAddPatient}
                                onEdit={handleEditPatient}
                                addFormTitle="Tambah Patient Baru"
                                editFormTitle="Edit Patient"
                                addFormFields={[
                                    { name: 'name', label: 'Nama', type: 'text', required: true, placeholder: 'Masukkan nama patient' },
                                    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'nama@email.com' },
                                    { name: 'phone', label: 'Nomor Telepon', type: 'tel', placeholder: '081234567890' },
                                    { name: 'address', label: 'Alamat', type: 'textarea', rows: 3, placeholder: 'Masukkan alamat lengkap' },
                                    { name: 'birth_date', label: 'Tanggal Lahir', type: 'date' },
                                    { name: 'gender', label: 'Jenis Kelamin', type: 'select', options: [
                                        { value: 'male', label: 'Laki-laki' },
                                        { value: 'female', label: 'Perempuan' }
                                    ]}
                                ]}
                                editFormFields={[
                                    { name: 'name', label: 'Nama', type: 'text', required: true },
                                    { name: 'email', label: 'Email', type: 'email', required: true },
                                    { name: 'phone', label: 'Nomor Telepon', type: 'tel' },
                                    { name: 'address', label: 'Alamat', type: 'textarea', rows: 3 },
                                    { name: 'birth_date', label: 'Tanggal Lahir', type: 'date' },
                                    { name: 'gender', label: 'Jenis Kelamin', type: 'select', options: [
                                        { value: 'male', label: 'Laki-laki' },
                                        { value: 'female', label: 'Perempuan' }
                                    ]}
                                ]}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Selected: {selectedPatient ? mockPatients.find(p => p.id == selectedPatient)?.name : 'None'}
                            </p>
                        </div>

                        {/* Doctor Selection */}
                        <div>
                            <h3 className="text-md font-medium mb-2">Doctor Selection</h3>
                            <SmartSelect
                                label="Pilih Doctor"
                                value={selectedDoctor}
                                onChange={setSelectedDoctor}
                                options={mockDoctors}
                                placeholder="Pilih doctor..."
                                onAdd={handleAddDoctor}
                                onEdit={handleEditDoctor}
                                addFormTitle="Tambah Doctor Baru"
                                editFormTitle="Edit Doctor"
                                addFormFields={[
                                    { name: 'name', label: 'Nama', type: 'text', required: true, placeholder: 'Masukkan nama doctor' },
                                    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'nama@email.com' },
                                    { name: 'phone', label: 'Nomor Telepon', type: 'tel', placeholder: '081234567890' },
                                    { name: 'specialization', label: 'Spesialisasi', type: 'text', required: true, placeholder: 'Contoh: Kardiologi' },
                                    { name: 'license_number', label: 'Nomor SIP', type: 'text', required: true, placeholder: 'Nomor Surat Izin Praktik' }
                                ]}
                                editFormFields={[
                                    { name: 'name', label: 'Nama', type: 'text', required: true },
                                    { name: 'email', label: 'Email', type: 'email', required: true },
                                    { name: 'phone', label: 'Nomor Telepon', type: 'tel' },
                                    { name: 'specialization', label: 'Spesialisasi', type: 'text', required: true },
                                    { name: 'license_number', label: 'Nomor SIP', type: 'text', required: true }
                                ]}
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Selected: {selectedDoctor ? mockDoctors.find(d => d.id == selectedDoctor)?.name : 'None'}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-md font-medium text-blue-900 mb-2">Cara Penggunaan:</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Icon Plus (+)</strong> - Klik untuk menambah data baru</li>
                            <li>• <strong>Icon Edit (✏️)</strong> - Klik untuk edit data yang sudah dipilih</li>
                            <li>• <strong>Search</strong> - Ketik untuk mencari data</li>
                            <li>• <strong>Dropdown</strong> - Klik untuk memilih data</li>
                        </ul>
                    </div>

                    {/* Current Data */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-md font-medium mb-2">Current Patients:</h3>
                            <div className="text-sm text-gray-600">
                                {mockPatients.map(patient => (
                                    <div key={patient.id}>• {patient.name}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-md font-medium mb-2">Current Doctors:</h3>
                            <div className="text-sm text-gray-600">
                                {mockDoctors.map(doctor => (
                                    <div key={doctor.id}>• {doctor.name}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
