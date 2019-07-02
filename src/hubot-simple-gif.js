const axios = require('axios');
const apiKey = process.env.GIPHY_API_TOKEN;

/**
 * @param {number[]} spec Specification array that lists the weights. Weight is assigned to the index it's in.
 * @returns {string} A randomly selected (weighted) index from the provided spec array.
 */
function _weightedRand(spec) {
  const r = Math.random();
  let sum = 0;
  let result = '0';
  for (let i in spec) {
    sum += spec[i];
    if (r <= sum) result = i;
  }
  return result;
}

/**
 * @param {string[]} gifs List of gif results.
 * @returns {string} The message that should be sent to the channel (either "no results" or the gif's URL).
 */
function _processGifList(gifs) {
  if (gifs.length) {
    const weights = [0.5, 0.25, 0.12, 0.12, 0.01].slice(0, gifs.length);
    const rand = _weightedRand(weights);
    return gifs[rand].url;
  } else {
    return 'sorry, no results :(';
  }
}

/**
 * @param {string} query The giphy search string to query the service by.
 * @returns {Promise<string>} A Promise resolving to a string that should be sent to the channel.
 */
async function getGif(query) {
  await axios
    .get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`)
    .then(gifList => gifList.data.data)
    .then(_processGifList);
}

module.exports = { getGif, _processGifList, _weightedRand };
