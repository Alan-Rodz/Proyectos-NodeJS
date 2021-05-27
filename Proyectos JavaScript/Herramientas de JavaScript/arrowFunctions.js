//-----------------------------------------------------

//named function w/ 1 parameter
function sum(a, b) {
    return a + b
}
//The above as an arrow function
let sum2 = (a, b) => {
    return a + b
}
//We can also do
let sum3 = (a, b) => a + b

//-----------------------------------------------------

//named function w/ 1 parameter
function isPositive(number) {
    return number >= 0
}
//The above as an arrow function
let isPositive2 = (number) => {
    return number >= 0
}
//We can also do
let isPositive3 = (number) => number >= 0
//Or even
let isPositive4 = number => number >= 0

//-----------------------------------------------------

//named function w/ no parameters
function randomNumber() {
    return Math.random
}
//The above as an arrow function
let randomNumber2 = () => {
    return Math.random
}
//We can also do
let randomNumber3 = () => Math.random

//-----------------------------------------------------

//anonymous function (function with no name)
document.addEventListener('click', function () {
    console.log('Click')
})
//The above as an arrow function
document.addEventListener('click', () => {
    console.log('Click')
})
//We can also do
document.addEventListener('click', () => console.log('Click'))

//-----------------------------------------------------


//However the main usefulness of the arrow functions is that they redefine the this keyword inside of them
class Person {
    constructor(name) {
        this.name = name
    }

    printNameArrow() {
        setTimeout(() => {
            console.log('Arrow: ' + this.name)
        }, 100)
    }

    printNameFunction() {
        setTimeOut(function () {
            console.log('Function: ' + this.name)
        }, 100)
    }
}

let person = new Person('Bob')

//Prints out 'Bob' in the console
person.printNameArrow()

//Does not print anything in the console
person.printNameFunction()

//Basically the arrow function has the scope of the class where its called, whereas
//the regular function has the scope of the place where it is called (this.name is not defined in the global scope)

//Thus, the arrow function uses the scope of the place where it was defined, whereas the regular function
//uses the scope of the place where it is called
