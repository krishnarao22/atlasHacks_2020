// made using tutorials

createTimer();

function createTimer(){

    const totalTime = 1500;
    var passed = 0;

    const FULL_DASH_ARRAY = 283;
    const warnTime = .5 * totalTime;
    const redTime = .15 * totalTime;

    const COLOR_LIST = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: warnTime
    },
    alert: {
        color: "red",
        threshold: redTime
    }
    };

    let timeLeft = totalTime;
    let timerInterval = null;
    let timeColor = COLOR_LIST.info.color;

    document.getElementById("app").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="time-remaining-path"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${timeColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;

    timer();

    function finished() {
        clearInterval(timerInterval);
    }

    function timer() {
    timerInterval = setInterval(() => {
        passed = passed += 1;
        timeLeft = totalTime - passed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft);
        setCircleSpeed();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
        finished();
        }
    }, 1000);
    }

    function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_LIST;
        if (timeLeft <= alert.threshold) {
            document.getElementById("time-remaining-path").classList.remove(warning.color);
            document.getElementById("time-remaining-path").classList.add(alert.color);
        } 
        else if (timeLeft <= warning.threshold) {
            document.getElementById("time-remaining-path").classList.remove(info.color);
            document.getElementById("time-remaining-path").classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
    const timeFraction = timeLeft / totalTime;
    return timeFraction - (1 / totalTime) * (1 - timeFraction);
    }

    function setCircleSpeed() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
    }

}
