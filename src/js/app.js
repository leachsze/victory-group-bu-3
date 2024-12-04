/* eslint-disable no-eval */
// JQuery modules
import 'jquery.inputmask';
import 'jquery-lazy';
import 'jquery-modal';
import 'jquery-validation';
import 'jquery.cookie';

import 'inputmask.numeric.extensions';

import $ from 'jquery';

// Select2
import 'select2/dist/js/select2.full.js';
import 'select2/dist/js/i18n/ru.js';

// Fancybox
import { Fancybox } from '@fancyapps/ui';

// self
import MarkSearch from './header/MarkSearch.js';
import './ui/range.js';
import Timer from './ui/timer.js';
import Tab from './ui/tabs.js';

// config file
// import configuration from './configuration.js';

// import styles
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'select2/dist/css/select2.min.css';
import 'jquery-modal/jquery.modal.min.css';
import 'swiper/css/bundle';
import '../scss/app.scss';
import CreditCalculator from './calculator/index.js';
import ReviewForm from './customForm/ReviewForm.js';
import CallbackWidget from './callback/index.js';
import Swipers from './swipers/index.js';
import Filter from './filter/index.js';

window.$ = $;
// window.configuration = configuration;
window.app = {
  runFindByMark: async () => new MarkSearch(await MarkSearch.getMarks()),
  runFancybox: () => Fancybox.bind('[data-fancybox]', {}),
  runCalculator: () => new CreditCalculator(),
  runCallbackWidget: () => new CallbackWidget('var(--blue-main)', () => $('#callback-modal').modal({ fadeDuration: 100 })),
  runSelect2: () => {
    $('.select').not('.credit-js-select-marks').select2({
      language: 'ru',
    });
    // const url = document.location.origin;
    const url = 'https://bu-3.vitmp.ru';
    let cars = [];
    $('.credit-js-select-marks').select2({
      language: 'ru',
      placeholder: 'Выберите значение',
      ajax: {
        dataType: 'json',
        url: `${url}/ajax/used_auto/get/marks/all`,
        data: function (params) {
          return {
            query: params.term,
          };
        },
        processResults: function (data) {
          return {
            results: data.map(function(item) {
              return { id: item.id, text: item.name };
            }),
          };
        },
        cache: true,
      },
    });

    $('.credit-js-select-marks').on('change', (event) => {
      $('.credit-js-select-models').val(null).trigger('change');
      $('.credit-js-select-cars').val(null).trigger('change');
      if (event.currentTarget.value) {
        $('.credit-js-select-models').select2({
          language: 'ru',
          placeholder: 'Выберите значение',
          ajax: {
            dataType: 'json',
            url: `${url}/ajax/used_auto/get/models/by/mark/${event.currentTarget.value}`,
            data: function (params) {
              return {
                query: params.term,
              };
            },
            processResults: function (data) {
              cars = data;
              return {
                results: data.map(function(item) {
                  return { id: item.id, text: item.name };
                }),
              };
            },
            cache: true,
          },
        });
        $('.credit-js-select-models').removeAttr('disabled');
      }
    });
    $('.credit-js-select-models').on('change', (event) => {
      $('.credit-js-select-cars').val(null).trigger('change');
      if (event.currentTarget.value) {
        $('.credit-js-select-cars').select2({
          placeholder: 'Выберите значение',
          ajax: {
            dataType: 'json',
            url: `${url}/ajax/used_auto/get/cars/by/model/${event.currentTarget.value}`,
            data: function (params) {
              return {
                query: params.term,
              };
            },
            processResults: function (data) {
              cars = data;
              return {
                results: data.map(function(item) {
                  return { id: item.id, text: item.name };
                }),
              };
            },
            cache: true,
          },
        });
        $('.credit-js-select-cars').removeAttr('disabled');
      }
    });
    $('.credit-js-select-cars').on('change', (event) => {
      if (event.currentTarget.value) {
        const currentCar = cars.filter((car) => car.id === +event.currentTarget.value)[0];
        const formattedPrice = new Intl.NumberFormat('ru').format(currentCar.price) + ' ₽';
        $('[data-car-mark]').val(currentCar.model.mark.name);
        $('[data-car-model]').val(currentCar.model.name);
        $('[data-car-mileage]').val(currentCar.mileage);
        $('[data-car-price]').val(currentCar.price);
        $('#car-price-sum-value').data('value', currentCar.price);
        window.calculator.reloadCarPrice();
        $('[data-car-year]').val(currentCar.year);
        $('[data-car-name]').val(currentCar.name);
        $('span[data-car-price]').text(formattedPrice);
        $('#first-payment-input').trigger('input');

        $('.credit-main__step__title .title-s').text('Вы выбрали');
        $('.credit-main__preview img').attr('src', currentCar.preview[0].path);
        $('#first-payment-input').attr('max', currentCar.price * 0.9);
      }
    });
  },
  runMasks: () => {
    $('.js-phone-mask').inputmask({
      mask: '+7 (*99) 999-99-99',
      definitions: {
        '*': {
          validator: '[4,9]',
        },
      },
      showMaskOnHover: false,
    });

    $('.js-digits-mask').inputmask({
      alias: 'currency',
      allowMinus: 'false',
      digits: '0',
      groupSeparator: ' ',
      rightAlign: false,
      prefix: '',
    });

    $('.js-numeric-mask').inputmask({
      alias: 'numeric',
      allowMinus: 'false',
      rightAlign: false,
    });
  },
  runSwiper: () => {
    Swipers.carItemSwipers();
    Swipers.carItemsSwipers();
    Swipers.creditBanner();
  },
  runTimers: () => {
    const timer = new Timer(configuration.timerDate, '.timer');
    timer.countdownTimer();
    const timerUpdateAction = timer.countdownTimer.bind(timer);
    timer.timerId = setInterval(timerUpdateAction, 1000);
  },
  runListeners: () => {
    $('#show-more-btn').on('click', (event) => {
      const target = $(event.currentTarget);
      if (target.text() === 'Показать все') {
        $('.car-brands__more').css({ display: 'flex' });
        return target.text('Скрыть марки');
      }

      $('.car-brands__more').css({ display: 'none' });
      return target.text('Показать все');
    });

    $('.menu-icon').on('click', () => {
      $('.header').toggleClass('active');
      $('.header__mobile__menu').toggleClass('active');
    });

    $('.button__search').on('click', () => {
      $('.header__search__container').addClass('active');
      $('.header__search__wrapper').addClass('active');
    });

    $('.header__search .cross-icon').on('click', () => {
      $('.header__search__wrapper').removeClass('active');
      $('.header__search__container').removeClass('active');
    });

    $('#filter-checkbox').on('change', (event) => {
      if (event.currentTarget.checked) {
        $('.new-cars__wrapper .filter').css('display', 'flex');
      } else {
        $('.new-cars__wrapper .filter').css('display', 'none');
      }
    });

    const hiddenImages = $(".car-info__gallery__small__item[style='display:none;']");

    if (hiddenImages.length > 0) {
      const target = $('.car-info__gallery__small__item').not("[style='display:none;']").last();
      $(`
        <div class="more-photo" >
            <span class="more-photo__text">+ ${hiddenImages.length} фото </span>
        </div>
      `).appendTo(target);

      $('.more-photo').on('click', () => {
        Fancybox.fromSelector('[data-fancybox="car-gallery"]');
      });
    }
  },
  runTabs: () => {
    const mostPopularTabs = new Tab('.most-popular__tabs-container');
    const specTabs = new Tab('.specs__container');
    const mobileSpecTabs = new Tab('.modal-specs__tabs-container');

    return {
      specTabs,
      mostPopularTabs,
      mobileSpecTabs,
    };
  },
  runLazy: () => {
    $('.lazy').Lazy({
      // visibleOnly: true,
      combined: true,
      afterLoad: function(element) {
        element.addClass('loaded');
      },
    });
  },
  runFormsValidation: () => {
    jQuery.validator.addMethod('ruPhone', function(phoneNumber) {
      function countDigits(str) {
        const regex = /\d/g;
        const matches = str.match(regex);

        if (matches) {
          return matches.length;
        }
        return 0;
      }

      return countDigits(phoneNumber) >= 11;
    });
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
      },
    });
    $('.js-form-validator').each(function() {
      $(this).validate({
        focusInvalid: false,
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          model: {
            required: true,
            minlength: 2,
          },
          mark: {
            required: true,
            minlength: 2,
          },
          telephone: {
            required: true,
            minlength: 18,
            ruPhone: true,
          },
          textarea: {
            required: true,
            minlength: 2,
            maxlength: 1024,
          },
          agreement: {
            required: true,
          },
        },
        messages: {
          textarea: 'Поле должно быть заполнено',
          mark: 'Поле должно быть заполнено',
          model: 'Поле должно быть заполнено',
          name: 'Поле должно быть заполнено',
          agreement: 'Поле должно быть заполнено',
          telephone: 'Номер телефона должен содержать 11 цифр',
        },
        submitHandler: function(form, event) {
          const $form = $(form);
          const formData = $form.serialize();

          if ($form.attr('id') === 'review-first-form') {
            event.preventDefault();
            const secForm = new ReviewForm($form);
            return secForm;
          }

          $.ajax({
            url: $form.data('action'),
            type: $form.data('method'),
            data: formData,
            success: function(response) {
              eval(response.reachgoal);

              $form.trigger('reset');
              if ($form.attr('id') === 'review-second-form') {
                $('#review-first-form')[0].reset();
                $.modal.close();
              }
              const modal = $('#success-modal');
              if (modal.length > 0) {
                $.modal.close();
              }

              modal.modal({
                fadeDuration: 100,
              });
            },
            error: function(xhr, status, error) {
              console.log('Error:', status, error);
            },
          });
          return false;
        },
        errorElement: 'span',
      });
    });
  },
  runModals: () => {
    $('.js-open-modal').each((_, el) => {
      $(el).on('click', (event) => {
        event.preventDefault();
        const $target = $(event.currentTarget);
        const modalId = $target.data('modal-template');

        const modalBody = $(`#${modalId}`).modal({
          fadeDuration: 100,
        });

        if ($target.data('modal-type') === 'feedback') {
          modalBody.find('.modal-title').text($target.data('modal-model'));
          modalBody.find('.modal-user').text($target.data('modal-user'));
          modalBody.find('.modal-rating').text($target.data('modal-rating'));
          modalBody.find('.modal-text').text($target.data('modal-text'));
          modalBody.find('.modal-date').text($target.data('modal-date'));
          modalBody.find('.modal-attachments');
        }
      });
    });
  },
  runFavourite: () => {
    $('#clear-favourite-list ').on('click', () => {
      $('.car-item ').remove();
      $.cookie('favourites', []);
      $('.new-cars__container').hide();
      $('.favourites__not-found').show();
    });

    $('.button__favourite').on('click', () => {
      window.location.href = '/favourites';
    });

    if ($.cookie('favourites') == null) {
      $.cookie('favourites', []);
    }

    $('.car-item__fav__badge').on('click', (event) => {
      event.preventDefault();
      const target = $(event.currentTarget);
      const id = target.data('favourite-id');
      let favourites = $.cookie('favourites').split(',');
      favourites = $.grep(favourites, function(n) { return (n === 0 || n) && n !== ''; });
      favourites = new Set(favourites);

      if (target.hasClass('active')) {
        target.removeClass('active');
        favourites = new Set(favourites);
        favourites.delete(String(id));
        $.cookie('favourites', Array.from(favourites));
      } else {
        favourites.add(String(id));
        target.addClass('active');
      }

      $.cookie('favourites', Array.from(favourites));
    });
  },

  runFilter: () => new Filter(),
};

window.calculator = window.app.runCalculator();
window.app.runFormsValidation();
window.app.runFilter();
window.app.runFancybox();
window.app.runTabs();
window.app.runMasks();
window.app.runSwiper();
window.app.runTimers();
window.app.runListeners();
window.app.runFindByMark();
window.app.runLazy();
window.app.runSelect2();
window.app.runModals();
window.app.runCallbackWidget();
window.app.runFavourite();
