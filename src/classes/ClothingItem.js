class ClothingItem {
  constructor(name) {
    this.name = name;
    this.quantity = 1;
  }

  static addCoat() {
    return new ClothingItem('Пальто');
  }

  static addSweater() {
    return new ClothingItem('Свитер');
  }

  static addJacket() {
    return new ClothingItem('Куртка');
  }

  static addShorts() {
    return new ClothingItem('Шорты');
  }

  static addTShirt() {
    return new ClothingItem('Футболка');
  }

  static addSweatshirt() {
    return new ClothingItem('Кофта');
  }

  static addPants() {
    return new ClothingItem('Штаны');
  }
}

export default ClothingItem;
