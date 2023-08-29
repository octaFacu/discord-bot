const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        // Lee las carpetas dentro de './src/commands'
        const commandFolders = fs.readdirSync('./src/commands');
        
        for (const folder of commandFolders) {
            // Lee los archivos en cada carpeta que terminan con '.js'
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            // Obtiene las colecciones 'commands' y 'commandArray' del cliente
            const { commands, commandArray } = client;

            for (const file of commandFiles) {
                // Requiere el comando y lo almacena en la colección 'commands'
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);

                // Agrega el comando y su información a 'commandArray'
                commandArray.push(command, command.data.toJSON());

                // Muestra un mensaje de registro
                console.log(`Comando: ${command.data.name} pasó por el handler`);
            }
        }
    }
}