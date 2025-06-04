document.addEventListener("DOMContentLoaded", () => {
  // Grab references to the DOM elements by their IDs
  const avatarImg       = document.getElementById("profileAvatar");
  const avatarInput     = document.getElementById("avatarInput");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");
  const usernameEl      = document.getElementById("usernameDisplay");
  const editNameBtn     = document.getElementById("editNameBtn");
  const joinedDateEl    = document.getElementById("joinedDate");

  // If any of these are null we’ll log an error
  if (!avatarImg || !avatarInput || !changeAvatarBtn || !usernameEl || !editNameBtn || !joinedDateEl) {
    console.error("One or more profile elements not found. Check your IDs!");
    return;
  }

  // read saved values
  function loadProfileFromLocalStorage() {
    // a) Load avatar data URL if it exists
    const savedAvatarDataURL = localStorage.getItem("userAvatar");
    if (savedAvatarDataURL) {
      avatarImg.src = savedAvatarDataURL;
    } else {
      avatarImg.src = avatarImg.src;
    }

    //  Load username if it exists
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      usernameEl.textContent = savedUsername;
    } else {
      usernameEl.textContent = usernameEl.textContent;
    }

    //  Set joined date (only first time)
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

  //  Change avatar
 
  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("No file chosen for avatar.");
      return;
    }

    // FileReader to convert to Base64 data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target.result; 
      avatarImg.src = dataURL;
      //  Save into localStorage so it persists
      localStorage.setItem("userAvatar", dataURL);
      console.log("Avatar saved to localStorage.");
    };
    reader.onerror = (err) => {
      console.error("Error reading avatar file:", err);
    };
    reader.readAsDataURL(file);
  });

  //  Change username
  editNameBtn.addEventListener("click", () => {
    const currentName = usernameEl.textContent || "";
    const newName = prompt("Enter your new nickname:", currentName);
    if (newName && newName.trim() !== "") {
      const trimmed = newName.trim();
      usernameEl.textContent = trimmed;
      localStorage.setItem("username", trimmed);
      console.log("Username saved to localStorage:", trimmed);
    } else {
      console.log("Username prompt was canceled or empty.");
    }
  });
});
