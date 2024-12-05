import Helper from '../helper/index.js';

export default class CreditCalculator {
  monthPayment = 30_000;

  carPrice = 7_000_000;

  creditSum = 4_000_000;

  sumRange = $('#first-payment-input');

  sumValue = $('#first-payment-value');

  periodRange = $('#credit-period-input');

  periodValue = $('#credit-period-value');

  monthPaymentValue = $('#month-payment-value');

  creditPeriod = 6;

  constructor() {
    this.carPrice = +$('#car-price-sum-value').data('value');
    this.creditTotal = +$('#credit-sum-value').data('value');

    this.sumRange.attr('min', this.setupSumRangeMin());
    this.sumRange.attr('max', this.setupSumRangeMax());

    this.creditPeriodEvent(this.periodRange.val());
    this.creditSumEvent(+this.sumRange.val());
    this.creditPeriodListener();
    this.sumListeners();
  }

  setupSumRangeMin() {
    return 0;
  }

  setupSumRangeMax() {
    return this.carPrice * 0.9;
  }

  sumListeners() {
    this.sumRange.on('input', (event) => this.creditSumEvent(event.currentTarget.value));
  }

  creditSumEvent(val) {
    this.creditSum = this.calculateSumValue(val);
    this.monthPayment = this.calculateMonthPayment();
    this.updatePaymentValues();

    this.updateSumValue();
  }

  creditPeriodListener() {
    this.periodRange.on('input change', (event) => this.creditPeriodEvent(event.currentTarget.value));
  }

  creditPeriodEvent(val) {
    this.creditPeriod = +val;
    this.monthPayment = this.calculateMonthPayment();
    this.updatePaymentValues();
    this.updateCreditPeriod();
  }

  convertPrice() {

  }

  updatePaymentValues() {
    this.monthPaymentValue.text(Helper.convertPrice(this.monthPayment));
    $('#credit-sum-value').text(Helper.convertPrice(this.carPrice - this.creditSum));
  }

  validateValue(value) {
    const min = +this.sumRange.attr('min');
    const max = +this.sumRange.attr('max');

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }

  calculatePeriodValue() {
    return (this.carPrice - this.firstPayment) / this.monthPayment;
  }

  calculateMonthPayment() {
    return Math.round((this.carPrice - this.creditSum) / this.creditPeriod);
  }

  calculateSumValue(val) {
    $('#credit-sum-value').text(this.convertPrice(this.creditTotal - val));
    return val;
  }

  updateCreditPeriod() {
    this.periodValue.text(`${this.creditPeriod} мес.`);
  }

  updateSumValue() {
    this.sumValue.val(this.creditSum);
  }

  reloadCarPrice() {
    this.carPrice = +$('#car-price-sum-value').data('value');
  }
}
