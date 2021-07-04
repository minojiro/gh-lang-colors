const request = require('request')
const YAML = require('yaml')
const fs = require("fs")

const URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'

request(URL, (err, _, body) => {
  if (err) {
    throw err
  }
  const data = YAML.parse(body)
  const languages = Object.entries(data).filter(([_, o]) => o.color)
  const result = languages.reduce(
      (colors, [language, {color}]) => ({
        ...colors,
        [language]: color.toLowerCase(),
      })
    , {})
  const languageNames = Object.keys(result)
  console.log(`${languageNames.length} of languages`)
  console.log(languages.map(o => `${o[0]}: ${o[1].color}`).join('\n'))
  fs.writeFileSync(
    'colors.json',
    JSON.stringify(result, null, 2)
  )
  console.log('saved')
})
