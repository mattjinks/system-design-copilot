import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";
import { SystemComponentNode } from "./SystemComponentNode";

export const initialNodes: AppNode[] = [
  // {
  //   id: 'a',
  //   type: 'input',
  //   position: { x: 0, y: 0 },
  //   data: { label: 'wire'},
  // },
  // {
  //   id: 'b',
  //   type: 'position-logger',
  //   position: { x: -100, y: 100 },
  //   data: { label: 'drag me!' },
  // },
  // { id: 'c',
  //   position: { x: 100, y: 100 },
  //   data: { label: 'your ideas' }
  // },
  // {
  //   id: 'd',
  //   position: { x: 0, y: 200 },
  //   data: { label: 'with React Flow' },
  // },
  {
    id: "0",
    type: "system-component-node",
    position: { x: 400, y: 0 },
    data: {
      label: "Super Long Node Name 0",
      notes: "notes",
      leftHandle: "target",
      rightHandle: "source",
      shape: "square",
      color: "white",
    },
  },
  {
    id: "1",
    type: "system-component-node",
    position: { x: 200, y: 0 },
    data: {
      label: "Super Long Node Name 1",
      notes: "notes",
      leftHandle: "target",
      rightHandle: "source",
      shape: "square",
      color: "white",
    },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "system-component-node": SystemComponentNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
