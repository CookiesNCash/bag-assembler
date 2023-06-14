import axios from 'axios';
import _ from 'lodash';

class Data {
  constructor(data1, data2) {
    this.data = { ...data1, ...data2 };
  }

  processName() {
    const { name } = this.data;
    return name;
  }

  processSex() {
    const { sex } = this.data;
    const rules = {
      male: 'Бритва, презервативы',
      female: 'Косметика, тампоны',
    };
    return rules[sex];
  }

  processAge() {
    const { age } = this.data;
    const normalizeAge = _.floor(_.divide(_.subtract(Date.now(), Date.parse(age)), 31557600000));
    const rules = normalizeAge < 18 ? 'Разрешение родителей' : 'Паспорт';
    return rules;
  }

  //   processPlaceLive() {
  //     const { placeLive } = this.data;
  //   }

  processDays() {
    const { days } = this.data;
    const rules = days < 10 ? 'повербанк' : 'Ножницы';
    return rules;
  }

  async processCityFrom() {
    const { cityFrom } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityFrom}`;
    const response = await axios.get(apiUrl);
    // console.log(response)
    const temperature = _.floor(response.data.current.temp_c);
    const rules = temperature < 10 ? 'Одентесь потеплее' : 'Наденьте привычную одежду';
    return rules;
  }

  async processCityTo() {
    const { cityTo } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityTo}`;
    const response = await axios.get(apiUrl);
    const temperature = _.floor(response.data.current.temp_c);
    const rules = temperature < 10 ? 'Тёплую одежду' : 'Лёгкую одежду';
    return rules;
  }

  processChildren() {
    const { children } = this.data;
    const rules = children ? 'Детские принадлежности' : undefined;
    return rules;
  }

  processPets() {
    const { pets } = this.data;
    const rules = pets ? 'Поводок' : undefined;
    return rules;
  }

  processOther() { //eslint-disable-line
    const otherInfo = 'Зубная паста, зарядка, наушники, книги';
    return otherInfo;
  }

  async processData() {
    const methods = [
      this.processName,
      this.processSex,
      this.processAge,
      // this.processPlaceLive,
      this.processDays,
      this.processCityFrom,
      this.processCityTo,
      this.processChildren,
      this.processPets,
      this.processOther,
    ];

    const results = await Promise.all(methods.map((method) => method.call(this)));
    const filteredResults = results.filter((result) => result !== undefined);
    return filteredResults;
  }
}

const dataHandler = async (data1, data2) => {
  const data = new Data(data1, data2);
  return data.processData();
};

const data1 = {
  name: 'John Doe',
  sex: 'male',
  age: '2003-03-20',
  placeLive: 'City',
};

const data2 = {
  days: 5,
  cityFrom: 'New York',
  cityTo: 'London',
  children: false,
  pets: true,
};

console.log(dataHandler(data1, data2));
// console.log(ataHandler(data1, data2).then(result => result.join(' ')));
