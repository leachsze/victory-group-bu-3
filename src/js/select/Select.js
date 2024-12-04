class Select {
  cars = [];

  url = document.location.origin;

  // Получаем данные для селекта через запрос
  getAjaxData(path, callback) {
    return {
      dataType: 'json',
      url: `${this.url}${path}`,
      data: function (params) {
        return {
          query: params.term,
        };
      },
      processResults: function (data) {
        if (path.includes('/get/models/') || path.includes('/get/cars/')) {
          this.cars = data;
        }

        if (callback) callback(data);

        return {
          results: data.map(function(item) {
            return { id: item.id, text: item.name };
          }),
        };
      },
      cache: true,
    };
  }
}

export default Select;
