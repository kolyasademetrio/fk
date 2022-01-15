// placed this functions in DOMContentLoaded, since all you need to do to run it is to load the DOM
document.addEventListener('DOMContentLoaded', () => {
   // IIFE code wrapping
   (() => {

   })();
});


// placed this function in window.onload as there are style files needed in calculations
window.onload = () => {
   // IIFE code wrapping
   (() => {
      let $slickElements = $('.js-projects-slider');

      $slickElements.each((index, elem) => {
         let $status = $(elem).next().find('.js-projects-slider-qty');
         $(elem).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            let i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(i + '/<span class="projects__slider-qty_sm">' + slick.slideCount + '</span>');
         });

         let prev = $(elem).next().find('.js-projects-slider-arrow-prev');
         let next = $(elem).next().find('.js-projects-slider-arrow-next');

         $(elem).slick({
            autoplay: false,
            dots: false,
            nextArrow: next,
            prevArrow: prev,
         });

      });
   })();

   (() => {
      $('.js-stories-slider').slick({
         slidesToShow: 6,
         slidesToScroll: 1,
         mobileFirst: true,
         responsive: [
            {
               breakpoint: 1180,
               settings: {
                  slidesToShow: 6
               }
            },
            {
               breakpoint: 650,
               settings: {
                  slidesToShow: 4
               }
            },
            {
               breakpoint: 450,
               settings: {
                  slidesToShow: 3
               }
            },
            {
               breakpoint: 320,
               settings: {
                  slidesToShow: 2
               }
            },
         ]
      });
   })();

   (() => {
      $('.js-mask-phone').mask('+38 099 999 99 99');
   })();

   (() => {
      const tabs = document.querySelectorAll('.js-form-tabs-list-item-header');
      const tabsIcons = document.querySelectorAll('.js-form-tabs-list-item-header-icon');
      const tabsContent = document.querySelectorAll('.js-form-tabs-list-item-footer');

      for (let i = 0; i < tabs.length; i++) {
         tabs[i].addEventListener('click', e => {
            for (let k = 0; k < tabs.length; k++) {
               tabs[k].getElementsByClassName('js-form-tabs-list-item-header-icon')[0].classList.remove('js-active');
            }
            tabs[i].getElementsByClassName('js-form-tabs-list-item-header-icon')[0].classList.add('js-active');

            for (let j = 0; j < tabsContent.length; j++) {
               tabsContent[j].classList.remove('js-active');
            }
            tabsContent[i].classList.add('js-active');
         });
      }
   })();

   (() => {
      const mainPopupOpenBtn = document.querySelector('.js-popup-main-open');
      const mainPopupCloseBtn = document.querySelector('.js-popup-main-close');
      const mainPopup = document.querySelector('.js-popup-main');

      mainPopupOpenBtn.addEventListener('click', e => {
         mainPopup.classList.add('js-active');
         document.body.classList.add('modal-open');
      })

      mainPopupCloseBtn.addEventListener('click', e => {
         mainPopup.classList.remove('js-active');
         document.body.classList.remove('modal-open');
      })
   })();

   (() => {
      const storiesPopupItems = document.querySelectorAll('.js-stories-for-popup-container');
      const secondaryPopupCloseBtn = document.querySelector('.js-popup-secondary-close');
      const secondaryPopup = document.querySelector('.js-popup-secondary');

      for (let i = 0; i < storiesPopupItems.length; i++) {
         storiesPopupItems[i].addEventListener('click', e => {

            let storiesPopupcontent = '';

            if (e.target.closest('.js-stories-for-popup-item')) {

               const currentItem = e.target.closest('.js-stories-for-popup-item');

               const storyHeader = currentItem.querySelector('.js-stories-for-popup-item-header').innerHTML;

               const storyImg = currentItem.dataset.img && currentItem.dataset.img;
               const storyText = currentItem.dataset.text && currentItem.dataset.text;
               const imagesArray = storyImg.split(',');


               let imagesSlider = '<ul class="slider owl-carousel js-slider">';
               for (let j = 0; j < imagesArray.length; j++) {
                  imagesSlider += `<li class="slider__item">
                                       <div class="slider__item-inner">
                                          <img class="stories__popup-img" src="${imagesArray[j]}"/>
                                       </div>
                                 </li>`;
               }
               imagesSlider += '</ul>';

               if ( imagesArray.length > 1 ) {
                  imagesSlider += `<div class="projects__slider-arrows">
                                       <button class="projects__slider-arrow projects__slider-arrow-prev js-slider-arrow-prev">&lsaquo;</button>
                                       <div class="projects__slider-qty js-slider-qty"></div>
                                       <button class="projects__slider-arrow projects__slider-arrow-next js-slider-arrow-next">&rsaquo;</button>
                                    </div>`;
               }

               storiesPopupcontent =
                  `<div class="stories__popup-content">
                  <div class="stories__popup-img-wrap">
                     ${imagesSlider}
                  </div>
                  <div class="stories__popup-text-wrap">
                     ${storyHeader}

                     <div class="stories__popup-descr">
                        <p class="stories__descr">
                           ${storyText}
                        </p>
                     </div>
                  </div>
               </div>`;

               secondaryPopup.querySelector('.js-popup-secondary-content').innerHTML = storiesPopupcontent;
               secondaryPopup.classList.add('js-active');
               document.body.classList.add('modal-open');

               let $status = $('.js-slider').next().find('.js-slider-qty');
               $('.js-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                  //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                  let i = (currentSlide ? currentSlide : 0) + 1;
                  $status.html(i + '/<span class="projects__slider-qty_sm">' + slick.slideCount + '</span>');
               });

               let prev = $('.js-slider').next().find('.js-slider-arrow-prev');
               let next = $('.js-slider').next().find('.js-slider-arrow-next');


               $('.js-slider').slick({
                  autoplay: false,
                  dots: false,
                  nextArrow: next,
                  prevArrow: prev,
               });
            }
         })
      }

      secondaryPopupCloseBtn.addEventListener('click', e => {
         secondaryPopup.classList.remove('js-active');
         secondaryPopup.querySelector('.js-popup-secondary-content').innerHTML = '';
         document.body.classList.remove('modal-open');
         $('.js-slider').slick('unslick');
      })
   })();
}