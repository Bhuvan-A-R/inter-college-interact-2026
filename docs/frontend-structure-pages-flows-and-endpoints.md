# Interact 2026 - Frontend Structure, Pages, User Flows, and Endpoint Plan

## 1) Scope and Source of Truth
This document is based on the current Prisma schema and currently implemented API routes.

Current implemented routes:
- `POST /api/auth/register/start`
- `POST /api/auth/register/verify`
- `POST /api/auth/register/complete`
- `POST /api/auth/login`

Schema supports a much broader platform (events, teams, cart, checkout, payment verification, admin audit). Those endpoints are listed below as required work.

---

## 2) Confirmed Product Decisions
These choices are now confirmed:

- Participant login: email + password.
- Admin login: shared `POST /api/auth/login` with role checks (no separate admin login route).
- OTP resend policy: 30-second cooldown, maximum 3 resends.
- Payment screenshot storage service: UploadThing.
- Team event checkout/payment submission: leader only.
- Payment rejection behavior: no resubmission flow for rejected orders (order remains rejected).
- Team membership rule: user can join multiple teams across different events, but only one team per same event.
- Event visibility: only active events are visible to participants/public.
- Profile requirements: photo is mandatory, college ID card is optional and not required.

---

## 3) Proposed Frontend File Structure (Next.js App Router)

```text
app/
  (public)/
    page.tsx                         # Landing page
    events/
      page.tsx                       # Public event listing
      [eventId]/
        page.tsx                     # Event detail page

  (auth)/
    register/
      page.tsx                       # Step 1: enter email
      verify/page.tsx                # Step 2: verify OTP
      complete/page.tsx              # Step 3: name/phone/college/password
    login/
      page.tsx                       # Participant login (OTP or password based on final decision)
    admin-login/
      page.tsx                       # Super admin login

  (participant)/
    dashboard/
      page.tsx                       # Participant home
    profile/
      page.tsx                       # Name/phone/college/photo/id card
    cart/
      page.tsx                       # Cart list
    checkout/
      page.tsx                       # Confirm order + payment instructions
    orders/
      page.tsx                       # All orders for user
    orders/[orderId]/
      page.tsx                       # Order detail + upload payment proof
    teams/
      page.tsx                       # Teams where user is leader/member
      create/
        page.tsx                     # Create team for team event
      [teamId]/
        page.tsx                     # Team detail + members + invites
    invites/
      page.tsx                       # Pending/accepted/rejected invites
    registrations/
      page.tsx                       # Confirmed registrations

  (admin)/
    admin/
      page.tsx                       # Admin dashboard
      events/
        page.tsx                     # Event list + filters
        create/page.tsx              # Create event
        [eventId]/edit/page.tsx      # Edit event
      payments/
        page.tsx                     # Submitted payments queue
        [orderId]/page.tsx           # Payment review detail
      users/
        page.tsx                     # User management
        [userId]/page.tsx            # User detail/update
      teams/
        page.tsx                     # Team management
        [teamId]/page.tsx            # Team detail/actions
      audit-logs/
        page.tsx                     # Audit stream

  api/
    auth/...                         # Existing and future auth routes
    events/...                       # Event routes
    cart/...                         # Cart routes
    orders/...                       # Checkout/payment routes
    teams/...                        # Team/invite routes
    registrations/...                # Registration views
    admin/...                        # Admin management routes

components/
  auth/
  events/
  teams/
  checkout/
  payments/
  admin/
  ui/

lib/
  api/client.ts                      # fetch wrapper with typed responses
  api/routes.ts                      # API endpoint constants
  auth/session.ts                    # client auth helpers
  validation/                        # existing zod + frontend forms
  utils/

types/
  api.ts
  domain.ts

middleware.ts                        # route protection by role/session
```

---

## 4) Page-by-Page Responsibilities

## 4.1 Public and Auth
- Landing (`/`): fest intro, CTA to events and registration.
- Events list (`/events`): filter by category, type (SOLO/TEAM), and active events only.
- Event detail (`/events/[eventId]`): rules, price, team constraints, add-to-cart action.
- Register step 1 (`/register`): email submit -> register/start.
- Register OTP (`/register/verify`): OTP submit/resend -> register/verify.
- Register complete (`/register/complete`): profile + password -> register/complete.
- Login (`/login`): email + password.
- Admin login (`/admin-login`): email + password.

## 4.2 Participant Area
- Dashboard: summary cards (cart count, pending payments, verified registrations, invites).
- Profile: update user details and optional uploads.
- Cart: event lines, remove item, total.
- Checkout: create order and show UPI details.
- Order detail: submit transaction ID + screenshot.
- Teams: create/manage team, invite users, view members.
- Invites: accept/reject team invites.
- Registrations: final confirmed registrations after payment verify.

## 4.3 Admin Area
- Events CRUD + activation toggle.
- Payment verification queue with approve/reject.
- User view/update.
- Team view/manage.
- Audit log timeline and filters.

---

## 5) User Flow Maps

