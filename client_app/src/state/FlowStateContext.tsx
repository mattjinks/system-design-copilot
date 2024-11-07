import { createContext, useState, useContext, ReactNode } from "react";
import { initialNodes } from "../views/components_diagram/nodes";
import { initialEdges } from "../views/components_diagram/edges";
import "./types";
import {
  ChatKey,
  ComponentsDiagram,
  DatabaseSchema,
  Message,
  Requirements,
  ScaleEstimates,
  SystemAPIs,
} from "./types";

export interface SystemDesignState {
  description: string;
  requirements: Requirements;
  scaleEstimates: ScaleEstimates;
  systemAPIs: SystemAPIs;
  dbSchema: DatabaseSchema;
  diagram: ComponentsDiagram;
  extraConsiderations: string;
  feedback: string;
  chats: Map<ChatKey, Message[]>;
}

export interface SystemDesignStateContextType {
  systemDesignState: SystemDesignState;
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>;
}

export const SystemDesignStateContext = createContext<
  SystemDesignStateContextType | undefined
>(undefined);

interface SystemDesignStateProviderProps {
  children: ReactNode;
}

export const SystemDesignStateProvider = ({
  children,
}: SystemDesignStateProviderProps) => {
  const [systemDesignState, setSystemDesignState] = useState<SystemDesignState>(
    {
      description: "",
      requirements: {
        functional: [{ id: 0, text: "" }],
        nonFunctional: [{ id: 0, text: "" }],
        notes: "",
      },
      scaleEstimates: {
        capacity: "",
        storage: "",
        bandwidth: "",
      },
      systemAPIs: {
        endpoints: [
          {
            id: 0,
            name: "",
            params: [],
            returns: [],
            notes: "",
          },
        ],
      },
      dbSchema: {
        models: [
          {
            id: 0,
            name: "",
            data: [],
            notes: "",
          },
        ],
      },
      diagram: {
        nodes: initialNodes,
        edges: initialEdges,
      },
      extraConsiderations: "",
      feedback: "",
      chats: new Map<ChatKey, Message[]>([
        ["description", []],
        ["requirements", []],
        ["scaleEstimates", []],
        ["apis", []],
        ["dbSchema", []],
        ["diagram", []],
        ["extra", []],
      ]),
    }
  );

  return (
    <SystemDesignStateContext.Provider
      value={{ systemDesignState, setSystemDesignState }}
    >
      {children}
    </SystemDesignStateContext.Provider>
  );
};

export const useSystemDesignState = () => {
  const context = useContext(SystemDesignStateContext);
  if (context === undefined) {
    throw new Error(
      "useSystemDesignState must be used within a FlowStateProvider"
    );
  }
  return context;
};
