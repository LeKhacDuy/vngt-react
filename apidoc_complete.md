# API Documentation - Hệ thống Quản lý Tour (Complete)

## Tổng quan
Hệ thống API được xây dựng bằng Flask với JWT authentication. Tất cả API endpoints đều có prefix `/api`.

## Authentication

### POST /api/auth/login
Đăng nhập vào hệ thống
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "access_token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string",
      "is_admin": boolean
    }
  }
  ```

### POST /api/auth/register
Đăng ký tài khoản mới
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "integer",
      "username": "string",
      "email": "string",
      "role": "string",
      "is_admin": boolean
    }
  }
  ```

### GET /api/auth/verify-token
Xác thực token (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "valid": true,
    "user": {
      "id": "string",
      "username": "string",
      "role": "string"
    }
  }
  ```

### GET /api/auth/test-token
Test token (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Token is valid",
    "user_id": "string",
    "claims": {}
  }
  ```

### POST /api/auth/make-admin
Chuyển user thành admin
- **Request Body:**
  ```json
  {
    "username": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User has been made admin successfully",
    "user": {
      "id": "integer",
      "username": "string",
      "email": "string",
      "role": "string",
      "is_admin": boolean
    }
  }
  ```

## User Management

### GET /api/user/profile
Lấy thông tin profile user (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string"
  }
  ```

## Tour Management

### GET /api/tours
Lấy danh sách tour
- **Query Parameters:**
  - `category_code` (optional): Mã danh mục tour
  - `destination_code` (optional): Mã điểm đến
  - `subcategory_code` (optional): Mã danh mục phụ
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "tour_code": "string",
        "name": "string",
        "duration": "integer",
        "transport": "string",
        "hotel_rating": "string",
        "web_price": "decimal",
        "highlights": "string",
        "thumbnail": "string",
        "cancellation_policy": "string",
        "special_notes": "string",
        "category_id": "integer",
        "destination_id": "integer",
        "subcategory_id": "integer"
      }
    ]
  }
  ```

### POST /api/tours
Tạo tour mới (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `tour_code`: Mã tour
  - `name`: Tên tour
  - `duration`: Số ngày
  - `category_id`: ID danh mục
  - `destination_id`: ID điểm đến
  - `thumbnail`: File ảnh thumbnail
  - `gallery_images[]`: Mảng file ảnh gallery
  - Các trường khác: `transport`, `hotel_rating`, `web_price`, `highlights`, `cancellation_policy`, `special_notes`, `subcategory_id`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tour created successfully",
    "data": {
      "id": "integer",
      "tour_code": "string",
      "name": "string",
      "duration": "integer",
      "transport": "string",
      "hotel_rating": "string",
      "web_price": "decimal",
      "highlights": "string",
      "thumbnail": "string",
      "gallery_images": "array",
      "cancellation_policy": "string",
      "special_notes": "string",
      "category_id": "integer",
      "destination_id": "integer",
      "subcategory_id": "integer"
    }
  }
  ```

### GET /api/tours/{tour_id}
Lấy chi tiết tour
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "integer",
      "tour_code": "string",
      "name": "string",
      "duration": "integer",
      "transport": "string",
      "hotel_rating": "string",
      "web_price": "decimal",
      "highlights": "string",
      "thumbnail": "string",
      "gallery_images": "array",
      "cancellation_policy": "string",
      "special_notes": "string",
      "category": {},
      "destination": {},
      "subcategories": [],
      "itineraries": [],
      "departures": []
    }
  }
  ```

