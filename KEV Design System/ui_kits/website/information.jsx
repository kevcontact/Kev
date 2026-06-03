/* Information — terse bio, clients, services, contact. → window */
function Information() {
  const { bio, clients, services, contact } = window.KEV_DATA.info;
  return (
    <section className="kev-info">
      <h1 className="kev-info__lead rise-in">{bio}</h1>

      <div className="kev-info__cols">
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Clients</span>
          <ul className="kev-info__list">
            {clients.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Services</span>
          <ul className="kev-info__list">
            {services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div className="kev-info__col">
          <span className="kev-caps kev-info__h">Contact</span>
          <ul className="kev-info__list">
            {contact.map((c) => (
              <li key={c.label}><span className="kev-info__ck">{c.label}</span>{c.value}</li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .kev-info { min-height:100dvh; padding:calc(var(--header-h) + 8vh) var(--pad-x) 12vh; }
        .kev-info__lead {
          font-size:var(--fs-h1); font-weight:var(--w-bold); letter-spacing:var(--ls-head);
          line-height:1.18; max-width:20ch; margin:0 0 clamp(48px,12vh,128px);
        }
        .kev-info__cols {
          display:grid; grid-template-columns:repeat(3, 1fr); gap:clamp(28px,5vw,80px);
        }
        .kev-info__h { display:block; color:var(--fg2); margin-bottom:18px; }
        .kev-info__list { list-style:none; margin:0; padding:0; }
        .kev-info__list li {
          font-size:var(--fs-h3); font-weight:var(--w-medium); letter-spacing:-.01em;
          padding:7px 0; border-bottom:1px solid var(--hair);
          display:flex; gap:14px; align-items:baseline;
        }
        .kev-info__ck { font-size:var(--fs-label); color:var(--fg2); font-weight:var(--w-regular); min-width:104px; }
        @media (max-width: 720px) { .kev-info__cols { grid-template-columns:1fr; gap:40px; } }
      `}</style>
    </section>
  );
}
Object.assign(window, { Information });
