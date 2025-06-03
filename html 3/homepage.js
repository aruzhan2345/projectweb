// Visit counter
document.addEventListener("DOMContentLoaded", () => {
  const siteName = "AituCritic";
  const el = document.getElementById("visitCountDisplay");

  let visits = parseInt(localStorage.getItem("visitCount") || "0", 10);
  visits++;
  localStorage.setItem("visitCount", visits);
  el.textContent = `${siteName} visit #${visits} — Enjoy!`;
});


// Banner slider (vanilla JS)
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");
  if (!banner) return;

  const slidesContainer = banner.querySelector(".slides");
  const slides = Array.from(banner.querySelectorAll(".slide"));
  const prevArrow = banner.querySelector(".banner-arrow.left");
  const nextArrow = banner.querySelector(".banner-arrow.right");
  let currentIndex = 0;

  if (!slidesContainer || slides.length === 0 || !prevArrow || !nextArrow) return;

  const totalSlides = slides.length;
  slidesContainer.style.width = `${100 * totalSlides}%`;

  function updateBannerSlides() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
  }

  prevArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateBannerSlides();
  });

  nextArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateBannerSlides();
  });

  if (totalSlides < 2) {
    prevArrow.style.display = "none";
    nextArrow.style.display = "none";
  }

  updateBannerSlides();
});


// Scroll movies horizontally
const movieSections = document.querySelectorAll(".movies-container");
movieSections.forEach((section) => {
  const leftArrow = section.querySelector(".movies-arrow.left");
  const rightArrow = section.querySelector(".movies-arrow.right");
  const grid = section.querySelector(".movies-grid");

  if (!leftArrow || !rightArrow || !grid) return;

  leftArrow.addEventListener("click", () => {
    grid.scrollBy({ left: -grid.clientWidth, behavior: "smooth" });
  });
  rightArrow.addEventListener("click", () => {
    grid.scrollBy({ left: grid.clientWidth, behavior: "smooth" });
  });
});


// Watchlist button logic
document.querySelectorAll(".watchlist-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const movie = {
      title: button.dataset.title,
      image: button.dataset.image,
      rating: button.dataset.rating,
      runtime: button.dataset.runtime,
    };

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const alreadyExists = watchlist.some((item) => item.title === movie.title);

    if (!alreadyExists) {
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(`${movie.title} added to your Watchlist!`);
    } else {
      alert(`${movie.title} is already in your Watchlist.`);
    }
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    const gFrame = document.querySelector(".goog-te-banner-frame.skiptranslate");
    if (gFrame) {
      gFrame.parentNode.removeChild(gFrame);
    }
    document.body.style.top = "0px";
  }, 100);
});


// Banner slider (jQuery fallback)
;(function () {
  const $slides = $(".slide");
  const $container = $(".slides");
  let currentIndex = 0;
  const totalSlides = $slides.length;

  function goTo(idx) {
    $container.css("transform", `translateX(-${idx * 100}%)`);
  }

  $(".banner-arrow.left").on("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goTo(currentIndex);
  });

  $(".banner-arrow.right").on("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    goTo(currentIndex);
  });
})();

// Trailer modal wiring
document.querySelectorAll(".trailer-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-trailer-url");
    document.getElementById("trailerIframe").src = url;

    const modal = new bootstrap.Modal(document.getElementById("trailerModal"));
    modal.show();
  });
});

const trailerModalEl = document.getElementById("trailerModal");
if (trailerModalEl) {
  trailerModalEl.addEventListener("hidden.bs.modal", () => {
    const iframe = document.getElementById("trailerIframe");
    if (iframe) iframe.src = "";
  });
}


// Update login/signup or profile link
;(function () {
  function updateAuthLink() {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    const authLi = document.getElementById("authLink");
    if (!authLi) return;

    if (user) {
      authLi.classList.add("dropdown");
      authLi.innerHTML = `
        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown"
           role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${user.name}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li>
            <a class="dropdown-item" href="profile.html">
              Your profile
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="#" id="signOutBtn">
              Sign out
            </a>
          </li>
        </ul>
      `;
      document.getElementById("signOutBtn").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      });
    } else {
      authLi.classList.remove("dropdown");
      authLi.innerHTML = `
        <a class="nav-link" href="login.html">
          Login/Signup
        </a>
      `;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAuthLink);
  } else {
    updateAuthLink();
  }
})();

