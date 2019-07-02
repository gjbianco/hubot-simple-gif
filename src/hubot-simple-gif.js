const axios = require('axios');
const apiKey = process.env.GIPHY_API_TOKEN;

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
    const query = escape(res.match[1]);
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`)
      .then((result) => {
        const gifs = result.data.data;
        let toSend = 'sorry, no results :(';
        if (gifs.length) {
          const weights = [0.5, 0.25, 0.12, 0.12, 0.01].slice(0, gifs.length);
          const rand = weightedRand(weights);
          toSend = gifs[rand];
        }
        return res.send(toSend);
      })
  })

}
