# SIMRS Patient Mobile API Documentation

## 🔐 **Authentication**
Semua API endpoints (kecuali login dan register) memerlukan Bearer Token yang dikirim melalui header `Authorization`.

```
Authorization: Bearer {your_api_token}
```

## 📱 **Base URL**
```
http://localhost:8000/api/patient
```

---

## 🚀 **Public Endpoints (No Authentication Required)**

### **1. Patient Login**
**POST** `/api/patient/login`

**Request Body:**
```json
{
    "email": "patient@example.com",
    "password": "password123"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "patient": {
            "id": 1,
            "name": "John Doe",
            "email": "patient@example.com",
            "phone": "+6281234567890",
            "birth_date": "1990-01-01",
            "gender": "male",
            "address": "Jl. Example No. 123",
            "blood_type": "O",
            "allergies": "None",
            "medical_history": "None"
        },
        "token": "abc123def456..."
    }
}
```

**Response Error (401):**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

---

### **2. Patient Registration**
**POST** `/api/patient/register`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "patient@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+6281234567890",
    "birth_date": "1990-01-01",
    "gender": "male",
    "address": "Jl. Example No. 123"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "patient": {
            "id": 1,
            "name": "John Doe",
            "email": "patient@example.com",
            "phone": "+6281234567890",
            "birth_date": "1990-01-01",
            "gender": "male",
            "address": "Jl. Example No. 123"
        },
        "token": "abc123def456..."
    }
}
```

---

## 🔒 **Protected Endpoints (Authentication Required)**

### **3. Patient Logout**
**POST** `/api/patient/logout`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Logout successful"
}
```

---

### **4. Get Patient Profile**
**GET** `/api/patient/profile`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "medical_record_number": "MRN202509031234",
        "name": "John Doe",
        "email": "patient@example.com",
        "phone": "+6281234567890",
        "birth_date": "1990-01-01",
        "gender": "male",
        "address": "Jl. Example No. 123",
        "emergency_contact_name": "Jane Doe",
        "emergency_contact_phone": "+6281234567891",
        "blood_type": "O",
        "allergies": "None",
        "medical_history": "None",
        "insurance_number": "INS001",
        "insurance_type": "BPJS",
        "is_active": true,
        "created_at": "2025-09-03T04:49:14.000000Z",
        "updated_at": "2025-09-03T04:49:14.000000Z"
    }
}
```

---

### **5. Update Patient Profile**
**PUT** `/api/patient/profile`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Request Body:**
```json
{
    "name": "John Doe Updated",
    "phone": "+6281234567899",
    "address": "Jl. Example No. 456",
    "emergency_contact_name": "Jane Doe Updated",
    "emergency_contact_phone": "+6281234567898",
    "allergies": "Peanuts",
    "medical_history": "Diabetes Type 2"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Profile updated successfully",
    "data": {
        // Updated patient data
    }
}
```

---

### **6. Change Password**
**PUT** `/api/patient/password`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Request Body:**
```json
{
    "current_password": "password123",
    "new_password": "newpassword123",
    "new_password_confirmation": "newpassword123"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

---

### **7. Get Dashboard Stats**
**GET** `/api/patient/dashboard`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "total_appointments": 15,
        "upcoming_appointments": 3,
        "total_medical_records": 12,
        "total_prescriptions": 8,
        "total_lab_results": 5,
        "recent_appointments": [
            {
                "id": 1,
                "date": "2025-09-03",
                "time": "09:00:00",
                "status": "scheduled",
                "doctor_name": "Dr. Smith"
            }
        ]
    }
}
```

---

### **8. Get Patient Appointments**
**GET** `/api/patient/appointments?page=1`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "appointment_date": "2025-09-03",
            "appointment_time": "09:00:00",
            "status": "scheduled",
            "complaint": "Headache and fever",
            "notes": "Patient has been experiencing symptoms for 2 days",
            "doctor": {
                "id": 1,
                "name": "Dr. Smith",
                "specialization": "General Medicine"
            },
            "created_at": "2025-09-02T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 2,
        "per_page": 10,
        "total": 15
    }
}
```

