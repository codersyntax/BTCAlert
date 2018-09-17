const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('xrp-updateBtn')

updateBtn.addEventListener('click', function() {
    ipc.send('xrp-update-notify-value', document.getElementById('xrp-notifyVal').value)

    var window = remote.getCurrentWindow()
    window.close()
})