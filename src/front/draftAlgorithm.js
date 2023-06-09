// import _ from 'lodash';

const algorithm = (constContent, content) => {

  const compoundObj = {...constContent, ...content};
  
  const recommendedItems = [];
  if (Number(compoundObj.days) === 1) {
    recommendedItems.push('powerbank');
  } else if (Number(compoundObj.days) > 1) {
    recommendedItems.push('powerbank');
    recommendedItems.push('зарядку для телефона');
  }

  if (compoundObj.sex === 'male') {
    recommendedItems.push('Бритва');
  } else {
    recommendedItems.push('Косметика');
  }
  if (compoundObj.age < 18) {
    recommendedItems.push('Разрешение от родителей');
  } else {
    recommendedItems.push('паспорт');
  }

  if (compoundObj.child === 'yes') {
    recommendedItems.push('Паспорт ребенка');
  }

  if (compoundObj.pets === 'yes') {
    recommendedItems.push('переноска');
    recommendedItems.push('корм');
  }
  return recommendedItems;
};

// if (compoundObj.placeLive !== compoundObj.countryEnd) {
//   if (compoundObj.age > 14) {
//     recommendedItems.push('паспорт');
//   } else {
//     recommendedItems.push('Свидетельство о рождении');
//   }
//   recommendedItems.push('загранпаспорт');
// }

// if (compoundObj.child.age < 14) {
//   recommendedItems.push('Свидетельство о рождении детей');
// } else {
//   recommendedItems.push('Паспорт ребенка');
// }

// if (compoundObj.weather.weatherDescriptions === 'дождливо') {
//   recommendedItems.push('Зонт');
//   if (compoundObj.weather.feelslike < 6) {
//     recommendedItems.push('Очень теплую непромокаемую одежду');
//   } else if (compoundObj.weather.feelslike > 16 > 10) {
//     recommendedItems.push('теплую непромокаемую одежду');
//   } else {
//     recommendedItems.push('легкую непромокаемую одежду');
//   }
// } else if (compoundObj.weather.weatherDescriptions === 'солнечно') {
//   if (compoundObj.weather.feelslike < 6) {
//     recommendedItems.push('Очень теплeую одежду');
//   } else if (compoundObj.weather.feelslike > 16 > 10) {
//     recommendedItems.push('теплую одежду');
//   } else {
//     recommendedItems.push('легкую одежду');
//   }
// }
export { algorithm };
