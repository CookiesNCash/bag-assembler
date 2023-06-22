import axios from 'axios';

class Data {
  constructor(data) {
    this.data = { ...data };
  }

  getDays() {
    const { days } = this.data;
    return Number(days);
  }

  async getTemperature() {
    const { cityTo } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityTo}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor(response.data.current.temp_c);
    return temperature
  }

  getPurposeTrip() {
    const { purposeTrip } = this.data;
    return purposeTrip;
  }

  getResidence() {
    const { residence } = this.data;
    return residence;
  }

  getOther() { // eslint-disable-line
    const otherInfo = 'Зубная паста, зарядка, наушники, книги';
    return otherInfo;
  }

  async calculateLuggage() {
    const currentWeather = await this.getTemperature();
    const days = this.getDays();
    const purposeTrip = this.getPurposeTrip();
   return [String(days), String(purposeTrip)]
   
}
}

const dataHandler = async (data) => {
  const dataProcessor = new Data(data);
  return dataProcessor.calculateLuggage();
};
// const dataTest = {
//   days: '9',
//   // city: 'London',
//   purposeTrip: 'Туризм',
//   residence: 'Saint-Petersburg',
//   cityTo: 'Сочи',
//   // cityFrom: 'London',
//   // bagSize: '
// }
// console.log(await dataHandler(dataTest));
export default {
  dataHandler,
};