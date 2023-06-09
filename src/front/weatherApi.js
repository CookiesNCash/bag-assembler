const getWeatherApi = async (link) => {
  const result = await fetch(link);
  const data = await result.json();
  // const temperature = data.current.temp_c;
  return data;
};
export default getWeatherApi;
