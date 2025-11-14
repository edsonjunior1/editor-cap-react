import { useAppSelector, useAppDispatch } from "@/app/store";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { deleteAlert } from "../store/alertsSlice";
import type { Alert } from "../types/alert";

function severityColor(severity: Alert["severity"]) {
  switch (severity) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-red-100 text-red-800";
  }
};

export function AlertList() {
  const alerts = useAppSelector((state) => state.alerts.items);
  const dispatch = useAppDispatch();

  if (!alerts.length) {
    return (
      <Card>
        <p className="text-sm text-gray-600">
          No Alerts created yet. Use the form above to create you first alert.
        </p>
      </Card>
    );
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert:Alert) => (
        <Card key={alert.id} className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityColor(
                  alert.severity
                )}`}
              >
                {alert.severity.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </div>
            <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
            {alert.description && (
              <p className="text-sm text-gray-700">{alert.description}</p>
            )}
          </div>

          <Button
            variant="ghost"
            className="text-xs text-red-600"
            onClick={() => dispatch(deleteAlert(alert.id))}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}