---

### **9. Get Patient Medical Records**
**GET** `/api/patient/medical-records?page=1`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "visit_date": "2025-09-01",
            "symptoms": "Headache, fever, body aches",
            "diagnosis": "Common cold",
            "treatment": "Rest, fluids, paracetamol",
            "notes": "Patient should return if symptoms worsen",
            "doctor": {
                "id": 1,
                "name": "Dr. Smith",
                "specialization": "General Medicine"
            },
            "created_at": "2025-09-01T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    }
}
```

---

### **10. Get Patient Prescriptions**
**GET** `/api/patient/prescriptions?page=1`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "prescription_date": "2025-09-01",
            "diagnosis": "Common cold",
            "notes": "Take medication as prescribed",
            "status": "active",
            "doctor": {
                "id": 1,
                "name": "Dr. Smith",
                "specialization": "General Medicine"
            },
            "medicines": [
                {
                    "id": 1,
                    "medicine_name": "Paracetamol",
                    "dosage": "500mg",
                    "frequency": "3 times daily",
                    "duration": "5 days",
                    "instructions": "Take after meals"
                }
            ],
            "created_at": "2025-09-01T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    }
}
```

---

### **11. Get Patient Lab Results**
**GET** `/api/patient/lab-results?page=1`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "test_date": "2025-09-01",
            "test_name": "Complete Blood Count",
            "result_value": "12.5",
            "normal_range": "11.0-15.0",
            "unit": "g/dL",
            "interpretation": "Normal",
            "notes": "All parameters within normal range",
            "status": "completed",
            "created_at": "2025-09-01T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    }
}
```

---

## 📊 **Response Format**

### **Success Response:**
```json
{
    "success": true,
    "message": "Operation successful",
    "data": { ... }
}
```

### **Error Response:**
```json
{
    "success": false,
    "message": "Error message",
    "errors": { ... } // For validation errors
}
```

---

## 🔍 **Query Parameters**

### **Pagination:**
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 10)

### **Filtering:**
- `status` - Filter by status (for appointments, prescriptions, lab results)
- `date_from` - Filter from date
- `date_to` - Filter to date

---

## 📱 **Mobile App Integration Example**

### **Login Flow:**
1. User enters email and password
2. App sends POST request to `/api/patient/login`
3. App stores the returned token securely
4. App includes token in all subsequent requests

### **API Call Example (JavaScript/React Native):**
```javascript
const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8000/api/patient/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store token securely
            await SecureStore.setItemAsync('api_token', data.data.token);
            // Navigate to dashboard
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};

const getProfile = async () => {
    try {
        const token = await SecureStore.getItemAsync('api_token');
        
        const response = await fetch('http://localhost:8000/api/patient/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Profile error:', error);
    }
};
```

---

## 🚨 **Error Codes**

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (Invalid/Missing token)
- **403** - Forbidden (Account deactivated)
- **404** - Not Found
- **422** - Validation Error
- **500** - Internal Server Error

---

## 🔧 **Testing API**

### **Using Postman:**
1. Set base URL: `http://localhost:8000/api/patient`
2. For protected endpoints, add header: `Authorization: Bearer {token}`
3. Test login first to get token

### **Using cURL:**
```bash
# Login
curl -X POST http://localhost:8000/api/patient/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"password123"}'

# Get profile (using token from login)
curl -X GET http://localhost:8000/api/patient/profile \
  -H "Authorization: Bearer {your_token}"
```

---

## 🆕 **New Mobile App Endpoints**

### **12. Get Notifications**
**GET** `/api/patient/notifications?page=1`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Appointment Reminder",
            "message": "Your appointment is tomorrow at 9:00 AM",
            "type": "appointment",
            "is_read": false,
            "created_at": "2025-09-03T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 20,
        "total": 1
    }
}
```

---

### **13. Mark Notification as Read**
**PUT** `/api/patient/notifications/{id}/read`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Notification marked as read"
}
```