// TMDB integration for 3 sections
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "6668c39b5ea688db81a6f8fac396842b";

  // Top Rated 
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  fetch(topRatedUrl, { method: "GET", headers: { accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`TMDB fetch failed (status ${res.status})`);
      return res.json();
    })
    .then((data) => {
      const loader = document.getElementById("topRatedLoading");
      if (loader) loader.remove();
      renderTopRatedMovies(data.results);
    })
    .catch((err) => {
      const loader = document.getElementById("topRatedLoading");
      if (loader) loader.remove();
      displayFetchError(err);
    });

  // New Releases 
  const newReleasesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  fetch(newReleasesUrl, { method: "GET", headers: { accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`TMDB fetch failed (status ${res.status})`);
      return res.json();
    })
    .then((data) => {
      const loader = document.getElementById("newReleasesLoading");
      if (loader) loader.remove();
      renderNewReleasesMovies(data.results);
    })
    .catch((err) => {
      const loader = document.getElementById("newReleasesLoading");
      if (loader) loader.remove();
      displaySectionError(err, "newReleasesGrid");
    });

  // Recommended 
  const recommendedUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  fetch(recommendedUrl, { method: "GET", headers: { accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`TMDB fetch failed (status ${res.status})`);
      return res.json();
    })
    .then((data) => {
      const loader = document.getElementById("recommendedLoading");
      if (loader) loader.remove();
      renderRecommendedMovies(data.results);
    })
    .catch((err) => {
      const loader = document.getElementById("recommendedLoading");
      if (loader) loader.remove();
      displaySectionError(err, "RecommendedGrid");
    });

    // ─── Grab references to new elements ───────────────────────────────────
  const searchInput    = document.getElementById("searchInput");
  const suggestionsList = document.getElementById("suggestionsList");
  const searchForm     = document.getElementById("searchForm");

  let debounceTimer = null;

  // ─── Listen for keystrokes on the input ───────────────────────────────
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();

    // 1) If input is empty → hide suggestions and return
    if (!query) {
      suggestionsList.style.display = "none";
      suggestionsList.innerHTML = "";
      return;
    }

    // 2) Debounce: clear any existing timer, then set a new one
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAutocompleteResults(query);
    }, 300); 
  });

  // ─── Fetch top 10 matching movies from TMDB’s /search/movie ───────────
  function fetchAutocompleteResults(query) {
    const url = `https://api.themoviedb.org/3/search/movie` +
                `?api_key=${API_KEY}` +
                `&language=en-US` +
                `&page=1` +
                `&include_adult=false` +
                `&query=${encodeURIComponent(query)}`;

    fetch(url, {
      method: "GET",
      headers: { accept: "application/json" }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`TMDB search failed (status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        buildSuggestionsDropdown(data.results || []);
      })
      .catch((err) => {
        console.error(err);
        suggestionsList.style.display = "none";
        suggestionsList.innerHTML = "";
      });
  }

  function buildSuggestionsDropdown(movies) {
    // 1) Clear old suggestions
    suggestionsList.innerHTML = "";

    // 2) If no results, hide the dropdown
    if (!movies.length) {
      suggestionsList.style.display = "none";
      return;
    }

    // 3) Only show top 8 (or fewer) to avoid huge list
    const topResults = movies.slice(0, 8);

    topResults.forEach((movie) => {
      const li = document.createElement("li");
      li.classList.add("suggestion-item");
      li.setAttribute("data-id", movie.id);

      // Poster thumbnail
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` 
        : "images/fallback-poster.jpg";

      li.innerHTML = `
        <img
          class="suggestion-thumb"
          src="${posterUrl}"
          alt="${movie.title} poster"
        />
        <div class="suggestion-text">
          <span class="title">${movie.title}</span>
          <span class="year">${movie.release_date 
            ? new Date(movie.release_date).getFullYear() 
            : ""}</span>
        </div>
      `;

      // When clicking a suggestion go to movieabout.html?id=<movie.id>
      li.addEventListener("click", () => {
        window.location.href = `movieabout.html?id=${movie.id}`;
      });

      suggestionsList.appendChild(li);
    });

    // 4) Show the dropdown 
    suggestionsList.style.display = "block";
  }

  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target)) {
      suggestionsList.style.display = "none";
      suggestionsList.innerHTML = "";
    }
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstLi = suggestionsList.querySelector("li[data-id]");
    if (firstLi) {
      const movieId = firstLi.getAttribute("data-id");
      window.location.href = `movieabout.html?id=${movieId}`;
    }
  });

});


