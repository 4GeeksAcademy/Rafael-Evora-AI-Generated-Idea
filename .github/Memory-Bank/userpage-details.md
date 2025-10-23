User Profile Page Overview
Purpose

The User Profile page is the central hub for users to view and manage their personal information, addresses, and account settings within the Miami DJ Platform. It provides a seamless, user-friendly interface for updating profile details, managing saved addresses, viewing bookings, and securely deleting the account.

Key Features & Details

1. Profile Information

Display user's name, surname, and email.

Allow editing of name and surname (email is read-only).

Show unsaved changes warning if the user attempts to leave with unsaved edits.

2. Address Management

Display a list of saved addresses (label, address, zip code, state).

Each address is shown as text in view mode.

Edit addresses only via an Edit Profile mode (not inline).

Add new addresses with label, address, zip code, and state fields.

Address autocomplete for the address field (Google Places API).

Address type helper (label: Home, Work, Other, etc.).

Delete address option only available in view mode, not in edit mode.

Adding an address in edit mode immediately saves to the database and updates the UI.

3. Bookings

Display a list of the user's bookings (event date, time, address snapshot).

Show a message if no bookings are found.

4. Account Deletion

Prominently display a "Delete Account" button at the bottom right.

Two-step confirmation process:

First modal: "Are you sure? This action cannot be undone."

Second modal: User must type DELETE to confirm.

Delete from Supabase Auth and show a success/failure message.

5. UX/Styling

Responsive, modern UI using Tailwind CSS.

Dark and light mode support.

All modals and popups styled for clarity and accessibility.

6. Data Handling

Fetch and update user profile and addresses via Supabase API endpoints.

Use React state and hooks for local state management.

Use React Hook Form for form handling (if needed).

Handle loading and error states gracefully.

Implementation Plan (AI-Enhanced Component Directory)

Instruction for AI:

Create a components directory and generate all reusable components inside it. Components should be designed to be imported and used in the main ProfilePage or other pages. Use React + Tailwind CSS. Components should include props, state handling, and any necessary hooks for API calls.

1. Project Setup

Ensure all dependencies (Supabase, Tailwind, Google Places API) are installed and configured.

Set up environment variables for API keys if needed.

2. Component Structure

Create a components directory.

Generate these components inside components/:

ProfilePage → main page component.

AddressList → displays addresses in view mode.

EditProfileForm → form for editing profile and addresses.

DeleteAccountModal → modal for account deletion confirmation.

BookingList → displays user's bookings.

AddressInput → input with Google Places autocomplete and label helper.

Each component should:

Be reusable.

Accept props where necessary.

Use hooks for state management and API calls.

Include basic Tailwind styling and dark/light mode support.

3. Profile Data

Fetch user profile and addresses on mount.

Display profile info and addresses in view mode.

Implement "Edit Profile" button to toggle edit mode.

Track unsaved changes and show warning on navigation/close.

4. Address Management

In edit mode, allow adding, editing, and removing addresses.

Implement address autocomplete using Google Places API.

Save new/edited addresses to the database immediately.

Only show delete address button in view mode.

5. Bookings

Fetch and display user's bookings.

Show loading and empty states as appropriate.

6. Account Deletion

Add "Delete Account" button fixed to bottom right.

Implement two-step modal confirmation process.

Integrate with Supabase Auth for account deletion.

Show success/failure message and handle redirect/cleanup.

7. Styling & UX

Apply Tailwind CSS for all components.

Ensure dark/light mode compatibility.

Test responsiveness and accessibility.

8. Testing & Validation

Test all flows: profile update, address add/edit/delete, bookings, account deletion.

Validate error handling and edge cases.

9. Documentation

Document all components and logic in code comments.

Update this file with any changes to requirements or implementation.
