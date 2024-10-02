  window.addEventListener("DOMContentLoaded", function () {
      let slides = document.querySelectorAll(".main_fade_slide");
      console.log("Number of slides found:", slides.length);
  
      const mainCarouselContainer = document.getElementById("desktopCarouselContainer");
      const thumbCarouselContainer = document.getElementById("thumbnailCarouselContainer");
      const carouselTrack = document.querySelector(".main-carousel-track");
      const mobileCarouselTrack = document.querySelector(".thumb-carousel-track");
      const prevBtn = document.querySelector("#prev-btn");
      const nextBtn = document.querySelector("#next-btn");
  
      let mainIndex = 6;
      let currentIndex = 3;
      const numVisibleSlides = 7;
  
      let intervalId;
  
      let jsonArray = [];
  
      slides.forEach(function (slide, index) {
          var mainSlideItem = slide.querySelector(".main_slide_item");
          var mainImgDiv = slide.querySelector(".main_img_div");
          var mobileSlideItem = slide.querySelector(".mobile_slide_item");
          var mobileImgDiv = slide.querySelector(".mobile_img_div");
          var thumbLink = slide.querySelector(".thumb_link");
          var thumbImg = slide.querySelector(".thumb img");
  
          if (!mainSlideItem || !mainImgDiv || !mobileSlideItem || !mobileImgDiv || !thumbLink || !thumbImg) {
              console.error("Missing elements in slide number", index);
              return;
          }
  
          var jsonObj = {
              desktop: {
                  link: mainSlideItem.getAttribute("data-link"),
                  backgroundImage: mainSlideItem.style.backgroundImage.slice(5, -2).replace(/"/g, ""),
                  image: mainImgDiv.src,
                  altText: mainImgDiv.alt,
              },
              mobile: {
                  link: mobileSlideItem.getAttribute("data-link"),
                  backgroundImage: mobileSlideItem.style.backgroundImage.slice(5, -2).replace(/"/g, ""),
                  image: mobileImgDiv.src,
                  altText: mobileImgDiv.alt,
              },
              thumbnail: {
                  link: thumbLink.getAttribute("href"),
                  image: thumbImg.src,
                  altText: thumbImg.alt,
                  title: thumbImg.title,
              },
          };
          jsonArray.push(jsonObj);
      });
  
      if (jsonArray.length === 0) {
          console.error("No slides were added to the array. Check the class names and HTML structure.");
          return;
      }
  
      const createMainSlide = (slide, index) => `
          <div class="main_slide_item" key="${index}" style="background-image: url('${slide.desktop.backgroundImage}');"  onclick="window.location.href='${slide.desktop.link}'">
              <span class="slide-index" style="display:none;">Slide ${index + 1}</span>
              <img class="main_img_div" src="${slide.desktop.image}" alt="${slide.desktop.altText}">
              <a href="${slide.desktop.link}" class="Ldot" id="location_circle" onclick="currentSlide(${index})"></a>
          </div>
      `;
  
      const createThumbSlide = (slide, index) => `
          <div class="thumb_slide_item" key="${index}" onclick="window.location.href='${slide.thumbnail.link}'">
              <span class="slide-index" style="display:none;">Slide ${index + 1}</span>
              <div class="thumb_item_location_wrapper">
                  <div class="ThumbImgTop_Pointer thumbnail_show_pin"><i class="fa-solid fa-location-dot"></i></div>
                  <p class="h5 location_title bg_col_${'[[+dest_title_bg]]'}">${slide.thumbnail.title}</p>
                  <div class="image-overlay">
                  <img src="${slide.thumbnail.image}" alt="${slide.thumbnail.altText}" title="${slide.thumbnail.title}">
                  </div>
                  <a href="${slide.thumbnail.link}" class="thumb_link thumb-cta-link-dynamic show-go">
                      <span class="go-button">GO</span>
                      <i class="fa fa-arrow-right"></i>
                  </a>
              </div>
          </div>
      `;
  
      const createCarousels = (slidesArray) => {
          let mainCarouselHTML = '<div class="main-carousel-track">';
          let thumbCarouselHTML = '<div class="thumb-carousel-track">';
  
          slidesArray.forEach((slide, index) => {
              mainCarouselHTML += createMainSlide(slide, index);
              thumbCarouselHTML += createThumbSlide(slide, index);
          });
  
          mainCarouselHTML += "</div>";
          thumbCarouselHTML += "</div>";
  
          return {
              mainCarouselHTML,
              thumbCarouselHTML,
          };
      };
  
      const carouselsHTML = createCarousels(jsonArray);
  
      if (mainCarouselContainer && thumbCarouselContainer) {
          mainCarouselContainer.innerHTML = carouselsHTML.mainCarouselHTML;
          thumbCarouselContainer.innerHTML = carouselsHTML.thumbCarouselHTML;
  
          // Generate and append the location dots
          createLocationDots(jsonArray);
  
          console.log("Carousels populated and navigation set up successfully.");
      } else {
          console.error("Carousel containers not found.");
      }
  
      // preload images to avoid anyloading glitchiness/ delay
      function preloadImages() {
          jsonArray.forEach(function (slide) {
              var img = new Image();
              img.src = slide.thumbnail.image;
          });
      }
  
      preloadImages();
  
      function createSlides() {
          if (!carouselTrack || !mobileCarouselTrack) {
              console.error("carouselTrack or mobileCarouselTrack element not found.");
              return;
          }
  
          carouselTrack.innerHTML = "";
          mobileCarouselTrack.innerHTML = "";
  
          const mainStartIndex = mainIndex;
          const startIndex = currentIndex;
          const middleIndex = (startIndex + Math.floor(numVisibleSlides / 2)) % jsonArray.length;
          const mainMiddleIndex = mainStartIndex + (Math.floor(numVisibleSlides / 2) % jsonArray.length);
          const offset = (middleIndex + jsonArray.length - Math.floor(numVisibleSlides / 2)) % jsonArray.length;
          const mainOffset = (mainMiddleIndex + jsonArray.length - Math.floor(numVisibleSlides / 2)) % jsonArray.length;
  
          // For smooth transition only on thumb slider
          mobileCarouselTrack.style.transition = "transform 0.5s ease";
          // mobileCarouselTrack.style.transform = `translateX(-${currentIndex * (100 / numVisibleSlides)}%)`;
  
          for (
              let i = offset, count = 0; count < numVisibleSlides; i = (i + 1) % jsonArray.length, count++) {
              const thumbSlideItem = document.createElement("div");
              thumbSlideItem.classList.add("thumb-carousel-slide");
  
              if (i === middleIndex) {
                  thumbSlideItem.classList.add("active");
              } else {
                  thumbSlideItem.classList.remove("active");
              }
  
              if (!jsonArray[i]) {
                  console.error("jsonArray element is null at index", i);
                  continue;
              }
  
              thumbSlideItem.innerHTML = createThumbSlide(jsonArray[i], i);
              mobileCarouselTrack.appendChild(thumbSlideItem);
          }
  
          for (
              let j = mainOffset, count = 0; count < numVisibleSlides; j = (j + 1) % jsonArray.length, count++) {
              const mainSlideItem = document.createElement("div");
              mainSlideItem.classList.add("main-carousel-slide");
  
              if (j === currentIndex) {
                  mainSlideItem.classList.add("active");
              } else {
                  mainSlideItem.classList.remove("active");
              }
  
              if (j === mainMiddleIndex) {
                  mainSlideItem.classList.add("active");
              }
  
              if (!jsonArray[j]) {
                  console.error("jsonArray element is null at index", j);
                  continue;
              }
  
              mainSlideItem.innerHTML = createMainSlide(jsonArray[j], j);
              carouselTrack.appendChild(mainSlideItem);
          }
  
          // Synchronize the active Ldot with the active slide
          updateActiveDot(currentIndex);
      }
  
      function moveCarousel(direction) {
          clearInterval(intervalId);
          currentIndex += direction;
          if (currentIndex < 0) {
              currentIndex = jsonArray.length - 1;
          } else if (currentIndex >= jsonArray.length) {
              currentIndex = 0;
          }
  
          mainIndex += direction;
          if (mainIndex < 0) {
              mainIndex = jsonArray.length - 1;
          } else if (mainIndex >= jsonArray.length) {
              mainIndex = 0;
          }
  
          createSlides();
          startAutoPlay();
      }
  
      function startAutoPlay() {
          intervalId = setInterval(() => moveCarousel(1), 2500);
      }
  
      function updateActiveDot(index) {
          const dots = document.querySelectorAll(".Ldot");
          dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
          });
      }
  
      function currentSlide(index) {
          // Move the carousel to the specific slide
          moveCarouselToIndex(index);
  
          // Update the active state of the dots
          updateActiveDot(index);
      }
  
      function moveCarouselToIndex(index) {
          // Logic to move the carousel to the specific slide
          currentIndex = index;
          mainIndex = index;
          createSlides();
      }
  
      createSlides();
  
      prevBtn.addEventListener("click", () => moveCarousel(-1));
      nextBtn.addEventListener("click", () => moveCarousel(1));
  
      startAutoPlay();
  
      // change go button on japanese page
      function changeButtonTextForResourceNumber() {
          var elements_ja = document.querySelectorAll('[data-resource="' + 14723 + '"]');
          elements_ja.forEach(function (element) {
              var spanElements = element.getElementsByClassName('go-button');
              for (var i = 0; i < spanElements.length; i++) {
                  spanElements[i].innerText = '行く';
              }
          });
      }
  
      changeButtonTextForResourceNumber();
  
      // ldots function
      function createLocationDots(slidesArray) {
          const locationDotsContainer = document.querySelector(".locationDots_wrapper");
          if (!locationDotsContainer) return;
  
          slidesArray.forEach((slide, index) => {
              const dot = document.createElement("span");
              dot.title = slide.thumbnail.title;
              dot.classList.add('Ldot');
              dot.id = `l_${index}`;
              dot.setAttribute('onclick', `currentSlide(${index})`);
  
              // Highlight the first dot as active by default
              if (index === 0) {
                  dot.classList.add('active');
              }
  
              locationDotsContainer.appendChild(dot);
          });
      }

      // swipe function
      let startX, startY, endX, endY;

      document.querySelectorAll('.main-carousel-slide').forEach(carousel => {
          carousel.addEventListener('touchstart', event => {
              const touch = event.touches[0];
              startX = touch.clientX;
              startY = touch.clientY;
          });

          carousel.addEventListener('touchend', event => {
              const touch = event.changedTouches[0];
              endX = touch.clientX;
              endY = touch.clientY;

              const deltaX = endX - startX;
              const deltaY = endY - startY;
              const swipeThreshold = 50;

              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
                  const direction = deltaX < 0 ? 'next' : 'prev';
                  const controlButton = carousel.querySelector(`.main-carousel-slide-${direction}`);
                  if (controlButton) controlButton.click();
              }
          });
      });



  });
  