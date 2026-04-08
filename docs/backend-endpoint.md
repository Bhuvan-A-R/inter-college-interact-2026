# Interact 2026 - Backend Endpoint Contracts and Sprint Checklist

## 1) Finalized Product Rules
- Participant login: email + password.
- Registration flow: email OTP verification first, then profile completion.
- Shared login endpoint with role checks (participant + super admin).
- OTP resend policy: 30-second cooldown, max 3 resends.
- Payment screenshot storage: UploadThing.
- Team event checkout/payment upload: leader only.
- Rejected payment: no resubmission on same order.
- Event visibility: only `isActive=true` visible to participants/public.
- Profile requirement for checkout: `photoUrl` required, `collegeIdCardUrl` optional.
- Team membership: user can join multiple teams across different events, but only one team within the same event.

---

## 2) API Conventions
- Base path: `/api`
- Auth: cookie-based session (`auth_token`, HttpOnly)
- Response shape:
  - Success: `{ success: true, data: ... }`
  - Error: `{ success: false, error: { message, issues? } }`
- Validation errors: `400`
- Unauthorized: `401`
- Forbidden: `403`
- Not found: `404`
- Conflict: `409`
- Rate-limit or cooldown exceeded: `429`

---

## 3) Endpoint Contracts

## 3.1 Auth

### `POST /api/auth/register/start` (Implemented)
Purpose: Start registration and send OTP to email.

Request:
```json
{ "email": "user@example.com" }
```

Success `200`:
```json
{
  "success": true,
  "data": {
    "message": "OTP has been generated and sent to the email."
  }
}
```

Errors:
- `409` email already registered
- `429` resend cooldown exceeded (to be added)
- `500` SMTP failure

### `POST /api/auth/register/verify` (Implemented)
Purpose: Verify registration OTP.

Request:
```json
{ "email": "user@example.com", "otp": "123456" }
```

Success `200`:
```json
{ "success": true, "data": { "message": "Email verified successfully." } }
```

Errors:
- `404` pending registration not found
- `400` invalid/expired OTP
- `429` max OTP attempts reached

### `POST /api/auth/register/complete` (Implemented)
Purpose: Complete participant profile and create account.

Request:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+919876543210",
  "collegeName": "Global Academy of Technology",
  "password": "Strong@123",
  "confirmPassword": "Strong@123"
}
```

Success `200`:
```json
{
  "success": true,
  "data": {
    "message": "Registration completed successfully.",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+919876543210",
      "collegeName": "Global Academy of Technology",
      "role": "PARTICIPANT"
    }
  }
}
```

Errors:
- `400` OTP not verified or verification expired
- `409` duplicate email/phone

### `POST /api/auth/login` (Implemented, needs role checks)
Purpose: Shared login for participant/admin using email + password.

Request:
```json
{ "email": "user@example.com", "password": "Strong@123" }
```

Success `200`:
```json
{
  "success": true,
  "data": {
    "message": "Login successful.",
    "user": { "id": "uuid", "email": "user@example.com", "name": "John", "role": "PARTICIPANT" }
  }
}
```

Behavior:
- Sets `auth_token` cookie.
- Role included in token payload.

### `POST /api/auth/register/resend-otp` (Required)
Purpose: resend registration OTP with cooldown/limit.

Request:
```json
{ "email": "user@example.com" }
```

Success `200`:
```json
{ "success": true, "data": { "message": "OTP resent successfully." } }
```

Errors:
- `429` before 30-second cooldown
- `429` resend count exceeds 3
- `404` no pending registration

### `GET /api/auth/me` (Required)
Purpose: return current authenticated user from cookie.

Success `200`:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "PARTICIPANT",
      "photoUrl": "https://..."
    }
  }
}
```

Errors:
- `401` no/invalid cookie

### `POST /api/auth/logout` (Required)
Purpose: clear auth cookie.

Success `200`:
```json
{ "success": true, "data": { "message": "Logged out successfully." } }
```

---

## 3.2 Events

