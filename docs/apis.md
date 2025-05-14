# Doctor Appointment Clinic System - API Documentation

## 🔐 Auth Module

### POST `/auth/register`

**Access**: Public

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "patient" | "doctor"
}
```

### POST `/auth/login`

**Access**: Public

```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "role": "string"
  }
}
```

---

## 👤 User Module

### GET `/users/me`

**Access**: Any (Authenticated)

### PATCH `/users/me`

**Access**: Any (Authenticated)

```json
{
  "name": "string",
  "phone": "string",
  "avatarUrl": "string"
}
```

---

## 🩺 Doctor Module

### POST `/doctors`

**Access**: Admin

```json
{
  "userId": "string",
  "specialty": "string",
  "experience": number,
  "qualifications": "string"
}
```

### GET `/doctors`

**Access**: Any
**Query**: `specialty`, `location`

### GET `/doctors/:id`

**Access**: Any

### PATCH `/doctors/:id`

**Access**: Doctor or Admin

```json
{
  "specialty": "string",
  "experience": number,
  "qualifications": "string"
}
```

---

## 👨‍⚕️ Patient Module

### GET `/patients/me`

**Access**: Patient

### PATCH `/patients/me`

**Access**: Patient

```json
{
  "age": number,
  "gender": "string",
  "contact": "string"
}
```

---

## 📆 Availability Module

### POST `/availability`

**Access**: Doctor

```json
{
  "dayOfWeek": number,
  "startTime": "HH:MM",
  "endTime": "HH:MM",
  "isRecurring": true
}
```

### GET `/availability/:doctorId`

**Access**: Any

### DELETE `/availability/:id`

**Access**: Doctor

---

## 📅 Appointment Module

### POST `/appointments`

**Access**: Patient

```json
{
  "doctorId": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "reason": "string"
}
```

### GET `/appointments/me`

**Access**: Patient or Doctor

### GET `/appointments/doctor`

**Access**: Doctor

### PATCH `/appointments/:id`

**Access**: Patient

```json
{
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "reason": "string"
}
```

### DELETE `/appointments/:id`

**Access**: Patient

---

## 🔔 Notification Module (Optional)

### POST `/notifications/send`

**Access**: Internal/System

```json
{
  "to": "string",
  "type": "email" | "sms" | "push",
  "message": "string"
}
```

---

## 🛠 Admin Module

### GET `/admin/users`

**Access**: Admin

### GET `/admin/appointments`

**Access**: Admin

### GET `/admin/stats`

**Access**: Admin

---

## 📋 Medical Records Module (Optional)

### POST `/records`

**Access**: Doctor

```json
{
  "patientId": "string",
  "notes": "string",
  "prescriptions": ["string"],
  "attachments": ["string"]
}
```

### GET `/records/:patientId`

**Access**: Patient or Assigned Doctor

### PATCH `/records/:id`

**Access**: Doctor

```json
{
  "notes": "string",
  "prescriptions": ["string"]
}
```

---

## 💳 Payment Module (Optional)

### POST `/payments/checkout`

**Access**: Patient

```json
{
  "appointmentId": "string",
  "method": "card" | "paypal"
}
```

### GET `/payments/history`

**Access**: Patient or Doctor
