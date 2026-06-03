/* Project — switchable Gallery / Overview views + next-project link. → window */
function aspectFor(i) {
  // editorial variety: portrait-leaning rotation
  const ar = ['3 / 4', '3 / 2', '1 / 1', '4 / 5', '16 / 9', '4 / 5'];
  return ar[i % ar.length];
}

function GalleryView({ project, onCount }) {
  const refs = useRef([]);
  useEffect(() => {
    let raf = null;
    const calc = () => {
      raf = null;
      const mid = window.innerHeight / 2;
      let best = 0, bestD = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      onCount(best + 1);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [project.id]);

  return (
    <div className="kev-gallery">
      {project.frames.map((tone, i) => (
        <div className="kev-gallery__slot" key={i} ref={(el) => (refs.current[i] = el)}>
          <Frame tone={tone} style={{ aspectRatio: aspectFor(i) }} className="kev-gallery__img" />
        </div>
      ))}
      <style>{`
        .kev-gallery { padding-top:4vh; }
        .kev-gallery__slot {
          min-height:88vh; display:flex; align-items:center; justify-content:center;
          padding:2vh 0;
        }
        .kev-gallery__img {
          max-height:80vh; max-width:min(92vw, 1100px); width:auto; height:80vh;
        }
      `}</style>
    </div>
  );
}

function OverviewView({ project }) {
  return (
    <div className="kev-overview-grid">
      {project.frames.map((tone, i) => (
        <div className="kev-overview-grid__cell" key={i}>
          <Frame tone={tone} style={{ aspectRatio: aspectFor(i + 2) }}>
            {i % 3 === 0 && <span className="kev-tag kev-tag--solid kev-overview-grid__tag">{project.client}</span>}
          </Frame>
        </div>
      ))}
      <style>{`
        .kev-overview-grid {
          columns: 4; column-gap: clamp(8px, 1.4vw, 18px);
          padding-top: 2vh;
        }
        .kev-overview-grid__cell { break-inside: avoid; margin-bottom: clamp(8px,1.4vw,18px); }
        .kev-overview-grid__cell .frame { width:100%; }
        .kev-overview-grid__tag { position:absolute; top:10px; left:10px; z-index:3; }
        @media (max-width: 1100px) { .kev-overview-grid { columns: 3; } }
        @media (max-width: 760px)  { .kev-overview-grid { columns: 2; } }
        @media (max-width: 460px)  { .kev-overview-grid { columns: 1; } }
      `}</style>
    </div>
  );
}

function Project({ projectId, onOpen }) {
  const projects = window.KEV_DATA.projects;
  const idx = projects.findIndex((p) => p.id === projectId);
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const [view, setView] = useState('gallery');
  const [count, setCount] = useState(1);

  useEffect(() => { setView('gallery'); setCount(1); window.scrollTo(0, 0); }, [projectId]);

  return (
    <section className="kev-project">
      <div className="kev-project__bar">
        <div className="kev-project__id">
          <h1 className="kev-project__title">{project.title}</h1>
          <span className="kev-sub">{project.client} · {project.year}</span>
        </div>
        <div className="kev-project__toggle" role="tablist">
          <button className={'kev-seg' + (view === 'gallery' ? ' is-on' : '')} onClick={() => setView('gallery')}>Gallery</button>
          <button className={'kev-seg' + (view === 'overview' ? ' is-on' : '')} onClick={() => setView('overview')}>Overview</button>
        </div>
      </div>

      <div className="kev-project__stage">
        {view === 'gallery'
          ? <GalleryView project={project} onCount={setCount} />
          : <OverviewView project={project} />}
      </div>

      {view === 'gallery' && (
        <div className="kev-project__counter kev-counter">
          {String(count).padStart(2, '0')} / {String(project.frames.length).padStart(2, '0')}
        </div>
      )}

      <div className="kev-next">
        <span className="kev-caps kev-next__lead">Next project</span>
        <button className="kev-next__link" onClick={() => onOpen(next.id)}>
          View <span className="kev-next__arrow">→</span> {next.title}
        </button>
        <span className="kev-sub kev-next__client">{next.client} · {next.year}</span>
      </div>

      <style>{`
        .kev-project { padding:0 var(--pad-x); }
        .kev-project__bar {
          position:sticky; top:var(--header-h); z-index:120; background:var(--paper);
          display:flex; align-items:flex-end; justify-content:space-between; gap:20px;
          padding:18px 0 14px; border-bottom:1px solid var(--hair);
        }
        .kev-project__title { font-size:var(--fs-h2); }
        .kev-project__id { display:flex; flex-direction:column; gap:5px; }
        .kev-project__toggle { display:flex; flex:none; }
        .kev-seg {
          appearance:none; background:none; border:0; border-bottom:2px solid transparent;
          font-family:var(--font); font-size:var(--fs-label); font-weight:var(--w-semibold);
          color:var(--fg3); padding:8px 14px 9px; transition:color .18s var(--ease);
        }
        .kev-seg.is-on { color:var(--ink); border-bottom-color:var(--ink); }
        .kev-seg:hover { color:var(--ink); }

        .kev-project__counter {
          position:fixed; left:var(--pad-x); bottom:26px; z-index:120;
          background:var(--paper); padding:6px 10px 6px 0;
        }

        .kev-next {
          border-top:1px solid var(--hair); margin-top:6vh;
          padding:clamp(48px,12vh,140px) 0; display:flex; flex-direction:column; gap:14px;
        }
        .kev-next__lead { color:var(--fg2); }
        .kev-next__link {
          appearance:none; background:none; border:0; padding:0; text-align:left;
          font-family:var(--font); font-size:var(--fs-display); font-weight:var(--w-heavy);
          letter-spacing:var(--ls-display); color:var(--ink); line-height:1.04;
          transition:color .2s var(--ease);
        }
        .kev-next__link:hover { color:var(--accent); }
        .kev-next__arrow { display:inline-block; transition:transform .25s var(--ease); }
        .kev-next__link:hover .kev-next__arrow { transform:translateX(10px); }
        .kev-next__client { color:var(--fg2); }

        @media (max-width: 640px) {
          .kev-project__bar { flex-direction:column; align-items:flex-start; gap:12px; }
        }
      `}</style>
    </section>
  );
}
Object.assign(window, { Project });
