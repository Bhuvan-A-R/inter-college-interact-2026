# INTERACT 2026 - Global Academy of Technology

A comprehensive web application for managing the INTERACT 2026 at Global Academy of Technology, Bengaluru. This platform enables colleges to register, manage student participants, handle event registrations, process payments, and facilitate document verification for a seamless fest experience.

## 🖼️ Demo Screenshots

![VTU Fest Demo 1](public/demo/Login.png)
![VTU Fest Demo 2](public/demo/FileUpload.png)

## 🎯 Overview

This application serves as the central hub for INTERACT 2026, celebrating Karnataka's rich cultural heritage and Bengaluru's innovative spirit. It provides a complete registration and management system for colleges, students, and administrators.

## ✨ Key Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication**: Secure login system using JSON Web Tokens with jose library
- **Role-based Access Control**: Different permissions for colleges, students, and administrators
- **Session Management**: Stateless sessions with configurable expiration times
- **Password Security**: Bcrypt hashing for secure password storage

### 📝 Registration System

- **College Registration**: Colleges can register with their details and manage their profile
- **Student Registration**: Individual student registration with comprehensive profile management
- **Event Registration**: Flexible event registration system with multi-team support per event
- **Document Upload**: Secure file upload system for verification documents

### 📤 File Upload & Management

- **Uploadthing Integration**: Robust file upload service for images and documents
- **File Validation**: Size and type restrictions (max 256KB per image)
- **Secure Access**: Authenticated file uploads with user-specific permissions
- **Cloud Storage**: Reliable file storage with CDN delivery

### 📊 Admin Dashboard

- **User Management**: Comprehensive user and college management
- **Event Oversight**: Monitor and manage all registered events
- **Document Verification**: Review and approve/reject submitted documents
- **Attendance Tracking**: Mark and track participant attendance
- **Payment Management**: Verify and manage payment statuses
- **Reporting**: Generate reports and export data to Excel/PDF

### 🎪 Event Management

- **Event Categories**: Organized events by cultural categories
- **Participant Limits**: Configurable maximum participants per event
- **Registration Tracking**: Real-time registration counts and availability
- **Prize Management**: Track winners and prize distributions

### 📧 Communication

- **Email Notifications**: Automated emails for registration confirmations, updates, and reminders
- **OTP Verification**: Secure email-based OTP system for account verification
- **Bulk Communications**: Mass email capabilities for important announcements

### 🔍 Advanced Features

- **Search & Filtering**: Advanced search across registrations, events, and users
- **Data Export**: Export data to Excel and PDF formats
- **Real-time Updates**: Live dashboard with real-time statistics
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Theme switching capability

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library built on Radix UI and Tailwind CSS
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation

### Backend

- **Next.js API Routes**: Server-side API endpoints
- **Prisma**: Database ORM with type safety
- **PostgreSQL**: Primary database
- **Redis**: Caching and session storage
- **JWT (jose)**: Authentication tokens
- **Bcrypt**: Password hashing

### External Services

- **Uploadthing**: File upload and storage
- **Nodemailer**: Email service
- **Vercel Analytics**: Usage analytics
- **Vercel Speed Insights**: Performance insights

### Development Tools

- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Prisma Studio**: Database management
- **Tailwind CSS**: Styling

## 🏗️ Architecture

### Database Schema

- **Users**: College accounts with payment and verification status
- **Registrants**: Student participants with document links
- **Events**: Event definitions with capacity management
- **EventRegistrations**: Junction table for participant-event relationships

### Security Features

- **Rate Limiting**: API rate limiting with Redis
- **Input Validation**: Comprehensive input sanitization with Zod
- **Authentication Middleware**: Protected routes with session verification
- **File Upload Security**: Authenticated and validated file uploads

### Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexing
- **Caching**: Redis caching for frequently accessed data
- **Image Optimization**: Next.js image optimization
- **Code Splitting**: Automatic code splitting and lazy loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis instance
- Uploadthing account
- Email service (SMTP)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BhuvanSA/vtufest.git
   cd vtufest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/vtufest"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRE="24h"
   UPSTASH_REDIS_REST_URL="https://YOUR-INSTANCE.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   NEXT_PUBLIC_UPLOADTHING_APP_ID="your-uploadthing-app-id"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_EMAIL="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
interact2026/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── adminDashboard/    # Admin interface
│   ├── register/          # Registration pages
│   └── ...
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
│   ├── db.ts             # Database connection
│   ├── session.ts        # JWT session management
│   └── ...
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── utils/                # Helper utilities
```

## 🔧 API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `POST /api/logout` - User logout
- `POST /api/resetpassword` - Password reset

### Registration

- `POST /api/register` - College registration
- `POST /api/eventsregister` - Event registration
- `GET /api/getallregister` - Get all registrations

### File Upload

- `POST /api/uploadthing/*` - File upload endpoints

### Admin

- `GET /api/getalleventregister` - Get all event registrations
- `POST /api/markverified` - Verify documents
- `POST /api/attendancemark` - Mark attendance

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with Radix UI components
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Smooth animations with Framer Motion
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages and validation

## 🔒 Security Considerations

- **Environment Variables**: Sensitive data stored securely
- **Input Sanitization**: All inputs validated and sanitized
- **Rate Limiting**: API endpoints protected against abuse
- **Session Security**: HTTP-only, secure cookies with proper expiration
- **File Upload Security**: Restricted file types and sizes
- **Database Security**: Parameterized queries with Prisma

## 📈 Performance Metrics

- **Fast Loading**: Optimized bundle sizes and lazy loading
- **Database Efficiency**: Indexed queries and connection pooling
- **Caching Strategy**: Redis caching for improved response times
- **Image Optimization**: Automatic image compression and WebP conversion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Global Academy of Technology.

## 🙏 Acknowledgments

- Global Academy of Technology for the opportunity
- VTU for organizing the Youth Fest 2025
- The development team for their dedication
- Open source community for the amazing tools and libraries

## 📞 Contact

For questions or support, please contact the development team at [bhuvansa@bhuvansa.com](mailto:bhuvansa@bhuvansa.com)

---

**Built with ❤️ for INTERACT 2026**
