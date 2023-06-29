import Data from './classes/Data.js';
import ClothingItem from './classes/ClothingItem.js';

const calculateLuggage = async (data) => {
  const dataProcessor = new Data(data);
  const currentTemperatureTo = await dataProcessor.getTemperatureCityTo();
  const currentDays = dataProcessor.getDays();
  const currentBagSize = dataProcessor.getBagSize();
  const currentIsRain = await dataProcessor.IsRain();
  // const currentTripPurpose = dataProcessor.getTripPurpose();

  const collectedItems = [];

  // Определение необходимой одежды в зависимости от температуры
  if (currentTemperatureTo < 10) {
    collectedItems.push(ClothingItem.addCoat(), ClothingItem.addSweater());
  } else if (currentTemperatureTo < 20) {
    collectedItems.push(ClothingItem.addJacket());
  } else {
    collectedItems.push(ClothingItem.addShorts());
  }

  if (currentIsRain) {
    collectedItems.push(ClothingItem.addUmbrella());
  }

  if (currentBagSize !== 'Налегке') {
    collectedItems.push(
      ClothingItem.addPassport(),
      ClothingItem.addPhoneCharger(),
      ClothingItem.addToothBrush(),
      ClothingItem.addToothPaste(),
    );
  }

  // Определение количества вещей в зависимости от продолжительности поездки
  const tShirtsNeeded = Math.ceil(currentDays / 3);
  const pantsNeeded = Math.ceil(currentDays / 5);
  const sweatShirtNeeded = Math.ceil(currentDays / 5);

  // Учет размера багажа
  const bagSizes = {
    Рюкзак: 3,
    Чемодан: 6,
    Налегке: 1,
  };
  const maxItemsAllowed = bagSizes[currentBagSize];

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
