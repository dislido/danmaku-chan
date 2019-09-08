const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

/** @type {BrowserWindow} */
let mainWnd = null;
let wndFocus = true;

function toggleMainWndFocus(focus) {
  if (focus !== undefined) wndFocus = !focus;
  wndFocus = !wndFocus;
  mainWnd.setIgnoreMouseEvents(!wndFocus, { forward: true });
  mainWnd.webContents.send('setWndFocus', wndFocus);
};

function createWindow () {   
  // 创建浏览器窗口
  mainWnd = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: '#0000',
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
  });

  // 加载index.html文件
  mainWnd.loadFile('./dist/index.html');

  globalShortcut.register('Alt+A', toggleMainWndFocus);
}


app.on('ready', createWindow);

/** @type {BrowserWindow} */
let settingWnd = null;
ipcMain.on('openSetting', () => {
  mainWnd.setAlwaysOnTop(false);
  if (settingWnd) return settingWnd.moveTop();
  settingWnd = new BrowserWindow({
    parent: mainWnd,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  settingWnd.loadFile('./dist/setting/setting.html');
  settingWnd.on('closed', () => {
    settingWnd = null;
    mainWnd.setAlwaysOnTop(true);
  });
});

ipcMain.on('updateStyleVars', () => {
  mainWnd.webContents.send('updateStyleVars');
});