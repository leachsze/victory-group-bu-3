import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default class Swipers {
  static carItemSwipers() {
    const compareBodySwipers = [];
    $('.js-car-item-swiper').each((index, el) => {
      $(el).addClass(`js-car-item-swiper-${index}`);
      compareBodySwipers.push(new Swiper(`.js-car-item-swiper-${index}`, {
        modules: [Pagination, Navigation],
        slidesPerView: 1,
        pagination: this.defautlPagination(),
      }));
    });

    $('.car-item__preview .swiper-pagination-bullet').hover(function() {
      $(this).trigger('click');
    });
  }

  static carItemsSwipers() {
    const props = {
      slidesPerView: 4,
      spaceBetween: 20,
    };

    if (window.outerWidth <= 1100) {
      props.slidesPerView = 1;
    }

    const compareBodySwipers = [];
    $('.js-car-items-swiper').each((index, el) => {
      $(el).addClass(`js-car-items-swiper-${index}`);
      compareBodySwipers.push(new Swiper(`.js-car-items-swiper-${index}`, {
        modules: [Pagination, Navigation],
        ...props,
        navigation: {
          enabled: true,
          nextEl: '.js-car-items-swiper .swiper-button-next',
          prevEl: '.js-car-items-swiper .swiper-button-prev',
          lockClass: 'swiper-hide-pagination',
        },
      }));
    });
  }

  static creditBanner() {
    return new Swiper('.js-credit-swiper', {
      modules: [Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        enabled: true,
        nextEl: '.js-credit-swiper .swiper-button-next',
        prevEl: '.js-credit-swiper .swiper-button-prev',
        lockClass: 'swiper-hide-pagination',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        lockClass: 'swiper-hide-pagination',
      },
    });
  }

  static defautlPagination() {
    return {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      lockClass: 'swiper-hide-pagination',
      renderBullet: (index, className) => `<div class="${className}" ><span class="bullet-wrapper"></span></div>`,
    };
  }
}
