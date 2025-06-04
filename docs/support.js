document.addEventListener('DOMContentLoaded', function() {
    
    $('.faq-question').on('click', function() {
        $(this).closest('.faq-item').toggleClass('active');
       
    });

    // 2) Hero‐banner text replacements
    const heroHeading = document.querySelector('.hero-banner h1');
    heroHeading.textContent = 'Need Help? You’re in the Right Place!';
    const heroParagraph = document.querySelector('.hero-banner p');
    heroParagraph.innerHTML = 'Let us <strong>guide</strong> you through any issues or questions you have.';

    // 3) Contact‐form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }
});

//lazy load
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
  
    function initSupportForm() {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Support form submitted");
      });
  
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
  