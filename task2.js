const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const rl = readline.createInterface({ input, output });

let gameState = {
    tryingCounter: 0,
    userNumber: NaN,
    minValue: 0,
    maxValue: 1000,
    randomNumber: Math.floor(Math.random() * 1000),
}

function log(filePath) {
    if(filePath) {
        fs.writeFileSync(filePath, "", "utf-8"); 
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

function question(logger) {
    rl.question('введите число или exit ', (input) => {
        if(input.toLowerCase() === "exit") {
            rl.close();
            return;
        }
    
        let number = parseInt(input);
    
        if(isNaN(number) || (number < gameState.minValue || number > gameState.maxValue)) {
            logger(`Вы ввели число не в интервале ${gameState.minValue}-${gameState.maxValue}. Повторите попытку\n`);
            rl.pause();
            question(logger);
        }

        logger(`Ваше число: ${number}\n`)

        gameState.tryingCounter++;
    
        gameState.userNumber = number;
    
        if(number === gameState.randomNumber) {
            logger(`Вы угадали! за ${gameState.tryingCounter} попыток\n`);
            rl.close();
            return;
        }
    
        if(number > gameState.randomNumber) {
            logger("Нужно число меньше\n");
        } else {
            logger("Нужно число больше\n");
        }
    
        rl.pause();
        question(logger)
    });
}


function main() {
    let logger = log("./protocol");
    question(logger);
}

main();