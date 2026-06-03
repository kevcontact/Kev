import pw from '/Users/thmeza/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js'
const { chromium } = pw

const OUT = '/Users/thmeza/Developer/Kev/.worktrees/redesign/design-refs/proposals/shots-menu'
const BASE = 'http://localhost:3001'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })

  // 1. Home cerrado — el menú NO debe verse
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}/${vp.name}-home-closed.png` })

  // 2. Click en Menu — panel desliza de izquierda a derecha
  await page.click('button.kev-header__menu')
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${vp.name}-home-menu-open.png` })

  // 3. Photography — darkroom index (sin hover)
  await page.goto(`${BASE}/photography`, { waitUntil: 'load' })
  await page.waitForTimeout(1800)
  await page.screenshot({ path: `${OUT}/${vp.name}-photography-dark.png` })

  // 4. Overview con hover en la primera fila (desktop) — cover inunda el fondo
  await page.goto(`${BASE}/work`, { waitUntil: 'load' })
  await page.waitForTimeout(1800)
  if (vp.name === 'desktop') {
    await page.hover('.kev-work__row >> nth=0')
    await page.waitForTimeout(1200)
  }
  await page.screenshot({ path: `${OUT}/${vp.name}-work-dark${vp.name === 'desktop' ? '-hover' : ''}.png` })

  // 5. Work con menú abierto — scrim sobre el darkroom
  await page.click('button.kev-header__menu')
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${vp.name}-work-menu-open.png` })

  await page.close()
}
await browser.close()
console.log('done')
