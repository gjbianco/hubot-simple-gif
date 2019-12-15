# Simple GIF

[![npm version](https://badge.fury.io/js/hubot-simple-gif.svg)](https://badge.fury.io/js/hubot-simple-gif) [![Codeship Status for gjbianco/hubot-simple-gif](https://app.codeship.com/projects/ee6fd190-7f24-0137-eb96-1ec00ef98275/status?branch=master)](https://app.codeship.com/projects/351834)

A very basic giphy Hubot script. Provides one command to search for a gif.

## Configuration

Environment variables:

- GIPHY_API_TOKEN

## Commands

`!gif <query>`

Searches giphy for <query> and returns a gif in the top 5 results.

Gifs are randomly selected from within the top 5 results with the following weights:

1. 50%
2. 25%
3. 12%
4. 12%
5. 1%
