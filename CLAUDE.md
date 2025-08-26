# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is a React certificate management application built with Vite, using React Router for navigation and Tailwind CSS for styling. The application serves three main user types:

### Application Structure

**Main Areas:**
- **Landing Pages** (`/pages/mysertifico/landing/`): Public marketing pages (Home, About, Pricing, Contact, Legal)
- **MySertifico** (`/pages/mysertifico/`): Main certificate management platform for organizations
- **Back Office (BO)** (`/pages/bo/`): Administrative interface for platform management
- **MyWall**: Referenced but not fully implemented

### Component Organization

**Component Structure:**
- `/components/auth/` - Authentication forms and related components
- `/components/bo/` - Back Office specific components (prefixed with "Bo")
- `/components/common/` - Reusable components across the application
- `/components/dashboard/` - Dashboard-specific components
- `/components/layout/` - Layout components (Header, Footer, Sidebar)

### Key Technical Details

**Routing Structure:**
- Landing routes: `/`, `/about`, `/price`, `/contact-us`, etc.
- Auth routes: `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`
- MySertifico admin routes: `/dashboard`, `/my-profile`, `/template-list`, etc.
- Back Office routes: `/bo/dashboard`, `/bo/admin/staff`, `/bo/certificates`, etc.

**Styling:**
- Uses Tailwind CSS with custom color scheme including primary teal colors
- Dark mode support via `dark` class selector
- Custom Back Office color scheme (`bo-bg-light`, `bo-surface-dark`, etc.)
- Typography plugin enabled

**State Management:**
- Theme state managed in App.jsx with localStorage persistence
- React Router for navigation state

### Data Layer

**Sample Data:**
- Template data structure defined in `/src/data/sampleTemplateData.js`
- Contains certificate templates with properties like template_code, style, orientation, theme_color

### Development Notes

**File Structure Anomaly:**
- The repository contains duplicate folder structures (`mysertifico/` and `mysertifico-1/`) with similar content
- Active development appears to be in the root `src/` directory

**Component Naming:**
- Back Office components prefixed with "Bo" (e.g., `BoUsers`, `BoDashboard`)
- Admin components prefixed with "Admin" (e.g., `AdminCertificateList`)
- Common components are unprefixed and reusable

**Asset Organization:**
- Images organized by category: `/assets/images/frontend/`, `/logos/`, `/templates/`, `/users/`
- Template assets include both SVG and JPG formats