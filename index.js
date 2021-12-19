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
    } else { (city(event)) }
  } else if (event.message.type === 'location') {
    place(event)
  }
})
