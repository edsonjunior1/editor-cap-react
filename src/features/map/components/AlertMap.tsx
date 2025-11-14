import type { FC } from "react";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMap,
  Polygon,
  Tooltip,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import type * as L from "leaflet";
import type { GeoCoordinate } from "@/shared/types/geo";
import type { Alert } from "@/features/alerts/types/alert";

interface AlertMapProps {
  onAreaCoordinatesCreated?: (coords: GeoCoordinate[]) => void;
  onExistingAreaClick?: (alertId: string) => void;
  isPanelOpen: boolean;
  alerts: Alert[];
}

const ResizeHandler: FC<{ isPanelOpen: boolean }> = ({ isPanelOpen }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [isPanelOpen, map]);

  return null;
};

function severityColor(severity: Alert["severity"]) {
  switch (severity) {
    case "low":
      return "#22c55e"; // green-500
    case "medium":
      return "#eab308"; // yellow-500
    case "high":
      return "#ef4444"; // red-500
  }
}

export const AlertMap: FC<AlertMapProps> = ({
  onAreaCoordinatesCreated,
  onExistingAreaClick,
  isPanelOpen,
  alerts,
}) => {
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        Loading map...
      </div>
    );
  }

  const initialCenter: [number, number] = [-9.3891, -40.5033]; // região Petrolina

  const handleCreated = (e: any) => {
    if (e.layerType === "polygon") {
      const layer = e.layer as L.Polygon;
      const latlngs = layer.getLatLngs()[0] as L.LatLng[];
      const coords: GeoCoordinate[] = latlngs.map((latlong) => ({
        lat: latlong.lat,
        lng: latlong.lng,
      }));

      onAreaCoordinatesCreated?.(coords);
    }
  };

  return (
    <MapContainer
      center={initialCenter}
      zoom={6}
      className="w-full h-full rounded-lg shadow-sm"
    >
      <ResizeHandler isPanelOpen={isPanelOpen} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            marker: false,
            circle: false,
            circlemarker: false,
            rectangle: false,
            polyline: false,
            polygon: true,
          }}
          edit={{
            remove: true,
          }}
        />
      </FeatureGroup>

      {alerts.flatMap((alert) =>
        alert.areas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.coordinates.map(
              (c) => [c.lat, c.lng] as [number, number]
            )}
            pathOptions={{
              color: severityColor(alert.severity),
              weight: 2,
            }}
            eventHandlers={{
              click: () => onExistingAreaClick?.(alert.id),
            }}
          >
            <Tooltip sticky>
              <div style={{ fontSize: "11px" }}>
                <div style={{ fontWeight: 600 }}>{alert.title}</div>
                <div>Area: {area.name}</div>
                <div style={{ opacity: 0.7 }}>
                  Severity: {alert.severity.toUpperCase()}
                </div>
              </div>
            </Tooltip>
          </Polygon>
        ))
      )}
    </MapContainer>
  );
};
