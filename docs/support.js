document.addEventListener("DOMContentLoaded", function() {

  //  FAQ toggle logic 
  $('.faq-question').on('click', function() {
    $(this).closest('.faq-item').toggleClass('active');
  });

  // Hero‐banner text replacements 
  const heroHeading = document.querySelector('.hero-banner h1');
  if (heroHeading) {
    heroHeading.textContent = "Need Help? You’re in the Right Place!";
  }
  const heroParagraph = document.querySelector('.hero-banner p');
  if (heroParagraph) {
    heroParagraph.innerHTML = "Let us <strong>guide</strong> you through any issues or questions you have.";
  }

 
  //  Contact‐form submission save into localStorage
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      //  Read all form field values
      const firstName = document.getElementById('firstName').value.trim();
      const lastName  = document.getElementById('lastName').value.trim();
      const email     = document.getElementById('email').value.trim();
      const phone     = document.getElementById('phone').value.trim();
      const subject   = document.getElementById('subject').value;
      const message   = document.getElementById('message').value.trim();
      const agree     = document.getElementById('agree').checked;

      //  ensure required fields are non‐empty
      if (!firstName || !lastName || !email || !subject || !message || !agree) {
        alert('Please fill in all fields and agree to the Terms before sending.');
        return;
      }

      // Build a submission object
      const submission = {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
      };

      // Read existing array from localStorage
      let allSubmissions = [];
      try {
        const raw = localStorage.getItem('supportSubmissions');
        allSubmissions = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(allSubmissions)) {
          allSubmissions = [];
        }
      } catch {
        allSubmissions = [];
      }

      allSubmissions.push(submission);
      localStorage.setItem('supportSubmissions', JSON.stringify(allSubmissions));

      //  Notify the user, then reset the form
      alert('Thank you for your message! We will contact you soon.');
      this.reset();
    });
  }
});


// Lazy‐load 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  function initSupportForm() {
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initSupportForm();
          obs.unobserve(entry.target);
        }
      });
    });
    observer.observe(contactForm);
  } else {
    initSupportForm();
  }
});
