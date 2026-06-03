/* Persistent header (wordmark · film-strip ruler · Menu) + the menu overlay. → window */
const KEV_MENU = [
  { label: 'Photography', screen: 'work', filter: 'Photography' },
  { label: 'Overview',    screen: 'work', filter: 'all' },
  { label: 'Video',       screen: 'video', filter: null },
  { label: 'Information', screen: 'info',  filter: null }
];

function MenuList({ onPick, current }) {
  return (
    <nav className="kev-menulist">
      {KEV_MENU.map((m) => (
        <button
          key={m.label}
          className={'kev-menulist__item' + (current === m.label ? ' is-current' : '')}
          onClick={() => onPick(m)}
        >
          {m.label}
        </button>
      ))}
      <style>{`
        .kev-menulist { display:flex; flex-direction:column; align-items:flex-start; }
        .kev-menulist__item {
          appearance:none; background:none; border:0; padding:0; margin:0;
          font-family:var(--font); color:var(--ink);
          font-size:var(--fs-mega); font-weight:var(--w-heavy);
          line-height:1.04; letter-spacing:var(--ls-mega);
          text-align:left; display:block; transition:opacity .22s var(--ease);
        }
        .kev-menulist:hover .kev-menulist__item { opacity:.28; }
        .kev-menulist__item:hover { opacity:1 !important; }
        .kev-menulist__item.is-current { opacity:.28; }
      `}</style>
    </nav>
  );
}

function Header({ onPick, onHome, menuOpen, setMenuOpen, current }) {
  return (
    <>
      <header className="kev-header">
        <button className="kev-header__mark" onClick={onHome} aria-label="KEV — home">Kev.</button>
        <span className="kev-ticks" aria-hidden="true"></span>
        <button
          className="kev-header__menu kev-label"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <div className="kev-overlay fade-in" onClick={() => setMenuOpen(false)}>
          <div className="kev-overlay__inner" onClick={(e) => e.stopPropagation()}>
            <MenuList
              current={current}
              onPick={(m) => { setMenuOpen(false); onPick(m); }}
            />
          </div>
        </div>
      )}

      <style>{`
        .kev-header {
          position:fixed; top:0; left:0; right:0; height:var(--header-h);
          display:flex; align-items:center; gap:clamp(14px,3vw,28px);
          padding:0 var(--pad-x);
          background:var(--paper); z-index:200;
        }
        .kev-header__mark {
          appearance:none; background:none; border:0; padding:0;
          font-family:var(--font); color:var(--ink);
          font-weight:var(--w-heavy); font-size:20px; letter-spacing:-.03em; line-height:1;
        }
        .kev-header__menu {
          appearance:none; background:none; border:0; padding:6px 0 6px 6px;
          font-family:var(--font); color:var(--ink); flex:none;
          transition:opacity .18s var(--ease);
        }
        .kev-header__menu:hover { opacity:.5; }
        .kev-overlay {
          position:fixed; inset:0; z-index:150; background:var(--paper);
        }
        .kev-overlay__inner {
          position:absolute; left:var(--pad-x); bottom:clamp(48px,12vh,120px);
          right:var(--pad-x);
        }
      `}</style>
    </>
  );
}

Object.assign(window, { KEV_MENU, MenuList, Header });
