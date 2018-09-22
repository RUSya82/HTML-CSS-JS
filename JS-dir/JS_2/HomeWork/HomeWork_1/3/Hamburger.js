/**
 * Класс Hamburger содержит свойства гамбургера, количество добавок, их калорийность
 * и цену каждой добавки.
 * size -  размер гамбургера
 * stuff - содержимое: potato, salad, cheese - может быть выбрано только одно содержимое
 * topping - необязательный параметр, могут быть выбраны как оба, так и ни одного
 */
class Hamburger{
    constructor(size, stuff){
        this.size = [
            new Param('big',false, 100, 40),
            new Param('small', false, 50, 20)
            ];
        this.topping = [
            new Param('mayo', false, 20, 20),
            new Param('spice', false, 15, 0)
        ];
        this.stuffing = [
            new Param('cheese', false, 10, 20),
            new Param('salad', false, 20,  5),
            new Param('potato', false,  15, 10)
        ];
        for(const param of this.stuffing){
            if(param.getName() === stuff){
                param.setValue(true);
            }
        }
        for(const param of this.size){
            if(param.getName() === size){
                param.setValue(true);
            }
        }
    }
    /********************************************** Setters ***********************************************/
    /**
     * Устанавливает размер бургера на "big" или "small"
     * @param size {string} название размера, который установим в true
     */
    setSize(size){
        for(const param of this.size){
            if(param.getName() === size){
                param.setValue(true);
            }
            else{
                param.setValue(false);
            }
        }
    }

    /**
     * Устанавливает тип добавки к бургеру
     * @param topping {string} название добавки
     */
    setTopping(topping){
        for(const param of this.topping){
            if(param.getName() === topping){
                param.setValue(true);
            }
        }
    }

    /**
     * Устанавливает содержимое бургера
     * @param stuff {string} название начинки
     */
    setStuffing(stuff){
        for(const param of this.stuffing){
            if(param.getName() === stuff){
                param.setValue(true);
            }
            else{
                param.setValue(false);
            }
        }
    }
    /********************************************** Getters ************************/
    /**
     * ищет текущий размер бургера
     * @returns {Param} объект текущего размера бургера
     */
    getSize(){
        for(const param of this.size){
            if(param.getValue() === true){
                return param;
            }
        }
        return false;
    }

    /**
     * ищет текущее содержимое бургера
     * @returns {Param} объект с настройками текущей начинки
     */
    getStuffing(){
        for(const param of this.stuffing){
            if(param.getValue() === true){
                return param;
            }
        }
        return false;
    }

    /**
     * функция поиска выбранных добавок
     * @returns {Array} массив объектов с текущими выбранными добавками
     */
    getTopping(){
        let toppings = [];
        for(const param of this.topping){
            if(param.value === true){
                toppings.push(param);
            }
        }
        return toppings;
    }
    /********************************************** Other methods ********************************/
    /**
     * Функция расчета общей цены бургера
     * @returns {number} возвращает общую цену
     */
    getAllPrice(){
        let price = 0;
        price += this.getSize().getPrice() + this.getStuffing().getPrice();
        for(const param of this.getTopping()){
            price += param.getPrice();
        }
        return price;
    }

    /**
     * Функция расчета общей калорийности, включая добавки
     * @returns {number} общая калорийность со всеми добавками
     */
    getAllCalories(){
        let cal = 0;
        cal += this.getSize().getCalories() + this.getStuffing().getCalories();
        for(const param of this.getTopping()){
            cal += param.getCalories();
        }
        return cal;
    }

}