### PUT /api/tours/{tour_id}
Cập nhật tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "tour_code": "string",
    "name": "string",
    "duration": "integer",
    "transport": "string",
    "hotel_rating": "string",
    "web_price": "decimal",
    "highlights": "string",
    "thumbnail": "string",
    "cancellation_policy": "string",
    "special_notes": "string",
    "category_id": "integer",
    "destination_id": "integer",
    "subcategory_id": "integer",
    "subcategory_ids": "array"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tour updated successfully",
    "data": {
      "id": "integer",
      "tour_code": "string",
      "name": "string",
      "duration": "integer",
      "transport": "string",
      "hotel_rating": "string",
      "web_price": "decimal",
      "highlights": "string",
      "thumbnail": "string",
      "cancellation_policy": "string",
      "special_notes": "string",
      "category_id": "integer",
      "destination_id": "integer",
      "subcategory_id": "integer"
    }
  }
  ```

### PUT /api/tours/{tour_id}/full-update
Cập nhật toàn bộ thông tin tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "basic_info": {
      "tour_code": "string",
      "name": "string",
      "duration": "integer",
      "transport": "string",
      "hotel_rating": "string",
      "web_price": "decimal",
      "highlights": "string",
      "thumbnail": "string",
      "cancellation_policy": "string",
      "special_notes": "string",
      "category_id": "integer",
      "destination_id": "integer",
      "subcategory_id": "integer"
    }
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Updated successfully"
  }
  ```

### GET /api/tours/check-code/{tour_code}
Kiểm tra mã tour đã tồn tại
- **Response:**
  ```json
  {
    "status": "success",
    "exists": boolean
  }
  ```

## Tour Categories & Destinations

### GET /api/categories
Lấy danh sách loại tour
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "name": "string",
        "code": "string",
        "description": "string"
      }
    ]
  }
  ```

### GET /api/destinations
Lấy danh sách điểm đến
- **Query Parameters:**
  - `category_id` (optional): ID danh mục
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "name": "string",
        "code": "string",
        "region": "string",
        "country": "string",
        "category_id": "integer"
      }
    ]
  }
  ```

**Lưu ý:** Một tour có thể có nhiều destinations thông qua bảng liên kết `tour_destination_link`. Khi tạo hoặc cập nhật tour, có thể gửi `destination_ids` (array) để liên kết nhiều điểm đến.

## Tour Subcategories

### GET /api/subcategories
Lấy danh sách danh mục phụ
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "name": "string",
        "code": "string",
        "description": "string",
        "color": "string",
        "icon": "string",
        "is_active": boolean,
        "display_order": "integer"
      }
    ]
  }
  ```

### POST /api/subcategories
Tạo danh mục phụ mới (yêu cầu JWT + Operator role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "code": "string",
    "description": "string",
    "color": "string",
    "icon": "string",
    "is_active": boolean,
    "display_order": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tạo danh mục phụ thành công",
    "data": {
      "id": "integer",
      "name": "string",
      "code": "string",
      "description": "string",
      "color": "string",
      "icon": "string",
      "is_active": boolean,
      "display_order": "integer"
    }
  }
  ```

### PUT /api/subcategories/{subcategory_id}
Cập nhật danh mục phụ (yêu cầu JWT + Operator role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "code": "string",
    "description": "string",
    "color": "string",
    "icon": "string",
    "is_active": boolean,
    "display_order": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Cập nhật danh mục phụ thành công",
    "data": {
      "id": "integer",
      "name": "string",
      "code": "string",
      "description": "string",
      "color": "string",
      "icon": "string",
      "is_active": boolean,
      "display_order": "integer"
    }
  }
  ```

### DELETE /api/subcategories/{subcategory_id}
Xóa danh mục phụ (yêu cầu JWT + Operator role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã ẩn danh mục phụ thành công"
  }
  ```

## Tour Itineraries

### POST /api/tours/{tour_id}/itineraries
Tạo lịch trình tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `day_number`: Số ngày
  - `title`: Tiêu đề
  - `morning_title`: Tiêu đề buổi sáng
  - `morning_description`: Mô tả buổi sáng
  - `noon_title`: Tiêu đề buổi trưa
  - `noon_description`: Mô tả buổi trưa
  - `evening_title`: Tiêu đề buổi tối
  - `evening_description`: Mô tả buổi tối
  - `itinerary_image`: File ảnh
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tạo lịch trình thành công",
    "data": {
      "id": "integer",
      "tour_id": "integer",
      "day_number": "integer",
      "title": "string",
      "morning_title": "string",
      "morning_description": "string",
      "noon_title": "string",
      "noon_description": "string",
      "evening_title": "string",
      "evening_description": "string",
      "images": "string",
      "created_at": "string"
    }
  }
  ```

### PUT /api/tours/{tour_id}/itineraries/{itinerary_id}
Cập nhật lịch trình tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `day_number`: Số ngày
  - `title`: Tiêu đề
  - `morning_title`: Tiêu đề buổi sáng
  - `morning_description`: Mô tả buổi sáng
  - `noon_title`: Tiêu đề buổi trưa
  - `noon_description`: Mô tả buổi trưa
  - `evening_title`: Tiêu đề buổi tối
  - `evening_description`: Mô tả buổi tối
  - `itinerary_image`: File ảnh (optional)
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Cập nhật lịch trình thành công",
    "data": {
      "id": "integer",
      "tour_id": "integer",
      "day_number": "integer",
      "title": "string",
      "morning_title": "string",
      "morning_description": "string",
      "noon_title": "string",
      "noon_description": "string",
      "evening_title": "string",
      "evening_description": "string",
      "images": "string",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/tours/{tour_id}/itineraries/{itinerary_id}
Xóa lịch trình tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Xóa lịch trình thành công"
  }
  ```

