import type { Edge, EdgeTypes } from "@xyflow/react";
import SystemComponentEdge from "./SystemComponentEdge";

export const initialEdges: Edge[] = [];

export const edgeTypes = {
  "system-component-edge": SystemComponentEdge,
} satisfies EdgeTypes;
