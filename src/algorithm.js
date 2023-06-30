import Data from './classes/Data.js';
import ClothingItem from './classes/ClothingItem.js';

const calculateLuggage = async (data) => {
  const dataProcessor = new Data(data);
  const currentTemperature = await dataProcessor.getTemperatureCityTo();
  const currentDays = dataProcessor.getDays();
  const currentBagSize = dataProcessor.getBagSize();
  const currentIsRain = await dataProcessor.IsRain();

  const collectedItems = [];

  // Определение необходимой одежды в зависимости от температуры
  if (currentTemperature < 10) {
    collectedItems.push(ClothingItem.addCoat(), ClothingItem.addSweater());
  } else if (currentTemperature < 20) {
    collectedItems.push(ClothingItem.addJacket());
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
      ClothingItem.addSweatshirt(),
      ClothingItem.addPants(),
    );
  }

  // Определение количества вещей в зависимости от продолжительности поездки
  const tShirtsNeeded = Math.ceil(currentDays / 3);
  const sweatShirtPantsNeeded = Math.ceil(currentDays / 5);
  const shortsNeeded = Math.ceil(currentDays / 5);

  // Учет размера багажа
  const bagSizes = {
    Рюкзак: 3,
    Чемодан: 6,
    Налегке: 1,
  };
  const maxItemsAllowed = bagSizes[currentBagSize];

  // Ограничение количества вещей по размеру багажа
  const limitedTShirts = Math.min(tShirtsNeeded, maxItemsAllowed);
  const limitedSweatshirtsPants = Math.min(sweatShirtPantsNeeded, maxItemsAllowed);
  const limitedShorts = Math.min(shortsNeeded, maxItemsAllowed);

  // Добавление вещей в коллекцию
  for (let i = 0; i < limitedTShirts; i += 1) {
    collectedItems.push(ClothingItem.addTShirt());
  }

  if (currentTemperature < 20) {
    for (let i = 0; i < limitedSweatshirtsPants; i += 1) {
      collectedItems.push(ClothingItem.addPants());
      collectedItems.push(ClothingItem.addSweatshirt());
    }
  } else {
    for (let i = 0; i < limitedShorts; i += 1) {
      collectedItems.push(ClothingItem.addShorts());
    }
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
