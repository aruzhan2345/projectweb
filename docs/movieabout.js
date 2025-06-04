document.addEventListener("DOMContentLoaded", () => {
  // Update navbar link to show saved nickname, if any
  const navAuth = document.getElementById("navAuth");
  const savedName = localStorage.getItem("username");

  if (navAuth) {
    if (savedName) {
      navAuth.innerHTML = `
        <a class="nav-link text-white" href="profile.html">
          ${savedName}
        </a>
      `;
    } else {
      navAuth.innerHTML = `
        <a class="nav-link text-white" href="login.html">
          Login/Signup
        </a>
      `;
    }
  }

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  if (!movieId) {
    alert("No movie ID provided in the URL.");
    return;
  }

  const API_KEY = "6668c39b5ea688db81a6f8fac396842b";
  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  fetch(detailsUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`TMDB details fetch failed (status ${res.status})`);
      }
      return res.json();
    })
    .then((movie) => {
      document.querySelector(".movie-title").textContent = movie.title;

      const posterEl = document.querySelector(".poster-image");
      posterEl.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "images/fallback-poster.jpg";
      posterEl.alt = movie.title + " Poster";

      document.querySelector(".description-text").textContent =
        movie.overview || "No description available.";

      const genresContainer = document.querySelector(".genres-container");
      genresContainer.innerHTML = "";
      movie.genres.forEach((g) => {
        const span = document.createElement("span");
        span.classList.add("badge", "bg-secondary");
        span.textContent = g.name;
        genresContainer.appendChild(span);
      });

      document.querySelector(".rating-value").textContent = movie.vote_average.toFixed(1);
      document.querySelector(".vote-count").textContent = `(${movie.vote_count} votes)`;
      document.querySelector(".release-year").textContent = movie.release_date
        ? movie.release_date.split("-")[0]
        : "N/A";

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((videoData) => {
          const trailerFrame = document.querySelector(".trailer-iframe");
          const ytTrailers = videoData.results.filter(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          );
          if (ytTrailers.length > 0) {
            const key = ytTrailers[0].key;
            trailerFrame.src = `https://www.youtube.com/embed/${key}?autoplay=0`;
          } else {
            trailerFrame.src = "";
            trailerFrame.parentElement.innerHTML =
              "<p class='text-center text-white'>No trailer available.</p>";
          }
        })
        .catch((err) => {
          console.warn("Error fetching videos:", err);
        });

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((credits) => {
          // Director
          const director = credits.crew.find((c) => c.job === "Director");
          const directorContainer = document.querySelector(".director-container");
          directorContainer.innerHTML = "";
          if (director) {
            const dImgDiv = document.createElement("div");
            const dImg = document.createElement("img");
            dImg.src = director.profile_path
              ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
              : "images/fallback-profile.png";
            dImg.alt = director.name;
            dImg.classList.add("rounded-circle");
            dImg.style.width = "60px";
            dImg.style.height = "60px";
            dImg.style.objectFit = "cover";
            dImgDiv.appendChild(dImg);

            const dInfoDiv = document.createElement("div");
            const dH6 = document.createElement("h6");
            dH6.textContent = "Director";
            const dP = document.createElement("p");
            dP.classList.add("mb-0", "text-muted");
            dP.textContent = director.name;
            dInfoDiv.append(dH6, dP);

            directorContainer.append(dImgDiv, dInfoDiv);
          } else {
            directorContainer.innerHTML = "<p>No director info.</p>";
          }

          // Composer
          const composer =
            credits.crew.find((c) => c.job === "Original Music Composer") ||
            credits.crew.find((c) => c.job === "Composer");
          const composerContainer = document.querySelector(".composer-container");
          composerContainer.innerHTML = "";
          if (composer) {
            const cImgDiv = document.createElement("div");
            const cImg = document.createElement("img");
            cImg.src = composer.profile_path
              ? `https://image.tmdb.org/t/p/w200${composer.profile_path}`
              : "images/fallback-profile.png";
            cImg.alt = composer.name;
            cImg.classList.add("rounded-circle");
            cImg.style.width = "60px";
            cImg.style.height = "60px";
            cImg.style.objectFit = "cover";
            cImgDiv.appendChild(cImg);

            const cInfoDiv = document.createElement("div");
            const cH6 = document.createElement("h6");
            cH6.textContent = "Music";
            const cP = document.createElement("p");
            cP.classList.add("mb-0", "text-muted");
            cP.textContent = composer.name;
            cInfoDiv.append(cH6, cP);

            composerContainer.append(cImgDiv, cInfoDiv);
          } else {
            composerContainer.innerHTML = "<p>No composer info.</p>";
          }
        })
        .catch((err) => {
          console.warn("Error fetching credits:", err);
        });
    })
    .catch((err) => {
      console.error("Error fetching movie details:", err);
      alert("Failed to load movie details. Please try again later.");
    });

  // Reviews and Add Review
  const reviewForm = document.querySelector(".add-review form");
  const reviewName = document.getElementById("reviewName");
  const reviewText = document.getElementById("reviewText");
  const reviewsSection = document.querySelector(".reviews");
  const ratingContainer = document.getElementById("reviewRating");
  let selectedRating = 0;

  // Load stored reviews
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  function renderReview({ name, text, rating }) {
    const article = document.createElement("article");
    article.className = "card bg-dark text-white mb-3";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title";
    cardTitle.textContent = name + " ";

    const ratingSpan = document.createElement("span");
    ratingSpan.className = "text-warning";
    let starsHtml = "";
    for (let i = 1; i <= rating; i++) starsHtml += "★";
    for (let i = rating + 1; i <= 5; i++) starsHtml += "☆";
    ratingSpan.innerHTML = starsHtml;
    cardTitle.appendChild(ratingSpan);

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = text;

    cardBody.append(cardTitle, cardText);
    article.appendChild(cardBody);

    const reviewsHeading = reviewsSection.querySelector("h5");
    reviewsSection.insertBefore(article, reviewsHeading.nextSibling);
  }

  reviews.forEach(renderReview);

  ratingContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("star")) return;
    selectedRating = +e.target.dataset.value;
    ratingContainer.querySelectorAll(".star").forEach((star) => {
      star.classList.toggle("selected", +star.dataset.value <= selectedRating);
    });
  });

  const reviewSound = new Audio("images/clicksound.mp3");
  reviewSound.preload = "auto";

  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();
    reviewSound.currentTime = 0;
    reviewSound.play();

    const name = reviewName.value.trim();
    const text = reviewText.value.trim();
    if (!name || !text) {
      return alert("Please fill in both your name and review.");
    }
    if (selectedRating === 0) {
      return alert("Please choose a rating.");
    }

    const newReview = { name, text, rating: selectedRating };
    reviews.unshift(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReview(newReview);

    reviewForm.reset();
    selectedRating = 0;
    ratingContainer.querySelectorAll(".star").forEach((s) =>
      s.classList.remove("selected")
    );
  });

  // Pagination for reviews
  const reviewCards = Array.from(reviewsSection.querySelectorAll(".card"));
  const perPage = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(reviewCards.length / perPage);
  const paginationEl = document.getElementById("reviewsPagination");

  function renderPage(page) {
    const start = (page - 1) * perPage;
    reviewCards.forEach((card, i) => {
      card.style.display = i >= start && i < start + perPage ? "block" : "none";
    });
  }

  function buildPagination() {
    paginationEl.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "page-item" + (i === currentPage ? " active" : "");
      const a = document.createElement("a");
      a.className = "page-link";
      a.href = "#";
      a.textContent = i;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        renderPage(currentPage);
        updateActive();
      });
      li.appendChild(a);
      paginationEl.appendChild(li);
    }
  }

  function updateActive() {
    Array.from(paginationEl.children).forEach((li, idx) => {
      li.classList.toggle("active", idx + 1 === currentPage);
    });
  }

  if (totalPages > 1) {
    renderPage(currentPage);
    buildPagination();
  }
});

// lazy‐loading movie content 
document.addEventListener("DOMContentLoaded", () => {
  const movieSection = document.querySelector("main.container");

  function loadMovieData() {
    const poster = document.querySelector(".poster-image");
    const trailer = document.querySelector(".trailer-iframe");
    const title = document.querySelector(".movie-title");
    const description = document.querySelector(".description-text");
    const genresContainer = document.querySelector(".genres-container");

    title.textContent = "Example Movie Title";
    poster.src = "images/example-poster.jpg";
    trailer.src = "https://www.youtube.com/embed/exampletrailer";
    description.textContent = "This is a movie description loaded lazily.";
    genresContainer.innerHTML =
      "<span class='badge bg-secondary'>Action</span> <span class='badge bg-secondary'>Adventure</span>";
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMovieData();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(movieSection);
  } else {
    // fallback
    loadMovieData();
  }
});
