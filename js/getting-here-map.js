function initGettingHereMap() {
  const el = document.getElementById('getting-here-map');
  if (!el || typeof L === 'undefined') return;

  const lodge = [68.2792, 14.0279];
  const leknes = [68.1525, 13.60944];
  const svolvarAirport = [68.2433, 14.6692];
  const svolvarHarbour = [68.2321, 14.5626];
  const bodoHarbour = [67.285, 14.372];

  const e10 = [
    [67.882, 13.044],
    [67.932, 13.089],
    [67.946, 13.135],
    [68.005, 13.175],
    [68.089, 13.227],
    [68.12, 13.35],
    [68.133, 13.45],
    [68.148, 13.56],
    [68.148, 13.63],
    [68.17, 13.635],
    [68.2, 13.685],
    [68.23, 13.745],
    [68.251, 13.775],
    [68.258, 13.85],
    [68.265, 13.95],
    [68.258, 14.05],
    [68.255, 14.18],
    [68.25, 14.27],
    [68.235, 14.32],
    [68.22, 14.4],
    [68.212, 14.48],
    [68.232, 14.56]
  ];

  const toLodge = [
    [68.258, 14.02],
    [68.27, 14.022],
    lodge
  ];

  const boat = [
    bodoHarbour,
    [67.52, 14.42],
    [67.78, 14.5],
    [68.02, 14.54],
    svolvarHarbour
  ];

  const map = L.map(el, {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 18
  }).addTo(map);

  L.polyline(e10, {
    color: '#74896F',
    weight: 4,
    opacity: 0.95,
    lineJoin: 'round',
    lineCap: 'round'
  }).addTo(map).bindPopup('E10');

  L.polyline(toLodge, {
    color: '#74896F',
    weight: 2.5,
    opacity: 0.85
  }).addTo(map);

  L.polyline(boat, {
    color: '#2B302B',
    weight: 2.5,
    opacity: 0.8,
    dashArray: '7 9',
    lineCap: 'round'
  }).addTo(map).bindPopup('Boat from Bodø to Svolvær');

  function pin(kind, label) {
    return L.divIcon({
      className: 'gh-marker',
      html: '<span class="gh-pin gh-pin--' + kind + '"></span><span class="gh-pin-label">' + label + '</span>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }

  L.marker(lodge, { icon: pin('lodge', 'Storøya Lodge'), title: 'Storøya Lodge' }).addTo(map);
  L.marker(leknes, { icon: pin('air', 'Leknes Airport'), title: 'Leknes Airport' }).addTo(map);
  L.marker(svolvarAirport, { icon: pin('air', 'Svolvær Airport'), title: 'Svolvær Airport' }).addTo(map);
  L.marker(bodoHarbour, { icon: pin('town', 'Bodø'), title: 'Bodø' }).addTo(map);

  L.marker([68.05, 14.58], {
    icon: L.divIcon({
      className: 'gh-route-label',
      html: 'Boat from Bodø',
      iconSize: [120, 20],
      iconAnchor: [0, 10]
    }),
    interactive: false
  }).addTo(map);

  L.marker([68.09, 13.32], {
    icon: L.divIcon({
      className: 'gh-route-label gh-route-label--e10',
      html: 'E10',
      iconSize: [36, 20],
      iconAnchor: [0, 10]
    }),
    interactive: false
  }).addTo(map);

  map.fitBounds([lodge, leknes, svolvarAirport, [67.882, 13.044]], {
    padding: [40, 40]
  });

  requestAnimationFrame(() => map.invalidateSize());
}
