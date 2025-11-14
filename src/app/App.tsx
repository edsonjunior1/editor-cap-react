import { useState } from "react";
import { nanoid } from "nanoid";
import { AlertForm } from "@/features/alerts/components/AlertForm";
import { AlertList } from "@/features/alerts/components/AlertList";
import { AlertMap } from "@/features/map/components/AlertMap";
import { Button } from "@/shared/ui/Button";
import type { GeoArea, GeoCoordinate } from "@/shared/types/geo";
import { useAppSelector } from "@/app/store";
import type { Alert } from "@/features/alerts/types/alert";
import { AlertDetails } from "@/features/alerts/components/AlertDetails";

type PanelMode = "create" | "view";

function App() {
  const alerts = useAppSelector((state) => state.alerts.items);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [availableAreas, setAvailableAreas] = useState<GeoArea[]>([]);
  const [panelMode, setPanelMode] = useState<PanelMode>("create");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const selectedAlert: Alert | null =
    alerts.find((a) => a.id === selectedAlertId) ?? null;

  const handleAreaCoordinatesCreated = (coords: GeoCoordinate[]) => {
    const nextIndex = availableAreas.length + 1;

    const newArea: GeoArea = {
      id: nanoid(),
      name: `Polygon Area ${nextIndex}`,
      coordinates: coords,
    };

    setAvailableAreas((prev) => [...prev, newArea]);
    setPanelMode("create");
    setSelectedAlertId(null);
    setIsPanelOpen(true);
  };

  const handleExistingAreaClick = (alertId: string) => {
    setSelectedAlertId(alertId);
    setPanelMode("view");
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedAlertId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* TOP NAV */}
      <header className="h-14 bg-slate-900 text-slate-50 flex items-center justify-between px-6 shadow-md">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight">
            CAP creator
          </span>
          <span className="text-xs text-slate-300">
            React 19 • Vite • Redux • Leaflet
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDE NAV */}
        <aside className="w-56 bg-slate-950 text-slate-100 border-r border-slate-800 flex flex-col">
          <div className="px-4 py-3 text-xs uppercase tracking-wide text-slate-400">
            Navigation
          </div>
          <nav className="flex-1 px-2 space-y-1 text-sm">
            <button className="w-full text-left px-3 py-2 rounded-md bg-slate-800 text-slate-50">
              Alerts
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800/70">
              Map View
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800/70">
              Settings
            </button>
          </nav>
          <div className="px-4 py-3 text-[10px] text-slate-500 border-t border-slate-800">
            v0.1
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Conteúdo principal: mapa + painel */}
          <div className="flex-1 flex flex-row gap-4 p-4 items-stretch overflow-hidden">
            <div className="h-full min-w-0 flex-[1]">
              <AlertMap
                alerts={alerts}
                onAreaCoordinatesCreated={handleAreaCoordinatesCreated}
                onExistingAreaClick={handleExistingAreaClick}
                isPanelOpen={isPanelOpen}
              />
            </div>

            {/* ALERT PANEL */}
            {isPanelOpen && (
              <div className="h-full min-w-0 flex-[1] flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-800">
                    {panelMode === "create"
                      ? "New Alert"
                      : selectedAlert?.title ?? "Alert Details"}
                  </h2>
                  <Button
                    variant="ghost"
                    className="text-xs"
                    type="button"
                    onClick={handleClosePanel}
                  >
                    Close
                  </Button>
                </div>

                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                  {panelMode === "create" ? (
                    <div className="shrink-0">
                      <AlertForm availableAreas={availableAreas} />
                    </div>
                  ) : (
                    <div className="shrink-0">
                      <AlertDetails alert={selectedAlert} />
                    </div>
                  )}

                  <div className="flex-1 min-h-0 overflow-auto">
                    {" "}
                    <AlertList />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
