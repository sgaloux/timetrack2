"use strict";

import { app, BrowserWindow } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as path from "path";
import { format as formatUrl } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: Electron.BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
    },
  });
  if (isDevelopment) {
    window.webContents.openDevTools({ mode: "bottom" });
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

function installExtensions() {
  if (isDevelopment) {
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension("pfgnfdagidkfgccljigdamigbcnndkod");
  }
}

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  installExtensions();
  mainWindow = createMainWindow();
});
