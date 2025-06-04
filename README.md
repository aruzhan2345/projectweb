## Project Overview

**AituCritic** is a modern, responsive movie review platform that allows users to:
- Browse and search for movies.  
- View detailed movie information (poster, trailer, description, genres, director, composer, external ratings).  
- Add personal reviews (name, text, star rating) and see paginated review lists.  
- Manage a personalized Watchlist.  
- Sign up / log in, with localStorage–based authentication and profile customization (avatar & nickname).  
- Contact support via an interactive form and browse a FAQ section.  

The platform uses semantic HTML, CSS (Flexbox/Grid), media queries, and vanilla JavaScript (Fetch API) for dynamic content and interactivity.  

---

## Features

- **Semantic Layout**  
- **Responsive Design** (mobile-first)  
- **Search with Live Suggestions**  
- **Horizontally Scrollable Carousels** (Top Rated, New Releases, Recommended, Watchlist)  
- **Trailer Modals**  
- **User Authentication** (signup & login stored in localStorage)  
- **Profile Management** (change avatar, edit nickname, display joined date)  
- **Watchlist** (add/remove movies, horizontally scrollable carousel)  
- **Movie Details** (fetched from TMDB API: poster, release date, vote average, vote count, genres, director/composer images)  
- **Add & Paginate Reviews** (star rating UI, save reviews to localStorage, render newest-first, pagination)  
- **Support Page** (contact form, FAQ collapsible sections)  
- **Accessibility Enhancements** (ARIA labels, focus outlines)  
- **Optimized Assets** (lazy loading of images/iframes, WebP where available)  
- **Deployed on GitHub Pages**  

---

## Technologies Used

