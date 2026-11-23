"use client";

import { useEffect, useState } from "react";
import { set, unset, useClient, useFormValue } from "sanity";

export default function WorkTypeInput(props) {
  const project = useFormValue(["project"]);
  const projectId = project?._ref?.replace(/^drafts\./, "");
  const client = useClient({ apiVersion: "2025-02-19" });
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (!projectId) {
      setChoices([]);
      return;
    }
    setLoading(true);
    client.fetch(
      '*[_type == "workProject" && _id == $id][0].workTypes',
      { id: projectId },
      { perspective: "previewDrafts", useCdn: false }
    ).then((types) => {
      if (active) setChoices(Array.isArray(types) ? types.filter((value) => typeof value === "string" && value.trim()) : []);
    }).catch(() => {
      if (active) setChoices([]);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [client, projectId]);

  const current = typeof props.value === "string" ? props.value : "";
  const options = choices.includes(current) || !current ? choices : [current, ...choices];

  return (
    <div style={{ width: "100%" }}>
      <select
        id={props.id}
        aria-label="Work type"
        value={current}
        disabled={props.readOnly || !projectId || loading}
        onChange={(event) => props.onChange(event.target.value ? set(event.target.value) : unset())}
        style={{
          width: "100%", height: 42, borderRadius: 6, padding: "0 12px",
          background: "var(--card-bg-color, #fff)", color: "inherit",
          border: "1px solid var(--card-border-color, #999)",
        }}
      >
        <option value="">{loading ? "Loading types…" : projectId ? "Select work type…" : "Select a project first"}</option>
        {options.map((type) => <option key={type} value={type}>{type}</option>)}
      </select>
      {projectId && !loading && choices.length === 0 && (
        <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
          Add work types to the parent project first, publish it, then reopen this field.
        </p>
      )}
    </div>
  );
}
