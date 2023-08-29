// Importa y configura las variables de entorno desde un archivo .env
require('dotenv').config();

// Obtiene el token del bot desde las variables de entorno
const { token } = process.env;

// Importa las clases necesarias de la biblioteca discord.js
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Importa el módulo 'fs' (File System) para trabajar con archivos y carpetas
const fs = require('fs');

// Crea una instancia de un cliente de Discord (el bot)
const client = new Client({ intents: GatewayIntentBits.Guilds });

// Crea una colección para almacenar los comandos del bot
client.commands = new Collection();
client.commandArray = [];

// Lee el contenido de la carpeta 'functions' en tu proyecto
const functionFolders = fs.readdirSync('./src/functions');

// Itera a través de las carpetas en la carpeta 'functions'
for (const folder of functionFolders) {
    // Lee el contenido de cada carpeta individual en 'functions'
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));

    // Itera a través de los archivos dentro de la carpeta actual
    for (const file of functionFiles) {
        // Requiere y ejecuta cada archivo como un módulo,
        // pasando el cliente de Discord (bot) como argumento
        require(`./functions/${folder}/${file}`)(client);
    }
}

//Estas líneas invocan funciones handleEvents y handleCommands que manejan la carga de eventos y comandos para tu bot.
client.handleEvents();
client.handleCommands();
client.login(token);