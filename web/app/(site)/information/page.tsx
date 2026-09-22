import type { Metadata } from 'next'
import { getSettings } from '@/lib/content/repository'

export const metadata: Metadata = { title: 'Information — KEV' }

/** Information — terse bio (fine weight), clients, services, contact; scattered K·E·V. */
export default async function InformationPage() {
  const info = await getSettings()
  // SYNTHESIS §2 bans em dashes in copy: se normalizan al renderizar, sin tocar el dato.
  const bio = info.bio.replace(/\s+—\s+/g, ' · ')

  return (
    <section className="kev-info">
      <div className="kev-scatter" aria-hidden="true">
        <span className="k">K</span>
        <span className="e">E</span>
        <span className="v">V</span>
      </div>

      <h1 className="kev-info__lead rise-in">{bio}</h1>

      <div className="kev-info__cols">
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Clients</span>
          <ul className="kev-info__list">
            {info.clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Services</span>
          <ul className="kev-info__list">
            {info.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        {info.contact.length > 0 && (
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Contact</span>
          <ul className="kev-info__list">
            {info.contact.map((c) => {
              const external = c.href.startsWith('http')
              return (
                <li key={c.label}>
                  <span className="kev-info__ck">{c.label}</span>
                  <a
                    className="kev-info__link"
                    href={c.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                  >
                    {c.value}
                    {external && (
                      <span className="kev-info__ext" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        )}
      </div>

      <span className="kev-paren kev-counter kev-info__sign">
        Available for commissions, 2026
      </span>
    </section>
  )
}
