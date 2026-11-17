# CodePixel Studio - Fullstack Website Specification

## 1. Concept & Vision

CodePixel Studio is a modern, futuristic digital agency website that embodies the fusion of creativity and technology. The experience should feel like stepping into a cutting-edge digital workspace where ideas transform into powerful digital experiences. The website communicates innovation, professionalism, and creative excellence through its design language and interactions.

## 2. Brand Identity

### Visual Identity
- **Brand Name:** CodePixel Studio
- **Slogan:** We Build. We Design. We Create.
- **Logo:** Modern CP pixel-inspired logo using geometric pixel elements
- **Style:** Modern, futuristic, professional with cyberpunk undertones

### Color Palette
- **Midnight Black:** #090D19 (primary background)
- **Dark Background:** #0A0F24 (section backgrounds)
- **Card Background:** #0F1629 (elevated surfaces)
- **Electric Blue:** #2563EB (primary accent)
- **Cyber Cyan:** #A5F3FC (highlights, text accents)
- **Cloud White:** #F8FAFC (primary text)
- **Border Color:** #1E293B (subtle borders)
- **Success Green:** #10B981
- **Error Red:** #EF4444

### Typography
- **Primary Font:** Space Grotesk (headings, brand text)
- **Secondary Font:** Inter (body text)
- **Monospace:** JetBrains Mono (code snippets, technical elements)

## 3. Website Structure & Pages

### Navigation
- Fixed navbar with blur backdrop
- Logo with CP pixel icon
- Navigation links: Home, About, Services, Skills, Process, Projects, Testimonials, Contact
- CTA button: Get Started
- Mobile hamburger menu

### Pages & Sections

#### Home Page
- Hero section with animated background particles
- Welcome badge
- Main headline with gradient text
- Tagline: "We Build. We Design. We Create."
- Subtitle about digital experiences
- Hero buttons: "Explore Our Work", "Let's Work Together"
- Animated statistics counter
- Featured services preview
- Call-to-action section

#### About Page
- Page header with gradient overlay
- Studio introduction
- Mission and Vision cards
- Team or studio highlight section
- Values/culture section

#### Services Page
- Service cards grid (4 services)
- Web Development
- Graphic Design
- UI/UX Design
- Brand Identity
- Each service with icon, title, description

#### Skills Page
- Technologies and tools grid
- HTML5, CSS3, JavaScript
- Responsive Web Design
- UI/UX Design
- Figma
- Git and GitHub
- Progress bars showing proficiency

#### Process Page
- Four-step process timeline
- Discovery: Understanding goals and requirements
- Planning: Strategy and design direction
- Development: Turning concept into reality
- Delivery: Testing, refining, and delivering

#### Projects Page
- Self-initiated demo projects only
- Clearly labeled as "Concept Project"
- Large project cards with images
- Project categories
- Hover effects and animations

#### Testimonials Page
- Client review cards
- Review request message
- Link to review submission form
- Client name, country, rating, review text
- Verified indicator placeholder

#### Contact Page
- Two-column layout
- Left: Contact info (email, WhatsApp, phone)
- Right: Contact form
- Form fields: Full name, Email, Service required, Estimated budget, Project description
- Form submission to backend API

#### Review Submission Page
- Review form
- Fields: Name, Country, Service received, Rating (1-5 stars), Review text, Permission checkbox
- Submission to backend API

## 4. Backend API

### Endpoints

#### POST /api/contact
Submit contact form
```json
Request:
{
  "name": "string",
  "email": "string",
  "service": "string",
  "budget": "string",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Message received"
}
```

#### POST /api/reviews
Submit review
```json
Request:
{
  "name": "string",
  "country": "string",
  "service": "string",
  "rating": 1-5,
  "review": "string",
  "permission": boolean
}

Response:
{
  "success": true,
  "message": "Review submitted"
}
```

#### GET /api/reviews
Get approved reviews
```json
Response:
{
  "success": true,
  "reviews": [...]
}
```

### Data Storage
- SQLite database for reliability
- Tables: contacts, reviews
- Reviews need approval flag

## 5. Component States

### Buttons
- Default: Gradient background, white text
- Hover: Slight lift with enhanced glow
- Active: Pressed state
- Disabled: Muted colors

### Cards
- Default: Card background with border
- Hover: Lift with glow effect
- Active: Selected state

### Form Inputs
- Default: Dark background, subtle border
- Focus: Blue glow border
- Error: Red border with error message
- Success: Green checkmark

### Navigation
- Default: Transparent background
- Scrolled: Blur backdrop, reduced padding
- Active link: Cyan underline

## 6. Technical Stack

- **Frontend:** HTML5, CSS3 (custom properties), Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Dependencies:** express, sqlite3, cors, body-parser

## 7. File Structure

```
CodePixel Studio/
├── index.html
├── about.html
├── services.html
├── skills.html
├── process.html
├── projects.html
├── testimonials.html
├── contact.html
├── review.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── projects/
│   └── services/
├── server.js
├── package.json
└── database.js
```
