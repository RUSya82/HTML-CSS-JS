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
                result += this.items[i].render();
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
    constructor(href, title, id, li_className, className, items){
        super(id, className, items);
        this.href = href;
        this.title = title;
        this.li_className = li_className;
    }
    render(){
        return "<li class=" + this.li_className + "><a href=" + this.href + ">" + this.title + "</a>" + super.render() + "</li>";
       // return `<li><a href="${this.href}">${this.title}</a>${super.render()}</li>`
    }
}