### `GET /api/events` (Required)
Query params:
- `type`: `SOLO|TEAM` (optional)
- `category`: string (optional)
- `search`: string (optional)

Rules:
- Participant/public sees only `isActive=true`.
- Admin may pass `includeInactive=true`.

Success `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Coding Challenge",
        "type": "SOLO",
        "category": "Technical",
        "price": "100.00",
        "isActive": true
      }
    ]
  }
}
```

### `GET /api/events/:eventId` (Required)
Success `200`: event detail including rules and team limits.

### `POST /api/admin/events` (Required)
Role: `SUPER_ADMIN`

### `PATCH /api/admin/events/:eventId` (Required)
Role: `SUPER_ADMIN`

### `DELETE /api/admin/events/:eventId` (Required)
Role: `SUPER_ADMIN`

### `PATCH /api/admin/events/:eventId/toggle-active` (Required)
Role: `SUPER_ADMIN`

---

## 3.3 Profile

### `GET /api/profile` (Required)
Get authenticated user profile.

### `PATCH /api/profile` (Required)
Update name/phone/college and media URLs.

Request (example):
```json
{
  "name": "John Doe",
  "phone": "+919876543210",
  "collegeName": "Global Academy of Technology",
  "photoUrl": "https://uploadthing.../photo.jpg",
  "collegeIdCardUrl": "https://uploadthing.../id.jpg"
}
```

Checkout guard rule:
- Must have `photoUrl` present.

---

## 3.4 Cart

### `GET /api/cart` (Required)
Returns cart items with event details and subtotal.

### `POST /api/cart/items` (Required)
Request:
```json
{ "eventId": "uuid", "teamId": "uuid-or-null" }
```

Rules:
- Enforce unique `userId + eventId`.
- For TEAM events, `teamId` required and leader must match current user.

### `DELETE /api/cart/items/:cartItemId` (Required)
Remove one cart item.

---

## 3.5 Teams and Invites

### `POST /api/teams` (Required)
Request:
```json
{ "eventId": "uuid", "name": "Team Phoenix" }
```

Rules:
- One team per leader per event.
- Creator becomes `LEADER` member record.

### `GET /api/teams` (Required)
List teams where user is leader/member.

### `GET /api/teams/:teamId` (Required)
Include members and invites.

### `POST /api/teams/:teamId/invites` (Required)
Request:
```json
{ "identifier": "invitee email or phone" }
```

Rules:
- No duplicate invite for same team.
- Invitee cannot already be in any team for the same event.

### `GET /api/invites` (Required)
List my invites grouped by status.

### `POST /api/invites/:inviteId/accept` (Required)
Rules:
- If user already joined another team in same event, return `409`.

### `POST /api/invites/:inviteId/reject` (Required)
Set status to `REJECTED`.

---

## 3.6 Orders, Checkout, and Payment

### `POST /api/orders/checkout` (Required)
Purpose: create order from cart and clear cart.

Rules:
- Validate cart not empty.
- TEAM event entries must be leader-owned team cart lines.
- Freeze item price into `OrderItem.price`.

Success `201`:
```json
{ "success": true, "data": { "orderId": "uuid", "status": "PENDING_PAYMENT" } }
```

### `GET /api/orders` (Required)
List current user's orders.

### `GET /api/orders/:orderId` (Required)
Order detail for owner/admin.

### `POST /api/orders/:orderId/payment` (Required)
Request:
```json
{
  "upiTransactionId": "TXN12345",
  "paymentScreenshotUrl": "https://uploadthing.../payment.jpg"
}
```

Rules:
- Allowed only when status is `PENDING_PAYMENT`.
- For team order, leader only can submit.
- Sets status to `PAYMENT_SUBMITTED`.

---

## 3.7 Admin Payments and Registrations

### `GET /api/admin/payments` (Required)
Role: `SUPER_ADMIN`

Filter by statuses: `PAYMENT_SUBMITTED`, optionally all.

### `POST /api/admin/payments/:orderId/verify` (Required)
Role: `SUPER_ADMIN`

