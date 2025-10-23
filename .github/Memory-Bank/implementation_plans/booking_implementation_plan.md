## Booking Request Page Flow

This booking flow applies to both logged-in and anonymous users, allowing anyone to submit a booking request. The implementation is modular, with each step handled by a dedicated React component and all data validated before submission. The backend supports a many-to-many user-address relationship, and all API endpoints are live and integrated.

### 1. Event Times

- **Select Event Date:** User chooses the date of the event using a date picker input.
- **Select Start Time:** User selects the beginning time of the event using a time input.
- **Select End Time:** User selects the ending time. The app validates that the end time is after the start time, and displays an error if not.
- **Overnight Events:** If the event ends the following day, an overnight message is displayed for user awareness (e.g., “10:00 PM EST on Oct 23 → 2:00 AM EST on Oct 24”).
- **Time Zone:** All times are displayed and stored in EST for user convenience.

### 2. Services Requested

Users select the services being requested. The UI presents a list of service cards with descriptions and features. Available services include:

- **DJ Only**

  - Professional DJ performance for your event.

- **Single Live Band Only**

  - One live band for a unique musical experience.

- **DJ + Band Combo**

  - Combination of DJ and live band for maximum variety.

- **Only Technical**

  - No entertainment, only technical setup.

- **Multiple Bands Option** (add-on)

  - Several bands for diverse entertainment.

- **Multiple DJs Option** (add-on)

  - Multiple DJs for more variety.

- **Hora Loca** (add-on)

  - Fun, energetic show.

- **Dancers** (add-on)
  - Professional dancers for your event.

### 3. Event Details

- **Event Address:**
  - Logged-in users: Can select a saved address from a dropdown (using `BookingAddressSelect`) or enter a new address. If a new address is entered, the user is prompted: “Do you want to save this address?”
  - Anonymous users: Can enter a new address manually (no saving option). The address input is styled consistently with other form fields.
  - Address validation is applied in the app for correctness and completeness before proceeding.
- **Event Name:** Input field for the name of the event, always editable before submission.
- **Notes:** Optional input field for any additional information, always editable before submission.

### 4. Request Booking Confirmation

- The page has a REQUEST BOOKING button, visible only when all required fields are valid.
- Clicking triggers a confirmation prompt: “Are all fields filled in with your event requests?” with YES / NO options.
- Upon YES, a success message is displayed: “Booking Request has been received. A team member will contact you shortly.”
- If there is an error, a user-friendly error message is shown.

### 5. Post-Approval Infrastructure

Once a booking is approved by the admin team, the event appears on the user’s page with editable sections. The backend and frontend support editing of event name and notes, and allow users to request modifications to core services.

**Editable Sections:**

- Event Name
- Notes

**Request Modification Section:**

- Allows the user to request changes to core services that were already approved.

This flow ensures:

- Step-by-step guidance for all users, whether logged in or anonymous.
- Clear selection of services, times, and addresses with proper validation.
- Confirmation prompts to reduce incomplete or invalid requests.
- Infrastructure for post-approval editing and modification requests.

# Booking Implementation Plan

## Overview

This document details the current and planned implementation of the Booking Flow within the Miami DJ Platform application. It outlines the backend data model, API architecture, frontend modular design, and validation logic for the booking process.

## Completed Steps

- Modularized booking flow into reusable components.
- Migrated backend to many-to-many user-address structure.
- Updated API endpoints to utilize join table relationships.
- Implemented validation and integrated real API data.
- Refactored profile page and address management system.

## 1. Database Structure

**Users**: Stores user profile data. Columns: id, email, name, surname, phone, created_at

**Addresses**: Stores address information. Columns: id, label, address, zip_code, state, created_at

**Bookings**: Stores booking details. Columns: id, user_id, address_id, event_name, date, notes, status, created_at

- **event_name**: Editable by the user during the booking process. The user provides this value in the booking form, and it is displayed in the summary before submission. The `BookingEventDetails` component manages this field.
- **address_id**: Linked to the selected or entered address. For logged-in users, this can be a saved address; for anonymous users, a new address is created for the booking only.

**User_Addresses**: Defines a many-to-many relationship between users and addresses. Columns: user_id, address_id

## 2. API Endpoints

| Endpoint                    | Method | Description                                                              |
| --------------------------- | ------ | ------------------------------------------------------------------------ |
| /api/user/profile/list      | GET    | Retrieves all users for selection in the booking flow.                   |
| /api/user/profile           | GET    | Returns the logged-in user’s profile and associated addresses.           |
| /api/user/profile/update    | POST   | Updates a user profile and manages related addresses via the join table. |
| /api/user/profile/addresses | GET    | Retrieves all addresses linked to a specific user.                       |
| /api/bookings               | POST   | Creates a new booking with user, address, event, date, and notes data.   |

## 3. Frontend Booking Flow

### Modular Components

