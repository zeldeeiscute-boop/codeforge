const{app,BrowserWindow,ipcMain,shell}=require('electron');const path=require('path');
function create(){const w=new BrowserWindow({width:1280,height:800,minWidth:700,minHeight:480,frame:false,transparent:true,backgroundColor:'#00000000',
  webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true}});
  w.loadFile('index.html');
  w.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
  w.on('enter-full-screen',()=>w.webContents.send('fs',true));w.on('leave-full-screen',()=>w.webContents.send('fs',false))}
ipcMain.on('win',(e,a)=>{const w=BrowserWindow.fromWebContents(e.sender);if(!w)return;if(a==='close')w.close();else if(a==='min')w.minimize();else if(a==='fs')w.setFullScreen(!w.isFullScreen())});
app.whenReady().then(create);
app.on('window-all-closed',()=>app.quit());
app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)create()});
