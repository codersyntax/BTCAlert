const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('eth-updateBtn')

updateBtn.addEventListener('click', function() {
    ipc.send('eth-update-notify-value', document.getElementById('eth-notifyVal').value)

    var window = remote.getCurrentWindow()
    window.close()
})