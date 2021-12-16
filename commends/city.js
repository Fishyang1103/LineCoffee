import axios from 'axios'
import flex from '../template/flex.js'

// 評價的星星
const yellowStar = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
const greyStar = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'

export default async (event) => {
  // 深層複製
  const city = JSON.parse(JSON.stringify(flex))
  const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes')
  const cityresult = []
  try {
    while (cityresult.length < 8) {
      // 產生隨機亂數
      const random = Math.floor(Math.random() * data.length)
      // 如果城市是台北
      if (event.message.text === 'taipei') {
        // 如果陣列裡面包含隨機數 或 隨機數的結果等於台北就略過
        if (cityresult.includes(random) || data[random].city !== 'taipei') {
          continue
        } else {
          cityresult.push(random)
        }
      } else if (event.message.text === 'taichung') {
        if (cityresult.includes(random) || data[random].city !== 'taichung') {
          // 就略過
          continue
        } else {
          cityresult.push(random)
        }
      } else if (event.message.text === 'tainan') {
        if (cityresult.includes(random) || data[random].city !== 'tainan') {
          // 就略過
          continue
        } else {
          cityresult.push(random)
        }
      }
      city.contents.contents.push({
        type: 'bubble',
        size: 'micro',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: data[random].name,
              weight: 'bold',
              size: 'lg',
              wrap: true,
              style: 'italic'
            },
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'icon',
                  size: 'xs',
                  url: data[random].tasty >= 1 ? yellowStar : greyStar
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: data[random].tasty >= 2 ? yellowStar : greyStar
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: data[random].tasty >= 3 ? yellowStar : greyStar
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: data[random].tasty >= 4 ? yellowStar : greyStar
                },
                {
                  type: 'icon',
                  size: 'xs',
                  url: data[random].tasty >= 5 ? yellowStar : greyStar
                },
                {
                  type: 'text',
                  text: data[random].tasty + '' || 'xx',
                  size: 'xs',
                  color: '#8c8c8c',
                  margin: 'md',
                  flex: 0
                }
              ]
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'text',
                      text: '📍 地址',
                      wrap: true,
                      color: '#336666',
                      size: 'sm',
                      weight: 'bold'
                    },
                    {
                      type: 'text',
                      text: data[random].address,
                      size: 'xs',
                      color: '#666666',
                      wrap: true
                    }
                  ]
                },
                // {
                //   type: 'box',
                //   layout: 'vertical',
                //   contents: [
                //     {
                //       type: 'text',
                //       text: '💈 營業時間',
                //       size: 'sm',
                //       color: '#336666',
                //       weight: 'bold',
                //       offsetTop: 'sm'
                //     },
                //     {
                //       type: 'text',
                //       text: data[random].open_time || '尚未提供，請看官網',
                //       size: 'xs',
                //       offsetTop: 'xs',
                //       margin: 'sm'
                //     }
                //   ]
                // },
                // {
                //   type: 'box',
                //   layout: 'vertical',
                //   contents: [
                //     {
                //       type: 'text',
                //       text: '插座',
                //       wrap: false,
                //       contents: [
                //         {
                //           type: 'span',
                //           text: '插座',
                //           size: 'sm',
                //           color: '#336666',
                //           weight: 'bold'
                //         },
                //         {
                //           type: 'span',
                //           text: data[random].socket,
                //           size: 'xs'
                //         }
                //       ]
                //     },
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: 'Website',
                    uri: data[random].url || encodeURI('https://www.google.com/maps/search/?api=1&query=' + data[random].name)
                  },
                  margin: 'sm',
                  height: 'sm'
                }
                //   ]
                // }
              ]
            }
          ],
          spacing: 'sm',
          paddingAll: '14px'
        }
      })
    }
    // console.log(data[random])
    // console.log(data[random])
    // if (distanceResults.length !== 0) {
    //   event.reply(flex)
    // } else {
    //   event.reply('附近沒有 可惜')
    // }
    console.log(data)
    event.reply(city)
  } catch (error) {
    event.reply('錯誤')
  }
}
