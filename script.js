const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyup(event) {
    if (event.keyCode == 32) {
        if (!isJumping) {
            jump()
        }
    }
}

function jump() {
    //comecou a pular, nao pode repetir
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 200) {
            //se chegar até aqui para
            clearInterval(upInterval);

            //agora desce sozinho
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    //se encostar na base para
                    clearInterval(downInterval);
                    //terminou de pular fica disponivel
                    isJumping = false;
                } else {
                    //enquanto estiver no alto, desca
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = parseInt(Math.random() * 6000);

    if (randomTime > 1000) {
        randomTime = randomTime
    } else {
        randomTime += 1000
    }


    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';


    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">Fim de jogo<h1>`;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);

    //recursividade - uma função chamando ela mesmo dentro dela 

    setTimeout(createCactus, randomTime)
}

createCactus();

document.addEventListener('keyup', handleKeyup);