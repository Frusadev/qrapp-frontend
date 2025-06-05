# QR App Frontend

A modern Next.js application for QR code generation, scanning, and access code management. Built with React 19, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Login and registration with OTP support
- 📱 **QR Code Scanning** - Real-time QR code scanning using device camera
- 🎫 **Access Code Management** - Create and manage secure access codes
- 🔔 **Real-time Notifications** - WebSocket-powered notification system
- 🎨 **Modern UI** - Beautiful interface built with Radix UI components
- 🌙 **Theme Support** - Light and dark mode toggle
- 📱 **Mobile Responsive** - Optimized for mobile devices
- 🔒 **Secure Access** - Password-protected and basic access code types
- 📊 **User Dashboard** - Manage settings, view notifications, and track usage

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

### QR Code & Camera
- **QR Scanning**: html5-qrcode, react-barcode-qrcode-scanner
- **Camera Access**: react-webcam
- **QR Generation**: Server-side generated QR codes

### Development Tools
- **Runtime**: Bun
- **Build Tool**: Turbopack (Next.js)
- **Linting**: ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   └── (main)/            # Main application routes
│       ├── access-code/   # Access code management
│       ├── access-codes/  # Access codes list
│       ├── notifications/ # Notifications page
│       └── settings/      # User settings
├── components/            # Reusable components
│   ├── access-code/       # Access code related components
│   ├── auth/              # Authentication components
│   ├── camera/            # QR scanner components
│   ├── providers/         # Context providers
│   ├── ui/                # UI component library
│   └── user/              # User-related components
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and configurations
    ├── api/               # API layer (DTOs, requests, types)
    ├── config/            # Environment configuration
    ├── hooks/             # Custom hooks (WebSocket)
    └── stores/            # Zustand stores
```

## Getting Started

### Prerequisites

- **Bun** (recommended) or Node.js 18+
- A QR App backend server running (default: http://localhost:8000)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qrapp-front
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SERVER_URL=http://localhost:8000
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_SERVER_PORT=8000
   ```

4. **Start the development server**
   ```bash
   bun dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint for code quality

## Key Features Explained

### Authentication
- Secure login/registration system
- OTP (One-Time Password) support
- Session management with automatic redirects

### Access Codes
- **Basic Access Codes**: Simple QR codes for quick access
- **Secure Access Codes**: Password-protected QR codes
- **QR Code Generation**: Server-side QR code generation and management
- **Real-time Updates**: Live updates when access codes are scanned

### QR Code Scanning
- Multiple QR scanning libraries for better compatibility
- Real-time camera feed
- Automatic detection and processing
- Support for various QR code formats

### Notifications
- Real-time WebSocket notifications
- Notification history and management
- Visual notification indicators

## API Integration

The frontend integrates with a backend API server. Key API endpoints include:

- **Authentication**: `/auth/login`, `/auth/register`
- **Access Codes**: `/access-codes` (CRUD operations)
- **User Management**: `/users/me`
- **File Resources**: `/resources/files` (QR code images)
- **Notifications**: `/notifications`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SERVER_URL` | Backend server URL | `http://localhost:8000` |
| `NEXT_PUBLIC_API_VERSION` | API version | `v1` |
| `NEXT_PUBLIC_SERVER_PORT` | Backend server port | `8000` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Notes

- The app uses the Next.js App Router for modern routing
- Components are built with Radix UI for accessibility
- Tailwind CSS is configured for consistent styling
- TypeScript provides type safety across the application
- The project follows modern React patterns with hooks and functional components

## Browser Support

- Modern browsers with WebRTC support for camera access
- Mobile browsers with camera permissions
- Progressive Web App capabilities

## License

MIT
