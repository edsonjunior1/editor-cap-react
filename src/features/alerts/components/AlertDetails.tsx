import type { FC } from "react";
import type { Alert } from "../types/alert";
import { Card } from "@/shared/ui/Card";

interface AlertDetailsProps {
  alert: Alert | null;
}

export const AlertDetails: FC<AlertDetailsProps> = ({ alert }) => {
  if (!alert) {
    return (
      <Card>
        <p className="text-sm text-gray-600">
          Select an alert by clicking on a polygon in the map.
        </p>
      </Card>
    );
  }

  const created = new Date(alert.createdAt).toLocaleString();

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold">{alert.title}</h3>
        <span className="text-xs text-gray-500">{created}</span>
      </div>

      <p className="text-sm text-gray-700 mb-3">{alert.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-gray-500">Severity:</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
          {alert.severity.toUpperCase()}
        </span>
      </div>

      <div>
        <div className="text-xs font-medium text-gray-500 mb-1">Areas</div>
        {alert.areas.length === 0 ? (
          <p className="text-xs text-gray-500">
            No geographic areas attached to this alert.
          </p>
        ) : (
          <ul className="space-y-1">
            {alert.areas.map((area) => (
              <li
                key={area.id}
                className="text-xs text-gray-700 border border-slate-200 rounded-md px-2 py-1 flex justify-between items-center"
              >
                <span>{area.name}</span>
                <span className="text-[10px] text-gray-500">
                  {area.coordinates.length} points
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};