## Tour Departures

### POST /api/tours/{tour_id}/departures
Tạo lịch khởi hành (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "departure_date": "YYYY-MM-DD",
    "total_seats": "integer",
    "available_seats": "integer",
    "adult_price": "decimal",
    "child_price": "decimal",
    "infant_price": "decimal",
    "flight_code": "string (optional)",
    "status": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tạo mới lịch khởi hành thành công",
    "data": {
      "id": "integer",
      "departure_code": "string",
      "tour_id": "integer",
      "departure_date": "string",
      "total_seats": "integer",
      "available_seats": "integer",
      "adult_price": "decimal",
      "child_price": "decimal",
      "infant_price": "decimal",
      "flight_code": "string",
      "status": "string",
      "created_at": "string"
    }
  }
  ```

### PUT /api/tours/{tour_id}/departures/{departure_id}
Cập nhật lịch khởi hành (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "departure_date": "YYYY-MM-DD",
    "total_seats": "integer",
    "available_seats": "integer",
    "adult_price": "decimal",
    "child_price": "decimal",
    "infant_price": "decimal",
    "flight_code": "string (optional)",
    "status": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Cập nhật lịch khởi hành thành công",
    "data": {
      "id": "integer",
      "departure_code": "string",
      "tour_id": "integer",
      "departure_date": "string",
      "total_seats": "integer",
      "available_seats": "integer",
      "adult_price": "decimal",
      "child_price": "decimal",
      "infant_price": "decimal",
      "flight_code": "string",
      "status": "string",
      "updated_at": "string"
    }
  }
  ```

### GET /api/tours/departures
Lấy danh sách tất cả departures (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status` (optional): Trạng thái
  - `from_date` (optional): Từ ngày
  - `to_date` (optional): Đến ngày
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "departure_code": "string",
        "tour_id": "integer",
        "tour_name": "string",
        "departure_date": "string",
        "adult_price": "decimal",
        "child_price": "decimal",
        "infant_price": "decimal",
        "total_seats": "integer",
        "available_seats": "integer",
        "reserved_seats": "integer",
        "status": "string",
        "is_full": "boolean",
        "created_at": "string"
      }
    ]
  }
  ```

### PUT /api/tours/departures/{departure_id}/close
Đóng đoàn tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "reason": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tour departure closed successfully",
    "data": {
      "id": "integer",
      "departure_code": "string",
      "status": "closed",
      "close_reason": "string",
      "closed_at": "string"
    }
  }
  ```

### GET /api/tours/departures/{departure_id}/bookings
Lấy danh sách booking của departure (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status` (optional): Trạng thái booking
  - `from_date` (optional): Từ ngày
  - `to_date` (optional): Đến ngày
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "booking_code": "string",
        "adult_count": "integer",
        "child_count": "integer",
        "infant_count": "integer",
        "status": "string",
        "created_at": "string",
        "customer_name": "string",
        "customer_phone": "string",
        "customer_email": "string"
      }
    ]
  }
  ```

### PUT /api/departures/{departure_id}/notes
Cập nhật ghi chú departure (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "notes": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã lưu ghi chú thành công",
    "data": {
      "id": "integer",
      "departure_code": "string",
      "admin_notes": "string",
      "departure_date": "string",
      "status": "string"
    }
  }
  ```

