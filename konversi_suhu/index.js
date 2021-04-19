const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;

let homeWindow;
let konversiWindow;

let allAppointment = [];

app.on("ready",  () => {
    homeWindow = new BrowserWindow({
       webPreferences : {
           nodeIntegration : true
        },
        title : "Aplikasi Menghitung Suhu"

    });

    homeWindow.loadURL(`file://${__dirname}/home.html`);
    homeWindow.on("closed", () => {
        app.quit();
        homeWindow = null;
        
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const KonversiWindowCreator = () => {
    konversiWindow = new BrowserWindow ({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        icon:'app/icon.png',
        title: "Konversi Suhu"
    });

    konversiWindow.setMenu(null);
    konversiWindow.loadURL(`file://${__dirname}/index.html`);
    konversiWindow.on("closed", ()  => (konversiWindow = null));
};

const menuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label : "Konversi Suhu",
                click(){
                KonversiWindowCreator();
                }
            },
            {
                label: 'Keluar',
                accelerato : process.platform === "darwin" ? "Command+Q" :
                "Ctrl+Q",
                click(){
                app.quit(); 
                }
            }
        ]
    }
]