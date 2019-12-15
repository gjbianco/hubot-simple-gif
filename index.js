/*
 * Description:
 *   A very basic giphy script. Provides one command to search for a gif.
 *
 * Configuration:
 *  GIPHY_API_TOKEN
 *
 * Commands:
 *   !gif <query> - Searches giphy for <query> and returns a gif in the top 5 results.
 *
 * Notes:
 *   Gifs are randomly selected from within the top 5 results with the following weights:
 *     #1 - 50%
 *     #2 - 25%
 *     #3 - 12%
 *     #4 - 12%
 *     #5 - 1%
 *
 * Author:
 *   gjbianco
 */
const getGif = require('./src/hubot-simple-gif').getGif;
module.exports = robot => {
  robot.hear(/^!gif (.*)$/i, res => {
    const query = escape(res.match[1]);
    getGif(query)
      .then(response => res.send(response))
      .catch(err => {
        console.error(`got an error processing query "${query}": ${err}`);
        res.send('error occurred trying to giphy D:');
      });
  });
};
