const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const isMac = process.platform === "darwin";
const isDev = require('electron-is-dev');

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  //mainWindow.loadURL(
  //  process.env.ELECTRON_START_URL ||
  //    url.format({
  //      //pathname: path.join(__dirname, '/../public/index.html'),
  //      pathname: path.join(__dirname, '../build/index.html'),
  //      protocol: 'file:',
  //      slashes: true,
  //    })
  //)
  mainWindow.loadURL("https://www.shout.app");
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow();
  // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
    //mainWindow.openDevTools();
  }
})

// Create menu template
// This doesn't work at the moment ... need to dive into this.
const mainMenuTemplate = [
  {
    label: "Shout Desktop",
    submenu: [
      {
        label: "Inbox",
        click: () => {
          mainWindow.loadURL("/inbox")
        }
      },
      {
        label: "Orders",
        click: () => {
          mainWindow.loadURL("/orders")
        }
      },
      {
        label: "Shipping",
        click: () => {
          mainWindow.loadURL("/shipping")
        }
      },
      {
        label: "Contacts",
        click: () => {
          mainWindow.loadURL("/profiles")
        }
      },
      {
        label: "About",
        role: "about"
      },
      {
        label: "Quit",
        //accelerator: isMac ? "Command+Q" : "Control+Q",
        role: "quit"
      }
    ]
  },
  {
    label: "Settings",
    submenu: [
      {
        label: "My Profile",
        click: () => mainWindow.loadURL("/profile/edit")
      },
      {
        label: "Usage",
        click: () => mainWindow.loadURL("/profile/usage")
      },
      {
        label: "Privacy",
        click: () => mainWindow.loadURL("/profile/privacy_settings")
      }
    ]
  },
  {
    label: "Window",
    role: "windowMenu"
  },
  {
    label: "View",
    role: "viewMenu"
  }
];

const macMenu = isMac ? mainMenuTemplate.push({
    label: "Help",
    role: "help"
  }) : null;

const devMenu = process.env.NODE_ENV !== "production" 
  ? mainMenuTemplate.push({
      label: "DevTools",
      submenu: [
        {
          label: "Toggle Developer Tools",
          role: "toggleDevTools"
        }
      ]
    })
  : null;