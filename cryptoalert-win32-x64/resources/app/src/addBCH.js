const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn = document.getElementById('bch-updateBtn')

updateBtn.addEventListener('click', function() {
    ipc.send('bch-update-notify-value', document.getElementById('bch-notifyVal').value)

    var window = remote.getCurrentWindow()
    window.close()
})