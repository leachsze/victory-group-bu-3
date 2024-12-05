import Helper from '../helper';

class Vin {
  constructor() {
    this.startVinTimer();
  }

  startVinTimer() {
    const $vinTimer = $('.vin-timer');
    this.seconds = +$vinTimer.data('vin-timer') || 0;

    if (this.seconds === 0) {
      this.updateContent();
      return;
    }

    const interval = setInterval(() => {
      this.seconds -= 1;
      $vinTimer.text(Helper.formatTime(this.seconds));

      if (this.seconds === 0) {
        clearInterval(interval);
        this.updateContent();
      }
    }, 1000);
  }

  updateContent() {
    $('.vin-modal').addClass('hidden-image');
    $('.vin-modal').addClass('vin-second-modal');
    $('.vin-first').hide();
    $('.vin-second').show();
  }
}

export default Vin;
