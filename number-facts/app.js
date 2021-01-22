let favNumber = 72;
const baseURL = "http://numbersapi.com";

// 1. 
axios.get(`${baseURL}/${favNumber}?json`)
    .then(res => console.log(res.data.text));

// 2. 
let favNumbers = [24, 7, 365];
axios.get(`${baseURL}/${favNumbers}?json`)
    .then(res => console.log(res.data.text));

// 3. 
Promise.all(
    Array.from({ length: 4 }, () => {
        return axios.get(`${baseURL}/${favNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});



