import L from 'leaflet';

// Fix default marker icon paths for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

// Fix Chrome intervention: Ignored attempt to cancel a touchmove event with cancelable=false
if (typeof window !== 'undefined' && L.DomEvent) {
  const origPreventDefault = L.DomEvent.preventDefault;
  L.DomEvent.preventDefault = function (e: any) {
    if (e && e.cancelable === false) {
      return this;
    }
    return origPreventDefault.call(this, e);
  };
}

export default L;
