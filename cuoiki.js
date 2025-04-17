const faders = document.querySelectorAll('.fade-up');

const appearOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
//Lặp chữ
const text = "thể thao chất lượng";
const typingText = document.getElementById("typing-text");
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting) {
    typingText.textContent = text.slice(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500); // đợi 1.5s rồi xoá
      return;
    }
  } else {
    typingText.textContent = text.slice(0, index--);
    if (index === 0) {
      isDeleting = false;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100); // tốc độ gõ và xoá
}

document.addEventListener("DOMContentLoaded", typeEffect);



const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
item.addEventListener("click", () => {
  navItems.forEach(i => i.classList.remove("active"));
  item.classList.add("active");
});
});
const fadeUps = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // Nếu chỉ muốn hiện 1 lần thì unobserve luôn:
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1  // xuất hiện 10% là kích hoạt
});

fadeUps.forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
let current = "";

sections.forEach(section => {
  const sectionTop = section.offsetTop - 100;
  if (window.scrollY >= sectionTop) {
    current = section.getAttribute("id");
  }
});

navLinks.forEach(item => {
  item.classList.remove("active");
  const link = item.querySelector("a");
  if (link.getAttribute("href").includes(current)) {
    item.classList.add("active");
  }
});
});
document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
  
      const maxDim = Math.max(this.clientWidth, this.clientHeight);
      ripple.style.width = ripple.style.height = `${maxDim}px`;
      ripple.style.left = `${e.offsetX - maxDim / 2}px`;
      ripple.style.top = `${e.offsetY - maxDim / 2}px`;
  
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
const images = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"];
let currentIndex = 0;
const bannerImage = document.getElementById("banner-image");
const dotsContainer = document.getElementById("banner-dots");

images.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => showImage(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function showImage(index) {
  bannerImage.style.opacity = 0;
  setTimeout(() => {
    currentIndex = index;
    bannerImage.src = images[currentIndex];
    bannerImage.style.opacity = 1;
    updateDots();
  }, 400);
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

document.querySelector(".prev").addEventListener("click", showPrevImage);
document.querySelector(".next").addEventListener("click", showNextImage);

let autoSlide = setInterval(showNextImage, 4000);

bannerImage.addEventListener("mouseenter", () => clearInterval(autoSlide));
bannerImage.addEventListener("mouseleave", () => autoSlide = setInterval(showNextImage, 4000));

showImage(0);

const cardWrapper = document.querySelector('.card-wrapper');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
const container = document.querySelector('.products-container');

let scrollAmount = 0;
const scrollStep = 280; // tùy chiều rộng card + margin
let maxScroll = cardWrapper.scrollWidth - container.offsetWidth;

function updateScroll() {
  if (scrollAmount > maxScroll) scrollAmount = 0;
  if (scrollAmount < 0) scrollAmount = 0;
  cardWrapper.style.transform = `translateX(-${scrollAmount}px)`;
}

nextBtn.addEventListener('click', () => {
  scrollAmount += scrollStep;
  updateScroll();
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= scrollStep;
  updateScroll();
});


// Auto scroll mỗi 3 giây
setInterval(() => {
  scrollAmount += scrollStep;
  if (scrollAmount > maxScroll) scrollAmount = 0;
  updateScroll();
}, 3000);
