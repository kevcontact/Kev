import pw from '/Users/thmeza/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js'
const { chromium } = pw

const OUT = '/Users/thmeza/Developer/Kev/scripts/rail-shots'
const BASE = 'http://localhost:3000'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch()
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
  await page.goto(`${BASE}/work/j-balvin`, { waitUntil: 'load' })
  await page.waitForTimeout(2500)

  // bajar al rail (como hace el toggle Gallery)
  await page.evaluate(() => {
    document.querySelector('.kev-project__stage')?.scrollIntoView()
  })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/${vp.name}-rail-slide1.png` })

  // deslizar 3 slides a la derecha — el contador debe marcar 04
  await page.evaluate(() => {
    const t = document.querySelector('.kev-gallery--rail')
    if (t) t.scrollTo({ left: t.clientWidth * 3 })
  })
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}/${vp.name}-rail-slide4.png` })

  // ir al final — slide "View → next"
  await page.evaluate(() => {
    const t = document.querySelector('.kev-gallery--rail')
    if (t) t.scrollTo({ left: t.scrollWidth })
  })
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}/${vp.name}-rail-end.png` })

  const counter = await page.textContent('.kev-project__counter .kev-counter')
  console.log(`${vp.name}: contador al final = "${counter?.trim()}"`)
  await page.close()
}
await browser.close()
console.log('done')
