---
name: Employee Portal Design System
colors:
  surface: '#FFFFFF'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#EF4444'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#F8FAFC'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
  border: '#E2E8F0'
  success: '#10B981'
  pending: '#F59E0B'
  info: '#3B82F6'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#94A3B8'
typography:
  h1:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  h3:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  sidebar-width: 260px
  sidebar-collapsed: 80px
  gutter: 1.5rem
  card-padding: 1.25rem
  stack-gap: 1rem
---

# Employee Portal — Full Web App UI Design Specification

## Project Goal

Design a complete Employee Portal web application UI for a frontend-focused React learning project.

The goal is to generate:
- all required web app screens
- role-based user flows
- reusable UI patterns
- production-style dashboard interfaces
- clear frontend implementation guidance

This design will act as the complete frontend blueprint for development.

IMPORTANT:
This project is ONLY for desktop/tablet web application design.
Do NOT generate mobile app screens.

Responsive web layouts are enough.

---

# Tech Stack Context

Frontend stack:
- React JS
- TypeScript
- Tailwind CSS v4
- shadcn/ui

The generated UI must be:
- implementation-friendly
- realistic
- component-driven
- scalable
- responsive
- suitable for a fresher portfolio project

---

# IMPORTANT DESIGN RULES

## Avoid
- marketing website aesthetics
- excessive gradients
- fancy glassmorphism
- over-designed visuals
- unrealistic dribbble concepts
- heavy animations

## Prioritize
- clean enterprise dashboard UI
- usability
- readability
- reusable component patterns
- realistic layouts
- implementation practicality

---

# THEME SYSTEM CONTEXT

The project already uses:
- shadcn/ui theme system
- Tailwind CSS v4
- OKLCH color variables

The UI MUST visually align with this system.

---

# DESIGN LANGUAGE

## Style Direction
The UI should feel inspired by:
- modern admin dashboards
- enterprise internal tools
- Vercel-style spacing
- shadcn/ui patterns

---

# VISUAL STYLE

Use:
- card-based sections
- clean typography hierarchy
- subtle shadows
- soft borders
- spacious layouts
- rounded corners

Avoid:
- strong gradients
- overly colorful visuals
- saturated designs

---

# COLOR STYLE

## Theme Characteristics
Use:
- neutral grayscale base
- subtle accent colors
- muted backgrounds
- accessible contrast

## Semantic Colors
Use:
- green → success
- amber → pending
- red → rejected/error
- blue → informational

Keep colors soft and professional.

---

# BORDER RADIUS STYLE

Use rounded corners similar to:
- rounded-lg
- rounded-xl
- rounded-2xl

Avoid sharp corners.

---

# GLOBAL APPLICATION LAYOUT

Generate a reusable application shell for all authenticated pages.

---

# SIDEBAR NAVIGATION

## Desktop Layout
- fixed left sidebar

## Tablet Layout
- collapsible sidebar

## Sidebar Items
- Dashboard
- Employees
- Leaves
- Announcements
- Team
- Profile
- Settings
- Logout

---

# TOP NAVBAR

Include:
- page title
- breadcrumb (optional)
- notification icon
- profile avatar dropdown
- optional search bar

---

# MAIN CONTENT AREA

Use:
- responsive web container spacing
- consistent gutters
- dashboard grids
- clean section separation

---

# ROLE-BASED APPLICATION FLOW

IMPORTANT:
Generate SEPARATE screen flows for:
- ADMIN
- MANAGER
- EMPLOYEE

Do NOT merge all functionality into generic pages.

Each role should have:
- dedicated dashboard screens
- dedicated navigation flow
- role-specific actions
- role-specific layouts where needed

---

# AUTHENTICATION SCREENS

## Screen 1 — Login Page

### Include
- company/app logo
- welcome heading
- email input
- password input
- remember me checkbox
- forgot password link
- login button

### Style
- centered auth card
- modern minimal layout
- responsive web layout

---

## Screen 2 — Forgot Password Page

### Include
- email field
- reset password button
- back to login link

---

# ADMIN FLOW

---

## Screen 3 — Admin Dashboard

### Include
- organization overview
- total employees card
- attendance summary
- pending leave approvals
- announcement summary
- quick action cards
- recent activity feed

### Layout
Responsive dashboard grid.

