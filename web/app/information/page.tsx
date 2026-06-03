import type { Metadata } from 'next'
import { info } from '@/lib/data'

export const metadata: Metadata = { title: 'Information — KEV' }

/** Information — terse bio, clients, services, contact. */
export default function InformationPage() {
  return (
    <section className="kev-info">
      <h1 className="kev-info__lead rise-in">{info.bio}</h1>

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
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Contact</span>
          <ul className="kev-info__list">
            {info.contact.map((c) => (
              <li key={c.label}>
                <span className="kev-info__ck">{c.label}</span>
                {c.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
