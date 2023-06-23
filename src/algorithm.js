import Data from './Data.js';
import ClothingItem from './ClothingItem.js';

const calculateLuggage = async (data) => {
  const dataProcessor = new Data(data);
  const currentTemperature = await dataProcessor.getTemperature();
  const currentDays = dataProcessor.getDays();

  const collectedItems = [];

  // Смотри температуру и в зависимости от неё добавляем специальную одежду

  if (currentTemperature < 10) {
    collectedItems.push(ClothingItem.addCoat(), ClothingItem.addSweater());
  } else if (currentTemperature >= 10 && currentTemperature < 20) {
    collectedItems.push(ClothingItem.addJacket());
  } else {
    collectedItems.push(ClothingItem.addShorts());
  }

  // Формулы для количества вещей в зависимости от продолжительности поездки;

  const tShirtsNeeded = Math.floor(currentDays / 3);
  const pantsNeeded = Math.floor(currentDays / 5);
  const sweatShirtNeeded = Math.floor(currentDays / 4);

  // Добавляем вещи

  for (let i = 0; i < tShirtsNeeded; i += 1) {
    collectedItems.push(ClothingItem.addTShirt());
  }

  for (let i = 0; i < sweatShirtNeeded; i += 1) {
    collectedItems.push(ClothingItem.addSweatshirt());
  }

  for (let i = 0; i < pantsNeeded; i += 1) {
    collectedItems.push(ClothingItem.addPants());
  }

  // Собираем багаж и считаем кол-во для каждого предмета

  const luggage = collectedItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (collectedItem) => collectedItem[0] === item[0],
    ); // ищем элемент, у которого первый элемент [0] равен имени предмета item[0].
    if (existingItem) {
      existingItem[1] += 1;
    } else {
      acc.push([item[0], 1]);
    }
    return acc;
  }, []);

  const formattedLuggage = luggage.map((item) => `${item[0]} - ${item[1]}`);

  return formattedLuggage;
};

export default calculateLuggage;
