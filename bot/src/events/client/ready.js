//Este archivo en particular maneja el evento "ready", que se dispara cuando el bot está listo para funcionar. 

module.exports = {
    // El nombre del evento, en este caso, "ready"
    name: 'ready',
    
    // Una propiedad "once" que indica si este evento debe manejarse solo una vez
    once: true,
    
    // La función "execute" que se ejecutará cuando ocurra el evento
    async execute(client){
        // Muestra un mensaje en la consola indicando que el bot está listo y en línea
        console.log(`Listo!! ${client.user.tag} está logueado y en línea!`);
    }
}








//once: Esta propiedad es un booleano que indica si este evento debe manejarse solo una vez. Cuando se establece en true, significa que después de que el evento "ready" se haya manejado una vez, no se volverá a manejar en futuras conexiones. Esto es útil para eventos que deben ejecutarse solo una vez, como la inicialización.