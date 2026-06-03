/* Home — the bare editorial menu. Four bold words on white. → window */
function Home({ onPick }) {
  return (
    <section className="kev-home">
      <div className="kev-home__top kev-caps rise-in">Photographer &amp; Director</div>
      <div className="kev-home__menu rise-in">
        <MenuList onPick={onPick} />
      </div>
      <div className="kev-home__foot kev-counter">Medellín · Miami · CDMX — 2026</div>

      <style>{`
        .kev-home {
          min-height:100dvh; padding:calc(var(--header-h) + 6vh) var(--pad-x) 6vh;
          display:flex; flex-direction:column; justify-content:flex-end;
          gap:6vh;
        }
        .kev-home__top { color:var(--fg2); }
        .kev-home__menu { margin-top:auto; }
        .kev-home__foot { color:var(--fg3); }
        .kev-home .rise-in:nth-child(2) { transition-delay:.08s; }
      `}</style>
    </section>
  );
}
Object.assign(window, { Home });
