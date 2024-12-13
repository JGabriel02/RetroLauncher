const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const axios = require('axios');


const games = {
    pokemon_radicalred: { path: 'radicalred.gba', url: 'https://drive.google.com/uc?export=download&id=1Sv4jGmA--oIMdFqQWsKS3BQoZ8BOwuhK' },
    pokemon_gaia: { path: 'Pokemon_Gaia_v3.2.gba', url: 'https://drive.google.com/uc?export=download&id=14B4nPQ3FDgDT9IVdFgGcKW37ahK65tmA' },
    pokemon_liquid: { path: 'Pokemon Liquid Crystal.gba', url: 'https://drive.google.com/uc?export=download&id=1zusV4QBg63ZyHdAcqQNFbUFNuDTLoh10' },
    pokemon_SwSh: { path: 'PKM SwSh ULTIMATE+.gba', url: 'https://drive.google.com/uc?export=download&id=1jT9-hAYakkwzmiHMOKx7OuceCXaU95oW' },
    pokemon_verde_musgo: { path: 'PK Verde Musgo.gba', url: 'https://drive.google.com/uc?export=download&id=1qLkJg4nEexGFZKW1XNSj-RWbnUnTd_sx' },
    pokemon_fusion: { path: 'PK Fusion 3.gba', url: 'https://drive.google.com/uc?export=download&id=1BaM7LS-OX0_urylmf9Y8QrQC0WgzwZqz' },
    pokemon_light_platinum: { path: 'LIGHT PLATINUM.GBA', url: 'https://drive.google.com/uc?export=download&id=1XjBF5UNYpjHTgNxvfKp8Dlq5d0R-aV5y' },
    pokemon_emerald_randomizer: { path: 'Pokémon Emerald Randomizer Nuzlocke.gba', url: 'https://drive.google.com/uc?export=download&id=199BOTGF_sA9ATAl2OUxGvwDa8y1pZTTa' },
    pokemon_blue_star: { path: 'PK Blue Stars 4.gba', url: 'https://drive.google.com/uc?export=download&id=1wnkprD9SCrVG49uSFitLxvHswIGL90co' },
};

const emulatorPath = path.join(__dirname, 'emulator', 'visualboyadvance-m.exe');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 788,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: false,
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// Listener para lançamento de jogos
ipcMain.on('launch-game', (event, gameName) => {
    const game = games[gameName];
    if (game && fs.existsSync(emulatorPath)) {
        downloadAndRunGame(game);
    } else {
        console.error('Emulador ou jogo não encontrado.');
    }
});


ipcMain.on('minimize-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('close-window', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});


function downloadAndRunGame(game) {
    const gamePath = path.join(__dirname, 'games', game.path);

    if (!fs.existsSync(gamePath)) {
        downloadFile(game.url, gamePath, (progress) => {
            mainWindow.webContents.send('download-progress', progress);
        })
            .then(() => runEmulatorWithGame(gamePath))
            .catch((err) => console.error('Erro ao baixar a ROM:', err));
    } else {
        runEmulatorWithGame(gamePath);
    }
}


function downloadFile(url, dest, onProgress) {
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(dest);
        axios({
            method: 'get',
            url,
            responseType: 'stream',
        }).then((response) => {
            const totalLength = response.headers['content-length'];
            let downloadedLength = 0;

            response.data.on('data', (chunk) => {
                downloadedLength += chunk.length;
                const progress = Math.round((downloadedLength / totalLength) * 100);
                onProgress(progress);
            });

            response.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        }).catch((err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

function runEmulatorWithGame(romPath) {
    exec(`"${emulatorPath}" "${romPath}"`, (err) => {
        if (err) console.error('Erro ao abrir o emulador:', err);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
