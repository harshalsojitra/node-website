const weatherSelector = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherSelector.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    //fetch was http://localhost:3000/weather?address= this before but it is locally so removed thing that adjust automatically. 
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
        })
    })
})