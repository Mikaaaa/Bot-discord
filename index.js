const Discord 		= require('discord.js');
const feed 			= require("feed-read");
const schedule 		= require('node-schedule');
const Entities 		= require('html-entities').AllHtmlEntities;
const bot 			= new Discord.Client();
const entities 		= new Entities();


bot.login('MzY1NTY1NzYxODc3NzA0NzA1.DLgLRA.bRJzvZxLpOF2qgXNc-Ku37huP30');
// Melissa Theuriau - MzY1NTY1NzYxODc3NzA0NzA1.DLgLRA.bRJzvZxLpOF2qgXNc-Ku37huP30 
// melissaDev - MzY1MjYwODM0NjU5NjMxMTM1.DLj7ig.-9PrRrH1llLcdj_FTHiPh_FgObI

function getEmbed(argument) {
	var content;
	var i = Math.floor(Math.random() * argument.length);
	if (argument[i]["content"].length > 2048) {content = argument[i]["content"].substr(0,2040)+"...";} else {content =argument[i]["content"];}
    var txt = argument[i]["feed"]["name"].replace('|',"");
    for (var s = 0; s < txt.length; s++) {
    	txt = txt.replace(" ", "%20");
    }
    var png = txt+".png";
    const embed = new Discord.RichEmbed()
    .setAuthor(argument[i]["feed"]["name"], "https://mika.unrozah.fr/"+png)
    .setTitle(argument[i]["title"])
    .setColor(0x1b4fc6)
    .setDescription(content)
    .setImage("https://mika.unrozah.fr/img.php?q="+argument[i]["link"])
    .setFooter("Article du "+ argument[i]["published"], "http://www.iconhot.com/icon/png/i-buttons-3c/512/2c-info.png")
    .setURL(argument[i]["link"]);
    return {embed};
}

var j;
var rssstart=true;
var version = "v.7.10.17";

