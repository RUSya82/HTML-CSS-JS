class MenuItem {
    constructor(href, title, className){
        this.href = href;
        this.title = title;
        this.className = className;
    }
    render(){
        return `<li class="${this.className}"><a href="${this.href}">${this.title}</a></li>`
    }
}