const getWeatherApi = async (link) => {
  const result = await fetch(link);
  const data = await result.json();
  return data;
};

export default getWeatherApi;

// const temperature = data.current.temp_c;
