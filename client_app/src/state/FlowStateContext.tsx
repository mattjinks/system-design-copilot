import { createContext, useState, useContext, ReactNode } from "react";
import { initialNodes } from "../nodes";
import { initialEdges } from "../edges";
import { AppNode } from "../nodes/types";
import { Edge } from "@xyflow/react";
import './types'
import { ChatKey, ComponentsDiagram, DatabaseSchema, Endpoint, Message, Model, Requirement, Requirements, ScaleEstimates, SystemAPIs } from "./types";

export interface SystemDesignState {
  description: string,
  requirements: Requirements,
  scaleEstimates: ScaleEstimates,
  systemAPIs: SystemAPIs,
  dbSchema: DatabaseSchema,
  diagram: ComponentsDiagram,
  extraConsiderations: string,
  feedback: string,
  chats: Map<ChatKey, Message[]>,
}

export interface SystemDesignStateContextType {
  systemDesignState: SystemDesignState;
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>;
}

export const SystemDesignStateContext = createContext<SystemDesignStateContextType | undefined>(
  undefined
);

interface SystemDesignStateProviderProps {
  children: ReactNode; // This is the correct type for children
}

export const SystemDesignStateProvider = ({ children }: SystemDesignStateProviderProps) => {
  const [systemDesignState, setSystemDesignState] = useState<SystemDesignState>({
    description: '',
    requirements: { 
      functional: [{ id: 0, text: '' }],
      nonFunctional: [{ id: 0, text: '' }],
      notes: '',
    },
    scaleEstimates: {
      capacity: '',
      storage: '',
      bandwidth: '',
    },
    systemAPIs: { 
      endpoints: [
        {
          id: 0,
          name: "",
          params: [],
          returns: [],
          notes: "",
        }
      ]
    },
    dbSchema: { 
      models: [
        {
          id: 0,
          name: "",
          data: [],
          notes: "",
        }
      ]
    },
    diagram: {
      nodes: initialNodes,
      edges: initialEdges,
    },
    extraConsiderations: '',
    feedback: '',
    chats: new Map<ChatKey, Message[]>([
      ["description", []],
      ["requirements", []],
      ["scaleEstimates", []],
      ["apis", []],
      ["dbSchema", []],
      ["diagram", []],
      ["extra", []],
    ]),
  });

  // console.log("Chats", systemDesignState.chats);

  // systemDesignState.chats.set("description", new Array<Message>());
  // systemDesignState.chats.set("requirements", new Array<Message>());
  // systemDesignState.chats.set("apis", new Array<Message>());
  // systemDesignState.chats.set("dbSchema", new Array<Message>());
  // systemDesignState.chats.set("diagram", new Array<Message>());
  // systemDesignState.chats.set("extra", new Array<Message>());

  // console.log("Chats 2", systemDesignState.chats.get("description"));

  return (
    <SystemDesignStateContext.Provider value={{ systemDesignState, setSystemDesignState }}>
      {children}
    </SystemDesignStateContext.Provider>
  );
};

// Custom hook to use the FlowStateContext
// eslint-disable-next-line react-refresh/only-export-components
export const useSystemDesignState = () => {
  const context = useContext(SystemDesignStateContext);
  if (context === undefined) {
    throw new Error("useSystemDesignState must be used within a FlowStateProvider");
  }
  return context;
};