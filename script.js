const keyPads = document.querySelectorAll('.keypad')
const textBox = document.getElementById('text-box')
const operators = document.querySelectorAll('.operator')
const equal = document.getElementById('equal')
const remove = document.getElementById('delete')
const keypadDot = document.querySelector(".keypad-dot")
const keypadZero = document.querySelector('.keypad-0')
let total
let currentValue = 0
let counter = 0
let numberHolder = []
let symbolHolder = []
let equalKeypadClear = false
let continuos = false
let currentSymbol


let equalCounter = false
keyPads.forEach((keypad, index)=> {
    
    keypad.addEventListener('click', keypadClick)
    keypad.setAttribute('key-number', index)
})

keypadDot.addEventListener('click', ()=> {
    
   
    if (textBox.value === "" || equalKeypadClear) {
        
        textBox.value = 0 + "."
    }  else {
        textBox.value = textBox.value + "."
    }
    
    keypadDot.disabled = true
    
  
})

if (textBox.value === "") {
    keypadZero.removeEventListener('click', keypadClick)
} 




function keypadClick() {

        keypadZero.addEventListener('click', keypadClick)

        if (equalCounter === 1) {
            textBox.value = ""
            textBox.value = parseFloat(textBox.value + this.getAttribute('key-number'))
    
    
            operators.forEach(operator => {
            operator.addEventListener('click', operatorclick)
            equalCounter = 0
            
        })
        } else {
            
            textBox.value = textBox.value + this.getAttribute('key-number')
    
    
            operators.forEach(operator => {
            operator.addEventListener('click', operatorclick)
            
        })
        }
     
        
    
   
}

function changeColor (symbol) {
    symbol.style.background = '#FFBF00 '
}


function operatorclick () {
    keypadDot.disabled = false
    operators.forEach(operator => {
        operator.style.background = "#343434"
    })
    
    operators.forEach(operator => {
        operator.removeEventListener('click', operatorclick)
    })
    textBox.placeholder = textBox.value
    counter = counter + 1
    symbolHolder.push(this.id)
    currentSymbol = this.id
    numberHolder.push(textBox.value)
    textBox.value = ""


    changeColor(this)
    
    console.log(symbolHolder)



    
    if (continuos) {
        if(symbolHolder[symbolHolder.length - 2] === `sum`) {
            sumOf()
        }

        if(symbolHolder[symbolHolder.length - 2] === `difference`) {
            diffOf()
        }

        if(symbolHolder[symbolHolder.length - 2] === `multiply`) {
            multiplyOf()
        }

        if(symbolHolder[symbolHolder.length - 2] === `division`) {
            divOf()
        }
            counter = 1
            currentValue = total
            numberHolder = [total]
            continuos = false
            console.log(numberHolder)
            textBox.placeholder = currentValue
            
    }


    



    if (counter === 2 ) {
        if (symbolHolder[symbolHolder.length-2] === 'sum') {
           sumOf()
        }
        
        if (symbolHolder[symbolHolder.length-2] === 'difference') {
            diffOf()
        }

        if (symbolHolder[symbolHolder.length-2] === 'multiply') {
            multiplyOf()
        }

        if (symbolHolder[symbolHolder.length-2] === 'division') {
            divOf()
        }
            counter = 1
            currentValue = total
            numberHolder = [total]
            continuos = true
            console.log(numberHolder)
            textBox.placeholder = currentValue
           
            
    }
    
    
}

equal.addEventListener('click', ()=> {
    
    numberHolder.push(textBox.value)
    console.log(numberHolder)
    equalOperation()
})

function equalOperation () {
    keypadDot.disabled = false
    equalCounter = equalCounter + 1

    if (numberHolder.length === 1 || numberHolder[1] === "") {
        textBox.value = numberHolder[0]
        
        operators.forEach(operator => {
            operator.addEventListener('click', operatorclick)
        })



        numberHolder = []
    } else {
        if(currentSymbol === `sum`) {
            sumOf()
        }
    
        if(currentSymbol === `difference`) {
            diffOf()
        }
    
        if(currentSymbol === `multiply`) {
            multiplyOf()
        }
    
        if(currentSymbol === `division`) {
            divOf()
        }
        counter = 0
        currentValue = total
        continuos = false
        numberHolder = []
        textBox.value = currentValue
        symbolHolder = [currentSymbol]
        console.log(currentValue)
        textBox.placeholder = currentValue
        equalKeypadClear = true
    }

    operators.forEach(operator => {
        operator.style.background = "#343434"
    })

   
}
    

remove.addEventListener('click', restart)

function restart() {
    textBox.value = ""
    textBox.placeholder = 0
    numberHolder = []
    symbolHolder = []
    currentSymbol = ""
    currentValue = 0
    continuos = false
    counter = 0
    total = 0
    equalKeypadClear = false
    equalCounter = 0
    keypadDot.disabled = false
}


function sumOf () {
        let values = numberHolder.map(number => parseFloat(number))
        total = values.reduce((firstValue,secondValue) => {
            return firstValue + secondValue
        })
}

function diffOf () {
        let values = numberHolder.map(number => parseFloat(number))
        total = values.reduce((firstValue,secondValue) => {
            return firstValue - secondValue
        })
}

function multiplyOf () {
        let values = numberHolder.map(number => parseFloat(number))
        total = values.reduce((firstValue,secondValue) => {
            return firstValue * secondValue
        })
}

function divOf () {
        let values = numberHolder.map(number => parseFloat(number))
        total = values.reduce((firstValue,secondValue) => {
            return firstValue / secondValue
        })
}

if (textBox.value === Infinity) {
    restart()
    console.log('result is infinity')
}

console.log('js')