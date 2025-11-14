import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { useAppDispatch } from "@/app/store";
import { createAlert } from "../store/alertsSlice";
import type { GeoArea } from "@/shared/types/geo";

interface AlertFormProps {
  availableAreas: GeoArea[];
}

export function AlertForm({ availableAreas }: AlertFormProps) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");

  const [areaToAddId, setAreaToAddId] = useState<string>("");
  const [attachedAreas, setAttachedAreas] = useState<GeoArea[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createAlert({
        title: title.trim(),
        description: description.trim(),
        severity,
        areas: attachedAreas,
      })
    );

    setTitle("");
    setDescription("");
    setSeverity("low");
    setAttachedAreas([]);
    setAreaToAddId("");
  };

  const handleAddArea = () => {
    if (!areaToAddId) return;
    const area = availableAreas.find((a) => a.id === areaToAddId);
    if (!area) return;

    const alreadyAdded = attachedAreas.some((a) => a.id === area.id);
    if (alreadyAdded) return;

    // clone para edição do nome não alterar o global
    setAttachedAreas((prev) => [...prev, { ...area }]);
  };

  const handleAreaNameChange = (
    id: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setAttachedAreas((prev) =>
      prev.map((area) => (area.id === id ? { ...area, name: value } : area))
    );
  };

  const handleRemoveArea = (id: string) => {
    setAttachedAreas((prev) => prev.filter((area) => area.id !== id));
  };

  return (
    <Card className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Create Alert</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Heavy Rain Warning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the alert..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Severity</label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={severity}
            onChange={(e) =>
              setSeverity(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* ADD AREA SECTION */}
        <div className="border-t pt-4 mt-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Areas</span>
            <span className="text-xs text-gray-500">
              Draw polygons on the map, then attach them here.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddArea}
              disabled={!availableAreas.length}
            >
              Add Area
            </Button>

            <select
              className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={areaToAddId}
              onChange={(e) => setAreaToAddId(e.target.value)}
              disabled={!availableAreas.length}
            >
              <option value="">
                {availableAreas.length
                  ? "Select polygon..."
                  : "No polygons created yet"}
              </option>
              {availableAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          {attachedAreas.length > 0 && (
            <div className="space-y-2">
              {attachedAreas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    className="flex-1 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={area.name}
                    onChange={(e) => handleAreaNameChange(area.id, e)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs text-red-600"
                    onClick={() => handleRemoveArea(area.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit">Save Alert</Button>
      </form>
    </Card>
  );
}
