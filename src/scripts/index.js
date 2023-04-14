import {insertedValues, valuesCategory} from './valuesData.js';
const newRegisterValue = document.querySelector('.header_button--register-new-value');
const closeModal = document.querySelector('.close--modal');
const cancelModal = document.querySelector('.modal_bottons--cancel')

newRegisterValue.addEventListener('click',()=>{
    document.querySelector(".dialog").showModal()
    
})
closeModal.addEventListener('click',()=>{
    document.querySelector(".dialog").close()
})

cancelModal.addEventListener('click',()=>{
    document.querySelector(".dialog").close()
})

function renderModal(arrayActualy){

const ulHistoric = document.querySelector('.historic--ul')

while (ulHistoric.firstChild) {
    ulHistoric.removeChild(ulHistoric.firstChild);
  }
arrayActualy.forEach((element,i) => {
const li = document.createElement("li");
li.classList.add("historic_ul--li");

const spanValue = document.createElement("span");
spanValue.classList.add("historic_li--value");
spanValue.textContent = `R$ ${element.value} `;

const div = document.createElement("div");
div.classList.add("historic_li--inputs");

const spanType = document.createElement("span");
spanType.classList.add("historic_li--type");
if(arrayActualy[i].categoryID == 0){
     spanType.textContent = `${valuesCategory[0]}`//aqui define se é entrada ou saidad conforme categoryID
}else if(arrayActualy[i].categoryID == 1){
    spanType.textContent = `${valuesCategory[1]}`
}

const spanDelete = document.createElement("span");
spanDelete.id = element.id
spanDelete.classList.add("material-symbols-outlined", "historic--delet");
spanDelete.textContent = "delete";


div.appendChild(spanType);
div.appendChild(spanDelete);
li.appendChild(spanValue);
li.appendChild(div);
ulHistoric.appendChild(li)

spanDelete.addEventListener('click',(event)=>{
    ulHistoric.removeChild(li)
    insertedValues.forEach((element,x,arrAll) => {
        if(insertedValues[x].id == event.target.id){
            insertedValues.splice(x,1) 
            sumValues(arrayActualy)  
        }
    });
})
});
}

function sumValues(arr){
    const spnSum = document.querySelector('.soma-total')
    let totalSum = 0
    if(arr.length < 1 ){
        spnSum.textContent = `R$ 0`
    }
    arr.forEach((element,i)=> {
        if(element.categoryID ==0){
            totalSum += element.value
        }else if (element.categoryID == 1){
            totalSum -= element.value
        }
    })
    spnSum.textContent = `R$ ${totalSum}`
}

function renderSelect(arr){

    const renderAllBtn = document.querySelector('#btn_value-alls');
    const renderEntryBtn = document.querySelector('#btn_value-entry');
    const renderExitBtn = document.querySelector('#btn_value-exit');

    renderEntryBtn.addEventListener('click', ()=>{
        let arrEntry = []
        arr.forEach((element,x,all)=>{
            if(element.categoryID == 0){
                arrEntry.unshift(element)
                
            }
        })  
        sumValues(arrEntry)
        renderModal(arrEntry)
    })

    renderExitBtn.addEventListener('click', ()=>{
        let arrExit = []
        arr.forEach((element,x,all)=>{
            if(element.categoryID == 1){
                arrExit.unshift(element)
                
            }
        })  
        sumValues(arrExit)
        renderModal(arrExit)
    })

    renderAllBtn.addEventListener('click', ()=>{
        let arrAll = []
        arr.forEach((element,x,all)=>{
                arrAll.unshift(element)
        })  
        sumValues(arrAll)
        renderModal(arrAll)
    })
}

export function addItemArr(item,arr){
    arr.unshift(item)
    renderModal(insertedValues)
    sumValues(insertedValues)
}


renderSelect(insertedValues)
sumValues(insertedValues)
renderModal(insertedValues)