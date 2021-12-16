// 讀取 .env 檔
import 'dotenv/config'
// 引用 line 套件
import linebot from 'linebot'
// 北、中、南 隨機咖啡店
import city from './commends/city.js'
// 定位距離咖啡店
import place from './commends/place.js'

// https://www.npmjs.com/package/linebot
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'location') {
    place(event)
  } else if (event.message.type === 'text') {
    city(event)
  }
})