### POST /api/departures/{departure_id}/files
Upload file đính kèm departure (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `file`: File đính kèm
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Upload file thành công",
    "data": {
      "id": "integer",
      "name": "string",
      "filename": "string",
      "url": "string",
      "size": "integer",
      "uploaded_at": "string"
    }
  }
  ```

### DELETE /api/departures/{departure_id}/files/{file_id}
Xóa file đính kèm departure (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã xóa file thành công"
  }
  ```

## Booking Management

### POST /api/tours/departures/{departure_id}/hold
Giữ chỗ tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "adult_count": "integer",
    "child_count": "integer",
    "infant_count": "integer",
    "hold_duration": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Seats held successfully",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "departure_id": "integer",
      "adult_count": "integer",
      "child_count": "integer",
      "infant_count": "integer",
      "status": "reserved",
      "hold_until": "string",
      "created_at": "string"
    }
  }
  ```

### GET /api/tours/bookings
Lấy danh sách booking
- **Query Parameters:**
  - `status` (optional): Trạng thái booking
  - `from_date` (optional): Từ ngày
  - `to_date` (optional): Đến ngày
  - `booking_code` (optional): Mã booking
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "booking_code": "string",
        "departure_id": "integer",
        "tour_name": "string",
        "departure_date": "string",
        "adult_count": "integer",
        "child_count": "integer",
        "infant_count": "integer",
        "status": "string",
        "created_at": "string",
        "customer_name": "string",
        "customer_phone": "string",
        "customer_email": "string"
      }
    ]
  }
  ```

### PUT /api/tours/bookings/{booking_id}/confirm
Xác nhận booking (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Booking confirmed successfully",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "status": "confirmed",
      "confirmed_at": "string"
    }
  }
  ```

### PUT /api/tours/bookings/{booking_id}/cancel
Hủy booking (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "reason": "string"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Booking cancelled successfully",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "status": "cancelled",
      "cancelled_at": "string",
      "cancel_reason": "string"
    }
  }
  ```

### GET /api/booking/tours/{tour_id}/departures
Lấy departures của tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "tour_code": "string",
        "tour_name": "string",
        "duration": "integer",
        "transport": "string",
        "hotel_rating": "string",
        "highlights": "string",
        "thumbnail": "string",
        "destination": "string",
        "category": "string",
        "id": "integer",
        "departure_code": "string",
        "departure_date": "string",
        "adult_price": "decimal",
        "child_price": "decimal",
        "infant_price": "decimal",
        "total_seats": "integer",
        "available_seats": "integer",
        "reserved_seats": "integer",
        "status": "string",
        "is_full": "boolean",
        "bookings_count": "integer",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/booking/tours/departures/{departure_id}/hold
Giữ chỗ tour (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "adult_count": "integer",
    "child_count": "integer",
    "infant_count": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Seats held successfully",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "departure_id": "integer",
      "adult_count": "integer",
      "child_count": "integer",
      "infant_count": "integer",
      "status": "reserved",
      "created_at": "string"
    }
  }
  ```

### PUT /api/booking/{booking_id}/confirm
Xác nhận booking (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã xác nhận booking thành công",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "status": "confirmed",
      "confirmed_at": "string"
    }
  }
  ```

### PUT /api/booking/{booking_id}/cancel
Hủy booking (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã hủy booking thành công",
    "data": {
      "id": "integer",
      "booking_code": "string",
      "status": "cancelled",
      "cancelled_at": "string"
    }
  }
  ```

### POST /api/booking/check-expired
Kiểm tra booking hết hạn (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Processed X expired bookings",
    "data": {
      "processed_count": "integer"
    }
  }
  ```

## Content Management

