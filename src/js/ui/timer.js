export default class Timer {
  constructor(deadline, selector) {
    this.deadline = new Date(deadline);
    this.timer = $(selector);
    this.timerId = Math.random() * new Date();
    this.$days = this.timer.find('.timer__days');
    this.$hours = this.timer.find('.timer__hours');
    this.$minutes = this.timer.find('.timer__minutes');
    this.$seconds = this.timer.find('.timer__seconds');
  }

  declensionNum (num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }

  countdownTimer() {
    const diff = this.deadline - new Date();
    if (diff <= 0) {
      clearInterval(this.timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    if (days === 0) {
      this.$days.hide();
    }

    this.$days.find('.timer-number').text(days < 10 ? '0' + days : days);
    this.$hours.find('.timer-number').text(hours < 10 ? '0' + hours : hours);
    this.$minutes.find('.timer-number').text(minutes < 10 ? '0' + minutes : minutes);
    this.$seconds.find('.timer-number').text(seconds < 10 ? '0' + seconds : seconds);

    this.$days.find('.timer-text').text(this.declensionNum(days, ['день', 'дня', 'дней']));
    this.$hours.find('.timer-text').text(this.declensionNum(hours, ['час', 'часа', 'часов']));
    this.$minutes.find('.timer-text').text(this.declensionNum(minutes, ['минута', 'минуты', 'минут']));
    this.$seconds.find('.timer-text').text(this.declensionNum(seconds, ['секунда', 'секунды', 'секунд']));
  }
}
