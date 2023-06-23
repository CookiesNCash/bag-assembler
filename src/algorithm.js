import Data from "./Data.js";
import ClothingItem from "./ClothingItem.js";

const calculateLuggage = async (data) => {
  const dataProcessor = new Data(data);
  const currentTemperature = await dataProcessor.getTemperature();
  const currentDays = dataProcessor.getDays();

  const collectedItems = [];

  if (currentTemperature < 10) {
    collectedItems.push(ClothingItem.addCoat(), ClothingItem.addSweater());
  } else if (currentTemperature >= 10 && currentTemperature < 20) {
    collectedItems.push(ClothingItem.addJacket());
  } else {
    collectedItems.push(ClothingItem.addShorts());
  }

  const tShirtsNeeded = Math.ceil(currentDays / 2);
  const pantsNeeded = Math.ceil(currentDays / 4);
  const sweatShirtNeeded = Math.ceil(currentDays / 3);

  for (let i = 0; i < tShirtsNeeded; i++) {
    collectedItems.push(ClothingItem.addTShirt());
  }

  for (let i = 0; i < sweatShirtNeeded; i++) {
    collectedItems.push(ClothingItem.addSweatshirt());
  }

  for (let i = 0; i < pantsNeeded; i++) {
    collectedItems.push(ClothingItem.addPants());
  }

  const luggage = collectedItems.reduce((acc, item) => {
    const existingItem = acc.find((collectedItem) => collectedItem.item === item.item);
    if (existingItem) {
      existingItem.count++;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const formattedLuggage = luggage.map((item) => `${item.item} - ${item.count}`);

  return formattedLuggage;
};

export default calculateLuggage;