- **HTML5** (& semantic tags: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<aside>`)  
- **CSS3**  
  - Flexbox & CSS Grid  
  - Media Queries (mobile-first)  
- **JavaScript (ES6+)**  
  - Vanilla JS: DOM manipulation, event handling, localStorage  
  - Fetch API for TMDB integration  
  - IntersectionObserver API for lazy loading  
- **Bootstrap 5** (base styling & components)  
- **TMDB (The Movie Database) API**  
- **GitHub Pages** (deployment)  
Criteria Coverage

1. User Interface & Design
- Use of Semantic HTML
All pages use semantic tags:
<header>, <main>, <section>, <article>, <footer>, <nav>, <aside>.
- Aesthetics & Structure
Consistent dark theme (#121212 background, white text, red accents).
- Logical layout structure:
Navbar → main content → footer on each page.
Movie details page: two-column row for poster/trailer, two-column row for description/reviews + info box.
Watchlist page: sidebar (<aside>) and main carousel (<div class="carousel-wrapper">).
CSS Layout Techniques
Flexbox
.navbar-nav .nav-item aligned with d-flex and gap-3.
Profile page uses flex + gap for avatar & buttons.
Grid
FAQ section: .faq-grid uses CSS Grid for responsive columns.
Movie carousels: .movies-grid as a flex container.
Media Queries
Mobile-first under @media (max-width: 600px) and @media (max-width: 768px): font-size adjustments, hide scroll buttons, stack columns.
Comment: Demonstrates a structured, user-friendly interface using semantic HTML and modern CSS (Flexbox/Grid).
2. Responsiveness & Cross-Browser Compatibility
Responsiveness
Adapts from 320 px (mobile) to 1920 px (desktop).
Carousels collapse to single-column stacks on narrow viewports.
Navbar collapses into a hamburger menu at < 768px.
Cross-Browser Testing
Verified on:
Google Chrome (latest)
Mozilla Firefox (latest)
Microsoft Edge (latest)
Safari (MacOS)
Mobile-First Approach
Base styles target mobile; enhancements added via media queries.
Comment: Tested on major browsers and adapts correctly to various screen resolutions.
3. Interactivity & JavaScript Usage
Dynamic Elements
Modal Windows
Trailer modals on homepage and movie details page (Bootstrap modal).
Form Validation & Feedback
Signup: ensure non-empty fields, no duplicate email → show inline messages.
Login: validate credentials → “Invalid email or password” or “Login successful!” feedback.
Add Review: require name, text, and star rating → alert(...) on failure.
Animations
Hover scale on .movie-card:hover { transform: scale(1.02); }.
Smooth carousel scrolling:
carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
Event Handling
Used addEventListener() for:
DOMContentLoaded (initialize UI, load data)
click events on buttons, pagination links, change-avatar button, star rating elements
input/change events for search input and avatar file input
DOM Manipulation
document.querySelector(), getElementById(), innerHTML, classList, appendChild() to dynamically build:
Movie cards, carousels, search suggestion <li> items, review cards (<article>), FAQ toggles.
Profile & Watchlist data loaded/saved via localStorage and rendered in DOM.
Comment: Includes interactive elements—carousels, modals, forms, star‐rating, FAQ toggles—using vanilla JavaScript.
4. API Integration
Fetching & Displaying Data
TMDB API endpoints used in movieabout.js:
/movie/{id} → title, overview, poster, genres, release date, vote average/count
/movie/{id}/videos → filter for YouTube trailers → embed iframe
/movie/{id}/credits → find Director and Composer → display profile images (w200)
Handling API Responses
Parsed JSON responses:
fetch(detailsUrl)
  .then(res => {
    if (!res.ok) throw new Error(`TMDB fetch failed (status ${res.status})`);
    return res.json();
  })
  .then(movie => {
    document.querySelector(".movie-title").textContent = movie.title;
    // ...
  })
  .catch(err => {
    console.error("Error fetching movie details:", err);
    alert("Failed to load movie details. Please try again later.");
  });
Rendered data into DOM: <img>, <span class="badge">, <iframe>, <h6> for director/composer.
Error Handling
If res.ok === false, throw an error and show alert("Failed to load movie details...").
Logged warnings for missing trailers or credits in console.warn().
Comment: Demonstrates use of fetch() for API requests, correct rendering of data, and basic error handling.
5. Forms and Data Validation
Form Creation
Utilized <form>, <input>, <textarea>, <select>, <button> in:
signup.html (name, email, password)
login.html (email, password, “Remember me”)
movieabout.html (“Add Your Review” form)
support.html (contact form: First Name, Last Name, Email, Phone, Subject, Message, Terms checkbox)
Client-Side Validation
Signup:
Prevent submission if any field is empty:
if (!name || !email || !password) {
  showMessage("Please fill all fields", "danger");
  return;
}
Check duplicate email in localStorage:
if (users.some(u => u.email === email)) {
  showMessage("Email already in use", "danger");
  return;
}
Login:
Validate email/password against stored users; show “Invalid email or password.”
Add Review:
Require name and text (non-empty) and a star rating (1–5); else alert(...).
Contact Form:
Fields marked required (First Name, Last Name, Email, Phone, Subject, Message, Terms).
User Feedback
Inline messages:
#signupMessage → text-success / text-danger classes.
#loginMessage → text-success / text-danger.
alert(...) for missing review inputs.
Comment: Forms prevent invalid submissions and provide clear feedback to users.
6. Code Optimization and Performance
Code Structure & Refactoring
Split CSS and JS into page-specific files (e.g., homepage.css, movieabout.css, profile.js).
Removed unused code blocks and redundant imports.
Image Optimization
Static backgrounds use .webp (e.g., signup.html background).
TMDB images requested at appropriate sizes (w500 for posters, w200 for profile images).
Logo and icons use compressed PNG or SVG.
Lazy Loading
loading="lazy" on <img> and <iframe> tags for posters/trailers.
IntersectionObserver in login.js to lazy‐load background images (.lazy-bg).
IntersectionObserver in movieabout.js for lazy‐injecting placeholder content.
Comment: Demonstrates efficient code organization, lazy loading of large assets, and use of optimized image formats.
7. Deployment and Accessibility
Project Deployment
GitHub Pages:
https://YourUsername.github.io/AituCritic/
Public Availability
Live site accessible without any server backend.
Code Readability & Documentation
Inline comments in JS files explain key logic (e.g., “// Load stored reviews”).
This README.md documents features, setup, and how each criterion is met.
Accessibility
ARIA attributes for navigation toggles (e.g., aria-label="Scroll left").
Sufficient color contrast (white on dark).
Focus outlines preserved for keyboard navigation (no outline: none).
Comment: The project is live on GitHub Pages, includes comprehensive documentation, and follows basic accessibility standards.
Minimum Number of Pages

This project includes seven distinct, interlinked pages (via a <nav> on each):

Home (index.html)
Sections: Banner, Search, Top Rated, New Releases, Recommended
Movie Details (movieabout.html)
Two-column layout: Poster & Trailer
Sections: Description, Genres, Reviews (with pagination), Add Review, Movie Info Box
Login (login.html)
Fields: Email, Password, “Remember me” checkbox, “Forgot password?” link
Signup (signup.html)
Fields: Name, Email, Password
Profile (profile.html)
Avatar upload, Nickname edit, Joined date display, Link to Watchlist
Watchlist (watchlist.html)
Sidebar (profile + navigation)
Main: Horizontally scrollable movie cards (Watchlist)
Support (support.html)
Contact form (First Name, Last Name, Email, Phone, Subject, Message, Terms)
FAQ grid with collapsible items
Minimum structure satisfied:
Homepage with data display (carousels)
Form pages (Login, Signup, Support)
Data display pages (Movie Details, Watchlist)
Navigation menu (<nav>) present on all pages
