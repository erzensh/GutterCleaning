// Testimonials Carousel
const carousel = document.querySelector('.testimonials-carousel > .testimonials-grid');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let scrollAmount = 0;
const cardWidth = 320; // approx width + margin

prevBtn.addEventListener('click', () => {
  scrollAmount = Math.max(scrollAmount - cardWidth, 0);
  carousel.scrollTo({left: scrollAmount, behavior: 'smooth'});
});

nextBtn.addEventListener('click', () => {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
  carousel.scrollTo({left: scrollAmount, behavior: 'smooth'});
});

// Leave Review Form toggle
const leaveReviewBtn = document.getElementById('leaveReviewBtn');
const reviewFormContainer = document.getElementById('reviewFormContainer');

leaveReviewBtn.addEventListener('click', () => {
  if (reviewFormContainer.style.display === 'none' || reviewFormContainer.style.display === '') {
    reviewFormContainer.style.display = 'block';
    reviewFormContainer.scrollIntoView({ behavior: 'smooth' });
  } else {
    reviewFormContainer.style.display = 'none';
  }
});

// Star rating logic
const stars = document.querySelectorAll('#starRating span');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    highlightStars(star.dataset.value);
  });
  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    star.style.color = star.dataset.value <= rating ? '#FFD700' : '#ccc';
  });
}

// Handle review submission
document.getElementById('reviewForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value.trim();
  const review = document.getElementById('reviewText').value.trim();

  if (selectedRating === 0) {
    alert('Please select a star rating.');
    return;
  }

  if (!name || !review) {
    alert('Please fill in all fields.');
    return;
  }

  // Create new testimonial card
  const newCard = document.createElement('div');
  newCard.className = 'testimonial-card';
  newCard.style.minWidth = '300px';
  newCard.style.flexShrink = '0';
  newCard.style.background = 'white';
  newCard.style.padding = '1rem';
  newCard.style.borderRadius = '8px';
  newCard.style.boxShadow = '0 0 8px rgba(0,0,0,0.1)';

  // Use placeholder avatar icon for new reviews
  newCard.innerHTML = `
    <img src="https://via.placeholder.com/60" alt="${name}" class="client-photo" style="width:60px; height:60px; border-radius:50%; object-fit:cover;" />
    <h4>${name}</h4>
    <div class="stars" style="color: #FFD700; font-size: 1.2rem;">${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</div>
    <p>“${review}”</p>
  `;

  // Append new card to carousel
  carousel.appendChild(newCard);

  // Reset form
  document.getElementById('reviewForm').reset();
  selectedRating = 0;
  highlightStars(0);

  // Hide form after submission
  reviewFormContainer.style.display = 'none';

  alert('Thank you for your review!');
});
