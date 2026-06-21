// Hamburger Menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navLinks) {
    const isActive = navLinks.classList.toggle('active');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', isActive);
    }
  }
}

// Visitor Counter
if(localStorage.page_views){
  localStorage.page_views = Number(localStorage.page_views) + 1;
}else{
  localStorage.page_views = 1;
}
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  if(counter){
    counter.innerText = "Visitors: " + localStorage.page_views;
  }
});

// Simple Search Function
function searchSite() {
  let input = document.getElementById("Search").value.toLowerCase();
  alert("You searched for: " + input);
}

// Handle Form Submission
function handleSubmit(event) {
  event.preventDefault();
  alert("Thank you for your submission! We will get back to you soon.");
  event.target.reset();
}

// Toggle Login Modal
function toggleLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('loginModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Counter Animation for Impact Stats
function animateCounters() {
  const stats = document.querySelectorAll('.impact-stat[data-target]');
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '%';
        clearInterval(interval);
      } else {
        stat.textContent = Math.floor(current) + '%';
      }
    }, 30);
  });
}

// Load Footer
document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error("Error loading footer:", error));
  }
  
  // Start counter animation when funding section is visible
  const fundingSection = document.querySelector('.about-funding');
  if (fundingSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(fundingSection);
  }
  
  // Ensure video autoplay
  const videos = document.querySelectorAll('video[autoplay]');
  videos.forEach(video => {
    video.play().catch(error => console.log("Autoplay prevented:", error));
  });
});

// Login Modal Functions
function togglePasswordVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  const btn = event.currentTarget;
  const icon = btn.querySelector('i');

  if (field.type === 'password') {
    field.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    field.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function validateLoginForm() {
  const errors = {};

  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password
  const password = document.getElementById('password').value;
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

function displayLoginErrors(errors) {
  // Clear all previous errors
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

  // Display new errors
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
      errorElement.textContent = errors[field];
    }
  });
}

function simulateLogin(email, password, rememberMe) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful login (in a real app, this would validate against a server)
      if (email && password.length >= 8) {
        console.log('Login successful for:', email);
        console.log('Remember me:', rememberMe);
        resolve(true);
      } else {
        reject('Invalid credentials');
      }
    }, 1500);
  });
}

// Initialize login form event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const errors = validateLoginForm();

      if (Object.keys(errors).length > 0) {
        displayLoginErrors(errors);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) errorMessage.style.display = 'none';
        return;
      }

      // Clear errors
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) errorMessage.style.display = 'none';

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

      // Get form data
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      try {
        // Simulate login
        await simulateLogin(email, password, rememberMe);

        // Show success message
        const formContent = document.getElementById('formContent');
        const successMessage = document.getElementById('successMessage');
        if (formContent) formContent.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Log login data (in a real app, this would be handled securely)
        console.log({
          email,
          rememberMe,
          timestamp: new Date().toLocaleString()
        });

        // Simulate redirect after success
        setTimeout(() => {
          // In a real app, redirect to dashboard
          console.log('Redirecting to dashboard...');
          toggleLoginModal(); // Close modal
        }, 2000);

      } catch (error) {
        // Show error message
        const errorText = document.getElementById('errorText');
        if (errorText) errorText.textContent = 'Invalid email or password. Please try again.';
        if (errorMessage) errorMessage.style.display = 'block';

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    // Real-time validation
    const emailField = document.getElementById('email');
    if (emailField) {
      emailField.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorEl = document.getElementById('emailError');
        if (this.value && !emailRegex.test(this.value)) {
          if (errorEl) errorEl.textContent = 'Please enter a valid email address';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
    }

    const passwordField = document.getElementById('password');
    if (passwordField) {
      passwordField.addEventListener('blur', function() {
        const errorEl = document.getElementById('passwordError');
        if (this.value && this.value.length < 8) {
          if (errorEl) errorEl.textContent = 'Password must be at least 8 characters';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
    }
  }
});

// Booking Form Functions
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;

  const captchaElement = document.getElementById('captchaQuestion');
  if (captchaElement) {
    captchaElement.textContent = question;
    captchaElement.dataset.answer = answer;
  }
}

function validateBookingForm() {
  const errors = {};

  // Full Name
  const fullName = document.getElementById('fullName').value.trim();
  if (!fullName) {
    errors.fullName = 'Full name is required';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone
  const phone = document.getElementById('phone').value.trim();
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Sport
  const sport = document.getElementById('sport').value;
  if (!sport) {
    errors.sport = 'Please select a sport';
  }

  // Session Duration
  const sessionDuration = document.getElementById('sessionDuration').value;
  if (!sessionDuration) {
    errors.sessionDuration = 'Please select session duration';
  }

  // Session Date
  const sessionDate = document.getElementById('sessionDate').value;
  const today = new Date().toISOString().split('T')[0];
  if (!sessionDate) {
    errors.sessionDate = 'Session date is required';
  } else if (sessionDate < today) {
    errors.sessionDate = 'Session date cannot be in the past';
  }

  // Session Time
  const sessionTime = document.getElementById('sessionTime').value;
  if (!sessionTime) {
    errors.sessionTime = 'Session time is required';
  }

  // CAPTCHA
  const captchaAnswer = document.getElementById('captchaAnswer').value.trim();
  const correctAnswer = document.getElementById('captchaQuestion').dataset.answer;
  if (!captchaAnswer) {
    errors.captcha = 'CAPTCHA answer is required';
  } else if (parseInt(captchaAnswer) !== parseInt(correctAnswer)) {
    errors.captcha = 'Incorrect CAPTCHA answer';
  }

  // Terms Agreement
  const termsAgree = document.getElementById('termsAgree').checked;
  if (!termsAgree) {
    errors.terms = 'You must agree to the terms and conditions';
  }

  return errors;
}

function displayBookingErrors(errors) {
  // Clear all previous errors
  document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

  // Display new errors
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
      errorElement.textContent = errors[field];
    }
  });
}

