import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;

export type SystemComponentNode = Node<
  {
    label: string;
    notes: string;
    leftHandle: string;
    rightHandle: string;
    shape: string;
    color: string;
  },
  "system-component-node"
>;

export type AppNode = BuiltInNode | PositionLoggerNode | SystemComponentNode;
