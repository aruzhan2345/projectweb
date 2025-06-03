document.addEventListener("DOMContentLoaded", () => {
  
  // Toggle Avatar Upload

  const profileAvatar = document.getElementById("profileAvatar");
  const avatarInput = document.getElementById("avatarInput");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");

  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profileAvatar.src = event.target.result;
        
      };
      reader.readAsDataURL(file);
    }
  });


  // 2) Edit Username
  const usernameDisplay = document.getElementById("usernameDisplay");
  const editNameBtn = document.getElementById("editNameBtn");

  editNameBtn.addEventListener("click", () => {
    const currentName = usernameDisplay.textContent;
    const newName = prompt("Enter a new display name:", currentName);
    if (newName && newName.trim() !== "") {
      usernameDisplay.textContent = newName.trim();
      
    }
  });


});
