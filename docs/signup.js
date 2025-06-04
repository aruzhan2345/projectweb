document.getElementById('signupForm').addEventListener('submit', function(e){
  e.preventDefault();

  const name     = document.getElementById('nameInput').value.trim();
  const email    = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;

  if (!name || !email || !password) {
    showMessage('Please fill all fields', 'danger');
    return;
  }

  // load existing users or empty array
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // check for duplicate
  if (users.some(u => u.email === email)) {
    showMessage('Email already in use', 'danger');
    return;
  }

  // add new user
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  showMessage('Account created! Redirecting to login...', 'success');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
});

function showMessage(txt, type){
  const msg = document.getElementById('signupMessage');
  msg.textContent = txt;
  msg.className = type === 'success' ? 'text-success' : 'text-danger';
}