Effects:
- Order status -> `VERIFIED`
- Set `verifiedAt`, `verifiedBy`
- Create `Registration` rows:
  - SOLO: order user
  - TEAM: all accepted team members
- Write `AuditLog` with `PAYMENT_VERIFIED`

### `POST /api/admin/payments/:orderId/reject` (Required)
Role: `SUPER_ADMIN`

Request:
```json
{ "reason": "Screenshot unclear" }
```

Effects:
- Order status -> `REJECTED`
- Set `rejectionReason`, `verifiedBy`, `verifiedAt`
- No resubmission flow for this order
- Write `AuditLog` with `PAYMENT_REJECTED`

### `GET /api/registrations` (Required)
Get current user confirmed registrations.

### `GET /api/admin/registrations` (Optional)
Role: `SUPER_ADMIN`

---

## 3.8 Admin Users, Teams, Audit

### `GET /api/admin/users` (Required)
### `GET /api/admin/users/:userId` (Required)
### `PATCH /api/admin/users/:userId` (Required)

### `GET /api/admin/teams` (Required)
### `GET /api/admin/teams/:teamId` (Required)
### `PATCH /api/admin/teams/:teamId` (Optional)

### `GET /api/admin/audit-logs` (Required)
Query: `action`, `entityType`, `from`, `to`, `page`, `limit`

---

## 4) Endpoint Priority Plan

## Sprint 1: Auth and Session Completion
- [ ] Add `POST /api/auth/register/resend-otp` with cooldown and resend limits.
- [ ] Add `GET /api/auth/me`.
- [ ] Add `POST /api/auth/logout`.
- [ ] Add role-check safeguards in shared `POST /api/auth/login` and protected middleware helper.

## Sprint 2: Events and Profile
- [ ] Add public `GET /api/events`, `GET /api/events/:eventId`.
- [ ] Add profile `GET /api/profile`, `PATCH /api/profile`.
- [ ] Enforce checkout precondition: `photoUrl` required.

## Sprint 3: Cart and Checkout Core
- [ ] Add cart endpoints (`GET`, `POST`, `DELETE`).
- [ ] Add `POST /api/orders/checkout`.
- [ ] Add `GET /api/orders`, `GET /api/orders/:orderId`.

## Sprint 4: Payment Submission and UploadThing Integration
- [ ] Add UploadThing integration endpoint/contracts.
- [ ] Add `POST /api/orders/:orderId/payment`.
- [ ] Validate leader-only payment submission for team orders.

## Sprint 5: Team and Invite Workflows
- [ ] Add team creation/list/detail endpoints.
- [ ] Add invite create/list/accept/reject endpoints.
- [ ] Enforce one-team-per-event-per-user rule at acceptance time.

## Sprint 6: Admin Verification and Audit
- [ ] Add admin payments queue and verify/reject endpoints.
- [ ] Implement registration row creation on verify.
- [ ] Add audit logging for all sensitive admin actions.

## Sprint 7: Admin Management and Hardening
- [ ] Add admin users/teams/audit APIs.
- [ ] Add pagination and filters on all listing APIs.
- [ ] Add integration tests for full happy/failure paths.

---

## 5) Testing Checklist (Must Pass)
- [ ] Auth cookie set/cleared correctly (`login`, `logout`).
- [ ] OTP resend enforces 30-second cooldown and max 3.
- [ ] Participant cannot see inactive events.
- [ ] Checkout fails when profile photo missing.
- [ ] Team event checkout/payment rejects non-leader action.
- [ ] Invite accept rejects when user already in team of same event.
- [ ] Verify payment creates expected registrations and audit log.
- [ ] Reject payment blocks further resubmission attempts.

---

## 6) Notes for Frontend Team
- Build pages against this contract in strict order: auth -> events/profile -> cart/checkout -> teams -> admin.
- Use central typed client wrappers to avoid endpoint drift.
- Handle `409` and `429` states explicitly in UX (duplicate/conflict and cooldown conditions).
