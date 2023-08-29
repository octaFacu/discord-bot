const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        // Lee las carpetas dentro de './src/events'
        const eventFolders = fs.readdirSync('./src/events');
        
        for (const folder of eventFolders) {
            // Lee los archivos en cada carpeta que terminan con '.js'
            const eventFiles = fs
                .readdirSync(`./src/events/${folder}`)
                .filter((file) => file.endsWith(".js"));

            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        // Requiere el evento y lo registra en el cliente
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                        else client.on(event.name, (...args) => event.execute(...args, client))
                    }
                    break;

                default:
                    break;
            }
        }
    }
}