const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { request } = require("https");
const port = 4000;
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
    console.log("Server is Running");
});



function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

app.get('/bubble-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = bubbleSort(arr);
    res.send(sortedArr);
});


function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

app.get('/insertion-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = insertionSort(arr);
    res.send(sortedArr);
});



function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

app.get('/selection-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = selectionSort(arr);
    res.send(sortedArr);
});


function mergeSort(arr) {
    const n = arr.length;
    if (n <= 1) {
        return arr;
    }
    const mid = Math.floor(n / 2);
    const leftArr = mergeSort(arr.slice(0, mid));
    const rightArr = mergeSort(arr.slice(mid));
    return merge(leftArr, rightArr);
}

function merge(leftArr, rightArr) {
    const result = [];
    let i = 0, j = 0;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] < rightArr[j]) {
            result.push(leftArr[i++]);
        } else {
            result.push(rightArr[j++]);
        }
    }
    return result.concat(leftArr.slice(i)).concat(rightArr.slice(j));
}

app.get('/merge-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = mergeSort(arr);
    res.send(sortedArr);
});


function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

app.get('/quick-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = quickSort(arr);
    res.send(sortedArr);
});


function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i >= 0; i--) {
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
    return arr;
}

app.get('/heap-sort', (req, res) => {
    const arr = [8, 1, 2, 9, 9, 5, 9, 4, 8, 0];
    const sortedArr = heapSort(arr);
    res.send(sortedArr);
});


// fs.readFile('file.txt', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data.toString());
//   });

//   fs.writeFile('file.txt', 'Hello, World!', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File written successfully!');
//   });


//   fs.appendFile('file.txt', 'Hello, World!', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Data appended to file!');
//   });


//   fs.rename('file.txt', 'new-file.txt', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File renamed successfully!');
//   });