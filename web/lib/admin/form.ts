/** Lectura tipada de FormData (valores de formulario → tipos planos). */
export const str = (fd: FormData, key: string): string => {
  const v = fd.get(key)
  return typeof v === 'string' ? v : ''
}

/** Una entrada por línea, sin vacíos. */
export const lines = (fd: FormData, key: string): string[] =>
  str(fd, key)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