// Show error inside a particular section 
function displaySectionError(error, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center text-danger mt-4">
      <p>Не удалось загрузить данные (Error: ${error.message}). Пожалуйста, попробуйте позже.</p>
    </div>
  `;
}

// Existing Top Rated render function
function renderTopRatedMovies(movies) {
  const container = document.getElementById("topRatedGrid");
  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "images/fallback-poster.jpg";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <a href="movieabout.html?id=${movie.id}">
        <img src="${posterPath}" alt="${movie.title}" loading="lazy">
      </a>
      <h3>${movie.title}</h3>
      <div class="movie-meta">
        <span class="rating">&#9733; ${movie.vote_average.toFixed(1)}</span>
        <span class="runtime">&#128338; ${formatRuntime(movie.runtime)}</span>
      </div>
      <button
        class="watchlist-btn"
        data-title="${movie.title}"
        data-image="${posterPath}"
        data-rating="${movie.vote_average.toFixed(1)}"
        data-runtime="${formatRuntime(movie.runtime)}">
        + Watchlist
      </button>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll("#topRatedGrid .watchlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const movie = {
        title: button.dataset.title,
        image: button.dataset.image,
        rating: button.dataset.rating,
        runtime: button.dataset.runtime,
      };
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const alreadyExists = watchlist.some((item) => item.title === movie.title);
      if (!alreadyExists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.title} added to your Watchlist!`);
      } else {
        alert(`${movie.title} is already in your Watchlist.`);
      }
    });
  });
}

// New Releases render function
function renderNewReleasesMovies(movies) {
  const container = document.getElementById("newReleasesGrid");
  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "images/fallback-poster.jpg";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <a href="movieabout.html?id=${movie.id}">
        <img src="${posterPath}" alt="${movie.title}" loading="lazy">
      </a>
      <h3>${movie.title}</h3>
      <div class="movie-meta">
        <span class="rating">&#9733; ${movie.vote_average.toFixed(1)}</span>
        <span class="runtime">&#128338; ${formatRuntime(movie.runtime)}</span>
      </div>
      <button
        class="watchlist-btn"
        data-title="${movie.title}"
        data-image="${posterPath}"
        data-rating="${movie.vote_average.toFixed(1)}"
        data-runtime="${formatRuntime(movie.runtime)}"
      >
        + Watchlist
      </button>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll("#newReleasesGrid .watchlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const movie = {
        title: button.dataset.title,
        image: button.dataset.image,
        rating: button.dataset.rating,
        runtime: button.dataset.runtime,
      };
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const alreadyExists = watchlist.some((item) => item.title === movie.title);
      if (!alreadyExists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.title} added to your Watchlist!`);
      } else {
        alert(`${movie.title} is already in your Watchlist.`);
      }
    });
  });
}


// Recommended
function renderRecommendedMovies(movies) {
  const container = document.getElementById("RecommendedGrid");
  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "images/fallback-poster.jpg";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <a href="movieabout.html?id=${movie.id}">
        <img src="${posterPath}" alt="${movie.title}">
      </a>
      <h3>${movie.title}</h3>
      <div class="movie-meta">
        <span class="rating">&#9733; ${movie.vote_average.toFixed(1)}</span>
        <span class="runtime">&#128338; ${formatRuntime(movie.runtime)}</span>
      </div>
      <button
        class="watchlist-btn"
        data-title="${movie.title}"
        data-image="${posterPath}"
        data-rating="${movie.vote_average.toFixed(1)}"
        data-runtime="${formatRuntime(movie.runtime)}"
      >
        + Watchlist
      </button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll("#RecommendedGrid .watchlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const movie = {
        title: button.dataset.title,
        image: button.dataset.image,
        rating: button.dataset.rating,
        runtime: button.dataset.runtime,
      };
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const alreadyExists = watchlist.some((item) => item.title === movie.title);
      if (!alreadyExists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.title} added to your Watchlist!`);
      } else {
        alert(`${movie.title} is already in your Watchlist.`);
      }
    });
  });
}

//Format runtime 
function formatRuntime(runtime) {
  if (!runtime || isNaN(runtime)) return "—";
  return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
}

//  Show error in Top Rated
function displayFetchError(error) {
  const container = document.getElementById("topRatedGrid");
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center text-danger mt-4">
      <p>Не удалось загрузить данные (Error: ${error.message}). Пожалуйста, попробуйте позже.</p>
    </div>
  `;
}