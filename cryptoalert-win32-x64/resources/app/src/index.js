const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
const ethNotifyBtn = document.getElementById('eth-notifyBtn')
const xrpNotifyBtn = document.getElementById('xrp-notifyBtn')
const bchNotifyBtn = document.getElementById('bch-notifyBtn')
//var price = document.querySelector('h1')
var price = document.getElementById('price')
var ethPrice = document.getElementById('eth-price')
var xrpPrice = document.getElementById('xrp-price')
var bchPrice = document.getElementById('bch-price')
var targetPrice = document.getElementById('targetPrice')
var ethTargetPrice = document.getElementById('eth-targetPrice')
var xrpTargetPrice = document.getElementById('xrp-targetPrice')
var bchTargetPrice = document.getElementById('bch-targetPrice')
var targetPriceVal, ethtargetPriceVal, xrptargetPriceVal, bchtargetPriceVal

function updateCurrencies() {
    getBTC()
    getETH()
    getXRP()
    getBCH()
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const crypto = res.data.BTC.USD
        price.innerHTML = '$' + crypto.toLocaleString('en')
        if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
            var snd = new Audio('../assets/sounds/ding.mp3');
            snd.play();
            setTimeout(function() {alert("BTC is above " + targetPrice.innerHTML)}, 200)
        }
    })
}

function getETH() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD')
    .then(res => {
        const crypto = res.data.ETH.USD
        ethPrice.innerHTML = '$' + crypto.toLocaleString('en')
        if (ethTargetPrice.innerHTML != '' && ethtargetPriceVal < res.data.ETH.USD) {
            var snd = new Audio('../assets/sounds/ding.mp3');
            snd.play();
            setTimeout(function() {alert("ETH is above " + ethTargetPrice.innerHTML)}, 200)
        }
    })
}

function getXRP() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XRP&tsyms=USD')
    .then(res => {
        const crypto = res.data.XRP.USD
        xrpPrice.innerHTML = '$' + crypto.toLocaleString('en')
        if (xrpTargetPrice.innerHTML != '' && xrptargetPriceVal < res.data.XRP.USD) {
            var snd = new Audio('../assets/sounds/ding.mp3');
            snd.play();
            setTimeout(function() {alert("XRP is above " + xrpTargetPrice.innerHTML)}, 200)
        }
    })
}

function getBCH() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BCH&tsyms=USD')
    .then(res => {
        const crypto = res.data.BCH.USD
        bchPrice.innerHTML = '$' + crypto.toLocaleString('en')
        if (bchTargetPrice.innerHTML != '' && bchtargetPriceVal < res.data.BCH.USD) {
            var snd = new Audio('../assets/sounds/ding.mp3');
            snd.play();
            setTimeout(function() {alert("BCH is above " + bchTargetPrice.innerHTML)}, 200)
        }
    })
}

updateCurrencies()
setInterval(updateCurrencies, 30000)

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({width: 400, height:200, frame:false, transparent:true, alwaysOnTop:true})
    win.on('close', function() {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

ethNotifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'addETH.html')
    let win = new BrowserWindow({width: 400, height:200, frame:false, transparent:true, alwaysOnTop:true})
    win.on('close', function() {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

xrpNotifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'addXRP.html')
    let win = new BrowserWindow({width: 400, height:200, frame:false, transparent:true, alwaysOnTop:true})
    win.on('close', function() {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

bchNotifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'addBCH.html')
    let win = new BrowserWindow({width: 400, height:200, frame:false, transparent:true, alwaysOnTop:true})
    win.on('close', function() {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function(event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})

ipc.on('ethTargetPriceVal', function(event, arg) {
    ethtargetPriceVal = Number(arg)
    ethTargetPrice.innerHTML = '$' + ethtargetPriceVal.toLocaleString('en')
})

ipc.on('xrpTargetPriceVal', function(event, arg) {
    xrptargetPriceVal = Number(arg)
    xrpTargetPrice.innerHTML = '$' + xrptargetPriceVal.toLocaleString('en')
})

ipc.on('bchTargetPriceVal', function(event, arg) {
    bchtargetPriceVal = Number(arg)
    bchTargetPrice.innerHTML = '$' + bchtargetPriceVal.toLocaleString('en')
})