### POST /api/content/uploads
Upload ảnh bài viết (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `file`: File ảnh
- **Response:**
  ```json
  {
    "success": true,
    "url": "/upload/article/{filename}"
  }
  ```

### GET /api/content/upload/article/{filename}
Lấy ảnh bài viết
- **Response:** Trả về file ảnh trực tiếp

## Region Management

### GET /api/content/regions
Lấy danh sách khu vực
- **Response:**
  ```json
  {
    "success": true,
    "regions": [
      {
        "id": "integer",
        "name": "string",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/content/regions
Tạo khu vực mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Tạo khu vực thành công",
    "region": {
      "id": "integer",
      "name": "string",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/regions/{region_id}
Cập nhật khu vực (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cập nhật khu vực thành công",
    "region": {
      "id": "integer",
      "name": "string",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/regions/{region_id}
Xóa khu vực (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa khu vực thành công"
  }
  ```

## Country Management

### GET /api/content/countries
Lấy danh sách quốc gia
- **Query Parameters:**
  - `region_id` (optional): ID khu vực
- **Response:**
  ```json
  {
    "success": true,
    "countries": [
      {
        "id": "integer",
        "name": "string",
        "region_id": "integer",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/content/countries
Tạo quốc gia mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "region_id": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Tạo quốc gia thành công",
    "country": {
      "id": "integer",
      "name": "string",
      "region_id": "integer",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/countries/{country_id}
Cập nhật quốc gia (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "region_id": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cập nhật quốc gia thành công",
    "country": {
      "id": "integer",
      "name": "string",
      "region_id": "integer",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/countries/{country_id}
Xóa quốc gia (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa quốc gia thành công"
  }
  ```

## Category Management

### GET /api/content/categories
Lấy danh sách danh mục
- **Response:**
  ```json
  {
    "success": true,
    "categories": [
      {
        "id": "integer",
        "name": "string",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/content/categories
Tạo danh mục mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Tạo danh mục thành công",
    "category": {
      "id": "integer",
      "name": "string",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/categories/{category_id}
Cập nhật danh mục (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cập nhật danh mục thành công",
    "category": {
      "id": "integer",
      "name": "string",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/categories/{category_id}
Xóa danh mục (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa danh mục thành công"
  }
  ```

## Article Management

### GET /api/content/articles
Lấy danh sách bài viết
- **Query Parameters:**
  - `category_id` (optional): ID danh mục
  - `country_id` (optional): ID quốc gia
- **Response:**
  ```json
  {
    "success": true,
    "articles": [
      {
        "id": "integer",
        "title": "string",
        "content": "string",
        "category_id": "integer",
        "country_id": "integer",
        "image_prompt": "string",
        "intro_image": "string",
        "created_at": "string"
      }
    ]
  }
  ```

### GET /api/content/articles/{article_id}
Lấy chi tiết bài viết
- **Query Parameters:**
  - `include_sections` (optional): Bao gồm sections
- **Response:**
  ```json
  {
    "success": true,
    "article": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "category_id": "integer",
      "country_id": "integer",
      "image_prompt": "string",
      "intro_image": "string",
      "created_at": "string",
      "sections": [
        {
          "id": "integer",
          "title": "string",
          "content": "string",
          "image": "string",
          "image_prompt": "string",
          "order": "integer",
          "subsections": [
            {
              "id": "integer",
              "title": "string",
              "content": "string",
              "image": "string",
              "order": "integer"
            }
          ]
        }
      ]
    }
  }
  ```

### POST /api/content/articles
Tạo bài viết mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `title`: Tiêu đề bài viết
  - `content`: Nội dung bài viết
  - `category_id`: ID danh mục
  - `country_id`: ID quốc gia
  - `image_prompt`: Gợi ý tạo ảnh
  - `intro_image`: File ảnh giới thiệu
- **Response:**
  ```json
  {
    "success": true,
    "article": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "category_id": "integer",
      "country_id": "integer",
      "image_prompt": "string",
      "intro_image": "string",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/articles/{article_id}
Cập nhật bài viết (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `title`: Tiêu đề bài viết
  - `content`: Nội dung bài viết
  - `category_id`: ID danh mục
  - `country_id`: ID quốc gia
  - `image_prompt`: Gợi ý tạo ảnh
  - `intro_image`: File ảnh giới thiệu (optional)
- **Response:**
  ```json
  {
    "success": true,
    "article": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "category_id": "integer",
      "country_id": "integer",
      "image_prompt": "string",
      "intro_image": "string",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/articles/{article_id}
Xóa bài viết (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa bài viết thành công"
  }
  ```

## Section Management

### GET /api/content/articles/{article_id}/sections
Lấy danh sách sections của bài viết
- **Query Parameters:**
  - `include_subsections` (optional): Bao gồm subsections
- **Response:**
  ```json
  {
    "success": true,
    "sections": [
      {
        "id": "integer",
        "title": "string",
        "content": "string",
        "image": "string",
        "image_prompt": "string",
        "order": "integer",
        "subsections": [
          {
            "id": "integer",
            "title": "string",
            "content": "string",
            "image": "string",
            "order": "integer"
          }
        ]
      }
    ]
  }
  ```

### POST /api/content/articles/{article_id}/sections
Tạo section mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "string",
    "image_prompt": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Tạo phần thành công",
    "section": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "image": "string",
      "image_prompt": "string",
      "order": "integer",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/sections/{section_id}
Cập nhật section (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "string",
    "image_prompt": "string",
    "order": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cập nhật phần thành công",
    "section": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "image": "string",
      "image_prompt": "string",
      "order": "integer",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/sections/{section_id}
Xóa section (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa phần thành công"
  }
  ```

## Subsection Management

### GET /api/content/sections/{section_id}/subsections
Lấy danh sách subsections của section
- **Response:**
  ```json
  {
    "success": true,
    "subsections": [
      {
        "id": "integer",
        "title": "string",
        "content": "string",
        "image": "string",
        "order": "integer",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/content/sections/{section_id}/subsections
Tạo subsection mới (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Tạo phần con thành công",
    "subsection": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "image": "string",
      "order": "integer",
      "created_at": "string"
    }
  }
  ```

### PUT /api/content/subsections/{subsection_id}
Cập nhật subsection (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "string",
    "order": "integer"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Cập nhật phần con thành công",
    "subsection": {
      "id": "integer",
      "title": "string",
      "content": "string",
      "image": "string",
      "order": "integer",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/content/subsections/{subsection_id}
Xóa subsection (yêu cầu JWT + Admin role)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Xóa phần con thành công"
  }
  ```

## Visa Service Management

### GET /api/visa-services
Lấy danh sách dịch vụ visa (public)
- **Query Parameters:**
  - `country_code` (optional): Mã quốc gia
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "country": "string",
        "country_code": "string",
        "visa_type": "string",
        "title": "string",
        "description": "string",
        "content": "string",
        "requirements": "string",
        "processing_time": "string",
        "price": "decimal",
        "price_note": "string",
        "thumbnail": "string",
        "gallery_images": "array",
        "is_active": boolean,
        "display_order": "integer",
        "created_at": "string"
      }
    ]
  }
  ```

### GET /api/visa-services/{service_id}
Lấy chi tiết dịch vụ visa
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "id": "integer",
      "country": "string",
      "country_code": "string",
      "visa_type": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "requirements": "string",
      "processing_time": "string",
      "price": "decimal",
      "price_note": "string",
      "thumbnail": "string",
      "gallery_images": "array",
      "is_active": boolean,
      "display_order": "integer",
      "created_at": "string",
      "updated_at": "string"
    }
  }
  ```

### GET /api/visa-services/countries
Lấy danh sách quốc gia có dịch vụ visa
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "country": "string",
        "country_code": "string"
      }
    ]
  }
  ```

### GET /api/visa-services/all
Lấy tất cả dịch vụ visa bao gồm inactive (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `country_code` (optional): Mã quốc gia
- **Response:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "integer",
        "country": "string",
        "country_code": "string",
        "visa_type": "string",
        "title": "string",
        "description": "string",
        "content": "string",
        "requirements": "string",
        "processing_time": "string",
        "price": "decimal",
        "price_note": "string",
        "thumbnail": "string",
        "gallery_images": "array",
        "is_active": boolean,
        "display_order": "integer",
        "created_at": "string"
      }
    ]
  }
  ```

### POST /api/visa-services
Tạo dịch vụ visa mới (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `country`: Tên quốc gia
  - `country_code`: Mã quốc gia
  - `visa_type`: Loại visa
  - `title`: Tiêu đề dịch vụ
  - `description`: Mô tả ngắn
  - `content`: Nội dung chi tiết
  - `requirements`: Yêu cầu hồ sơ
  - `processing_time`: Thời gian xử lý
  - `price`: Giá dịch vụ
  - `price_note`: Ghi chú về giá
  - `thumbnail`: File ảnh thumbnail
  - `gallery_images[]`: Mảng file ảnh gallery
  - `is_active`: Trạng thái hiển thị (true/false)
  - `display_order`: Thứ tự hiển thị
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Tạo dịch vụ visa thành công",
    "data": {
      "id": "integer",
      "country": "string",
      "country_code": "string",
      "visa_type": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "requirements": "string",
      "processing_time": "string",
      "price": "decimal",
      "price_note": "string",
      "thumbnail": "string",
      "gallery_images": "array",
      "is_active": boolean,
      "display_order": "integer",
      "created_at": "string"
    }
  }
  ```

