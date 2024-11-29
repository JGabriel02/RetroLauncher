# RetroLauncher

**RetroLauncher** é um aplicativo desktop desenvolvido em **Electron** para centralizar, organizar e facilitar o acesso a jogos retrô. O launcher inclui um emulador integrado e suporta o download e execução de ROMs de forma simplificada.

## 📋 Funcionalidades

- Interface intuitiva com navegação entre páginas de jogos.
- Emulador embutido (**Visual Boy Advance**) para jogos compatíveis.
- Suporte para até 9 jogos, exibidos em formato de cards com paginação.
- Barra de progresso para monitorar downloads.
- Botões de controle para minimizar ou fechar o launcher.
- Arquivo executável (.exe) para Windows, facilitando a distribuição.

## 🚀 Tecnologias Utilizadas

- **Electron**: Framework principal para construção do aplicativo.
- **JavaScript**: Linguagem de programação para lógica do launcher.
- **HTML/CSS**: Desenvolvimento da interface de usuário.
- **Axios**: Para gerenciamento de downloads de ROMs e arquivos.
- **Node.js**: Backend para integrar funcionalidades do sistema.

## 🛠️ Requisitos

- **Node.js** versão 14 ou superior.
- Sistema operacional Windows.
- Conexão com a internet para baixar ROMs no primeiro uso.

## 📦 Instalação

## Caso queira acessar diretamente o executavel acesse: https://shadow-myth-front.vercel.app 

### Requisitos iniciais

1. Certifique-se de que o [Node.js](https://nodejs.org/) esteja instalado no sistema.
2. Clone este repositório:
   ```bash
   git clone https://github.com/JGabriel02/RetroLauncher.git
   cd RetroLauncher
   ```

### Configuração

1. Instale as dependências necessárias:
   ```bash
   npm install
   ```
2. Configure o ícone do aplicativo para Windows:
   Certifique-se de ter o arquivo `icon.ico` na raiz do projeto e ajuste no `package.json`:
   ```json
   "build": {
       "icon": "./icon.ico"
   }
   ```

### Executar em ambiente de desenvolvimento

Inicie o launcher localmente:
```bash
npm start
```

### Gerar Executável

Para gerar o `.exe`:
```bash
npm run package-win
```
O executável estará disponível na pasta `out`.

## 🎮 Lista de Jogos (Todos os jogos são feitão por fãs, caso seu jogo esteja aqui e você queira que eu retire, entre em contato!!)

- Pokémon Radical Red
- Pokémon Gaia
- Pokémon Liquid Crystal
- Pokémon Sword/Shield Ultimate
- Pokémon Verde Musgo
- Pokémon Fusion 3
- Pokémon Light Platinum
- Pokémon Emerald Randomizer
- Pokémon Blue Stars 4


## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos:
1. Faça um fork do projeto.
2. Crie uma branch para suas alterações:
   ```bash
   git checkout -b feature/sua-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Adicionei nova feature'
   ```
4. Envie suas alterações:
   ```bash
   git push origin feature/sua-feature
   ```

Abra um **Pull Request** e descreva as mudanças.

## 📝 Esse é um projeto acadêmico sem fins lucrativos 

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub ou por (joaogabrielrocha.dev@gmail.com).
