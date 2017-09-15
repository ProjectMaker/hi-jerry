export const MARKER_ICONS = [
  { type: 'home', icon: 'marker-home' },
  { type: 'restaurant', icon: 'restaurant' },
  { type: 'bar', icon: 'bar' },
  { type: 'other', icon: 'construction' },
  { type: 'lodging', icon: 'hotel_0star' }
];

export const getMarkerIcon = (type:string) => {
  const marker = MARKER_ICONS.find(icon => icon.type === type) || { icon: '' };
  return marker.icon;
}