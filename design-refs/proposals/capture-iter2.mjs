import pw from '/Users/thmeza/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.js'
const { chromium } = pw

const OUT = '/Users/thmeza/Developer/Kev/.worktrees/redesign/design-refs/proposals/shots-iter2'
const BASE = 'http://localhost:3001'

const routes = [
  { path: '/', name: 'home' },
  { path: '/photography', name: 'photography' },
  { path: '/work', name: 'work' },
  { path: '/work/j-balvin', name: 'work-j-balvin' },
  { path: '/work/en-otra-vida', name: 'work-en-otra-vida' },
  { path: '/video', name: 'video' },
  { path: '/information', name: 'information' },
]

const viewports = [
  { tag: 'mobile', width: 390, height: 844 },
  { tag: 'desktop', width: 1440, height: 900 },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch()
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  })
  const page = await ctx.newPage()
  for (const r of routes) {
    const url = BASE + r.path
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    } catch (e) {
      try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }) } catch (e2) {}
    }
    // let media/video posters load and motion settle
    await sleep(3200)
    const file = `${OUT}/${vp.tag}-${r.name}.png`
    await page.screenshot({ path: file, fullPage: true })
    console.log('saved', file)
    // also capture a viewport (above-the-fold) shot for hero composition checks
    const vfile = `${OUT}/${vp.tag}-${r.name}-fold.png`
    await page.screenshot({ path: vfile, fullPage: false })
  }
  await ctx.close()
}
await browser.close()
console.log('DONE')
