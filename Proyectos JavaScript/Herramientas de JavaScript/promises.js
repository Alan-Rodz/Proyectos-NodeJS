//Syntax of a promise
//The promise objects takes a function that takes 2 params, resolve and reject
let p = new Promise((resolve, reject) => {
    
    let a = 1 + 1
    
    //Resolve
    if(a == 2) {
        resolve('Success')
    }
    
    //Reject
    else {
        reject('Failed')
    }

})

//Interact with promises
//Anything inside a then is going to run for a resolution (either resolve or reject)
//Then takes a method
//The .catch() is to catch errors (reject states)
//.catch() also takes a single parameter
//Then is called when the promise resolves successfully, and catch when it does not
p.then((message) => {
    console.log('This is in the then ' + message)
}).catch((message) => {
    console.log('This is in catch ' + message)
})

//Promises are useful when you need to do something that is going to take a lot of time in the background
//And we just want to make something else while it completes instead of waiting
//(Also being able to catch it if it fails and retry or do something else)

//Promises were meant to replace callbacks

//Another example with promises
const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})


//Say we want to do something after we recorded all 3 of the videos
//We want to run all of the promises in parallel so that we dont have to wait for one to finish in order
//for the other one to begin
//We can thus use Promise.all
//It takes an array of all the different promises that we want to run
//It will run all the promises and as soon as that is done, it'll run the .then and .catch methods depending on if
//they resolved or failed
//In this case the .then() will send an array of all the resolves
Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages)=> {
    console.log(messages)
})

//The useful thing is that all the promises are running at the same time

//We can also use Promise.race(), which will return as soon as the first promise is completed
//Instead of waiting for all the promises to complete
Promise.race([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((message) => {
    console.log(message)
})