### PUT /api/visa-services/{service_id}
Cập nhật dịch vụ visa (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `country`: Tên quốc gia
  - `country_code`: Mã quốc gia
  - `visa_type`: Loại visa
  - `title`: Tiêu đề dịch vụ
  - `description`: Mô tả ngắn
  - `content`: Nội dung chi tiết
  - `requirements`: Yêu cầu hồ sơ
  - `processing_time`: Thời gian xử lý
  - `price`: Giá dịch vụ
  - `price_note`: Ghi chú về giá
  - `thumbnail`: File ảnh thumbnail (optional)
  - `gallery_images[]`: Mảng file ảnh gallery (optional)
  - `is_active`: Trạng thái hiển thị (true/false)
  - `display_order`: Thứ tự hiển thị
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Cập nhật dịch vụ visa thành công",
    "data": {
      "id": "integer",
      "country": "string",
      "country_code": "string",
      "visa_type": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "requirements": "string",
      "processing_time": "string",
      "price": "decimal",
      "price_note": "string",
      "thumbnail": "string",
      "gallery_images": "array",
      "is_active": boolean,
      "display_order": "integer",
      "updated_at": "string"
    }
  }
  ```

### DELETE /api/visa-services/{service_id}
Xóa dịch vụ visa (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Đã xóa dịch vụ visa"
  }
  ```

