/* eslint-disable no-undef */
import _ from 'lodash';

const algorithm = (constContent, content) => {
  const compoundObj = _.merge(JSON.parse(constContent), JSON.parse(content));
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

describe('Luggage Packing Algorithm', () => {
  it('should recommend powerbank for a 1-day trip', () => {
    const constContent = '{}';
    const content = '{"days": "1"}';
    const result = algorithm(constContent, content);
    expect(result).toContain('powerbank');
  });

  it('should recommend powerbank and phone charger for a trip longer than 1 day', () => {
    const constContent = '{}';
    const content = '{"days": "5"}';
    const result = algorithm(constContent, content);
    expect(result).toContain('powerbank');
    expect(result).toContain('зарядку для телефона');
  });

  it('should recommend razor for male travelers', () => {
    const constContent = '{}';
    const content = '{"sex": "male"}';
    const result = algorithm(constContent, content);
    expect(result).toContain('Бритва');
  });

  it('should recommend cosmetics for female travelers', () => {
    const constContent = '{}';
    const content = '{"sex": "female"}';
    const result = algorithm(constContent, content);
    expect(result).toContain('Косметика');
  });

  it('should recommend parental consent for travelers under 18 years old', () => {
    const constContent = '{}';
    const content = '{"age": 16}';
    const result = algorithm(constContent, content);
    expect(result).toContain('Разрешение от родителей');
  });

  // eslint-disable-next-line no-undef
  it('should recommend passport for travelers 18 years old or older', () => {
    const constContent = '{}';
    const content = '{"age": 20}';
    const result = algorithm(constContent, content);
    expect(result).toContain('паспорт');
  });

  // eslint-disable-next-line no-undef
  it('should recommend child passport for travelers with children', () => {
    const constContent = '{}';
    const content = '{"child": "yes"}';
    const result = algorithm(constContent, content);
    expect(result).toContain('Паспорт ребенка');
  });

  // eslint-disable-next-line no-undef
  it('should recommend pet carrier and pet food for travelers with pets', () => {
    const constContent = '{}';
    const content = '{"pets": "yes"}';
    const result = algorithm(constContent, content);
    // eslint-disable-next-line no-undef
    expect(result).toContain('переноска');
    // eslint-disable-next-line no-undef
    expect(result).toContain('корм');
  });
});
