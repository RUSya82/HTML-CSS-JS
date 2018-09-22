/**
 * Класс формф с функцией проверки полей.
 * Благодаря любому количеству полей, и передаваемым id, может проверять практически любую форму
 * Главное задать id и регулярное выражение в настройках.
 */

class MyForm{
    constructor(formID, event, elements){      //elemets = {elemID: ... , elemReg: ...}
        this.formID = formID;
        this.elements = elements;
        this.event = event;
    }

    /**
     * функция возвращает элемент по ID
     * @param elID ID элементы
     * @returns {HTMLElement | null} возвращает элемент по ID
     * @private
     */
    _getElem(elID){
        return document.getElementById(elID);
    }

    /**
     * Функция проверки данных формы по регулярным выражениям
     * @private
     */
    _checkForm(){
        let flag = true;        //флаг удачной проверки
        for(let elem of this.elements){     //бежим по массиву с проверяемыми элементами
            let element = this._getElem(elem.elemID);      //находим элемент по ID
            let text = element.value;               //считываем значение
            if(elem.elemReg.test(text) === false) {     //сравниваем с регулярным выражением
                flag = false;
                element.style.borderColor = 'red';
                console.log('form no submit! ' + elem.elemID);
            }
        }
        if(!flag){
            this.event.preventDefault();
        }
        else{
            this._getElem(this.formID).submit();//если всё ОК, то сабмитим
            console.log('form submit!');
        }
    }
}