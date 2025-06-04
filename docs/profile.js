// profile.js
document.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.getElementById("profileAvatar");
  const avatarInput = document.getElementById("avatarInput");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");
  const usernameEl = document.getElementById("usernameDisplay");
  const editNameBtn = document.getElementById("editNameBtn");
  const joinedDateEl = document.getElementById("joinedDate");

  if (!avatarImg || !avatarInput || !changeAvatarBtn || !usernameEl || !editNameBtn || !joinedDateEl) {
    console.error("One or more profile elements not found. Check your IDs!");
    return;
  }

  function loadProfileFromLocalStorage() {
    const savedAvatarDataURL = localStorage.getItem("userAvatar");
    if (savedAvatarDataURL) {
      avatarImg.src = savedAvatarDataURL;
    } // Default avatar is set in HTML, so no 'else' needed here if src is already there

    let currentUsername = localStorage.getItem("username");
    if (currentUsername) {
      usernameEl.textContent = currentUsername;
    } else {
      // If no username is in localStorage, use the default from HTML (e.g., "hotc-4")
      // AND save this default back to localStorage to signify a "logged-in" state.
      currentUsername = usernameEl.textContent.trim(); // Get default from HTML
      if (currentUsername) { // Ensure there is a default username to save
          localStorage.setItem("username", currentUsername);
          // Dispatch an event in case any part of the current page (profile.html)
          // needs to react to this implicit login.
          window.dispatchEvent(new CustomEvent('authChange'));
      }
    }

    if (!localStorage.getItem("joinedDate")) {
      const today = new Date();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const joinedString = monthNames[today.getMonth()] + " " + today.getFullYear();
      localStorage.setItem("joinedDate", joinedString);
    }
    const storedJoined = localStorage.getItem("joinedDate");
    if (storedJoined) {
      joinedDateEl.textContent = "Joined " + storedJoined;
    }
  }

  loadProfileFromLocalStorage();

  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("No file chosen for avatar.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result;
      avatarImg.src = dataURL;
      localStorage.setItem("userAvatar", dataURL);
      console.log("Avatar saved to localStorage.");
      // Optionally, dispatch authChange if avatar change should update other UI elements
      // window.dispatchEvent(new CustomEvent('authChange', { detail: { avatarChanged: true } }));
    };
    reader.onerror = (err) => {
      console.error("Error reading avatar file:", err);
    };
    reader.readAsDataURL(file);
  });

  editNameBtn.addEventListener("click", () => {
    const currentName = usernameEl.textContent || "";
    const newName = prompt("Enter your new nickname:", currentName);
    if (newName && newName.trim() !== "") {
      const trimmed = newName.trim();
      usernameEl.textContent = trimmed;
      localStorage.setItem("username", trimmed);
      console.log("Username saved to localStorage:", trimmed);
      // Dispatch an event so other parts of the app (like the header if present on this page) can react
      window.dispatchEvent(new CustomEvent('authChange'));
    } else {
      console.log("Username prompt was canceled or empty.");
    }
  });
});