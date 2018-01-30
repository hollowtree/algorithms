const canvas = document.getElementById('percolationBox')
canvas.width = 600;
canvas.height = 600;
const context = canvas.getContext('2d');
context.lineWidth = 2;


let list = new Array(900),
    flagArr = []
for (var i = 0; i < 900; i++) {
    flagArr.push(i)
}

function checkPercolation() {
    var flag = true
    for (var i = 870; i < 900; i++) {
        if (getAncestor(i) == -1) {
            flag = false
            break;
        }
    }

    var time = flagArr.length < 500 ? 16 : 1
    if (flag) {
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * flagArr.length)
            let index = flagArr[randomIndex]
            console.log('index: ', index)

            flagArr.splice(randomIndex, 1)
            handleAimm(index)
        }, time);
    } else {
        // debugger
    }
}
function draw(lastIndex) {
    context.clearRect(0, 0, 600, 600);
    for (var i = 0; i < 900; i++) {
        var col = i % 30
        var row = Math.floor(i / 30)
        var x1 = col * 20,
            y1 = row * 20,
            x2 = x1 + 20,
            y2 = y1 + 20
        if (typeof list[i] != 'number') {
            context.fillStyle = 'rgb(200, 0, 0)';
            context.strokeStyle = 'rgb(0,0,0)';
            context.fillRect(x1, y1, 20, 20);
            context.strokeRect(x1 + .5, y1 + .5, 19, 19);
        } else if (getAncestor(i) == -1) {
            context.fillStyle = 'rgb(0, 0, 200)';
            context.fillRect(x1, y1, 20, 20);
            if (lastIndex == i) {
                context.fillStyle = 'rgb(255, 255, 0)';
                context.fillText(i, x1 + 1, y1 + 15);
            }
        }
    }
    checkPercolation()
}
draw()

function getAncestor(index) {
    if (list[index] == -1) {
        return -1
    } else if (list[index] == index) {
        return index
    } else if (list[index]) {
        return getAncestor(list[index])
    }
}

function setAncestor(index) {
    if (list[index] == -1) {
    } else if (list[index] == index) {
        return index
    } else if (list[index]) {
        return setAncestor(list[index])
    }
}


function handleAimm(index) {
    if (index < 30) {
        list[index] = -1
        if (list[index + 30]) {
            if (setAncestor(index + 30)) {
                list[setAncestor(index + 30)] = -1
            }
        }
    } else {
        list[index] = index
        console.log('-------------------')
        var temp = [index]
        if (index - 30 > 0) {
            // console.log(getAncestor(index - 30))
            getAncestor(index - 30) && temp.push(getAncestor(index - 30))
        }
        if (index + 30 < 900) {
            // console.log(getAncestor(index + 30))
            getAncestor(index + 30) && temp.push(getAncestor(index + 30))
        }
        if (index % 30) {
            // console.log(getAncestor(index - 1))
            getAncestor(index - 1) && temp.push(getAncestor(index - 1))
        }
        if ((index + 1) % 30) {
            // console.log(getAncestor(index + 1))
            getAncestor(index + 1) && temp.push(getAncestor(index + 1))
        }
        let min = Math.min.apply(null, temp)
        // console.log(temp, min)

        list[setAncestor(index)] = min
        if (index - 30 > 0) {
            // console.log(index - 30, setAncestor(index - 30))
            if (setAncestor(index - 30)) {
                list[setAncestor(index - 30)] = min
            }
        }
        if (index + 30 < 900) {
            // console.log(index + 30, setAncestor(index + 30))
            if (setAncestor(index + 30)) {
                list[setAncestor(index + 30)] = min
            }
        }
        if (index % 30) {
            // console.log(index - 1, setAncestor(index - 1))
            if (setAncestor(index - 1)) {
                list[setAncestor(index - 1)] = min
            }
        }
        if ((index + 1) % 30) {
            // console.log(index + 1, setAncestor(index + 1))
            if (setAncestor(index + 1)) {
                list[setAncestor(index + 1)] = min
            }
        }
    }
    draw(index)
}


