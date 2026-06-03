/* Shared primitives: media Frame placeholder + custom Cursor. → window */
const { useState, useEffect, useRef } = React;

/* A photograph / video stand-in. Real assets replace the tonal fill. */
function Frame({ tone, dark, label, style, className = '', children }) {
  return (
    <div
      className={'frame ' + (dark ? 'frame--dark ' : '') + className}
      style={{ background: tone || undefined, ...style }}
    >
      {children}
      {label ? <span className="frame__label">{label}</span> : null}
    </div>
  );
}

/* Soft gray circle that eases toward the pointer; grows over interactive bits. */
function Cursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const tgt = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    let raf;
    const onMove = (e) => {
      tgt.current = { x: e.clientX, y: e.clientY };
      dot.classList.add('is-ready');
      const hot = e.target.closest && e.target.closest('a, button, [data-hot]');
      dot.classList.toggle('is-hot', !!hot);
    };
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.18;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.18;
      dot.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return <div className="kev-cursor" ref={dotRef} aria-hidden="true"></div>;
}

Object.assign(window, { Frame, Cursor });
