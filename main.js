function initStagesSlider() {
  const cardsContainer = document.querySelector('.stage__cards');
  if (!cardsContainer) return;
  
  const originalCards = document.querySelectorAll('.stage__card');
  if (originalCards.length === 0) return;
  
  const isMobile = window.innerWidth <= 425;
  const isAlreadyBuilt = cardsContainer.classList.contains('slider-built');
  
  if (isMobile && !isAlreadyBuilt) {
 
    if (!cardsContainer.dataset.originalHtml) {
      cardsContainer.dataset.originalHtml = cardsContainer.innerHTML;
    }
    
    cardsContainer.innerHTML = '';
    cardsContainer.classList.add('slider-built');
    

 
    const slide1 = document.createElement('div');
    slide1.className = 'stage__slide stage__slide--merged';
    slide1.appendChild(originalCards[0].cloneNode(true));
    slide1.appendChild(originalCards[1].cloneNode(true));
    cardsContainer.appendChild(slide1);
    
 
    const slide2 = document.createElement('div');
    slide2.className = 'stage__slide stage__slide--single';
    slide2.appendChild(originalCards[2].cloneNode(true));
    cardsContainer.appendChild(slide2);
    

    const slide3 = document.createElement('div');
    slide3.className = 'stage__slide stage__slide--merged';
    slide3.appendChild(originalCards[3].cloneNode(true));
    slide3.appendChild(originalCards[4].cloneNode(true));
    cardsContainer.appendChild(slide3);
    

    const slide4 = document.createElement('div');
    slide4.className = 'stage__slide stage__slide--single';
    slide4.appendChild(originalCards[5].cloneNode(true));
    cardsContainer.appendChild(slide4);
    

    const slide5 = document.createElement('div');
    slide5.className = 'stage__slide stage__slide--single';
    slide5.appendChild(originalCards[6].cloneNode(true));
    cardsContainer.appendChild(slide5);
    

    addSliderControls(cardsContainer, 5);
    
  } else if (!isMobile && isAlreadyBuilt) {

    if (cardsContainer.dataset.originalHtml) {
      cardsContainer.innerHTML = cardsContainer.dataset.originalHtml;
      cardsContainer.classList.remove('slider-built');
    }
    
    const controls = document.querySelector('.stages__slider-controls');
    if (controls) controls.remove();
  }
}

function addSliderControls(container, dotsCount = 5) {
  const oldControls = document.querySelector('.stages__slider-controls');
  if (oldControls) oldControls.remove();
  
  const controls = document.createElement('div');
  controls.className = 'stages__slider-controls';
  
  const prevBtn = document.createElement('div');
  prevBtn.className = 'stages__nav-prev';
  prevBtn.innerHTML = `
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d="M8.5 1.5L1.5 8L8.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
  
  const pagination = document.createElement('div');
  pagination.className = 'stages__slider-pagination';
  
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'stages__pagination-dot';
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-index', i);
    pagination.appendChild(dot);
  }
  
  const nextBtn = document.createElement('div');
  nextBtn.className = 'stages__nav-next';
  nextBtn.innerHTML = `
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d="M1.5 1.5L8.5 8L1.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
  
  controls.appendChild(prevBtn);
  controls.appendChild(pagination);
  controls.appendChild(nextBtn);
  container.parentNode.appendChild(controls);
  
  const slides = document.querySelectorAll('.stage__slide');
  const dots = document.querySelectorAll('.stages__pagination-dot');
  
  if (slides.length === 0) return;
  
  const updateActiveDot = () => {
    const scrollLeft = container.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 16;
    const currentIndex = Math.round(scrollLeft / slideWidth);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  };
  
  const scrollToSlide = (index) => {
    const slideWidth = slides[0].offsetWidth + 16;
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
  };
  
  container.addEventListener('scroll', updateActiveDot);
  
  prevBtn.addEventListener('click', () => {
    const scrollLeft = container.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 16;
    const currentIndex = Math.round(scrollLeft / slideWidth);
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToSlide(newIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    const scrollLeft = container.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 16;
    const currentIndex = Math.round(scrollLeft / slideWidth);
    const newIndex = Math.min(slides.length - 1, currentIndex + 1);
    scrollToSlide(newIndex);
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToSlide(index));
  });
}

document.addEventListener('DOMContentLoaded', initStagesSlider);

let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initStagesSlider, 250);
});

// 
document.addEventListener('DOMContentLoaded', function() {
  const participantsSwiper = new Swiper('.participants__slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.participants__nav-next',
      prevEl: '.participants__nav-prev',
    },
    breakpoints: {
      481: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
      }
    }
  });

  const updateCounters = () => {
    const currentSpans = document.querySelectorAll('.participants__current');
    const totalSpans = document.querySelectorAll('.participants__total');
    const totalSlides = document.querySelectorAll('.participants__slide').length;
    
    totalSpans.forEach(span => span.textContent = totalSlides);
    
    let currentIndex = participantsSwiper.realIndex + 1;
    currentSpans.forEach(span => span.textContent = currentIndex);
    
    participantsSwiper.on('slideChange', function() {
      let currentIndex = participantsSwiper.realIndex + 1;
      currentSpans.forEach(span => span.textContent = currentIndex);
    });
  };
  
  updateCounters();
  
 
  const slider = document.querySelector('.participants__slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      participantsSwiper.autoplay.stop();
    });
    slider.addEventListener('mouseleave', () => {
      participantsSwiper.autoplay.start();
    });
  }
});
