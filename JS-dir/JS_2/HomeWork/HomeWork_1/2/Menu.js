class Menu {
    constructor(id, className, items){
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul class="${this.className}" id="${this.id}">`;
        for(let i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem ){
                result += this.items[i].renderItem();
            }
            if(this.items[i] instanceof subMenu){
                result += this.items[i].render();
            }
        }
        result += '</ul>';
        return result;
    }
    remove(id){
        document.getElementById(id).innerHTML = '';
    }
}
class subMenu extends Menu{
    constructor(id, className, items){
        super(id, className, items);
    }
}