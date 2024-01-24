import fs from "fs/promises"

const moduleDir = '.'
const stylesheets = [
  `${moduleDir}/kds/kds-reset.css`,
  `${moduleDir}/kds/themes/default-theme/light.css`,
  `${moduleDir}/kds/style-grid/color-palettes.css`,
  `${moduleDir}/kds/style-grid/color-interactive.css`,
  `${moduleDir}/kds/style-grid/color-non-interactive.css`,
  `${moduleDir}/kds-styles.css`,
  `${moduleDir}/kds/kds-utils.css`,
]

let concatenatedStyles = ''

await Promise.all(
  stylesheets.map(async (stylesheet) => {
    const file = await fs.readFile(stylesheet, 'utf8')
    concatenatedStyles += file
  })
)

await fs.writeFile("./src/styles/kds.css", concatenatedStyles)