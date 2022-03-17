
// Test import of styles
import '@/styles/app.scss'
import {request} from './js/apiService'

const currencySelectors = document.querySelectorAll('.currency-selector');

const fromAmountInput = document.querySelector('#from_amount');
const toAmountInput = document.querySelector('.to_amount');

let fromCurrencyValue = '';
let toCurrencyValue = '';
let fromAmount = '';

function setupCurrencies(){
    try{
       request('currencies.min.json').then(data => {
           // const data = response.data
           currencySelectors.forEach(currencySelector => {
               Object.entries(data).forEach(([key, value]) => {
                   const option = document.createElement("option")
                   option.value = key;
                   option.text = value;
                   currencySelector.appendChild(option)
            })
           })
       })
        
    }
    catch(e){
        console.log(e);
    }
}

function performValidation(){
    return fromCurrencyValue && toCurrencyValue && fromAmount;
}

function convertAmount(){
    const endPoint = `currencies/${fromCurrencyValue}/${toCurrencyValue}.json`

    request(endPoint).then(data=>{
        const finalValue = data[toCurrencyValue] * fromAmount;
        toAmountInput.innerHTML = `$${finalValue}`
    })
}

function handleCurrencyChange(e){
    const value = e.target.value;
    const isFromCurrency = this.id === 'from_currency';
    if(isFromCurrency){
        fromCurrencyValue = value
    }
    else{
        toCurrencyValue = value;
    }
    const isValid = performValidation();
    if(isValid){
        convertAmount();
    }
}


function handleFromAmountChange(e){
    fromAmount = this.value;
    const isValid = performValidation();
    if(isValid){
        convertAmount();
    }
}


window.addEventListener('load', setupCurrencies);
currencySelectors.forEach(el => {
    el.addEventListener('change', handleCurrencyChange )
})
fromAmountInput.addEventListener('change', handleFromAmountChange);


