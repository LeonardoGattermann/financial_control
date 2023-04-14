/* Desenvolva sua lógica aqui */
import {insertedValues, valuesCategory} from './valuesData.js';
import {addItemArr} from './index.js';

export let inputType = 0;
export let valueInput = 0;

function modal(){
const valorInput = document.querySelector('#modal-value-input');//input numero 
const sendValue = document.querySelector('.modal_bottons--send');
const typeEntry = document.querySelector('#type-entry')
const typeExit = document.querySelector('#type-exited')



let lastInsertedValueId = null;
if (insertedValues.length > 0) {
  lastInsertedValueId = insertedValues[insertedValues.length - 1].id;
}


sendValue.addEventListener('click',()=>{
    valueInput = Number(valorInput.value)
    let obj = {
        id: lastInsertedValueId,
        value: valueInput,
        categoryID: inputType,
      }
      addItemArr(obj,insertedValues)
      document.querySelector(".dialog").close()
      inputType = 0

})
typeEntry.addEventListener('click',()=>{
    inputType = 0
})
typeExit.addEventListener('click',()=>{
    inputType = 1
})

}

modal()
