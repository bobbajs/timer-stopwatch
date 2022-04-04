const timeDisplay = document.getElementById('timeDisplay');
const start = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const reset = document.getElementById('reset');

const timerTimeDisplay = document.getElementById('timeDisplayTimer');
const setTimer = document.getElementById('setTime');
const startTimer = document.getElementById('startTimer');
const stopTimer = document.getElementById('stopTimer');
const resetTimer = document.getElementById('resetTimer');

(function() {
    let stopWatchTimeElapsed = 0;
    let stopWatchInterval;
    let timerTimeElapsed = 0;
    let timerInterval;

    const formatTimeElapsed = (timeElapsed = 0) => {
        const hundrethSecond = Math.floor(timeElapsed % 100);
        const second = Math.floor((timeElapsed / 100) % 60);
        const minute = Math.floor((timeElapsed / 100) / 60);

        const formattedHundrethSecond = hundrethSecond < 10 ? '0' + hundrethSecond : hundrethSecond;
        const formattedMinute = minute < 10 ? '0' + minute : minute;
        const formattedSecond = second < 10 ? '0' + second : second;

        return `${formattedMinute}:${formattedSecond}:${formattedHundrethSecond}`
    }

    console.log(timeDisplay);
    const updateDisplay = function(elem, time) {
        elem.innerText = formatTimeElapsed(time);
    }

    updateDisplay(timeDisplay, stopWatchTimeElapsed);
    updateDisplay(timerTimeDisplay, timerTimeElapsed);

    setTimer.addEventListener('click', () => {
        let timeInput = prompt('Enter timer period: (in mm:ss format)');

        let timeInputs = timeInput.split(':');

        if (timeInputs.length > 1) {
            timerTimeElapsed = parseInt(timeInputs[0]) * 60 * 100 + parseInt(timeInputs[1]) * 100;
        } else {
            timerTimeElapsed = parseInt(timeInputs[0]) * 100;
        }

        updateDisplay(timerTimeDisplay, timerTimeElapsed);
    });

    startTimer.addEventListener('click', () => {
        timerInterval = setInterval(() => {
            timerTimeElapsed--;
            updateDisplay(timerTimeDisplay, timerTimeElapsed);

            console.log(timerTimeElapsed);
            if (timerTimeElapsed <= 0) {
                clearInterval(timerInterval);
            }
        }, 10);

        startTimer.classList.add('hidden');
        stopTimer.classList.remove('hidden');
    });

    stopTimer.addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);

            stopTimer.classList.add('hidden');
            startTimer.classList.remove('hidden');
        }

        updateDisplay(timerTimeDisplay, timerTimeElapsed);
    })

    start.addEventListener('click', () => {
        start.classList.add('hidden');
        stopBtn.classList.remove('hidden');

        stopWatchInterval = setInterval(() => {
            stopWatchTimeElapsed++;
            updateDisplay(timeDisplay, stopWatchTimeElapsed);
        }, 10);
    })

    stopBtn.addEventListener('click', () => {
        stopBtn.classList.add('hidden');
        start.classList.remove('hidden');

        clearInterval(stopWatchInterval);
    });

    reset.addEventListener('click', () => {
        if (stopWatchInterval) {
            clearInterval(stopWatchInterval);
            stopBtn.classList.add('hidden');
            start.classList.remove('hidden');
        }

        stopWatchTimeElapsed = 0;
        updateDisplay(timeDisplay, stopWatchTimeElapsed);
    });
})();