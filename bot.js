const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr");
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//--------------------------------KOMUTLAR-------------------------------\\
//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add("779032118709321759"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
 member.setNickname(`∆ İsim | Yaş`)
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "779032193351548969"
);
  const register = "<@&779032096411746315>";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

 var kontrol;
  if (kurulus < 1296000000)
    kontrol =
      " <a:yapmyorum:779042990995275796> Hesap Durumu: Güvenilir Değil <a:yapmyorum:779042990995275796> ";
  if (kurulus > 1296000000)
    kontrol =
      " <a:fors16:778005709861814283> Hesap Durumu: Güvenilir Gözüküyor <a:fors16:778005709861814283> ";
  moment.locale("tr");
  const strigalog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setDescription(
      "**<a:fors34:778005711509913621> Hoşgeldin! <@" +
        member +
        "> Seninle `" +
        member.guild.memberCount +
        "` Kişiyiz. <a:fors34:778005711509913621> \n\n<a:fors35:778005712876863548> Müsait olduğunda Confirmation Odalarından Birine Geçip Kaydını Yaptırabilirsin. <a:fors35:778005712876863548> \n\n <a:fors8:778005712731111434> <@&779032096411746315> seninle ilgilenicektir. <a:fors8:778005712731111434> \n\n <a:kanltik:779438002803441764> Hesabın Oluşturulma Tarihi:" +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        " <a:kanltik:779438002803441764> \n\n" +
        kontrol +
        "\n\n <a:fors37:778005711354462209> Tagımızı alarak ` ∆ ` bize destek olabilirsin.** <a:fors37:778005711354462209> \n"
    )
    .setImage(
      "https://media.discordapp.net/attachments/755067604929871895/780727685353701396/fors.gif"
    );
  kanal.send(strigalog);
  kanal.send(register);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "∆";
    const sunucu = "778000441560399962";
    const kanal = "779032204255690793";
    const rol = "779032116889124865";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam ${
              newUser.username
            }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam **${
              newUser.username
            }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});

//Serendia'dan alınıp V12 Çevirilmiştir!

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("778000441560399962"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "∆"; // Buraya Ekip Tag
  var tagrol = "779032116889124865"; // Buraya Ekip Rolünün ID
  var kanal = "779032204255690793"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.filter(
          rol => rol.position >= sunucu.roles.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch (err) {
      console.error(err);
    }
  }
});
