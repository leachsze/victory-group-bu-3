import Select from './Select';

class CreditSelect extends Select {
  constructor() {
    super();

    // ничего не инициализируем, если не страница кредита
    if (!window.location.href.includes('credit')) return;

    this.marksSelect();
    this.modelsSelect();
    this.carsSelect();
  }

  modelsSelect() {
    $('.credit-js-select-models').on('change', (event) => {
      $('.credit-js-select-cars').val(null).trigger('change');
      if (event.currentTarget.value) {
        $('.credit-js-select-cars').select2({
          placeholder: 'Выберите авто',
          ajax: this.getAjaxData(`/ajax/used_auto/get/cars/by/model/${event.currentTarget.value}`),
        });
        $('.credit-js-select-cars').removeAttr('disabled');
      }
    });
  }

  marksSelect() {
    $('.credit-js-select-marks').select2({
      placeholder: 'Выберите значение',
      ajax: this.getAjaxData('/ajax/used_auto/get/marks/all'),
    });

    $('.credit-js-select-marks').on('change', (event) => {
      $('.credit-js-select-models').val(null).trigger('change');
      $('.credit-js-select-cars').val(null).trigger('change');
      if (event.currentTarget.value) {
        $('.credit-js-select-models').select2({
          placeholder: 'Выберите модель',
          ajax: this.getAjaxData(`/ajax/used_auto/get/models/by/mark/${event.currentTarget.value}`),
        });
        $('.credit-js-select-models').removeAttr('disabled');
      }
    });
  }

  carsSelect () {
    $('.credit-js-select-cars').on('change', (event) => {
      if (event.currentTarget.value) {
        const currentCar = this.cars.filter((car) => car.id === +event.currentTarget.value)[0];
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
  }
}

export default CreditSelect;