## 5.1 Participant Registration
1. User enters email at `/register`.
2. Frontend calls `POST /api/auth/register/start`.
3. User enters OTP at `/register/verify`.
4. Frontend calls `POST /api/auth/register/verify`.
5. User fills name/phone/college/password at `/register/complete`.
6. Frontend calls `POST /api/auth/register/complete`.
7. Redirect to `/login`.

## 5.2 Participant Login
1. Enter email/password at `/login`.
2. Call `POST /api/auth/login`.
3. On success, auth cookie is set and user lands on `/dashboard`.

## 5.3 Solo Event Purchase
1. Browse events -> open solo event -> add to cart.
2. Open cart -> checkout -> order created (`PENDING_PAYMENT`).
3. User pays via UPI and uploads proof (`PAYMENT_SUBMITTED`).
4. Admin verifies payment -> order `VERIFIED`.
5. Registration row created for participant.

## 5.4 Team Event Purchase
1. Leader creates team for event.
2. Leader invites users; users accept/reject.
3. Leader adds team event to cart and checks out.
4. Leader uploads payment proof.
5. Admin verifies payment.
6. Registration rows created for all accepted team members.

## 5.5 Invitee Response Flow
1. Invitee logs in and visits `/invites`.
2. Accept or reject pending invite.
3. Status updates and team membership reflects decision.

---

## 6) Backend Endpoint Matrix

## 6.1 Auth Endpoints

Already implemented:
- `POST /api/auth/register/start`
  - Body: `{ email }`
  - Result: pending registration + OTP dispatch
- `POST /api/auth/register/verify`
  - Body: `{ email, otp }`
  - Result: pending registration marked verified
- `POST /api/auth/register/complete`
  - Body: `{ email, name, phone, collegeName, password, confirmPassword }`
  - Result: participant user created
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Result: auth cookie

Still needed for complete auth UX:
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/register/resend-otp`

Notes:
- Shared `/api/auth/login` should enforce role-aware checks and issue role in session payload.
- Since admin login is shared, no dedicated `/api/auth/admin/login` endpoint is required.

## 6.2 Event Endpoints
- `GET /api/events` (public listing with filters)
- `GET /api/events/:eventId`
- `POST /api/admin/events`
- `PATCH /api/admin/events/:eventId`
- `DELETE /api/admin/events/:eventId`
- `PATCH /api/admin/events/:eventId/toggle-active`

## 6.3 Cart Endpoints
- `GET /api/cart`
- `POST /api/cart/items`
- `DELETE /api/cart/items/:cartItemId`
- Optional: `DELETE /api/cart` (clear cart)

## 6.4 Team + Invite Endpoints
- `POST /api/teams` (create team for event)
- `GET /api/teams` (my teams)
- `GET /api/teams/:teamId`
- `POST /api/teams/:teamId/invites`
- `GET /api/invites` (my invites)
- `POST /api/invites/:inviteId/accept`
- `POST /api/invites/:inviteId/reject`
- Optional admin: `PATCH /api/admin/teams/:teamId`

## 6.5 Checkout + Payment Endpoints
- `POST /api/orders/checkout` (create order + items, clear cart)
- `GET /api/orders` (my orders)
- `GET /api/orders/:orderId`
- `POST /api/orders/:orderId/payment` (txn id + screenshot url)

Admin payment verification:
- `GET /api/admin/payments` (submitted queue)
- `POST /api/admin/payments/:orderId/verify`
- `POST /api/admin/payments/:orderId/reject`

## 6.6 Registration Endpoints
- `GET /api/registrations` (my confirmed registrations)
- Optional admin: `GET /api/admin/registrations`

## 6.7 Admin Management Endpoints
- `GET /api/admin/users`
- `GET /api/admin/users/:userId`
- `PATCH /api/admin/users/:userId`
- `GET /api/admin/audit-logs`

---

## 7) Data and Constraint-Aware Frontend Rules
- Cart must prevent duplicate user-event addition.
- Team creation should prevent multiple teams for same leader+event.
- Invite UI must prevent duplicate invite target for same team.
- Registration view should treat user+event as unique confirmation record.
- Team event checkout must enforce leader-only action if backend policy requires it.

---

## 8) Recommended Build Order
1. Auth completion: `/me`, `/logout`, resend OTP.
2. Events list/detail API + UI.
3. Cart + checkout APIs + UI.
4. Payment submission + order history UI.
5. Team creation/invite/accept/reject flows.
6. Admin payment verification (creates registrations).
7. Admin event CRUD, users, teams, audit logs.

---

## 9) Clarification Questions (Please Confirm)
Resolved:
- Invite constraints: user can be in multiple teams for different events, but not multiple teams in the same event.
- Public visibility: inactive events are hidden from participants/public.
- Profile requirement: `photoUrl` mandatory before checkout; `collegeIdCardUrl` optional.

---

## 10) Next Action After Confirmation
After your answers, create:
- Exact route handlers for the missing endpoints in priority order.
- Matching frontend page scaffolds and data-fetch contracts.
- A second implementation checklist MD for sprint execution.
