import { AppNode } from "../nodes/types";
import { Edge } from "@xyflow/react";

export type Message = {
  id: number;
  role: string;
  text: string;
}

export type ChatKey = "description" 
  | "requirements"
  | "scaleEstimates"
  | "apis"
  | "dbSchema"
  | "diagram"
  | "extra"
  | "overall"

export type ModelData = {
  id: number,
  text: string,
}

export type Param = {
  id: number,
  text: string,
}

export type Return = {
  id: number,
  text: string,
}

export type Requirement = {
  id: number,
  text: string,
}

export type Requirements = {
  functional: Requirement[],
  nonFunctional: Requirement[],
  notes: string,
};

export type ScaleEstimates = {
  capacity: string,
  storage: string,
  bandwidth: string,
}

export type Endpoint = {
  id: number,
  name: string,
  params: Param[],
  returns: Return[] ,
  notes: string,
}

export type SystemAPIs = {
  endpoints: Endpoint[],
}

export type Model = {
  id: number,
  name: string,
  data: ModelData[],
  notes: string,
}

export type DatabaseSchema = {
  models: Model[],
}

export type ExtraConsiderations = {
  notes: string,
}

export type ComponentsDiagram = {
  nodes: AppNode[];
  edges: Edge[]; 
}