//This function returns a promise that returns a positive string if you pass Google or a negative string if you dont
function makeRequest(location){
    return new Promise((resolve, reject) => {
        console.log(`Making request to ${location}`)
        if(location === 'Google'){
            resolve('Google says hi')
        } else {
            reject('We can only talk to Google')
        }
    })
}

//This function adds extra information at the beginning of the string that we pass to it and it always resolves
function processRequest(response){
    return new Promise((resolve, reject) =>{
        console.log('Processing response')
        resolve(`Extra information + ${response}`)
    })
}

//Try our functions without async await
//We use the makeRequest function, when it completes we log 
//Then we call the processRequest function with the promise we received from makeRequest
//This will return another promise, which we can use in the second '.then()' to print it
makeRequest('Google').then((response => {
    console.log('Response received')
    return processRequest(response)
})).then(processedResponse => {
    console.log(processedResponse)
}).catch(error => {
    console.log(error)
})

//The code above works like regular code does, it waits for that which is before it to finish before moving on
//It is also kind of hard to understand
//We can use async await to make the code above easier to understand
//Since we're using async, once JS hits the await statement, it'll leave the function,
//do other work inside of the program and then as soon as makeRequest finishes executing
//it will come back into there and return the result into the response variable
//Thus this function does what the one above does but in a cleaner manner
async function doWork(){  
    //We can handle errors with async functions through trycatch blocks
    try {
        //The code should wait until this code is finished and execute the next thing afterwards
        const response = await makeRequest('Google') //Returns the resolve section of the promise
        console.log('Response received')
        const processedResponse = await processRequest(response)
        console.log(processedResponse)
    } catch (error) {
        console.log(error)
    }
}

//We call the above function 
doWork()

