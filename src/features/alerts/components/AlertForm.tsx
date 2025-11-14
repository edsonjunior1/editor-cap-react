import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { useAppDispatch } from "@/app/store";
import { createAlert } from "../store/alertsSlice";

export function AlertForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createAlert({
        title: title.trim(),
        description: description.trim(),
        severity,
      })
    );

    setTitle("");
    setDescription("");
    setSeverity("low");
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

        <Button type="submit">Save Alert</Button>
      </form>
    </Card>
  );
}
