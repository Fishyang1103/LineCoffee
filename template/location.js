export default (event) => {
  event.reply({
    type: 'text',
    text: '點擊下方按鈕',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'location',
            label: '傳送位置'
          }
        }
      ]
    }
  })
}
