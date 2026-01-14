const path = require('path'); // import node's path module
const fs = require('fs'); // import node's fs module
const { app, screen, BrowserWindow, Menu, ipcMain } = require('electron'); // load modules from electron

// const isDev = process.env.NODE_ENV !== 'development'; // check if in developement environment
const isDev = false; // for production/testing set isDev to false
const isMac = process.platform === 'darwin'; //check if operating system is mac
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';


// create main window
function createMainWindow() {
    const {width: screenWidth, height: screenHeight} = screen.getPrimaryDisplay().workAreaSize; // get width and height of screen/ screen resolution
    // set app window size relative to screen size
    const windowWidth = isDev ? 1000 : Math.round(screenWidth * 0.4); 
    const windowHeight = isDev ? 600 : Math.round(screenHeight * 0.6); 

    let iconPath;
    if (isLinux){
        iconPath = path.join(__dirname, 'assets/icons/Espresso.png');
    } else if (isMac){
        iconPath = path.join(__dirname, 'assets/icons/Espresso.icns');
    } else if (isWindows){
        iconPath = path.join(__dirname, 'assets/icons/Espresso.ico');
    }

    const mainWindow = new BrowserWindow({
        title: 'Coffee Timer',
        width: windowWidth,
        height: windowHeight,
        minWidth: windowWidth,
        minHeight: windowHeight,
        resizable: false, 
        icon: iconPath, // set app icon (windows & linux)
    });

    // remove menu bar
    mainWindow.setMenu(null);

    // automatically open devtools if in dev environment when starting app
    if (isDev){
        mainWindow.webContents.openDevTools();
    };

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html')); // load frontend for renderer from 'renderer'-folder
};


// replicate standard of closing app for different operating systems (windows/linux: app closes if all windows are closed, mac: even if all windows are closed app still runs so activating app again should reopen window)
app.on('window-all-closed', () => {  // operating system is windows/linux quit app if all app windows are closed
    if (!isMac) {
        app.quit()
    }
});

// add listener on app, listen if ready
app.whenReady().then(() => {
    createMainWindow();

    // reopen window on activating app if all windows were closed (mac operating systems)
    app.on('activate', () => {      // if app is activated but no browser windows exist: create window
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }        
    })    
});