import axios from 'axios';

class Data {
  constructor(data) {
    this.data = { ...data };
  }

  getDays() {
    const { days } = this.data;
    return days;
  }

  async getTemperatureCityTo() {
    const { cityTo } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityTo}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor(response.data.current.temp_c);
    return temperature;
  }

  async isRain() {
    const { cityFrom } = this.data;
    const { cityTo } = this.data;
    const apiUrlFrom = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityFrom}`;
    const apiUrlTo = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${cityTo}`;
    const responseFrom = await axios.get(apiUrlFrom);
    const responseTo = await axios.get(apiUrlTo);
    const dataRainFrom = responseFrom.data.current.condition.text;
    const dataRainTo = responseTo.data.current.condition.text;
    if (dataRainFrom.includes('дождь') || dataRainTo.includes('дождь')) {
      return true;
    }
    return false;
  }

  getBagSize() {
    const { bagSize } = this.data;
    return bagSize;
  }

  getTripPurpose() {
    const { tripPurpose } = this.data;
    return tripPurpose;
  }
}

export default Data;
