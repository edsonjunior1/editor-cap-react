export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface GeoArea {
  id: string;
  name: string;
  coordinates: GeoCoordinate[];
}