---

### **14. Get Available Doctors**
**GET** `/api/patient/available-doctors?department_id=1&date=2025-09-10`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Dr. Smith",
            "specialization": "General Medicine",
            "department": {
                "id": 1,
                "name": "Internal Medicine"
            },
            "consultation_fee": 150000,
            "experience_years": 10,
            "is_available": true
        }
    ]
}
```

---

### **15. Get Doctor Schedules**
**GET** `/api/patient/doctors/{doctorId}/schedules?date=2025-09-10`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "doctor": {
            "id": 1,
            "name": "Dr. Smith",
            "specialization": "General Medicine",
            "department": {
                "id": 1,
                "name": "Internal Medicine"
            }
        },
        "schedule": {
            "day_of_week": "monday",
            "start_time": "09:00:00",
            "end_time": "17:00:00",
            "max_patients": 20
        },
        "date": "2025-09-10",
        "time_slots": [
            {
                "time": "09:00",
                "available": true,
                "formatted_time": "9:00 AM"
            },
            {
                "time": "09:30",
                "available": false,
                "formatted_time": "9:30 AM"
            }
        ]
    }
}
```

---

### **16. Book Appointment**
**POST** `/api/patient/appointments/book`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Request Body:**
```json
{
    "doctor_id": 1,
    "appointment_date": "2025-09-10",
    "appointment_time": "09:00",
    "complaint": "Headache and fever for 2 days",
    "notes": "Patient has been experiencing symptoms since Monday"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "Appointment booked successfully",
    "data": {
        "id": 1,
        "appointment_date": "2025-09-10",
        "appointment_time": "09:00:00",
        "status": "scheduled",
        "complaint": "Headache and fever for 2 days",
        "notes": "Patient has been experiencing symptoms since Monday"
    }
}
```

---

### **17. Cancel Appointment**
**PUT** `/api/patient/appointments/{id}/cancel`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Appointment cancelled successfully"
}
```

---

### **18. Get Departments**
**GET** `/api/patient/departments`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "Internal Medicine",
            "description": "General internal medicine services",
            "is_active": true
        }
    ]
}
```

---

### **19. Search Medical Records**
**GET** `/api/patient/medical-records/search?keyword=fever&date_from=2025-01-01&date_to=2025-12-31`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "visit_date": "2025-09-01",
            "symptoms": "Headache, fever, body aches",
            "diagnosis": "Common cold",
            "treatment": "Rest, fluids, paracetamol",
            "notes": "Patient should return if symptoms worsen",
            "doctor": {
                "id": 1,
                "name": "Dr. Smith",
                "specialization": "General Medicine"
            },
            "created_at": "2025-09-01T10:00:00.000000Z"
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    }
}
```

---

### **20. Get Statistics**
**GET** `/api/patient/statistics?period=month`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "total_appointments": 5,
        "completed_appointments": 3,
        "cancelled_appointments": 1,
        "scheduled_appointments": 1,
        "period": "month",
        "monthly_trend": [
            {
                "month": "Apr 2025",
                "count": 2
            },
            {
                "month": "May 2025",
                "count": 3
            }
        ]
    }
}
```

---

### **21. Update Location**
**PUT** `/api/patient/location`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Request Body:**
```json
{
    "latitude": -6.2088,
    "longitude": 106.8456,
    "address": "Jakarta, Indonesia"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Location updated successfully"
}
```

---

### **22. Get Emergency Contacts**
**GET** `/api/patient/emergency-contacts`

**Headers:**
```
Authorization: Bearer {your_api_token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "emergency_contact_name": "Jane Doe",
        "emergency_contact_phone": "+6281234567891",
        "blood_type": "O",
        "allergies": "Peanuts",
        "medical_history": "Diabetes Type 2",
        "current_location": {
            "latitude": -6.2088,
            "longitude": 106.8456,
            "address": "Jakarta, Indonesia",
            "updated_at": "2025-09-03T10:00:00.000000Z"
        }
    }
}
```
