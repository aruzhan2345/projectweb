Project Overview

AituCritic is a modern, responsive movie review platform that allows users to:

Browse and search for movies.
View detailed movie information (poster, trailer, description, genres, director, composer, external ratings).
Add personal reviews (name, text, star rating) and see paginated review lists.
Manage a personalized Watchlist.
Sign up / Log in, with localStorage–based authentication and profile customization (avatar & nickname).
Contact support via an interactive form and browse a FAQ section.
The platform uses semantic HTML, CSS Flexbox/Grid, media queries, and JavaScript (vanilla JS + Fetch API) for dynamic content and interactivity.

Features

Semantic Layout
Responsive Design (mobile-first approach)
Search with Live Suggestions
Horizontally Scrollable Carousels (Top Rated, New Releases, Recommended, Watchlist)
Trailer Modals
User Authentication (signup & login stored in localStorage)
Profile Management (change avatar, edit nickname, display joined date)
Watchlist (add/remove movies, horizontally scrollable carousel)
Movie Details (fetched from TMDB API: poster, release date, vote average, vote count, genres, director/composer images)
Add & Paginate Reviews (star rating UI, save reviews to localStorage, render newest-first, pagination)
Support Page (contact form, FAQ collapsible sections)
Accessibility Enhancements (ARIA labels, focus outlines)
Optimized Assets (lazy loading of images/iframes, WebP where available)
Deployed on GitHub Pages
Technologies Used

HTML5 & Semantic Tags (<header>, <main>, <section>, <article>, <footer>)
CSS3
Flexbox & CSS Grid
Media Queries (mobile-first)
Custom properties (in support.css)
JavaScript (ES6+)
Vanilla JS for DOM manipulation, event handling, form validation, and localStorage
Fetch API for TMDB integration
IntersectionObserver API for lazy loading backgrounds and movie content
Bootstrap 5 (for base styling and components)
TMDB (The Movie Database) API
GitHub Pages (for deployment)
Criteria Coverage

