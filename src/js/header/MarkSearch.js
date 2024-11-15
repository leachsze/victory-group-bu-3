/* eslint-disable camelcase */
export default class MarkSearch {
  colsCount = 6;

  carbrands = [];

  $content = $('.header__search__result__content');

  $findField = $('.header__search input');

  $mobileInput = $('.header-input-search-mobile');

  $mobileContent = $('.find-by-marks-mobile');

  constructor(carbrands, colsCount) {
    if (colsCount) {
      this.colsCount = colsCount;
    }

    if (carbrands) {
      this.carbrands = carbrands;
    }

    this.initListeners();
    this.fillMobileBrandsList(this.carbrands);
  }

  initListeners() {
    const handleInputCb = this.handleInputSearch.bind(this);
    const focusMobileSearchCb = this.handleMobileFocusSearch.bind(this);

    this.$mobileInput.on('focus', focusMobileSearchCb);
    this.$findField.on('input', handleInputCb);
    this.$mobileInput.on('input', handleInputCb);
  }

  handleMobileFocusSearch() {
    this.$mobileContent.addClass('active');
    $('.mobile-menu__content').css({ 'justify-content': 'flex-start' });
  }

  fillBrandsList(carbrands) {
    this.$content.empty();

    carbrands.forEach((brand) => {
      this.$content.append(`
        <a href="${brand.url}" target="_blank" class="find-by-marks-desktop__mark header__search__result__item">
          <img src="${brand.image}"/>
          ${brand.name}
        </a>
      `);
    });
  }

  handleInputSearch(event) {
    const { value } = event.currentTarget;
    const filteredCarbrands = this.carbrands.filter((carbrand) => {
      const brand = carbrand.name.toLocaleLowerCase();
      return brand.includes(value.toLocaleLowerCase());
    });
    if (filteredCarbrands.length > 0) {
      $('.header__search__result').addClass('active');
    } else {
      $('.header__search__result').removeClass('active');
    }

    this.fillBrandsList(filteredCarbrands);
    this.fillMobileBrandsList(filteredCarbrands);
  }

  fillMobileBrandsList(carbrands) {
    this.$mobileContent.empty();

    carbrands.forEach((brand) => {
      const brandName = Object.keys(brand)[0];
      const { url, image_monotone } = brand[brandName];

      this.$mobileContent.append(`
        <a href="${url}" target="_blank" class="car-brands__item">
          <div class="car-brands__item__text">
            <img src="${image_monotone}" class="brand-icon"></img>
            <span>${brandName}</span>
          </div>
          <span class="arrow-icon"></span>
        </a>
      `);
    });
  }

  static async getMarks () {
    try {
      return await $.ajax(window.configuration.marksListRoute);
    } catch (error) {
      return [];
    }
  }
}
