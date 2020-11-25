const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['779032096411746315', '779032079727591484', '779032078351597637'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "∆"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '779032117380251659')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '779032118709321759')


if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`kadinUye.${message.author.id}`, 1)
let kadın = db.get(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`<a:fors16:778005709861814283> Kayıt İşlemi Tamamlandı`)
    .addField(`<a:fors34:778005711509913621> Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`<a:fors34:778005711509913621> Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`<a:fors35:778005712876863548> Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`<a:fors37:778005711354462209> Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`<a:fors33:778005711442804766> Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`<a:fors33:778005711442804766> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`FORS ❤️ SARKOZY`)
.setColor('GREEN')
client.channels.cache.get('779032193351548969').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın','k','woman','girl', 'kız'],
    permLevel: 0
};

exports.help = {
    name: 'kadın',
};