/* Video — vertical list of 16:9 players, text-only controls. → window */
function fmt(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function Player({ project, duration }) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [t, setT] = useState(Math.random() * 30);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((x) => (x + 0.25) % duration), 250);
    return () => clearInterval(id);
  }, [playing, duration]);

  const pct = (t / duration) * 100;

  return (
    <article className="kev-player">
      <Frame tone={project.cover} dark className="kev-player__screen" style={{ aspectRatio: '16 / 9' }}>
        <button
          className="kev-player__hit"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
        ></button>
      </Frame>

      <div className="kev-player__bar">
        <button className="kev-player__ctl" onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
        <button className="kev-player__ctl" onClick={() => setMuted((m) => !m)}>{muted ? 'Unmute' : 'Mute'}</button>
        <div className="kev-player__prog"><span style={{ width: pct + '%' }}></span></div>
        <span className="kev-player__tc">{fmt(t)} / {fmt(duration)}</span>
      </div>

      <div className="kev-player__meta">
        <h2 className="kev-player__title">{project.title}</h2>
        <span className="kev-sub">{project.client}</span>
      </div>
    </article>
  );
}

function Video() {
  const vids = window.KEV_DATA.projects.filter((p) => p.kind === 'Video' || p.kind === 'Brand');
  const durs = [198, 232, 164, 210];
  return (
    <section className="kev-videos">
      <div className="kev-videos__head">
        <h1 className="kev-videos__title">Video</h1>
        <span className="kev-counter">{String(vids.length).padStart(2, '0')} films</span>
      </div>
      <div className="kev-videos__list">
        {vids.map((p, i) => <Player key={p.id} project={p} duration={durs[i % durs.length]} />)}
      </div>

      <style>{`
        .kev-videos { min-height:100dvh; padding:calc(var(--header-h) + 5vh) var(--pad-x) 10vh; }
        .kev-videos__head {
          display:flex; align-items:baseline; justify-content:space-between; gap:20px;
          margin-bottom:clamp(28px,6vh,64px);
        }
        .kev-videos__title { font-size:var(--fs-h1); }
        .kev-videos__list { display:flex; flex-direction:column; gap:clamp(56px,11vh,128px); }

        .kev-player__screen { width:100%; }
        .kev-player__hit { position:absolute; inset:0; appearance:none; background:none; border:0; width:100%; height:100%; z-index:3; }
        .kev-player__bar {
          display:flex; align-items:center; gap:clamp(14px,2.2vw,28px);
          padding:14px 0 4px;
        }
        .kev-player__ctl {
          appearance:none; background:none; border:0; padding:0; flex:none;
          font-family:var(--font); font-size:var(--fs-label); font-weight:var(--w-medium);
          letter-spacing:var(--ls-label); color:var(--ink); transition:opacity .18s var(--ease);
        }
        .kev-player__ctl:hover { opacity:.5; }
        .kev-player__prog { flex:1; height:2px; background:var(--hair); position:relative; }
        .kev-player__prog span { position:absolute; left:0; top:0; bottom:0; background:var(--ink); }
        .kev-player__tc { flex:none; font-size:var(--fs-counter); color:var(--fg2); font-variant-numeric:tabular-nums; letter-spacing:.02em; }
        .kev-player__meta { margin-top:10px; display:flex; flex-direction:column; gap:4px; }
        .kev-player__title { font-size:var(--fs-h3); font-weight:var(--w-bold); letter-spacing:var(--ls-head); }
      `}</style>
    </section>
  );
}
Object.assign(window, { Video });
