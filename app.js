/*
Zamiana linku: http://numbersapi.com/random/year?json 
na dynamiczny: http://numbersapi.com/${number}/${type}?json

*/

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const arg = process.argv[2];

let type = "";

if (arg.indexOf('--year') === 0) {
    console.log('Szukasz informacji o roku');
    type = "year";
} else if ((arg.indexOf('--math') === 0)) {
    console.log('Szukasz informacji o liczbie');
    type = "math";
} else if ((arg.indexOf('--trivia') === 0)) {
    console.log('Szukasz informacji o ciekawostce związanej z liczbą');
    type = "trivia";
}

const equalSign = arg.search("=");
// console.log(equalSign);

if (equalSign === -1) console.log("Nie wpisałeś/aś liczby")

const number = arg.slice(equalSign + 1 );
console.log(number);

// if (number === "" || isNaN(Number(number))) {
//     console.log("Podana wartość nie jest liczbą!");
//     process.exit();
// }

fetch(`http://numbersapi.com/${number}/${type}?json`)
.then(response => {
    if(response.ok) {
        return response.json()
    } else {
        throw new Error("Coś poszło nie tak! Status:" + " " + response.status)
    }
})
.then(data => console.log(data.text))
.catch(err => console.log("Błąd:", err))