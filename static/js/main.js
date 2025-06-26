// Main JavaScript for EduTutor AI

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Add fade-in animation to cards
  const cards = document.querySelectorAll(".card, .feature-card, .scenario-card")
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  cards.forEach((card) => {
    observer.observe(card)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Auto-hide alerts after 5 seconds
  setTimeout(() => {
    const alerts = document.querySelectorAll(".alert")
    alerts.forEach((alert) => {
      const bsAlert = new bootstrap.Alert(alert)
      bsAlert.close()
    })
  }, 5000)
})

// Google OAuth Integration (placeholder)
function initializeGoogleAuth() {
  // This would be implemented with actual Google OAuth
  console.log("Google Auth would be initialized here")
}

// Quiz Timer functionality
let quizTimer = null
let timeRemaining = 0

function startQuizTimer(duration) {
  timeRemaining = duration
  quizTimer = setInterval(() => {
    timeRemaining--
    updateTimerDisplay()

    if (timeRemaining <= 0) {
      clearInterval(quizTimer)
      handleTimeUp()
    }
  }, 1000)
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const timerElement = document.getElementById("quiz-timer")
  if (timerElement) {
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
}

function handleTimeUp() {
  alert("Time is up! Your quiz will be submitted automatically.")
  // Auto-submit quiz logic would go here
}

// Analytics Chart functionality (placeholder)
function initializeCharts() {
  // This would integrate with Chart.js or similar library
  console.log("Charts would be initialized here")
}

// Google Classroom Integration
function syncWithGoogleClassroom() {
  // Show loading state
  const button = event.target
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Syncing...'
  button.disabled = true

  // Simulate API call (replace with actual implementation)
  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false

    // Show success message
    showNotification("Google Classroom sync completed successfully!", "success")
  }, 3000)
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(notification)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Form validation enhancements
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
    }
  })

  return isValid
}

// Add event listeners for form validation
document.addEventListener("submit", (e) => {
  const form = e.target
  if (form.classList.contains("needs-validation") || form.hasAttribute("data-validate")) {
    if (!validateForm(form)) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
})

// Performance monitoring (basic)
function trackQuizPerformance(quizId, score, timeSpent) {
  // This would send data to analytics service
  console.log(`Quiz ${quizId} completed with score ${score}% in ${timeSpent} seconds`)
}

// Accessibility enhancements
function announceToScreenReader(message) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Escape key to close modals
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal.show")
    if (openModal) {
      const modal = bootstrap.Modal.getInstance(openModal)
      modal.hide()
    }
  }

  // Enter key to submit forms when focused on submit button
  if (e.key === "Enter" && e.target.type === "submit") {
    e.target.click()
  }
})

// Local storage utilities
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return defaultValue
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}

// Save quiz progress locally
function saveQuizProgress(quizId, answers) {
  storage.set(`quiz_progress_${quizId}`, {
    answers: answers,
    timestamp: Date.now(),
  })
}

// Load quiz progress
function loadQuizProgress(quizId) {
  return storage.get(`quiz_progress_${quizId}`)
}

// Clear quiz progress
function clearQuizProgress(quizId) {
  storage.remove(`quiz_progress_${quizId}`)
}

// Export functions for use in other scripts
window.EduTutorAI = {
  showNotification,
  validateForm,
  trackQuizPerformance,
  announceToScreenReader,
  storage,
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
  syncWithGoogleClassroom,
}
