const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Caminhos locais para o emulador e os jogos
const emulatorPath = path.join(__dirname, 'emulator', 'visualboyadvance-m.exe');
const romPath = path.join(__dirname, 'games', 'Pokemon - FireRed Version (USA).gba');

// Links do Google Drive para download
const emulatorUrl = 'https://drive.google.com/uc?export=download&id=15qciTICI5GoTD6ex2VavgkrJ5m7cidIt';  // Emulador
const romUrl = 'https://drive.google.com/uc?export=download&id=1N50ocelodGX06t7_vWkBz7yDGyuMd6SU';   // ROM de Pokémon

// Função para criar a janela do launcher
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

// Função principal que inicia o download do emulador e da ROM
ipcMain.on('launch-game', (event, gameName) => {
  // Primeiro, baixar o emulador, se ainda não foi baixado
  if (!fs.existsSync(emulatorPath)) {
    console.log('Baixando o emulador...');
    downloadFile(emulatorUrl, emulatorPath)
      .then(() => {
        console.log('Emulador baixado com sucesso.');
        downloadAndRunGame();
      })
      .catch(err => {
        console.error('Erro ao baixar o emulador:', err);
      });
  } else {
    console.log('Emulador já existe.');
    downloadAndRunGame();  // Se o emulador já está baixado, baixar e rodar o jogo
  }
});

// Função para baixar e executar a ROM
function downloadAndRunGame() {
  // Baixar a ROM
  if (!fs.existsSync(romPath)) {
    console.log('Baixando a ROM...');
    downloadFile(romUrl, romPath)
      .then(() => {
        console.log('ROM baixada com sucesso! Executando o emulador...');
        runEmulatorWithGame();
      })
      .catch(err => {
        console.error('Erro ao baixar a ROM:', err);
      });
  } else {
    console.log('ROM já baixada. Executando o emulador...');
    runEmulatorWithGame();
  }
}

// Função para baixar arquivos usando axios
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(dest);

    axios({
      method: 'get',
      url,
      responseType: 'stream',
    })
    .then(response => {
      response.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    })
    .catch(err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

// Função para executar o emulador com o jogo
function runEmulatorWithGame() {
  exec(`"${emulatorPath}" "${romPath}"`, (err) => {
    if (err) {
      console.error('Erro ao abrir o emulador:', err);
    }
  });
}

// Inicializa a aplicação Electron
app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
