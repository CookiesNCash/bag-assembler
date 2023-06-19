import axios from 'axios';
import _ from 'lodash';
import { readFile, writeFile } from 'node:fs/promises';

export class Data {
  constructor(data) {
    this.data = { ...data };
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
    const rules = days < 10 ? 'Немного одежды' : 'Много одежды';
    return rules;
  }

  // async processCityFrom() {
  //   const { cityFrom } = this.data;
  //   const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityFrom}`;
  //   const response = await axios.get(apiUrl);
  //   // console.log(response)
  //   const temperature = _.floor(response.data.current.temp_c);
  //   const rules = temperature < 10 ? 'Одентесь потеплее' : 'Наденьте привычную одежду';
  //   return rules;
  // }

  async city() {
    
    const { city } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${city}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor((response.data.current.temp_c));
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

  processOther() { // eslint-disable-line
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
      // this.processCityFrom,
      this.city,
      this.processChildren,
      this.processPets,
      this.processOther,
    ];

    const results = await Promise.all(methods.map((method) => method.call(this)));
    const filteredResults = results.filter((result) => result !== undefined);
    return filteredResults;
  }
}

const dataHandler = async (data1) => {
  const data = new Data(data1);
  return data.processData();  
};

const data = {
    "days":"14",
    "city":"Санкт-Петербург"
  }

const writeFileAsync = async (filePath, data) => {
    const addr = new URL(filePath, import.meta.url);
    await writeFile(addr, data, { encoding: 'utf8' });
  };

  const result = await dataHandler(data);
writeFileAsync("../database/users/result.json", result)
