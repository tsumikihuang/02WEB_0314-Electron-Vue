import { app, BrowserWindow, Tray, Menu } from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


let tray;
const path = require('path');
const createWindow = () => {
  // Create the browser window.
  /******************************************************** */
  //__dirname >> 現在檔案的絕對路徑
  tray = new Tray(path.resolve(__dirname, "tray_icon.png"));   //若在這裡宣告，則可能過一段時間就會被回收掉
  tray.setToolTip("Tray Icon Sample");
  let menu = Menu.buildFromTemplate([
    {
      label: "Record",
      click: function () {
        let win = new BrowserWindow(
          {
            width: 500, height: 500
          }
        );
        win.loadFile(path.resolve(__dirname, "capture.html"));
      }

    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(menu);

  /******************************************************** */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
