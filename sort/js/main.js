let arr = [];
function getArr() {
    arr = [];
    for (let i = 0; i < 100; i++) {
        let temp = Math.floor(Math.random() * 90) + 10;
        arr.push(temp);
    }
}
getArr();
console.log(arr);

function showArr(arr) {
    let str = '';
    for (var i = 0, length = arr.length; i < length; i++) {
        str += '<div style="height:' + arr[i] + 'px"></div>'
    }
    document.getElementById('showBox').innerHTML = str;
}
showArr(arr);

function swap(arr, index1, index2) {
    return new Promise((resolve, reject) => {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setTimeout(() => {
            resolve(arr);
        }, 0)
    })
}

// Bubble sort: for each pair of indices, swap the items if out of order
// 比较次数、交换次数
// var comparisonTime = 0, swapTime = 0;
async function bubbleSort() {
    let j = arr.length;
    // for (var j = arr.length; j > 0; j--) {
    while (j > 0) {
        for (var i = 0; i < j - 1; i++) {
            // comparisonTime++;
            if (arr[i] > arr[i + 1]) {
                // swapTime++;
                arr = await swap(arr, i, i + 1);
                // console.log(comparisonTime, swapTime, arr);
                // console.log(arr);
                showArr(arr);
            }
        }
        j--
    }
    // }
}


var comparisonTime = 0, swapTime = 0;
async function bidirectionalBubbleSort() {
    var left = 0, right = arr.length - 1;
    var i;
    while (left < right) {
        for (i = left; i < right; i++) {
            comparisonTime++;
            if (arr[i] > arr[i + 1]) {
                swapTime++;
                arr = await swap(arr, i, i + 1);
                showArr(arr);
            }
        }
        right--;
        for (i = right; i >= left; i--) {
            comparisonTime++;
            if (arr[i] > arr[i + 1]) {
                swapTime++;
                arr = await swap(arr, i, i + 1);
                showArr(arr);
            }
        }
        left++;
    }
    console.log(comparisonTime, swapTime);
    showArr(arr);
}

async function sort() {

}


document.addEventListener('DOMContentLoaded', (e) => {
    let sortName = ['bubbleSort', 'bidirectionalBubbleSort'];
    let htmlStr = '<button>getRandomArray</button>';
    for (let i = 0, nameCount = sortName.length; i < nameCount; i++) {
        htmlStr += '<button data-sorttype="' + sortName[i] + '">' + sortName[i] + '</button>';
    }
    document.body.insertAdjacentHTML('afterbegin', htmlStr);
});

document.addEventListener('click', (e) => {
    if (e.target.dataset.sorttype) {
        eval(e.target.dataset.sorttype + '()');
    } else {
        getArr();
        showArr(arr);
    }
});