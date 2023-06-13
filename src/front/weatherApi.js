const getWeatherApi = async (link) => {
  const result = await fetch(link);
  const data = await result.json();
  return [data.current.feelslike_c, data.current.condition.text];
};

export default getWeatherApi;

// const temperature = data.current.temp_c;
