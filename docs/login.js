document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMessage');

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    msg.textContent = 'Invalid email or password';
    msg.className = 'text-danger';
    return;
  }

  // Login success
  localStorage.setItem('currentUser', JSON.stringify(user));

  if (user.username) { 
    localStorage.setItem('username', user.username);
  } else if (user.nickname) { 
    localStorage.setItem('username', user.nickname);
  } else if (user.name) { 
     localStorage.setItem('username', user.name);
  } else {
    console.warn('User object does not have a clear username, nickname, or name property to display.');
  }

  if (!localStorage.getItem("joinedDate") && user.joinedDate) { // Or set it fresh
      localStorage.setItem("joinedDate", user.joinedDate || new Date().toLocaleDateString());
  } else if (!localStorage.getItem("joinedDate")) {
      const today = new Date();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const joinedString = monthNames[today.getMonth()] + " " + today.getFullYear();
      localStorage.setItem("joinedDate", joinedString);
  }

  if (!localStorage.getItem("userAvatar") && user.avatar) {
      localStorage.setItem("userAvatar", user.avatar);
  }


  msg.textContent = 'Login successful! Redirecting...';
  msg.className = 'text-success';

  window.dispatchEvent(new CustomEvent('authChange'));

  setTimeout(() => {
    window.location.href = 'profile.html'; 
  }, 1000);
});

// Lazy loading background images 
document.addEventListener("DOMContentLoaded", () => {
  const lazyBgElements = document.querySelectorAll(".lazy-bg");

  if ("IntersectionObserver" in window) {
    const lazyBgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.dataset.bg;
          if (bg) {
            el.style.backgroundImage = `url(${bg})`;
            lazyBgObserver.unobserve(el);
          }
        }
      });
    });

    lazyBgElements.forEach(el => lazyBgObserver.observe(el));
  } else {
    lazyBgElements.forEach(el => {
      const bg = el.dataset.bg;
      if (bg) {
        el.style.backgroundImage = `url(${bg})`;
      }
    });
  }
});