### PUT /api/visa-services/{service_id}/toggle
Bật/tắt hiển thị dịch vụ visa (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Dịch vụ đã hiển thị" hoặc "Dịch vụ đã ẩn",
    "data": {
      "id": "integer",
      "is_active": boolean,
      "updated_at": "string"
    }
  }
  ```

### POST /api/visa-services/upload-image
Upload ảnh cho visa content editor (yêu cầu JWT)
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `image`: File ảnh
- **Response:**
  ```json
  {
    "status": "success",
    "url": "/upload/visa/{filename}"
  }
  ```

## File Serving

### GET /api/upload/tour/{filename}
Lấy ảnh tour
- **Response:** Trả về file ảnh trực tiếp

### GET /api/upload/tour/departures/{filename}
Lấy file đính kèm departure
- **Response:** Trả về file trực tiếp

### GET /api/upload/article/{filename}
Lấy ảnh bài viết
- **Response:** Trả về file ảnh trực tiếp

### GET /api/upload/visa/{filename}
Lấy ảnh visa service
- **Response:** Trả về file ảnh trực tiếp

## Error Responses

Tất cả API đều trả về response theo format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Authentication Headers

Các API yêu cầu authentication cần header:
```
Authorization: Bearer <access_token>
```

## Role-based Access

- **Admin**: Có quyền truy cập tất cả API
- **Operator**: Có quyền quản lý tour, booking
- **User**: Chỉ có quyền xem và booking
- **Customer (kh)**: Chỉ có quyền xem
- **Collaborator (ctv)**: Chỉ có quyền xem

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

## Tổng kết

File API documentation này bao gồm đầy đủ **76 API endpoints** trong dự án:

- **Authentication**: 5 endpoints
- **User Management**: 1 endpoint
- **Tour Management**: 20 endpoints
- **Booking Management**: 8 endpoints
- **Content Management**: 32 endpoints
- **Visa Service Management**: 10 endpoints

Tất cả endpoints đều có thông tin chi tiết về request/response format, authentication requirements, và role-based access control.

### Cập nhật gần đây:
- Thêm field `flight_code` cho Tour Departures APIs
- Hỗ trợ multiple destinations cho Tours thông qua `destination_ids`
- Thêm đầy đủ 10 endpoints cho Visa Service Management
