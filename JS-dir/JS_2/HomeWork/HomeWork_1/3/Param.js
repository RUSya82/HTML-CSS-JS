/**
 * класс Param  - класс настроек параметров бургера
 * name - наименование настройки
 * price - цена опции
 * value - булево, установлена опция или нет
 * calories - количество калорий в опции
 */
class Param{
    constructor(name, value, price, calories){
        this.name = name;
        this.price = price;
        this.value = value;
        this.calories = calories;
    }
    /**************************** Getters ****************************/
    getName(){
        return this.name;
    }
    getPrice(){
        return this.price;
    }
    getValue(){
        return this.value;
    }
    getCalories(){
        return this.calories;
    }
    /**************************** Setters *******************************/
    setName(name){
        this.name = name;
    }
    setValue(value){
        this.value = value;
    }
    setPrice(price){
        this.price = price;
    }
    setCalories(calories){
        this.calories = calories;
    }
}