import distance from '../template/distance.js'
import axios from 'axios'
import flex from '../template/flex.js'

// 評價的星星
const yellowStar = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
const greyStar = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'

export default async (event) => {
  try {
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes')
    const myLatitude = event.message.latitude
    const myLongitude = event.message.longitude
    const distanceResults = []

    for (let i = 0; i < data.length; i++) {
      if (distance(myLatitude, myLongitude, data[i].latitude, data[i].longitude, 'K') < 5) {
        // 用 switch 判斷插座，修改資料文字
        // 如果API資料為空的，就顯示 -
        let socket = ' -'
        // API 資料顯示 yes 就改成 有
        switch (data[i].socket) {
          case 'yes':
            socket = ' 有'
            break
          case 'no':
            socket = ' 無'
            break
          case 'maybe':
            socket = ' 可能有'
            break
        }

        distanceResults.push({
          Name: data[i].name,
          tasty: data[i].tasty || '未有評價',
          index: i,
          address: data[i].address,
          open_time: data[i].open_time || '尚未提供，請看官網',
          socket,
          url: data[i].url || encodeURI('https://www.google.com/maps/search/?api=1&query=' + data[i].name)
        })
        // distanceResults.sort((b, a) => { return b.distance - a.distance })
        distanceResults.sort((a, b) => a.distance - b.distance)
        if (distanceResults.length >= 5) {
          break
        }
      }
    }

    if (distanceResults.length !== 0) {
      for (let i = 0; i < distanceResults.length; i++) {
        flex.contents.contents.push({
          type: 'bubble',
          size: 'micro',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: distanceResults[i].Name,
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
                    url: distanceResults[i].tasty >= 1 ? yellowStar : greyStar
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: distanceResults[i].tasty >= 2 ? yellowStar : greyStar
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: distanceResults[i].tasty >= 3 ? yellowStar : greyStar
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: distanceResults[i].tasty >= 4 ? yellowStar : greyStar
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: distanceResults[i].tasty >= 5 ? yellowStar : greyStar
                  },
                  {
                    type: 'text',
                    text: distanceResults[i].tasty + '',
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
                        text: distanceResults[i].address,
                        size: 'xs',
                        color: '#666666',
                        wrap: true
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '💈 營業時間',
                        size: 'sm',
                        color: '#336666',
                        weight: 'bold',
                        offsetTop: 'sm'
                      },
                      {
                        type: 'text',
                        text: distanceResults[i].open_time,
                        size: 'xs',
                        offsetTop: 'xs',
                        margin: 'sm'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '插座',
                        wrap: false,
                        contents: [
                          {
                            type: 'span',
                            text: '🔌  插座',
                            size: 'sm',
                            color: '#336666',
                            weight: 'bold'
                          },
                          {
                            type: 'span',
                            text: distanceResults[i].socket,
                            size: 'xs'
                          }
                        ]
                      },
                      {
                        type: 'button',
                        action: {
                          type: 'uri',
                          label: 'Website',
                          uri: distanceResults[i].url
                        },
                        margin: 'md',
                        height: 'sm'
                      }
                    ]
                  }
                ]
              }
            ],
            spacing: 'sm',
            paddingAll: '14px'
          }
        })
      }
      console.log(distanceResults)
      event.reply(flex)
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
