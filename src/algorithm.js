import Data from './classes/Data.js';
import ClothingItem from './classes/ClothingItem.js';

const calculateLuggage = async (data) => {
  const dataProcessor = new Data(data);
  const currentTemperature = await dataProcessor.getTemperatureCityTo();
  const currentDays = dataProcessor.getDays();
  const currentBagSize = dataProcessor.getBagSize();
  // const currentTripPurpose = dataProcessor.getTripPurpose();

  const collectedItems = [];
  const addBaseItems = () => {
    collectedItems.push(ClothingItem.addPassport());
    collectedItems.push(ClothingItem.addPhoneCharger());
    collectedItems.push(ClothingItem.addToothbrushAndPaste());
  };
  addBaseItems();
  // Определение необходимой одежды в зависимости от температуры
  if (currentTemperature < 10) {
    collectedItems.push(ClothingItem.addCoat(), ClothingItem.addSweater());
  } else if (currentTemperature < 20) {
    collectedItems.push(ClothingItem.addJacket());
  } else {
    collectedItems.push(ClothingItem.addShorts());
  }

  // Определение количества вещей в зависимости от продолжительности поездки
  const tShirtsNeeded = Math.floor(currentDays / 3);
  const pantsNeeded = Math.floor(currentDays / 5);
  const sweatShirtNeeded = Math.floor(currentDays / 5);

  // Учет размера багажа
  let maxItemsAllowed;
  if (currentBagSize === 'Рюкзак') {
    maxItemsAllowed = 3;
  } else if (currentBagSize === 'Чемодан') {
    maxItemsAllowed = 6;
  } else if (currentBagSize === 'Налегке') {
    return [];
  }

  // Ограничение количества вещей по размеру багажа
  const limitedTShirts = Math.min(tShirtsNeeded, maxItemsAllowed);
  const limitedPants = Math.min(pantsNeeded, maxItemsAllowed);
  const limitedSweatshirts = Math.min(sweatShirtNeeded, maxItemsAllowed);

  // Добавление вещей в коллекцию
  for (let i = 0; i < limitedTShirts; i += 1) {
    collectedItems.push(ClothingItem.addTShirt());
  }

  for (let i = 0; i < limitedPants; i += 1) {
    collectedItems.push(ClothingItem.addPants());
  }

  for (let i = 0; i < limitedSweatshirts; i += 1) {
    collectedItems.push(ClothingItem.addSweatshirt());
  }

  // Сборка багажа и подсчет количества для каждого предмета
  const luggage = collectedItems.reduce((acc, item) => {
    const existingItem = acc.find((collectedItem) => collectedItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ name: item.name, quantity: 1 });
    }
    return acc;
  }, []);

  // Форматирование результата
  const formattedLuggage = luggage.map((item) => [item.name, item.quantity]);

  return formattedLuggage;
};

export default calculateLuggage;
