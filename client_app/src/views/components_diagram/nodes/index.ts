import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";
import { SystemComponentNode } from "./SystemComponentNode";

export const initialNodes: AppNode[] = [
  // {
  //   id: "0",
  //   type: "system-component-node",
  //   position: { x: 400, y: 0 },
  //   data: {
  //     label: "Super Long Node Name 0",
  //     notes: "notes",
  //     leftHandle: "target",
  //     rightHandle: "source",
  //     shape: "square",
  //     color: "white",
  //   },
  // },
  // {
  //   id: "1",
  //   type: "system-component-node",
  //   position: { x: 200, y: 0 },
  //   data: {
  //     label: "Super Long Node Name 1",
  //     notes: "notes",
  //     leftHandle: "target",
  //     rightHandle: "source",
  //     shape: "square",
  //     color: "white",
  //   },
  // },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "system-component-node": SystemComponentNode,
} satisfies NodeTypes;
