import { useForm, Link, router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FlashMessage from '@/Components/FlashMessage'
import { Field, Select, Input, Textarea, SmartSelect } from '@/Components/Form'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Create({ patients, doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        appointment_time: '',
        status: 'scheduled',
        complaint: '',
        notes: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/appointments')
    }

    // Handle add new patient
    const handleAddPatient = async (formData) => {
        try {
            return new Promise((resolve, reject) => {
                router.post('/patients', formData, {
                    onSuccess: (page) => {
                        // Get the new patient ID from the response
                        if (page.props.flash && page.props.flash.patient_id) {
                            resolve(page.props.flash.patient_id)
                        } else {
                            // Fallback: refresh page to get updated list
                            window.location.reload()
                            resolve(null)
                        }
                    },
                    onError: (errors) => {
                        console.error('Error adding patient:', errors)
                        reject(errors)
                    }
                })
            })
        } catch (error) {
            console.error('Error adding patient:', error)
            return null
        }
    }

    // Handle add new doctor
    const handleAddDoctor = async (formData) => {
        try {
            return new Promise((resolve, reject) => {
                router.post('/doctors', formData, {
                    onSuccess: (page) => {
                        // Get the new doctor ID from the response
                        if (page.props.flash && page.props.flash.doctor_id) {
                            resolve(page.props.flash.doctor_id)
                        } else {
                            // Fallback: refresh page to get updated list
                            window.location.reload()
                            resolve(null)
                        }
                    },
                    onError: (errors) => {
                        console.error('Error adding doctor:', errors)
                        reject(errors)
                    }
                })
            })
        } catch (error) {
            console.error('Error adding doctor:', error)
            return null
        }
    }

    // Handle edit patient
    const handleEditPatient = async (formData, patientId) => {
        try {
            return new Promise((resolve, reject) => {
                router.put(`/patients/${patientId}`, formData, {
                    onSuccess: () => {
                        // Refresh the page to get updated patient list
                        window.location.reload()
                        resolve()
                    },
                    onError: (errors) => {
                        console.error('Error editing patient:', errors)
                        reject(errors)
                    }
                })
            })
        } catch (error) {
            console.error('Error editing patient:', error)
        }
    }

    // Handle edit doctor
    const handleEditDoctor = async (formData, doctorId) => {
        try {
            return new Promise((resolve, reject) => {
                router.put(`/doctors/${doctorId}`, formData, {
                    onSuccess: () => {
                        // Refresh the page to get updated doctor list
                        window.location.reload()
                        resolve()
                    },
                    onError: (errors) => {
                        console.error('Error editing doctor:', errors)
                        reject(errors)
                    }
                })
            })
        } catch (error) {
            console.error('Error editing doctor:', error)
        }
    }

    return (
        <AuthenticatedLayout header="Add Appointment">
            <FlashMessage />

            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link href="/appointments" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Appointments
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <SmartSelect
                                label="Patient"
                                value={data.patient_id}
                                onChange={(value) => setData('patient_id', value)}
                                options={patients}
                                placeholder="Pilih patient..."
                                required
                                error={errors.patient_id}
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
                        </div>

                        <div>
                            <SmartSelect
                                label="Doctor"
                                value={data.doctor_id}
                                onChange={(value) => setData('doctor_id', value)}
                                options={doctors}
                                placeholder="Pilih doctor..."
                                required
                                error={errors.doctor_id}
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
                        </div>

                        <Field label="Date" htmlFor="appointment_date" required>
                            <Input id="appointment_date" type="date" value={data.appointment_date} onChange={(e) => setData('appointment_date', e.target.value)} required error={errors.appointment_date} />
                        </Field>

                        <Field label="Time" htmlFor="appointment_time" required>
                            <Input id="appointment_time" type="time" value={data.appointment_time} onChange={(e) => setData('appointment_time', e.target.value)} required error={errors.appointment_time} />
                        </Field>

                        <Field label="Status" htmlFor="status" required>
                            <Select id="status" value={data.status} onChange={(e) => setData('status', e.target.value)} required error={errors.status}>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="no-show">No Show</option>
                            </Select>
                        </Field>

                        <div className="sm:col-span-2">
                            <Field label="Complaint" htmlFor="complaint">
                                <Textarea id="complaint" rows={3} value={data.complaint} onChange={(e) => setData('complaint', e.target.value)} error={errors.complaint} />
                            </Field>
                        </div>

                        <div className="sm:col-span-2">
                            <Field label="Notes" htmlFor="notes">
                                <Textarea id="notes" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} error={errors.notes} />
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/appointments" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</Link>
                        <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}


