import { Table } from "console-table-printer";
import { getAllProjects } from "../../db/queries/projects.js";
import type { FormattedProjects, Project } from "../../types/Project.js";

export const listProjects = (): void => {
  const projects: Project[] = getAllProjects();

  const formatDate: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedProjects: FormattedProjects[] = projects.map((key) => ({
    ...key,
    created_at: formatDate.format(new Date(key.created_at)),
    last_active: formatDate.format(new Date(key.last_active)),
    is_active: key.is_active ? "● Active" : "○ Inactive",
  }));

  const table: Table = new Table({
    style: {
      headerTop: {
        left: "╔",
        mid: "╦",
        right: "╗",
        other: "═",
      },
      headerBottom: {
        left: "╟",
        mid: "╬",
        right: "╢",
        other: "═",
      },
      tableBottom: {
        left: "╚",
        mid: "╩",
        right: "╝",
        other: "═",
      },
      vertical: "║",
    },
    columns: [
      { name: "id", alignment: "center" },
      { name: "name", alignment: "left" },
      { name: "created_at", alignment: "left" },
      { name: "last_active", alignment: "left" },
      { name: "is_active", alignment: "center" },
    ],
  });

  table.addRows(formattedProjects);
  table.printTable();
};
