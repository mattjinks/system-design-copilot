import type { Edge, EdgeTypes } from "@xyflow/react";
import SystemComponentEdge from "./SystemComponentEdge";

export const initialEdges: Edge[] = [
  // { id: 'a->c', source: 'a', target: 'c', animated: true },
  // { id: 'b->d', source: 'b', target: 'd' },
  // { id: 'c->d', source: 'c', target: 'd', animated: true },
];

export const edgeTypes = {
  "system-component-edge": SystemComponentEdge,
} satisfies EdgeTypes;
