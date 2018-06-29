var axios = require('axios')
var apiKey = process.env.GIPHY_API_TOKEN

module.exports = (robot) => {

  robot.hear(/^!gif (.*)$/i, (res) => {
    axios.get('http://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + res.match[1])
      .then((result) => {
        const gifList = result.data.data
        const rand = Math.floor(Math.random() * 100 % 25)
        const randGif = gifList[rand]

        if (randGif) {
          res.send(randGif.url)
        } else {
          res.send('sorry, no results :(')
        }
      })
  })

}
