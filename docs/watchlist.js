document.addEventListener("DOMContentLoaded", function () {

  const raw = localStorage.getItem("watchlist");
  let watchlist = [];
  try {
  watchlist = raw ? JSON.parse(raw) : [];
  } catch {
  watchlist = [];
  }
  
  let migrated = false;
  watchlist = watchlist
  .map((m) => {
  if (!m || typeof m !== "object") return null;
  
  if (!m.title && !m.img && !m.image) {
  return null;
  }
  if (m.image && !m.img) {
  m.img = m.image;
  delete m.image;
  migrated = true;
  }
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
  <span class="rating">${movie.rating}</span>
  <span class="runtime">${movie.runtime}</span>
  </div>
  `;
  container.appendChild(card);
  });
  }
  }
  });
  
  

  const PROFILE_KEY = "aitucriticProfile";
  const profileData = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
  
  const initialElem = document.querySelector(".profile-initial");
  const nameElem = document.querySelector(".profile-name");
  
  if (nameElem) {
  if (profileData.username) {
  nameElem.textContent = profileData.username;
  }
  }
  
  if (initialElem) {
  if (profileData.avatar) {
  const img = document.createElement("img");
  img.src = profileData.avatar;
  img.alt = "Avatar";
  img.style.width = "40px";
  img.style.height = "40px";
  img.style.borderRadius = "50%";
  img.style.objectFit = "cover";
  initialElem.replaceWith(img);
  } else if (profileData.username) {
  initialElem.textContent = profileData.username.charAt(0).toUpperCase();
  }
  }