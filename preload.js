const{contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('cfDesk',{win:a=>ipcRenderer.send('win',a),onFs:f=>ipcRenderer.on('fs',(e,v)=>f(v))});