function simulateBookingSubmission(bookingData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful booking (in a real app, this would send to server)
      console.log('Booking submitted:', bookingData);
      resolve(true);
    }, 2000);
  });
}

// Initialize booking form event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    // Generate initial CAPTCHA
    generateCaptcha();

    // Set minimum date for session date
    const sessionDateInput = document.getElementById('sessionDate');
    if (sessionDateInput) {
      const today = new Date().toISOString().split('T')[0];
      sessionDateInput.min = today;
    }

    bookingForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const errors = validateBookingForm();

      if (Object.keys(errors).length > 0) {
        displayBookingErrors(errors);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) errorMessage.style.display = 'none';
        return;
      }

      // Clear errors
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) errorMessage.style.display = 'none';

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Booking...';

      // Get form data
      const bookingData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        sport: document.getElementById('sport').value,
        sessionDuration: document.getElementById('sessionDuration').value,
        sessionDate: document.getElementById('sessionDate').value,
        sessionTime: document.getElementById('sessionTime').value,
        sessionType: document.getElementById('sessionType').value,
        coach: document.getElementById('coach').value,
        skillLevel: document.getElementById('skillLevel').value,
        equipmentRental: document.getElementById('equipmentRental').checked,
        notes: document.getElementById('notes').value,
        termsAgree: document.getElementById('termsAgree').checked,
        timestamp: new Date().toLocaleString()
      };

      try {
        // Simulate booking submission
        await simulateBookingSubmission(bookingData);

        // Show success message
        const formContent = document.getElementById('formContent');
        const successMessage = document.getElementById('successMessage');
        if (formContent) formContent.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Log booking data (in a real app, this would be handled securely)
        console.log('Booking confirmed:', bookingData);

        // Reset form after success
        setTimeout(() => {
          bookingForm.reset();
          generateCaptcha();
          if (formContent) formContent.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);

      } catch (error) {
        // Show error message
        const errorText = document.getElementById('errorText');
        if (errorText) errorText.textContent = 'Booking failed. Please try again.';
        if (errorMessage) errorMessage.style.display = 'block';

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    // Real-time validation
    const emailField = document.getElementById('email');
    if (emailField) {
      emailField.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorEl = document.getElementById('emailError');
        if (this.value && !emailRegex.test(this.value)) {
          if (errorEl) errorEl.textContent = 'Please enter a valid email address';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
    }

    const phoneField = document.getElementById('phone');
    if (phoneField) {
      phoneField.addEventListener('blur', function() {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        const errorEl = document.getElementById('phoneError');
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
          if (errorEl) errorEl.textContent = 'Please enter a valid phone number';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
    }

    const sessionDateField = document.getElementById('sessionDate');
    if (sessionDateField) {
      sessionDateField.addEventListener('blur', function() {
        const today = new Date().toISOString().split('T')[0];
        const errorEl = document.getElementById('sessionDateError');
        if (this.value && this.value < today) {
          if (errorEl) errorEl.textContent = 'Session date cannot be in the past';
        } else {
          if (errorEl) errorEl.textContent = '';
        }
      });
    }
  }
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');

      // Toggle active class
      faqItem.classList.toggle('active');

      // Toggle answer visibility
      if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      } else {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
      }
    });
  });
});

