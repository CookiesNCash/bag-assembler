import axios from 'axios';
// import _ from 'lodash';

class Data {
  constructor(data) {
    this.data = { ...data };
  }

  // processName() {
  //   const { name } = this.data;
  //   return name;
  // }

  // processSex() {
  //   const { sex } = this.data;
  //   const rules = {
  //     male: 'Бритва, презервативы',
  //     female: 'Косметика, тампоны',
  //   };
  //   return rules[sex];
  // }

  // processAge() {
  //   const { age } = this.data;
  //   const normalizeAge = _.floor(_.divide(_.subtract(Date.now(), Date.parse(age)), 31557600000));
  //   const rules = normalizeAge < 18 ? 'Разрешение родителей' : 'Паспорт';
  //   return rules;
  // }

  processDays() {
    const { days } = this.data;
    const dayIntervals = [
      { min: Number.NEGATIVE_INFINITY, max: 7, state: 'Немного одежды' },
      { min: 8, max: 20, state: 'Средне одежды' },
      { min: 21, max: Number.POSITIVE_INFINITY, state: 'Много одежды' },
    ];
    // interval => - Это запись стрелочной функции с параметром interval
    const currentDays = dayIntervals.find(
      (interval) => days >= interval.min && days < interval.max,
    );
    return currentDays ? currentDays.state : undefined;
  }

  async city() {
    const { city } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${city}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor(response.data.current.temp_c);
    const weatherIntervals = [
      { min: Number.NEGATIVE_INFINITY, max: 13, state: 'Холодно' },
      { min: 14, max: 22, state: 'Нормально' },
      { min: 23, max: Number.POSITIVE_INFINITY, state: 'Жарко' },
    ];
    const currentWeather = weatherIntervals.find(
      (interval) => temperature >= interval.min && temperature < interval.max,
    );

    return currentWeather ? currentWeather.state : undefined;
  }

  // processChildren() {
  //   const { children } = this.data;
  //   const rules = children ? 'Детские принадлежности' : undefined;
  //   return rules;
  // }

  // processPets() {
  //   const { pets } = this.data;
  //   const rules = pets ? 'Поводок' : undefined;
  //   return rules;
  // }

  processOther() { //eslint-disable-line
    const otherInfo = 'Зубная паста, зарядка, наушники, книги';
    return otherInfo;
  }

  async processData() {
    const methods = [
      // this.processName,
      // this.processSex,
      // this.processAge,
      this.processDays,
      this.city,
      // this.processChildren,
      // this.processPets,
      this.processOther,
    ];

    const results = await Promise.all(methods.map((method) => method.call(this)));
    const filteredResults = results.filter((result) => result !== undefined);
    return filteredResults;
  }
}

const dataHandler = async (data) => {
  const dataProcessor = new Data(data);
  return dataProcessor.processData();
};

export default {
  dataHandler,
};
