const Discord = require("discord.js");

exports.run = async (client, message) => {
  const y = new Discord.MessageEmbed()
    .setColor("RED")
    .addField("**Kayıt**", "`f!erkek : Bir Kişiyi Erkek Olarak Kayıt Edersin`")
    .addField("**Kayıt**", "`f!kız : Bir Kişiyi Kız Olarak Kayıt Edersin`")
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setThumbnail(
      "https://media.discordapp.net/attachments/755067604929871895/780727685353701396/fors.gif"
    );
  return message.channel.send(y);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt"],
  permLevel: 0
};

exports.help = {
  name: "kayıt"
};
