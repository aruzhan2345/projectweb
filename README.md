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
