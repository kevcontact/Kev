/* Work index — long text list; hovering a line reveals a muted preview. → window */
function WorkIndex({ filter, onOpen }) {
  const all = window.KEV_DATA.projects;
  const items = (filter && filter !== 'all')
    ? all.filter((p) => p.kind === filter)
    : all;
  const [hover, setHover] = useState(-1);
  const title = (filter && filter !== 'all') ? filter : 'Overview';
  const active = hover >= 0 ? items[hover] : null;

  return (
    <section className="kev-work">
      <div className="kev-work__head">
        <h1 className="kev-work__title">{title}</h1>
        <span className="kev-counter">{String(items.length).padStart(2, '0')} projects</span>
      </div>

      <div className="kev-work__body">
        <ol className="kev-work__list" onMouseLeave={() => setHover(-1)}>
          {items.map((p, i) => (
            <li key={p.id}>
              <button
                className="kev-work__row"
                onMouseEnter={() => setHover(i)}
                onClick={() => onOpen(p.id)}
              >
                <span className="kev-work__name">{p.title}</span>
                <span className="kev-tag kev-work__tag">{p.client}</span>
                <span className="kev-work__year kev-counter">{p.year}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="kev-work__preview" aria-hidden="true">
          {active && (
            <Frame
              key={active.id}
              tone={active.cover}
              label={active.kind + ' — muted preview'}
              className="fade-in kev-work__panel"
            />
          )}
        </div>
      </div>

      <style>{`
        .kev-work { min-height:100dvh; padding:calc(var(--header-h) + 5vh) var(--pad-x) 8vh; }
        .kev-work__head {
          display:flex; align-items:baseline; justify-content:space-between;
          gap:20px; margin-bottom:clamp(28px,6vh,72px);
        }
        .kev-work__title { font-size:var(--fs-h1); }
        .kev-work__body { display:grid; grid-template-columns:1fr; gap:0; position:relative; }
        .kev-work__list { list-style:none; margin:0; padding:0; }
        .kev-work__row {
          appearance:none; background:none; border:0; width:100%;
          font-family:var(--font); text-align:left;
          display:flex; align-items:baseline; gap:18px;
          padding:clamp(14px,2.4vh,22px) 0;
          border-bottom:1px solid var(--hair);
          transition:opacity .2s var(--ease);
        }
        .kev-work__name {
          font-size:var(--fs-h2); font-weight:var(--w-bold);
          letter-spacing:var(--ls-head); color:var(--ink); line-height:1.05;
        }
        .kev-work__tag { transform:translateY(-2px); }
        .kev-work__year { margin-left:auto; flex:none; }
        .kev-work__list:hover .kev-work__row { opacity:.32; }
        .kev-work__list .kev-work__row:hover { opacity:1; }

        .kev-work__preview { display:none; }
        .kev-work__panel {
          position:fixed; top:50%; right:var(--pad-x); transform:translateY(-50%);
          width:38vw; height:52vh; z-index:1; pointer-events:none;
        }
        .kev-work__panel::before {
          content:""; position:absolute; inset:0; z-index:1;
          animation:kevPan 9s linear infinite alternate;
        }
        @keyframes kevPan { from { transform:scale(1.02); } to { transform:scale(1.09); } }

        /* desktop: show preview, push list to left half */
        @media (min-width: 880px) {
          .kev-work__preview { display:block; }
          .kev-work__list { width:54%; position:relative; z-index:2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kev-work__panel::before { animation:none; }
        }
      `}</style>
    </section>
  );
}
Object.assign(window, { WorkIndex });
