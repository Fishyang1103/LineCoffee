// 讀取 .env 檔
import 'dotenv/config'
// 引用 line 套件
import linebot from 'linebot'
// 北、中、南 隨機八家咖啡廳
import city from './commends/city.js'
// 距離最近的五家咖啡廳
import place from './commends/place.js'
// 傳送定位的按鈕
import location from './template/location.js'

// https://www.npmjs.com/package/linebot
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

// 訊息事件
bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text === '咖啡廳') {
      location(event)
    } else if (event.message.text === '使用說明') {
      event.reply('Hello🖖 \n歡迎使用此機器人服務\r\r以下為您提供兩種功能：\n◎傳送位置：尋找附近的咖啡廳打發時間，提供距離最近的五家咖啡廳（五公里內）🤗 \r\r◎下方三個問號：\n提供\n➤ 雙北\n➤ 臺中\n➤ 臺南\n這三地區的“隨機咖啡廳”\n很多時候沒有目標的前往\n反而有意想不到的驚喜唷🌟')
    } else { (city(event)) }
  } else if (event.message.type === 'location') {
    place(event)
  }
})