---

## Screen 4 — Employee Management Page

### Include
- employee table
- search input
- department filter
- role filter
- add employee button
- pagination

### Table Columns
- avatar
- name
- employee ID
- department
- role
- status
- actions

---

## Screen 5 — Employee Detail Screen

### Include
- profile avatar
- employee information
- contact details
- department
- role
- employment status
- recent leave history

### Layout
Drawer or detail page layout.

---

## Screen 6 — Add/Edit Employee Form

### Include
- full name
- email
- phone
- department
- role
- status
- save button
- cancel button

### Style
- clean form sections
- validation states
- reusable form layout

---

## Screen 7 — Leave Approval Management

### Include
- leave request table
- request filters
- pending approvals
- approve/reject actions

### Table Columns
- employee
- leave type
- dates
- status
- actions

---

## Screen 8 — Leave Request Detail Modal

### Include
- employee info
- leave dates
- leave reason
- request status
- approve button
- reject button

---

## Screen 9 — Announcement Management

### Include
- announcement list
- create announcement button
- edit/delete actions

---

## Screen 10 — Create Announcement Form

### Include
- title
- description
- priority dropdown
- publish button

---

## Screen 11 — Admin Settings Page

### Include
- role assignment
- department management
- account settings

---

# MANAGER FLOW

---

## Screen 12 — Manager Dashboard

### Include
- team overview
- attendance summary
- pending approvals
- quick actions
- recent announcements

---

## Screen 13 — Team Members Page

### Include
- team member table
- employee details
- attendance indicators

---

## Screen 14 — Team Leave Requests

### Include
- team leave requests
- approve/reject actions
- leave filters

---

## Screen 15 — Team Announcements

### Include
- team announcement feed
- create announcement form

---

# EMPLOYEE FLOW

---

## Screen 16 — Employee Dashboard

### Include
- welcome section
- attendance summary
- leave balance
- recent announcements
- quick action buttons

---

## Screen 17 — Apply Leave Page

### Include
- leave application form
- leave balance cards
- recent leave history

### Form Fields
- leave type
- start date
- end date
- reason
- submit button

---

## Screen 18 — My Leaves Page

### Include
- leave history table
- status badges
- filters

---

## Screen 19 — Employee Profile Page

### Include
- avatar
- editable profile form
- contact information
- bio
- save changes button

---

## Screen 20 — Change Password Page

### Include
- current password
- new password
- confirm password
- update button

---

## Screen 21 — Announcements Feed

### Include
- announcement cards
- author
- timestamp
- priority badges
- expandable content

---

# SHARED UI STATES

---

## Screen 22 — Dialog & Modal States

### Include
- delete confirmation modal
- employee detail modal
- success dialog
- warning dialog

---

## Screen 23 — Loading States

### Include
- table skeleton loaders
- dashboard loading cards
- form loading state
- page loading state

---

## Screen 24 — Empty States

### Include
- no employees found
- no leave requests
- no announcements
- no search results

---

## Screen 25 — Error States

### Include
- API error state
- retry button
- access denied page
- 404 page

---

# REUSABLE COMPONENTS

The design should clearly establish reusable component patterns for:

- buttons
- cards
- tables
- badges
- dropdowns
- dialogs/modals
- forms
- navbar
- sidebar
- tabs
- skeleton loaders
- status chips
- avatars
- pagination

---

# TYPOGRAPHY

Use:
- clean sans-serif typography
- medium/semibold headings
- muted secondary text
- clear visual hierarchy

Avoid:
- oversized hero typography
- marketing-style layouts

---

# SPACING & UX

Prioritize:
- whitespace
- readability
- consistent alignment
- scalable layouts
- implementation simplicity

The UI should feel:
- production-ready
- realistic
- maintainable
- scalable
- achievable in React + Tailwind + shadcn/ui

---

# IMPORTANT FINAL INSTRUCTION

Generate ALL screens individually.

Do NOT:
- merge role flows together
- combine forms into dashboards
- skip detail screens
- compress multiple features into one page

Every feature should have:
- its own dedicated screen
- clear UI structure
- realistic dashboard layout
- responsive web behavior

The final output should provide:
- a complete frontend blueprint
- clear implementation guidance
- realistic enterprise-style UI screens
- production-grade dashboard architecture