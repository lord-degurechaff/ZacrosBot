cmd.on('stickermaker', ['sticker','stiker'],['maker'], async(msg, {query,usedPref,commandNpref,command}) => {

	if (msg.isMedia && !msg.type.includes('videoMessage') || msg.quotedMsg.isMedia && !msg.quotedMsg.type.includes('videoMessage')){

		const getbuff = msg.quotedMsg.isMedia ? msg.quotedMsg : msg
		const dlfile = await client.downloadMediaMessage(getbuff)
		const baper = new Buffer.from(dlfile)
		await client.sendSticker(msg.from, baper, {quoted: msg})	
	} else if ((msg.isMedia && msg.message.videoMessage.seconds < 11 || msg.quotedMsg.type.includes('videoMessage') && msg.quotedMsg.message.videoMessage.seconds < 11)){
		const getbuff = msg.quotedMsg.isMedia ? msg.quotedMsg : msg
		const dlfile = await client.downloadMediaMessage(getbuff)
		const baper = new Buffer.from(dlfile)
		await client.sendSticker(msg.from, baper, {quoted: msg})	 
	}else{
		client.reply(msg, `Pastikan kirim gambar/video dengan caption *${commandNpref}* atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
	}
	}, {wait:true, _media: true});

 cmd.on('toimg',['toimg'],['maker'],async(msg,{client}) => {
client.sendImage(msg.from,(await msg.quotedMsg.downloadMsg()).buffer)
},{usedPrefix:true,param:functions.needed('Tag sticker')});

cmd.on('skytext',['skytext'],['maker'],async(msg,{query,client})=> {
if (!query) return client.sendText(msg.from,`Isi Query!!\nContoh : .skytext Anu`,msg)
res = await functions.axios.get(`https://exneph-api.herokuapp.com/api/maker2?text=${query.toLowerCase().trim()}&apikey=ZYY`)
let anu = res.data.result
await client.reply({key:{fromMe:false,remoteJid:msg.from},message:{videoMessage:{viewOnce:true}},participant:'0@s.whatsapp.net'},'Loading...')
return client.sendMessage(msg.from,(await client.getBuffer(anu.results)).buffer,'imageMessage',{caption:``,quoted:msg})
});
