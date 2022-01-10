const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot has started`);
    client.user.setActivity(`+help`);
  });

  client.on("message", async message => {

  
  
    if(message.author.bot) return;
    
    if(!message.content.startsWith(config.prefix)) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "rep") {
    let member = message.mentions.members.first();


    if(!member)
    return message.reply("Please mention a valid user of this server.");

    if(message.author.id == member.user.id)
    return message.reply("You can't give yourself a rep");

    var rep = db.fetch(member.user.id);

    if(!rep) {
        db.set(member.user.id, 1);
    }

    const newrep = Math.floor(Math.floor(rep) + Math.floor(1));

    db.set(member.user.id, newrep);

    }

    if(command == "reputation") {
        let member = message.mentions.members.first();

        if(!member)
        return message.reply("Please mention a valid user of this server.");
        var rep = db.fetch(member.user.id);


        if(!rep) 
            return message.channel.send(`<@!${member.user.id}> has no reps yet.`);
        
        message.channel.send(`<@!${member.user.id}> currently has ${rep} reps.`);


    }

    if(command == "help") {
        const embed = new Discord.MessageEmbed()
        .setTitle("How to give/see reputation")
        .addField("+rep [@user]", "Give a user a rep.")
        .addField("+reputation [@user]", "Shows you the amount of reps the mentioned user has.")
        .addField("+invite", "Invite this bot to YOUR server.")
        .setTimestamp()
        .setFooter("Made by recently#1337")
        .setThumbnail("https://i.imgur.com/NmYhVqB.png")
        message.channel.send(embed);

    }

    if(command == "invite") {
        const embed = new Discord.MessageEmbed()
        .setTitle("Click here to invite")
        .setURL("https://discord.com/oauth2/authorize?client_id=743183276528894074&permissions=8&scope=bot")
        message.channel.send(embed);



    }

  });

  client.login("");