// Contact Form Functions
function generateContactCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;

  const captchaElement = document.getElementById('contactCaptchaQuestion');
  if (captchaElement) {
    captchaElement.textContent = question;
    captchaElement.dataset.answer = answer;
  }
}

function validateContactForm() {
  const errors = {};

  // Name
  const name = document.getElementById('name').value.trim();
  if (!name) {
    errors.name = 'Full name is required';
  } else if (name.length < 2) {
    errors.name = 'Full name must be at least 2 characters';
  }

  // Email
  const email = document.getElementById('contactEmail').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.contactEmail = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.contactEmail = 'Please enter a valid email address';
  }

  // Phone (optional but if provided, must be valid)
  const phone = document.getElementById('contactPhone').value.trim();
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (phone && !phoneRegex.test(phone.replace(/\s/g, ''))) {
    errors.contactPhone = 'Please enter a valid phone number';
  }

  // Subject
  const subject = document.getElementById('subject').value;
  if (!subject) {
    errors.subject = 'Please select a subject';
  }

  // Message
  const message = document.getElementById('message').value.trim();
  if (!message) {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // CAPTCHA
  const captchaAnswer = document.getElementById('contactCaptchaAnswer').value.trim();
  const correctAnswer = document.getElementById('contactCaptchaQuestion').dataset.answer;
  if (!captchaAnswer) {
    errors.contactCaptchaAnswer = 'CAPTCHA answer is required';
  } else if (parseInt(captchaAnswer) !== parseInt(correctAnswer)) {
    errors.contactCaptchaAnswer = 'Incorrect CAPTCHA answer';
  }

  // Privacy Agreement
  const privacyAgree = document.getElementById('privacyAgree').checked;
  if (!privacyAgree) {
    errors.privacyAgree = 'You must agree to the privacy policy';
  }

  return errors;
}

function displayContactErrors(errors) {
  // Clear all previous errors
  document.querySelectorAll('.error-text').forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });

  // Display new errors
  Object.keys(errors).forEach(field => {
    const errorElement = document.getElementById(field + 'Error');
    if (errorElement) {
      errorElement.textContent = errors[field];
      errorElement.classList.add('show');
    }
  });
}

function simulateContactSubmission(contactData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful submission (in a real app, this would send to server)
      console.log('Contact form submitted:', contactData);
      resolve(true);
    }, 2000);
  });
}

// Initialize contact form event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Generate initial CAPTCHA
    generateContactCaptcha();

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const errors = validateContactForm();

      if (Object.keys(errors).length > 0) {
        displayContactErrors(errors);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) errorMessage.style.display = 'none';
        return;
      }

      // Clear errors
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) errorMessage.style.display = 'none';

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Get form data
      const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
      };

      try {
        // Simulate submission
        await simulateContactSubmission(contactData);

        // Show success message
        const formContent = document.getElementById('formContent');
        const successMessage = document.getElementById('successMessage');
        if (formContent) formContent.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Log contact data (in a real app, this would be handled securely)
        console.log('Message sent:', contactData);

        // Reset form after success
        setTimeout(() => {
          contactForm.reset();
          generateContactCaptcha();
          if (formContent) formContent.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3000);

      } catch (error) {
        // Show error message
        const errorText = document.getElementById('errorText');
        if (errorText) errorText.textContent = 'Failed to send message. Please try again.';
        if (errorMessage) errorMessage.style.display = 'block';

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    // Real-time validation
    const emailField = document.getElementById('contactEmail');
    if (emailField) {
      emailField.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorEl = document.getElementById('contactEmailError');
        if (this.value && !emailRegex.test(this.value)) {
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid email address';
            errorEl.classList.add('show');
          }
        } else {
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
          }
        }
      });
    }

    const phoneField = document.getElementById('contactPhone');
    if (phoneField) {
      phoneField.addEventListener('blur', function() {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        const errorEl = document.getElementById('contactPhoneError');
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid phone number';
            errorEl.classList.add('show');
          }
        } else {
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
          }
        }
      });
    }

    const messageField = document.getElementById('message');
    if (messageField) {
      messageField.addEventListener('blur', function() {
        const errorEl = document.getElementById('messageError');
        if (this.value && this.value.length < 10) {
          if (errorEl) {
            errorEl.textContent = 'Message must be at least 10 characters';
            errorEl.classList.add('show');
          }
        } else {
          if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
          }
        }
      });
    }
  }
});