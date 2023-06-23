import axios from 'axios';

class Data {
  constructor(data) {
    this.data = { ...data };
  }

  getDays() {
    const { days } = this.data;
    return days;
  }

  async getTemperature() {
    const { city } = this.data;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=6cf406ee732b442baa172614230806&lang=ru&q=${city}`;
    const response = await axios.get(apiUrl);
    const temperature = Math.floor(response.data.current.temp_c);
    return temperature;
  }
}

export default Data;
