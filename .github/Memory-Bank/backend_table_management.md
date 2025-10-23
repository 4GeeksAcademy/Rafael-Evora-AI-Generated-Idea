# Supabase Backend Table Management

## Table Relationships Overview

This document describes the structure and relationships of the main tables in the Supabase backend for the Miami DJ Platform.

---

## Tables

### 1. `users`

- **Primary Key:** `id` (uuid)
- **Columns:**
  - `id` (uuid, PK, default: gen_random_uuid())
  - `email` (varchar, unique)
  - `name` (varchar, nullable)
  - `surname` (varchar, nullable)
  - `phone` (varchar, nullable)
  - `created_at` (timestamp, default: now())
- **Relationships:**
  - Many-to-many with `addresses` (via join table `user_addresses`)
  - One-to-many with `bookings` (via `bookings.user_id` foreign key)

### 2. `addresses`

- **Primary Key:** `id` (uuid)
- **Columns:**
  - `id` (uuid, PK, default: gen_random_uuid())
  - `label` (varchar, nullable)
  - `address` (text, nullable)
  - `zip_code` (varchar, nullable)
  - `state` (varchar, nullable)
  - `created_at` (timestamp, default: now())
- **Relationships:**
  - Many-to-many with `users` (via join table `user_addresses`)
  - One-to-many with `bookings` (via `bookings.address_id` foreign key)

### 3. `bookings`

- **Primary Key:** `id` (integer, auto-increment)
- **Columns:**
  - `id` (int, PK, auto-increment)
  - `user_id` (uuid, FK to `users.id`)
  - `address_id` (uuid, FK to `addresses.id`)
  - `name` (varchar)
  - `event` (varchar)
  - `date` (date)
  - `status` (varchar, nullable, default: 'Pending')
  - `email` (varchar, nullable)
  - `notes` (text, nullable)
  - `created_at` (timestamp, default: now())
- **Relationships:**
  - Many-to-one with `users` (each booking belongs to a user)
  - Many-to-one with `addresses` (each booking is for an address)

### 4. `user_addresses` (Join Table)

- **Columns:**
  - `user_id` (uuid, FK to `users.id`)
  - `address_id` (uuid, FK to `addresses.id`)
- **Relationships:**
  - Many-to-many between `users` and `addresses`

---

## Entity Relationship Diagram (Textual)

```
users (M) ────< user_addresses >──── (M) addresses
   |                                 |
   |                                 |
   |                                 |
   +----< (1) bookings (N) >---------+
     |           |
     |           +-- address_id (FK → addresses.id)
     +-- user_id (FK → users.id)
```

---

## Notes

- The `users` table is the central entity for user data.
- The `addresses` table can be linked to multiple users (many-to-many).
- The `user_addresses` join table manages the many-to-many relationship between users and addresses.
- The `bookings` table now has a foreign key to both `users` and `addresses`, supporting one-to-many relationships from users and addresses to bookings.
- The `notes` attribute in `bookings` allows users to provide additional details for each booking.
- All tables have a `created_at` timestamp for record creation tracking.

---

_Last updated: October 23, 2025_