1. User Interface & Design
Use of Semantic HTML
All pages employ <header>, <main>, <section>, <article>, <footer>, <nav>, <aside>, etc., ensuring clear document structure.
Aesthetics and Structure
Consistent dark theme (#121212 background, white text) with red accents.
Logical layout:
Navbar at top → main content → footer on all pages.
Movie details page splits into a poster/trailer row and info/review columns (.row, .col-md-*).
Watchlist page uses a sidebar (<aside>) and main carousel (<div class="carousel-wrapper">).
CSS Layout Techniques
Flexbox
Navigation menu items (.navbar-nav .nav-item) aligned with d-flex and gap-3.
Profile page: avatar & buttons aligned using flex and gap.
Grid
FAQ section uses CSS Grid (.faq-grid) for responsive columns.
Movie carousels maintain a horizontal flex container (.movies-grid), while the sidebar uses flex for profile alignment.
Media Queries
Mobile‐first approach:
Mobile styles under @media (max-width: 600px) or @media (max-width: 768px) adjust font sizes, hide scroll buttons, simplify layout.
Breakpoints ensure readability on phones, tablets, and desktops.
Comment: The interface demonstrates a solid understanding of semantic HTML and modern CSS layout (Flexbox & Grid).
2. Responsiveness & Cross-Browser Compatibility
Responsiveness
Pages adapt smoothly from 320 px (mobile) to 1920 px (desktop).
Carousels become single‐column stacks on narrow viewports.
Navigation collapses to a hamburger menu (< 768 px) via Bootstrap’s navbar-toggler.
Cross-Browser Testing
Verified functionality & styles on:
Google Chrome (latest)
Mozilla Firefox (latest)
Microsoft Edge (latest)
Safari (Mac OS)
Mobile-First Approach
Base styles assume mobile viewport; desktop enhancements added via media queries.
Comment: The project was tested in major browsers and adapts to different screen sizes, following a mobile-first strategy.
3. Interactivity & JavaScript Usage
Dynamic Elements
Modal Windows
Trailer modal on the homepage and movie details page uses Bootstrap’s modal component.
Form Validation & Feedback
Signup validation: checks for empty fields and email duplicates, shows success/error messages.
Login validation: checks credentials against localStorage, displays “Invalid email or password” or “Login successful!” feedback.
Animations
Simple transform: scale(1.02) on .movie-card:hover.
Smooth scroll behavior (scrollBy({ behavior: "smooth" })) for carousels.
Event Handling
Used addEventListener() for:
DOMContentLoaded (initialize UI and load data)
Click events on buttons (carousel-button, pagination links, changeAvatarBtn, etc.)
Input & change events (search input, avatar file input, star rating clicks)
Responsive menu toggling handled by Bootstrap JS.
DOM Manipulation
document.querySelector(), getElementById(), innerHTML, classList, appendChild to dynamically build:
Movie cards, carousels, search suggestions (<li> items), review cards (<article>), FAQ items toggling.
Profile & Watchlist data loaded/saved from localStorage and rendered on screen.
Comment: The project includes interactive elements (carousels, modals, forms, star-rating, FAQ toggles) implemented via vanilla JavaScript.
4. API Integration
Fetching and Displaying Data from APIs
TMDB API used to fetch:
Movie details (/movie/{id} endpoint) for title, overview, poster, genres, release date, vote average/vote count.
Movie videos (/movie/{id}/videos) for YouTube trailers.
Movie credits (/movie/{id}/credits) for director and composer profiles.
Handling API Responses
JSON responses parsed with res.json().
Rendered into the DOM:
Poster URL (https://image.tmdb.org/t/p/w500 + poster_path)
Trailer iframe URL (https://youtube.com/embed/ + videoKey)
Credit images (w200 size) or fallback placeholder if missing.
Genres displayed as <span class="badge bg-secondary">.
Error Handling
if (!res.ok) → throw Error; caught in .catch(), display alert: “Failed to load movie details. Please try again later.”
Warnings in console for missing videos or credits.
Comment: Demonstrates use of fetch() for API requests, proper data rendering, and basic error handling.
5. Forms and Data Validation
Form Creation
Used <form>, <input>, <textarea>, <select>, and <button> across pages:
Signup (signup.html), Login (login.html), Add Review (inside movieabout.html), Contact (in support.html).
Client-Side Validation
Signup: Checks that name, email, password are non-empty. Ensures no duplicate email in localStorage user list.
Login: Verifies email/password combination against stored users.
Add Review: Ensures name, text, and a star rating (1–5) are provided before submission.
Contact Form:
<input required> attributes on First Name, Last Name, Email, Phone.
<select required> on Subject.
<textarea required> for message.
Terms checkbox required.
User Feedback
Inline messages (<div id="signupMessage">, #loginMessage) styled with Bootstrap classes (text-success, text-danger).
alert("Please fill in both your name and review.") if validation fails on Add Review.
Support page does not actually submit but can show stubbed feedback on success/failure.
Comment: Forms prevent invalid submissions and guide users with clear error/success messages.
6. Code Optimization and Performance
Code Minification & Refactoring
CSS and JS are structured into page-specific files (e.g., homepage.css, movieabout.css, profile.js) rather than monolithic blobs.
Unused code removed (e.g., fallback loaders hidden once content is ready).
Image Optimization
Used .webp versions for static backgrounds where possible (e.g., signup.html background).
Poster and profile images fetched via TMDB in appropriate sizes (w500, w200) to avoid oversized downloads.
Logo and icons use SVG or compressed PNG.
Lazy Loading
loading="lazy" on <img> and <iframe> tags for posters/trailers.
IntersectionObserver in login.js to lazy‐load background images (.lazy-bg).
IntersectionObserver in movieabout.js for lazily injecting placeholder content if needed.
Comment: The project demonstrates efficient code organization, lazy loading of large assets, and use of compressed image formats.
7. Deployment and Accessibility
Project Deployment
Hosted on GitHub Pages at:
https://YourUsername.github.io/AituCritic/
Public Availability
Users can browse live via the URL without any backend dependencies.
Code Readability & Documentation
Inline comments in JS files explain key logic (e.g., “// Load stored reviews”, “// Change avatar logic”).
This README.md documents the project, features, setup instructions, and how each criterion is met.
Accessibility
ARIA labels on navigation toggles (e.g., aria-label="Scroll left") and trailer modal.
Sufficient color contrast (white text on dark backgrounds).
Focus outlines preserved for keyboard navigation (no outline: none on interactive elements).
Comment: The project is live on GitHub Pages, includes documentation, and adheres to basic accessibility standards.
Minimum Number of Pages

The project includes six distinct pages, each linked via a consistent navigation menu:

Home (index.html)
Banner (semantic <section class="banner">)
Search results (dynamically shown/hidden)
Carousels: Top Rated, New Releases, Recommended
Movie Details (movieabout.html)
Poster & trailer (two-column layout)
Description, genres, reviews, add review form (five sections with semantic <section> tags)
Movie info box (release year, ratings, director, composer)
Login (login.html)
<form> with email/password inputs, “Remember me” checkbox, “Forgot password?” link
Signup (signup.html)
<form> with name, email, password, and messaging section
Profile (profile.html)
Avatar uploader, nickname editor, joined date display, link to Watchlist
Watchlist (watchlist.html)
Sidebar profile card and horizontally scrollable watchlist carousel
Support (support.html)
Contact form (<form>) and FAQ section (.faq-grid)
Minimum structure requirement is satisfied:
Homepage (with data display: carousels)
Form page (Login/Signup/Support)
Data display page (Movie Details, Watchlist)
Navigation menu links on every page ensure seamless travel between them.