- **BookingUserSelect** – Dropdown for selecting a user (fetches from /api/user/profile/list). Used for admin or multi-user flows.
- **BookingAddressSelect** – Dropdown for selecting a linked address (fetches from /api/user/profile/addresses). For logged-in users only.
- **ClientInfoSection** – Collects client name, email, phone, and event address. The event address input is styled to match all other fields. For anonymous users, only manual entry is allowed.
- **BookingEventDetails** – Form inputs for event name (`event_name`) and date/time. Always editable before submission.
- **BookingNotes** – User-editable notes section. Provides a text area for users to add or edit additional information about their booking. Notes are saved as part of the booking and displayed in the summary step for review before final submission.
- **BookingSummary** – Displays booking details before submission, including all entered data.
- **BookingStatus** – Shows success or error status after submission.

### Validation & Data Handling

- Each step includes field-level validation before progression. Required fields are enforced and errors are shown inline.
- Fetch requests use live API data for accuracy, including user addresses and profile info.
- User feedback is displayed for both success and error states, with clear messaging and visual cues.

## 4. Profile Page

- Displays user profile information and associated addresses (via join table).
- Allows editing of profile and addresses, with an unsaved changes confirmation popup.
- AddressList is refactored to display and trigger edit mode inside EditProfileForm.

## 5. Outstanding Tasks

- Implement automated tests for booking and profile flows.
- Add comprehensive error handling and user-friendly UI feedback for all API calls.
- Support editing and deletion of addresses directly on the profile page.
- Add admin tools for managing users, addresses, and bookings.

## 6. Next Steps

- Admin Dashboard – Implement management tools for users, addresses, and bookings.
- Notification System – Add email or in-app notifications for new bookings or updates.
- Analytics Dashboard – Visualize booking trends and user engagement.
- Deployment – Prepare production environment, seed data, and CI/CD setup.
- Monitoring & Optimization – Add logging, error tracking, and performance improvements.

## 7. References

- **Booking Flow:** `/src/app/book/`
- **Profile & Address Management:** `/src/app/profile/`
- **API Endpoints:** `/src/app/api/`

## PROVIDED SERVICES

The following services are available and in use throughout the app:

- **DJ Services**

  - Description: Professional Miami DJs for any event, with custom playlists and top-tier equipment.
  - Features: Custom Playlists, MC Services, Lighting Effects
  - Page: `/services/dj-sets`

- **Live Bands**

  - Description: Talented live bands covering a variety of genres to energize your event.
  - Features: Multiple Genres, Flexible Set Lengths, Audience Interaction
  - Page: `/services/live-bands`

- **Lighting & Smoke Shows**

  - Description: Dynamic lighting and smoke effects to create a memorable atmosphere.
  - Features: LED Lighting, Smoke Machines, Custom Effects
  - Page: `/services` (main services page)

- **Audio Production**
  - Description: High-quality audio setup and production for events of any size.
  - Features: Premium Sound, On-site Technician, Wireless Mics, Conferences
  - Page: `/services/event-production`

These services are presented on the main services page and have dedicated subpages for more details and booking options.

FOR THE FRONT-END

## Current Frontend Implementation Plan

### 1. Modular Booking Flow

- The booking process is split into clear, reusable React components:
  - `BookingAddressSelect`: Address dropdown, fetches from `/api/user/profile/addresses`.
  - `BookingEventDetails`: Lets the user enter and edit the event name (`event_name`) and date.
  - `BookingNotes`: User-editable notes field, persists through the booking flow.
  - `BookingSummary`: Shows a summary of all booking details before submission.
  - `BookingStatus`: Displays submission status and errors.

### 2. Data Fetching & Validation

- All dropdowns and forms fetch live data from the backend via API endpoints.
- Each step validates required fields before allowing the user to proceed.
- The booking form only allows submission when all required fields are filled.

### 3. User Experience

- Progress is tracked step-by-step, with clear navigation (next/previous buttons) at the bottom of the form.
- All form fields, including event address, are styled consistently for a seamless user experience.
- User receives immediate feedback on errors or successful booking submissions.
- The notes and event name fields are always editable before final submission.

### 4. Profile Management

- The profile page displays user info and all associated addresses (via join table).
- Users can edit their profile and addresses, with an unsaved changes warning popup if they try to leave with unsaved changes.
- `AddressList` only displays addresses and triggers edit mode in `EditProfileForm`.

### 5. Code Structure

- All booking-related components are in `/src/app/book/components/`.
- Profile and address management components are in `/src/app/profile/components/`.
- API calls are centralized and use the latest endpoints. All data is fetched live and validated before use.

### 6. Completed Frontend Tasks

- Modularized booking flow and profile management.
- Integrated real data fetching and validation.
- Ensured all fields (event_name, notes, address) are user-editable and persisted.
- Refactored for maintainability and clarity.
- Styled all form fields for a consistent, modern UI.
