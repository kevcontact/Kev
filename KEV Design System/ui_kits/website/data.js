/* KEV — UI kit demo data. Plain script → window.KEV_DATA.
   Real photographs/videos replace the tonal placeholder frames. */
(function () {
  // Muted, desaturated editorial tones standing in for photographs.
  // (All real chroma comes from KEV's actual imagery.)
  var T = {
    bone:  '#E4DED4',
    sand:  '#D2C6B6',
    clay:  '#C2AB9B',
    stone: '#B3ABA0',
    slate: '#A9B0AE',
    rose:  '#D3C0B8',
    khaki: '#BDB6A2',
    ash:   '#9A938B',
    ink:   '#171717',
    coal:  '#4F4B46'
  };

  var projects = [
    {
      id: 'balvin-rio',
      title: 'J Balvin — “Rio”',
      client: 'New Era',
      year: '2024',
      kind: 'Photography',
      blurb: 'Campaign stills shot in Medellín for the New Era × J Balvin capsule.',
      cover: T.clay,
      frames: [T.clay, T.bone, T.coal, T.sand, T.ink, T.stone, T.rose, T.clay, T.bone, T.ash, T.sand, T.coal]
    },
    {
      id: 'maluma-tour',
      title: 'Maluma — Tour Film',
      client: 'Sony Music',
      year: '2024',
      kind: 'Video',
      blurb: 'Long-form tour documentary, directed and colour-graded for the world tour.',
      cover: T.ink,
      frames: [T.ink, T.coal, T.stone, T.clay, T.ash, T.bone, T.slate, T.sand]
    },
    {
      id: 'maisak-capsule',
      title: 'Maisak: Capsule',
      client: 'Universal',
      year: '2023',
      kind: 'Photography',
      blurb: 'Studio editorial for Maisak’s debut capsule — bone, clay and shadow.',
      cover: T.bone,
      frames: [T.bone, T.sand, T.stone, T.rose, T.clay, T.ash, T.bone, T.coal, T.sand, T.stone]
    },
    {
      id: 'new-era-5950',
      title: 'New Era — 59FIFTY',
      client: 'New Era',
      year: '2023',
      kind: 'Brand',
      blurb: 'Product-led brand film and stills for the 59FIFTY heritage line.',
      cover: T.coal,
      frames: [T.coal, T.ink, T.stone, T.sand, T.bone, T.slate, T.clay, T.ash]
    },
    {
      id: 'balvin-amarillo',
      title: 'J Balvin — Amarillo',
      client: 'Universal',
      year: '2022',
      kind: 'Photography',
      blurb: 'Album-cycle photography. Saturated, joyful, maximal — the work is the colour.',
      cover: T.sand,
      frames: [T.sand, T.clay, T.bone, T.rose, T.ash, T.stone, T.coal, T.bone, T.sand]
    },
    {
      id: 'maluma-hawai',
      title: 'Maluma — “Hawái”',
      client: 'Sony Music',
      year: '2021',
      kind: 'Video',
      blurb: 'Music video direction. Warm dusk light, handheld, intimate.',
      cover: T.rose,
      frames: [T.rose, T.clay, T.ink, T.sand, T.stone, T.coal, T.bone]
    }
  ];

  var info = {
    bio: 'KEV is a photographer and music-video director working between Medellín, Miami and Mexico City. The work moves between Latin music culture and fashion editorial — campaigns, album cycles, tour films and brand collaborations.',
    clients: ['J Balvin', 'Maluma', 'Maisak', 'New Era', 'Sony Music', 'Universal', 'Nike', 'Corona'],
    services: ['Photography', 'Music Video Direction', 'Brand Film', 'Creative Direction'],
    contact: [
      { label: 'Email', value: 'studio@kev.com' },
      { label: 'Instagram', value: '@kev' },
      { label: 'Representation', value: 'UNSTATED' }
    ]
  };

  window.KEV_DATA = { tones: T, projects: projects, info: info };
})();
