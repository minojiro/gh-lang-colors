const request = require('request')
const YAML = require('yaml')
const fs = require("fs")

const URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'

request(URL, (err, _, body) => {
  if (err) {
    throw err
  }
  const data = YAML.parse(body)
  const result = Object
    .entries(data)
    .filter(([_, o]) => o.color)
    .reduce(
      (colors, [language, {color}]) => ({
        ...colors,
        [language]: color.toLowerCase(),
      })
    , {})
  fs.writeFileSync(
    'colors.json',
    JSON.stringify(result, null, 2)
  )
  console.log('done')
})
