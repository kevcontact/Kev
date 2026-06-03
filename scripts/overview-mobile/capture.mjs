import pw from '/Users/thmeza/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js'
const { chromium } = pw

const OUT = '/Users/thmeza/Developer/Kev/scripts/overview-mobile'
const BASE = 'http://localhost:3000'
const phase = process.argv[2] || 'before' // before | after

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
})

// 1) Darkroom index — /work
await page.goto(`${BASE}/work`, { waitUntil: 'load', timeout: 2000 }).catch(() => {})
await page.waitForTimeout(2000)
await page.screenshot({ path: `${OUT}/${phase}-work-index.png`, fullPage: false })
await page.screenshot({ path: `${OUT}/${phase}-work-index-full.png`, fullPage: true })

// 2) Photography index
await page.goto(`${BASE}/photography`, { waitUntil: 'load', timeout: 2000 }).catch(() => {})
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/${phase}-photography-index.png`, fullPage: false })

// 3) Project Overview — j-balvin → click "Overview"
await page.goto(`${BASE}/work/j-balvin`, { waitUntil: 'load', timeout: 2000 }).catch(() => {})
await page.waitForTimeout(2000)
// scroll the bar into view, then toggle Overview
await page.evaluate(() => {
  document.querySelector('.kev-project__stage')?.scrollIntoView()
})
await page.waitForTimeout(400)
const overviewBtn = page.locator('.kev-project__toggle button', { hasText: 'Overview' })
await overviewBtn.click()
await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/${phase}-project-overview-top.png`, fullPage: false })
// scroll down a bit to see masonry breathing
await page.evaluate(() => window.scrollBy(0, 500))
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/${phase}-project-overview-mid.png`, fullPage: false })

await page.close()
await browser.close()
console.log(`${phase} screenshots done`)
