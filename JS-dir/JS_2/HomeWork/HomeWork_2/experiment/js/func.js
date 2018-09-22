function getModels(event){
    let innerElem = document.getElementById('model');
    let InnerCode = "";
    innerElem.disabled = false;
    console.log(event.target);
    fetch("json/" +  event.target.options[event.target.options.selectedIndex].value)
        .then(result => {
            return result.json();
        })
        .then(data => {
            //console.log(data);
            for(let index in data){
                InnerCode += `<option value=${data[index].value}>${data[index].text}</option>`;
            }
            innerElem.innerHTML = InnerCode;
        })
        .catch(error => console.log(error));
}