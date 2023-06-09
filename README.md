# Linter status and tests
[![Node CI](https://github.com/CookiesNCash/bag-assembler/actions/workflows/tests.yml/badge.svg)](https://github.com/CookiesNCash/bag-assembler/actions/workflows/tests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/b8a753fcde9c98e7f8d1/maintainability)](https://codeclimate.com/github/CookiesNCash/bag-assembler/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b8a753fcde9c98e7f8d1/test_coverage)](https://codeclimate.com/github/CookiesNCash/bag-assembler/test_coverage)

# Описание проекта: веб-приложение, формирующее багаж для различных целей

---

### Установка
```
make install
```
### Регистрация пользователя
 
1. Запустите процесс регистрации с помощью команды:
```  
npm start
```
2. Вас перенаправят на веб-страницу, где вам потребуется заполнить следующие персональные данные:
 - **Имя пользователя**
 - **Пол**
 - **Возраст**
 - **Место проживания**
 - **Гражданство**
 - **Вероисповедание**
  
3. После этого произойдет регистрация.
Формирование багажа
После регистрации вы будете перенаправлены на страницу "Опрос - Персонализация". Здесь вам будет предложено ответить на следующие вопросы:
 - **Продолжительность поездки** (количество дней)
 - **Город**
 - **Здоровье**
 - **Берете ли вы с собой детей?**
 - **Берете ли вы с собой питомцев?**
 - **Тип размещения во время поездки**

### После ответа на все вопросы и отправки формы вы получите список рекомендованных вещей для упаковки в багаж в зависимости от введенных данных.