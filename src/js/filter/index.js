class Filter {
  url = document.location.origin;
  //   url = 'https://bu-3.vitmp.ru';

  constructor(updateDefault = false) {
    // Инициализация элементов формы фильтрации
    this.data = {};
    this.filter = document.querySelector('[data-filter-form]');

    if (!this.filter) return;

    this.btnApply = this.filter.querySelector('[data-filter-btn]');
    this.btnReset = this.filter.querySelector('[data-filter-reset]');
    this.resultAjaxContainer = document.querySelector('[data-container-result-ajax]');

    // Элементы, подверженные изменениям
    this.changeMark = this.filter.querySelector('[data-change-mark]');
    this.changeModel = this.filter.querySelector('[data-change-model]');
    this.changeBody = this.filter.querySelector('[data-change-body_type]');
    this.changeGearbox = this.filter.querySelector('[data-change-gearbox]');
    this.changeDrive = this.filter.querySelector('[data-change-drive]');

    this.changePrice = this.filter.querySelector('[data-range-price]');
    this.changePriceFrom = this.filter.querySelector('[data-change-price_from]');
    this.changePriceTo = this.filter.querySelector('[data-change-price_to]');

    this.changeYear = this.filter.querySelector('[data-range-year]');
    this.changeYearFrom = this.filter.querySelector('[data-change-year_from]');
    this.changeYearTo = this.filter.querySelector('[data-change-year_to]');

    this.changeMileage = this.filter.querySelector('[data-range-mileage]');
    this.changeMileageFrom = this.filter.querySelector('[data-change-mileage_from]');
    this.changeMileageTo = this.filter.querySelector('[data-change-mileage_to]');

    // Выполнение начального обновления, если указано
    if (updateDefault) {
      this.update();
    }

    // Инициализация событий
    this.init();
  }

  /**
     * Инициализирует обработчики событий для элементов фильтра.
     */
  init() {
    // Обновление списка моделей при изменении марки
    $(this.changeMark).on('change', () => this.updateModels());

    // Обновление фильтра при изменении любого из полей
    [this.changeModel, this.changeBody, this.changeGearbox, this.changeDrive].forEach((elem) => {
      if (elem === null) return;

      $(elem).on('change', () => this.update());
    });

    // Слушатели для полей ввода с изменением текста
    [this.changePriceFrom, this.changePriceTo, this.changeMileageFrom, this.changeMileageTo].forEach((elem) => {
      if (elem === null) return;
      elem.addEventListener('keyup', () => this.update());
    });

    // Слушатели для селекторов диапазона года
    [this.changeYearFrom, this.changeYearTo].forEach((elem) => {
      if (elem === null) return;
      elem.addEventListener('change', () => this.update());
    });

    // Сброс фильтра
    if (this.btnReset === null) return;
    this.btnReset.addEventListener('click', () => this.reset());
  }

  /**
     * Кодирует объект данных в строку параметров запроса.
     * @param {Object} data - Объект с данными.
     * @returns {string} - Закодированная строка параметров.
     */
  encodeQueryData(data) {
    return Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  /**
     * Создает ссылку на каталог с учетом фильтров.
     * @param {Object} filterData - Данные фильтра.
     * @returns {string} - Сформированная ссылка.
     */
  buildLink(filterData) {
    let link = '/catalog/';
    if (filterData.mark) {
      link += window.configuration.filterSlugs[filterData.mark].slug;
    }
    if (filterData.model) {
      link += '/' + window.configuration.filterSlugs[filterData.mark].models[filterData.model].slug;
    }
    const query = this.encodeQueryData(filterData);
    return `${this.url}${link}${query ? '?' + query : ''}#catalog`;
  }

  /**
     * Обновляет фильтр и отправляет запрос для подсчета автомобилей.
     */
  update() {
    // Список полей для проверки
    const updateFields = [
      this.changeMark, this.changeModel, this.changeBody,
      this.changeGearbox, this.changeDrive, this.changePriceFrom,
      this.changePriceTo, this.changeYearFrom, this.changeYearTo,
      this.changeMileageFrom, this.changeMileageTo,
    ];

    // Проверка значений всех полей
    updateFields.forEach((field) => this.checkField(field));

    // Формирование запроса
    const query = this.encodeQueryData(this.data);

    const queryUrl = query ? `${this.url}/api/auto/used/count-car?${query}` : `${this.url}/api/auto/used/count-car`;

    fetch(queryUrl)
      .then((response) => response.text())
      .then((count) => {
        const updatedCount = parseInt(count.trim(), 10);
        if (updatedCount === 0) {
          // Если нет автомобилей
          this.btnApply.classList.add('disabled');
          this.btnApply.textContent = 'Авто не найдены';
          this.resultAjaxContainer.innerHTML = 'Авто не найдены';
        } else {
          // Обновление кнопки с количеством автомобилей
          if (this.btnApply === null) return;
          this.btnApply.classList.remove('disabled');
          this.btnApply.setAttribute('href', this.buildLink(this.data));
          this.btnApply.textContent = `Показать ${this.formatPrice(updatedCount)} авто`;
        }
      })
      .catch((error) => console.error(error));
  }

  /**
     * Проверяет и обрабатывает значение указанного элемента.
     * @param {HTMLElement} element - Элемент формы.
     */
  checkField(element) {
    if (element === null) return;

    const name = element.getAttribute('name');
    const value = element.value.trim();

    delete this.data[name];

    if (value && value !== '0') {
      this.data[name] = value.replace(/[^0-9]/g, '');
    }
  }

  /**
   * Обновляет список моделей на основе выбранной марки.
   */
  updateModels() {
    const markId = this.changeMark.value;
    fetch(`${this.url}/ajax/used_auto/get/models/by/mark/${markId}`)
      .then((response) => response.json())
      // eslint-disable-next-line consistent-return
      .then((data) => {
        this.changeModel.innerHTML = "<option value='0' selected>Все модели</option>";

        if (data.length === 0) {
          this.changeModel.setAttribute('disabled', true);
          return this.update();
        }

        Object.keys(data).forEach((key) => {
          const option = document.createElement('option');
          option.value = data[key].id;
          option.textContent = data[key].name;
          this.changeModel.append(option);
          this.changeModel.removeAttribute('disabled');
        });
        this.update();
      })
      .catch((error) => console.error(error));
  }

  /**
     * Сбрасывает значения всех полей фильтра и обновляет форму.
     */
  reset() {
    this.changeMark.value = '0';
    this.changeModel.innerHTML = "<option value='0' selected>Все модели</option>";
    this.filter.querySelectorAll('select').forEach((select) => select.value = '0');
    this.filter.querySelectorAll('input').forEach((input) => input.value = '');
    this.update();
  }

  formatPrice(str) {
    return (str + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }
}

export default Filter;
