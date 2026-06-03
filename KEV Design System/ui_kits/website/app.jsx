/* App — routes between screens, persistent header + cursor. */
const { useState: useS, useEffect: useE } = React;

function App() {
  const [route, setRoute] = useS({ screen: 'home', filter: 'all', projectId: null });
  const [menuOpen, setMenuOpen] = useS(false);
  const [ready, setReady] = useS(false);

  useE(() => { const t = setTimeout(() => setReady(true), 40); return () => clearTimeout(t); }, []);
  useE(() => { window.scrollTo(0, 0); }, [route]);

  const pick = (m) => setRoute({ screen: m.screen, filter: m.filter, projectId: null });
  const goHome = () => { setMenuOpen(false); setRoute({ screen: 'home', filter: 'all', projectId: null }); };
  const openProject = (id) => { setMenuOpen(false); setRoute({ screen: 'project', projectId: id }); };

  // which menu word is "current" for the overlay highlight
  const current = route.screen === 'work'
    ? (route.filter === 'Photography' ? 'Photography' : 'Overview')
    : route.screen === 'video' ? 'Video'
    : route.screen === 'info' ? 'Information' : null;

  let screen;
  if (route.screen === 'home') screen = <Home onPick={pick} />;
  else if (route.screen === 'work') screen = <WorkIndex filter={route.filter} onOpen={openProject} />;
  else if (route.screen === 'project') screen = <Project projectId={route.projectId} onOpen={openProject} />;
  else if (route.screen === 'video') screen = <Video />;
  else if (route.screen === 'info') screen = <Information />;

  return (
    <div className={'kev-app' + (ready ? ' is-ready' : '')}>
      <Cursor />
      <Header
        onPick={pick}
        onHome={goHome}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        current={current}
      />
      <main key={route.screen + (route.projectId || '') + (route.filter || '')}>
        {screen}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
