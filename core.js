const Discord   = require("discord.js");
const client    = new Discord.Client();

const config    = require("./config.json");
const commands  = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

client.on("guildCreate", guild => {

    console.log(`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} membros!`);

    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);

});

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});


  module.exports = async (client,msg) =>{
      var texto = "Comandos:";
      Object.keys(commands).forEach(command => {
          texto += `\n ${command}: ${descriptions[command] ? descriptions[command] : 'Não tem descrição'}`
      });
      msg.reply(texto);
  };
  
  module.exports = async (client,msg) =>{
    const channel   = msg.channel;
    const FetchMsg  = await channel.fetchMessages();
    await channel.bulkDelete(FetchMsg);
    msg.reply("Chat Limpo!"); 
  };
  

client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg);
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

client.login(config.token);