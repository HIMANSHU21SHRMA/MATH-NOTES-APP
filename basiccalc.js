// all stored value
let currentValue = '';
let previousValue = '';
let operator = '';
const buttons = document.querySelectorAll(".btn");
const display = document.querySelector('#display');


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // store value
        //  console.log(button.value);
         const value = button.value;

         if (!isNaN(value)) {
            // store it in current val
            currentValue += value;
            display.value = currentValue;
            
         }else if(value === 'clear'){
            // reset it
            currentValue = '';
            display.value = '';
            operator = '';
            previousValue = ''
         } else if(value === '='){
            // run the calc function
            currentValue = calculate(previousValue, currentValue, operator);
            display.value = currentValue;
            previousValue = currentValue;
            operator = '';
         } else if(value === '%'){
            
             if(operator && previousValue){
                currentValue = (parseFloat(previousValue) * (parseFloat(currentValue)/100)).toString()
                display.value = currentValue;
             }
          
            else if (currentValue) {
                currentValue = (parseFloat(currentValue)/100).toString();
                display.value = currentValue;
            }
         } else if(value === "+/-"){
            currentValue = (parseFloat(currentValue)*-1).toString();
            display.value = currentValue; 
         }else if(value === '.'){
          if(!currentValue.includes('.')){
            currentValue += '.'
            display.value = currentValue;

          }
         } else{
            // if any operator is get clicked
            if(currentValue){
                operator = value;
                previousValue = currentValue;
                currentValue = '';

            }

         }
         
    })
})

//  section for calc function
// a = previousValue 
// b = currentValue
// op = operator 

const calculate = (a, b, op) => {
 a = parseFloat(a)
 b = parseFloat(b);
 switch(op){
  case '+' :
    return a + b;
 
  case '-' : 
    return a - b;
 
  case '*' : 
    return a * b;
 
  case '/' : 
    return a / b;
 
    default :
    return b;

 }
}

