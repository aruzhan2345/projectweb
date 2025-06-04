document.addEventListener("DOMContentLoaded", function () {

  //  Load and render Watchlist carousel

  const raw = localStorage.getItem("watchlist");
  let watchlist = [];
  try {
    watchlist = raw ? JSON.parse(raw) : [];
  } catch {
    watchlist = [];
  }

  // Migrate any old-format entries 
  let migrated = false;
  watchlist = watchlist
    .map((m) => {
      if (!m || typeof m !== "object") return null;
      
      if (m.image && !m.img) {
        m.img = m.image;
        delete m.image;
        migrated = true;
      }
      // Ensure required fields exist
      m.rating = m.rating || "";
      m.runtime = m.runtime || "";
      m.title = m.title || "";
      return m;
    })
    .filter((m) => m !== null);

  if (migrated) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }

  const container = document.getElementById("watchlistContainer");
  if (container) {
    if (watchlist.length === 0) {
      container.innerHTML = "<p>Your watchlist is empty.</p>";
    } else {
      watchlist.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        
        card.innerHTML = `
          <img src="${movie.img}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <div class="movie-meta">
            <span class="rating">&#9733; ${movie.rating}</span>
            <span class="runtime">${movie.runtime}</span>
          </div>`;
        container.appendChild(card);
      });
    }
  }

 
  // sidebar avatar + name from localStorage

  const savedAvatar = localStorage.getItem("userAvatar");
  const savedName = localStorage.getItem("username");

  const initialElem = document.querySelector(".profile-initial");
  const nameElem = document.querySelector(".profile-name");

  // Name
  if (nameElem) {
    if (savedName) {
      nameElem.textContent = savedName;
    } else {
      // fallback if nothing in localStorage
      nameElem.textContent = "hotc-4";
    }
  }

  // Avatar
  if (initialElem) {
    if (savedAvatar) {
      const img = document.createElement("img");
      img.src = savedAvatar;
      img.alt = "Avatar";
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.borderRadius = "50%";
      img.style.objectFit = "cover";
      
      initialElem.replaceWith(img);
    } else if (savedName) {
      initialElem.textContent = savedName.charAt(0).toUpperCase();
    } else {
      initialElem.textContent = "M";
    }
  }
});
