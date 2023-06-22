import axios from 'axios';

class Data {
  constructor(data) {
    this.data = { ...data };
  }

  processDays() {
    const { days } = this.data;
    return days;
  }

  async city() {
    const { city } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${city}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor(response.data.current.temp_c);
    return temperature;
  }

  processOther() { // eslint-disable-line
    const otherInfo = 'Зубная паста, зарядка, наушники, книги';
    return otherInfo;
  }

  async processData() {
    const methods = [
      this.processDays,
      this.city,
      this.processOther,
    ];

    const results = await Promise.all(methods.map((method) => method.call(this)));
    const filteredResults = results.filter((result) => result !== null);
    return filteredResults;
  }
}

const dataHandler = async (data) => {
  const dataProcessor = new Data(data);
  return dataProcessor.processData();
};

export default dataHandler;