bot.on('message', function (message) {
var rss = ['http://www.lemonde.fr/rss/une.xml',  "http://www.01net.com/rss/info/flux-rss/flux-toutes-les-actualites/",
		   'http://www.20min.ch/rss/rss.tmpl?type=channel&get=6','http://www.zdnet.fr/feeds/rss/actualites/','https://web.developpez.com/index/rss', "http://www.jeuxvideo.com/rss/rss-pc.xml", "https://www.developpez.com/index/rss", "https://www.canardpc.com/rss.xml"];

var friends = ["https://shalien.projetretro.io/rss.xml"];
var responseImpatience = ["Eh bien je vois qu'on s'impatiente !", 'Je suis occupée.', "Non.", "Le prochain arrive bientôt","T'es pas le premier a me le demander, un peut de patience ;)", "l'information ne s'arrête jamais c'est vrai, mais elle n'a commencé qu'une seule fois "];
var réponseBonjour = ["salut", "coucou", "yo", "bonjour"];
var reponseDepart = ["Je m'y met", "J'ai déjà quelques idées", "ok c'est cool"];
var commandes = [{"cmd" : "^ping", "desc" : '```Je répond "pong" tout simplement. ```' },{"cmd" : "$info", "desc" : '```Je répond avec une info au hasard parmis mes sources. ```' },
			   {"cmd" : "^rss-start", "desc" : '```Je publie une info au hasard parmis mes sources toute les minutes. ```' }, {"cmd" : "^rss-end", "desc" : "```Je m'arrête de publier . ```" }];
var smartphone = ["http://www.01net.com/rss/smartphones/","http://www.zdnet.fr/blogs/androblog/rss/"];
var jeu = ["http://www.jeuxvideo.com/rss/rss-pc.xml", "http://www.01net.com/rss/actualites/jeux/"];
var pc = ["http://www.01net.com/rss/pc-portables/", "http://www.01net.com/rss/pc-peripheriques/", "https://www.canardpc.com/rss.xml"];
var android = ["https://www.androidpit.fr/feed/main.xml", "http://www.frandroid.com/feed"];
	switch (message.content) {
		case '^ping' : 
			//permet de répondre dans la channel
			message.channel.send('pong');break;
		case '$info' :
			bot.user.setGame("Trouver l'info", "https://go.twitch.tv/legeekfou");
			feed(rss, function(err, articles) {
		    if (err) throw err;
		    message.channel.send(getEmbed(articles));		    
		    bot.user.setGame("", "https://go.twitch.tv/legeekfou");		    
		});
		;break;
		case '#rsslistflood' : 
			
			feed(rss, function(err, articles) {
		    if (err) throw err;
		    // articles is an array of article with properties described above.
		    for (var i = 0; i < articles.length; i++) {
		    	var k = Math.floor(Math.random() * articles.length);
			    var txt = articles[k]["feed"]["name"].replace('|',"");
			    for (var s = 0; s < txt.length; s++) {
			    	txt = txt.replace(" ", "%20");
			    }
			    var png = txt+".png";
			    const embed = new Discord.RichEmbed()
			    .setAuthor(articles[k]["feed"]["name"], "https://mika.unrozah.fr/"+png)
			    .setTitle(articles[k]["title"])
			    .setColor(0x1b4fc6)
			    .setDescription(entities.decode(articles[k]["content"]))
			    .setImage("https://mika.unrozah.fr/img.php?q="+articles[k]["link"]+"&")
			    .setFooter("Article du "+ articles[k]["published"], "http://www.iconhot.com/icon/png/i-buttons-3c/512/2c-info.png")
			    .setURL(articles[k]["link"]);
			    message.channel.send({embed});
		    // articles is an array of article with properties described above.
		    //message.channel.send(articles[Math.floor(Math.random() * articles.length)]['link']);
		    //console.log("https://mika.unrozah.fr/"+png);
		    }
		});
		;break;
		//publie une news a chaque fois que qu'il sera 30 de 7h30 a 22h30
		case '^rss-start' : 
			if (rssstart) {} else {message.channel.send(responseImpatience[Math.floor(Math.random() * responseImpatience.length)]);break;}		
			feed(rss, function(err, articles) {
            if (err) throw err;
            var rule = new schedule.RecurrenceRule();
            rule.second = 60;
            message.channel.send(reponseDepart[Math.floor(Math.random() * reponseDepart.length)]);
            bot.user.setGame("l'info 7h-23h", "https://go.twitch.tv/legeekfou");
             j = schedule.scheduleJob('30 7-23 * * *', function(){
				    message.channel.send(getEmbed(articles));
            });	
			rssstart = false;	    
		});
		;break;
		case '^rss-end' :
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
			message.channel.send("Ok je m'arrête la"); 
			rssstart = false;			
			j.cancel();
		;break;
	}
	/*---

		Si le bot est mentionné

	---*/
	if (message.isMentioned(bot.user.id)) {
		/*---

		Si le message contient "source" sans "eau", le bot liste ses sources

	---*/
		if (message.content.includes("source") && !message.content.includes("eau")) {
			bot.user.setGame("Trouver l'info", "https://go.twitch.tv/legeekfou");
			message.channel.send("voici mes sources : ");
			message.channel.send("Général");
				for (var i = 0; i < rss.length; i++) {					
					message.channel.send("```" +rss[i] + "```");
				}
				message.channel.send("Smartphone");
				for (var i = 0; i < smartphone.length; i++) {					
					message.channel.send("```" +smartphone[i] + "```");
				}
				message.channel.send("Pc");
				for (var i = 0; i < pc.length; i++) {
					message.channel.send("```" +pc[i] + "```");
				}
				message.channel.send("jeux");
				for (var i = 0; i < jeu.length; i++) {
					message.channel.send("```" +jeu[i] + "```");
				}
				message.channel.send("android");
				for (var i = 0; i < android.length; i++) {
					message.channel.send("```" +android[i] + "```");
				}
				message.channel.send(version);
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
		}
		/*---

		Si le message contient "commande" il liste les commandes

	---*/
		else if (message.content.includes("commande")) {
			bot.user.setGame("Trouver l'info", "https://go.twitch.tv/legeekfou");
			message.channel.send("voici les commandes : ");
				for (var i = 0; i < commandes.length; i++) {
					message.channel.send(commandes[i]["cmd"] +commandes[i]["desc"] );
				}
			message.channel.send("Tu peux me demander moi les infos sur un sujet (ex. smartphone, jeux, pc, android)");
			message.channel.send("v.1.0");
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");	
		}
		/*---

		Si le message contient "smartphone" sans "ton", le bot publie une news en rapport avec les smartphones

	---*/
		else if  (message.content.includes("smartphone") && !message.content.includes("ton")) {
			feed(smartphone, function(err, articles) {
		    if (err) throw err;
		    	// articles is an array of article with properties described above.
		    	message.channel.send(getEmbed(articles));
			});
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");		
		}
		/*---

		Si le message contient "jeu" sans "jouer", le bot publie une news en rapport avec les jeux

	---*/
		else if  (message.content.includes("jeu") && !message.content.includes("jouer")) {
			bot.user.setGame("Trouver l'info", "https://go.twitch.tv/legeekfou");
			feed(jeu, function(err, articles) {
		    if (err) throw err;
		    	// articles is an array of article with properties described above.
		    	message.channel.send(getEmbed(articles));
			});
			//bot.user.setGame("", "https://go.twitch.tv/legeekfou");
		}
		/*---

		Si le message contient "pc" sans "qui", le bot publie une news en rapport avec les pc

	---*/
		else if  (message.content.includes("pc") && !message.content.includes("qui")) {
			feed(pc, function(err, articles) {
		    if (err) throw err;
		    	// articles is an array of article with properties described above.
		    	message.channel.send(getEmbed(articles));
			});
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
		}
		/*---

		Si le message contient "android" sans "qui", le bot publie une news en rapport avec android

	---*/
		else if  (message.content.includes("android") && !message.content.includes("qui")) {
			feed(android, function(err, articles) {
		    if (err) throw err;
		    	// articles is an array of article with properties described above.
		    	message.channel.send(getEmbed(articles));
			});
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
		}
		/*---

		Si le message contient "shalien", le bot publie une news avec les liens du tableau friends

	---*/
		else if  (message.content.includes("shalien") ) {
			feed(friends, function(err, articles) {
		    if (err) throw err;
		    	// articles is an array of article with properties described above.
		    	message.channel.send(getEmbed(articles));
			});
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
		}
		/*---

		Si le message contient "pc" ou "salut" ou "yo" ou "coucou" ou "bonjour" le bot publie une réponse du tableau réponseBonjour

	---*/
		else if  (message.content.includes("plop") || message.content.includes("salut") || message.content.includes("coucou") || message.content.includes("bonjour")) {			
		    	message.reply(réponseBonjour[Math.floor(Math.random() * responseImpatience.length)]);
		}
		/*---

		Si le message arrive ici il sera intégré a un lien qui génèrera un flux a partir du mot, qu'on récupèrera pour publier un des article de ce flux

	---*/
		else {
			bot.user.setGame("Trouver l'info", "https://go.twitch.tv/legeekfou");
			var query = message.content.substr(21, message.content.length).replace(" ", "%20");
			var noresponse = ["https://news.google.com/?output=rss&hl=fr&gl=fr&q="+query+"&scoring=n&num=50"];
			feed(noresponse, function(err, articles) {
			var i= Math.floor(Math.random() * articles.length);
		    if (err) throw err;
		    if (articles[i] == null) {
			    message.channel.send("Je n'ai pas trouvé, essaye avec une autre orthographe ou recommence avec mon tag en premier puis ton mot");
		    }
			else {
				// articles is an array of article with properties described above.
			    message.channel.send(getEmbed(articles));
			} 
			});
			bot.user.setGame("", "https://go.twitch.tv/legeekfou");
			
		}
	}
});
