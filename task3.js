const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const rl = readline.createInterface({ input, output });

function log(filePath) {
    if(filePath) {
        fs.unlinkSync(filePath); 
    }

    return function out(string) {
        if(filePath) {
            fs.appendFile(filePath, string, "utf-8", (err) => {
                if(err) {
                    console.log("Ошибка открытыия файла\n");
                } 
            })
                      
        }
        console.log(string);
    }
}


async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        let result = null;

        rl.question('Введите число или exit ', (input) => {
            result = input;
            rl.pause();
            return resolve(result); 
        });  
    })
    return await promise;
}

let gameState = {
    tryingCounter: 0,
    userNumber: NaN,
    minValue: 0,
    maxValue: 1000,
    randomNumber: Math.floor(Math.random() * 1000),
}


async function main() {
    while(true) {
        let userInput = await getUserInput();
        if(userInput.toLowerCase() === "exit") {
            break;
        }

        let number = parseInt(userInput);
    
        if(isNaN(number) || (number < gameState.minValue || number > gameState.maxValue)) {
            console.log(`Вы ввели не число в интервале ${gameState.minValue}-${gameState.maxValue}. Повторите попытку\n`);
            continue;
        }

        console.log(`Ваше число: ${number}\n`)

        gameState.tryingCounter++;
        gameState.userNumber = number;
    
        if(number === gameState.randomNumber) {
            console.log(`Вы угадали! За ${gameState.tryingCounter} попыток\n`);
            break;
        }
    
        if(number > gameState.randomNumber) {
            console.log("Нужно число меньше\n");
        } else {
            console.log("Нужно число больше\n");
        }

    }
    rl.close();
}


main();