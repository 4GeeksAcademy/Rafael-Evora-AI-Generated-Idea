# Todo List

- [ ] Create user profile page for bookings
  - Design and implement a user profile page (/profile) that displays all bookings for logged-in users.
- [ ] Implement guest booking lookup with email confirmation
  - Allow guests to view their bookings by confirming their email address.
- [ ] Retroactively link pre-signup bookings to new user accounts
  - Ensure bookings made before signup are linked to the user profile after registration.
- [ ] Update Supabase schema for users, addresses, bookings
  - Add phone number to users, create addresses table, add address_snapshot to bookings, and set up relationships.
- [ ] Enhance user profile with phone and address management
  - Allow users to add, edit, and remove multiple named addresses (optional) and update phone number.
- [ ] Add immutable address snapshot to bookings
  - Ensure each confirmed booking stores a static address copy that cannot be changed.
- [ ] Update booking creation flow for address selection
  - Allow users to select or enter an address for each booking, copying it into the booking snapshot.
- [ ] Add UI for managing addresses in profile
  - Create UI for users to manage (add, edit, remove, name) their saved addresses.
- [ ] Test all new features and flows
  - Add unit and integration tests for API endpoints and manual UI testing for booking lookup, profile management, and address features.
- [ ] Add profile page link/button to navbar
  - Add a button or link to the navbar that navigates to the user profile page (/profile).

---

# Implementation Plan: User Bookings & Profile Enhancements

## Objective

Enable users to view their bookings (logged-in and guest), retroactively link bookings to new user accounts, and expand user profile properties with support for multiple addresses. Ensure that addresses in confirmed bookings are immutable, while users can freely manage their own address book for future use.

## Feature List

- [ ] Add a profile page link/button to the navbar for easy access

- [ ] User profile page displaying bookings for logged-in users
- [ ] Guest booking lookup with email confirmation
- [ ] Retroactive linking of pre-signup bookings to new user accounts
- [ ] Supabase schema updates for new models and relationships
- [ ] User profile enhancements: phone number, multiple named addresses (optional)
- [ ] Immutable address snapshot for each confirmed booking
- [ ] Editable user address book for future bookings

## Implementation Steps

11. [ ] Add a or link from their name/email at the navbar when they are logged in that navigates to the user profile page (`/profile`)

1. [ ] Design and create a user profile page (`/profile`) to display current user's bookings
1. [ ] Implement backend API to fetch bookings for the logged-in user
1. [ ] Add guest booking lookup page with email confirmation flow
1. [ ] Implement backend logic to fetch bookings by email for guests
1. [ ] On user signup, link any existing bookings (by email) to the new user account
1. [ ] Update Supabase schema:
   - [ ] Add/modify `users` table: add phone number
   - [ ] Create `addresses` table: id, user_id, label, address fields (for user-managed address book)
   - [ ] Update `bookings` table:
     - [ ] Add `address_snapshot` (JSON or fields) to store a static copy of the address at booking time
     - [ ] Ensure bookings can be linked to user_id or email
   - [ ] Set up relationships: users ↔ addresses (1-to-many), users ↔ bookings (1-to-many), bookings store address snapshot (not a foreign key)
1. [ ] Update frontend forms to support new user properties (phone, addresses)
1. [ ] Add UI for managing multiple addresses in the user profile (add, edit, remove, name)
1. [ ] Update booking creation flow:
   - [ ] Allow user to select from saved addresses or enter a new one
   - [ ] On booking, copy the selected address into the booking’s `address_snapshot` (do not reference the address row)
   - [ ] Ensure confirmed bookings always display the original address, even if the user edits or deletes their saved addresses
1. [ ] Add tests for all new features and flows

## Dependencies

- Supabase Auth
- Supabase Database (tables: users, bookings, addresses)

## Acceptance Criteria

- [ ] Logged-in users see all their bookings and addresses on the profile page
- [ ] Guests can view bookings after confirming their email
- [ ] Bookings made before signup appear in the new user's profile after registration
- [ ] Users can add, edit, and remove multiple named addresses for future use
- [ ] Confirmed bookings always display the address as it was at the time of booking (immutable)
- [ ] Editing or deleting a saved address does not affect any existing bookings
- [ ] All new fields and flows are tested and validated

## Testing & Validation

- Unit and integration tests for API endpoints
- Manual UI testing for booking lookup, profile management, and address features
