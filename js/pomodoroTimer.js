var timer1;
var isRest = false;


window.onload = function () {
    document.timer.elements['buttonStop'   ].disabled = true;
    document.timer.elements['buttonRestart'].disabled = true;
    document.timer.elements['buttonStart'  ].disabled = false;
    document.timer.elements['buttonEnd'    ].disabled = true;

    // document.timer.elements['buttonStop'   ].style.backgroundColor =  'silver';   
    // document.timer.elements['buttonRestart'].style.backgroundColor =  'silver';   
    // document.timer.elements['buttonStart'  ].style.backgroundColor =  'green';
    // document.timer.elements['buttonEnd'    ].style.backgroundColor =  'silver';   
    // document.getElementsByName('buttonStart').style.backgroundColor =  'green';   
    document.getElementById('buttonStop'   ).style.backgroundColor = 'silver';   
    document.getElementById('buttonRestart').style.backgroundColor = 'silver';   
    document.getElementById('buttonStart'  ).style.backgroundColor = 'green';   
    document.getElementById('buttonEnd'    ).style.backgroundColor = 'silver';   

}



function stopTimer() {
    clearInterval(timer1);
    document.timer.elements['buttonStop'   ].disabled = true;
    document.timer.elements['buttonRestart'].disabled = false;
    document.timer.elements['buttonStart'  ].disabled = true;
    document.timer.elements['buttonEnd'    ].disabled = false;

}
function restartTimer() {
    timer1 = setInterval("countDown()", 1000);    
    // startWork();
    document.timer.elements['buttonStop'   ].disabled = false;
    document.timer.elements['buttonRestart'].disabled = true;
    document.timer.elements['buttonStart'  ].disabled = true;
    document.timer.elements['buttonEnd'    ].disabled = false;
}

// 25分からのカウントダウン
function startTimer() {
    timer1 = setInterval("countDown()", 1000);    
    startWork();
    //    isRest=false;
    document.timer.elements['buttonStop'   ].disabled = false;
    document.timer.elements['buttonRestart'].disabled = true;
    document.timer.elements['buttonStart'  ].disabled = true;
    document.timer.elements['buttonEnd'    ].disabled = false;

    //    timer1=setInterval("countDown()", 1000);
}

function endTimer() {
    clearInterval(timer1);
    document.timer.elements['buttonStop'].disabled = true;
    document.timer.elements['buttonRestart'].disabled = true;
    document.timer.elements['buttonStart'].disabled = false;
    document.timer.elements['buttonEnd'].disabled = true;

    document.timer.elements['editMinute_Work'].value = 25;
    document.timer.elements['editSecond_Work'].value = 00;
    document.timer.elements['editMinute_Rest'].value = 5;
    document.timer.elements['editSecond_Rest'].value = 00;
    document.getElementById('work').style.backgroundColor = 'silver';   
    document.getElementById('rest').style.backgroundColor = 'silver';   

}

function countDown() {
    if (isRest) {
        var min = document.timer.elements['editMinute_Rest'].value;
        var sec = document.timer.elements['editSecond_Rest'].value;
    }
    else {
        var min = document.timer.elements['editMinute_Work'].value;
        var sec = document.timer.elements['editSecond_Work'].value;

    }

    if (min == "") min = 0;
    min = parseInt(min);

    if (sec == "") sec = 0;
    sec = parseInt(sec);

    tmWrite(min * 60 + sec - 1)

}

function tmWrite(int) {
    int = parseInt(int);

    // 休憩
    if (isRest) {
        if (int <= 0) {
            sound("square", 0.3)
            startWork();
        }
        else {
            //残り分数はintを60で割って切り捨てる
            document.timer.elements['editMinute_Rest'].value = Math.floor(int / 60);
            //残り秒数はintを60で割った余り
            document.timer.elements['editSecond_Rest'].value = int % 60;
        }
    }
    // 作業
    else {
        if (int <= 0) {
            sound("square", 0.3)
            startRest();
        }
        // カウントダウン
        else {
            //残り分数はintを60で割って切り捨てる
            document.timer.elements['editMinute_Work'].value = Math.floor(int / 60);
            //残り秒数はintを60で割った余り
            document.timer.elements['editSecond_Work'].value = int % 60;
        }
    }
}

function startWork() {
    isRest = false;
    // timer1 = setInterval("countDown()", 1000);
    document.getElementById('work').style.backgroundColor = 'red';   
    document.getElementById('rest').style.backgroundColor = 'silver';   
    document.timer.elements['editMinute_Rest'].value = 5;
    document.timer.elements['editSecond_Rest'].value = 00;

}

function startRest() {
    isRest = true;
    // timer1 = setInterval("countDown()", 1000);
    document.getElementById('work').style.backgroundColor = 'silver';   
    document.getElementById('rest').style.backgroundColor = 'lime';   
    
    document.timer.elements['editMinute_Work'].value = 25;
    document.timer.elements['editSecond_Work'].value = 00;
}

function sound(type, sec) {
	const ctx = new AudioContext()
	const osc = ctx.createOscillator()
	osc.type = type
	osc.connect(ctx.destination)
	osc.start()
	osc.stop(sec)
}
