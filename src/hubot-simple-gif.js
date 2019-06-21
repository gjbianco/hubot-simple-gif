var axios = require('axios')
var apiKey = process.env.GIPHY_API_TOKEN

function weightedRand(spec) {
  const r = Math.random();
  let sum = 0;
  for (let i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

module.exports = (robot) => {

  robot.hear(/^!gif (.*)$/i, (res) => {
    axios.get('http://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + res.match[1])
      .then((result) => {
        const gifList = result.data.data
        const rand = weightedRand([0.5, 0.25, 0.12, 0.12, 0.01]);
        const randGif = gifList[rand]

        if (randGif) {
          res.send(randGif.url)
        } else {
          res.send('sorry, no results :(')
        }
      })
  })

}
