import {
  Edge,
  EdgeChange,
  NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  OnConnect,
  NodePositionChange,
} from "@xyflow/react";
import { useCallback } from "react";
import { AppNode } from "../views/components_diagram/nodes/types";
import "./types";
import { useSystemDesignState, SystemDesignState } from "./FlowStateContext";
import { Endpoint, Model, Requirement } from "./types";

export const useUpdateFeedbackHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (text: string) => {
      console.log("useUpdateFeedbackHandler", text);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        feedback: prevState.feedback + text,
      }));
    },
    [setSystemDesignState]
  );

export const useClearFeedbackHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (text: string) => {
      console.log("useUpdateFeedbackHandler", text);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        feedback: text,
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateDescriptionHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (text: string) => {
      console.log("useUpdateDescriptionHandler", text);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        description: text,
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateExtraConsiderationsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (text: string) => {
      console.log("useUpdateExtraConsiderationsHandler", text);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        extraConsiderations: text,
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateModelHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (updatedModels: Model[]) => {
      console.log("useUpdateModelHandler", updatedModels);

      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        dbSchema: {
          ...prevState.dbSchema,
          models: updatedModels,
        },
      }));
    },
    [setSystemDesignState]
  );

export const useAddModelHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(() => {
    console.log("useAddModelHandler");

    setSystemDesignState((prevState: SystemDesignState) => {
      const models = prevState.dbSchema.models;

      let newId = models.length;

      while (models.some((model) => model.id === newId)) {
        newId++;
      }

      const newModel = {
        id: newId,
        name: "",
        data: [],
        notes: "",
      };

      return {
        ...prevState,
        dbSchema: {
          ...prevState.dbSchema,
          models: [...models, newModel],
        },
      };
    });
  }, [setSystemDesignState]);

export const useDeleteModelHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number) => {
      console.log("useDeleteModelHandler");
      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.filter((model) => model.id !== modelId),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateModelNameHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number, name: string) => {
      console.log("useUpdateModelNameHandler", modelId, name);

      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.map((model) =>
              model.id === modelId
                ? {
                    ...model,
                    name: name,
                  }
                : model
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateModelNotesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number, notes: string) => {
      console.log("useUpdateModelNotesHandler", modelId, notes);

      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.map((model) =>
              model.id === modelId
                ? {
                    ...model,
                    notes: notes,
                  }
                : model
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateDataHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number, dataId: number, dataText: string) => {
      console.log("useUpdateDataHandler", modelId, dataId, dataText);

      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.map((model) =>
              model.id === modelId
                ? {
                    ...model,
                    data: model.data.map((data) =>
                      data.id === dataId ? { ...data, text: dataText } : data
                    ),
                  }
                : model
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useDeleteDataHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number, dataId: number) => {
      console.log("useUpdateDataHandler", modelId, dataId);

      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.map((model) =>
              model.id === modelId
                ? {
                    ...model,
                    data: model.data.filter((data) => data.id !== dataId),
                  }
                : model
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useAddDataHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (modelId: number) => {
      console.log("useAddDataHandler");

      setSystemDesignState((prevState: SystemDesignState) => {
        const models = prevState.dbSchema.models;
        const model = models.find((model) => model.id === modelId);
        const data = model!.data;
        let newId = data.length;

        while (data.some((data) => data.id === newId)) {
          newId++;
        }

        return {
          ...prevState,
          dbSchema: {
            ...prevState.dbSchema,
            models: models.map((model) =>
              model.id === modelId
                ? {
                    ...model,
                    data: [...data, { id: newId, text: "" }],
                  }
                : model
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateEndpointsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (updatedEndpoints: Endpoint[]) => {
      console.log("useUpdateEndpointsHandler", updatedEndpoints);

      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        systemAPIs: {
          ...prevState.systemAPIs,
          endpoints: updatedEndpoints,
        },
      }));
    },
    [setSystemDesignState]
  );

export const useAddEndpointsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(() => {
    console.log("useAddEndpointsHandler");

    setSystemDesignState((prevState: SystemDesignState) => {
      const endpoints = prevState.systemAPIs.endpoints;

      let newId = endpoints.length;

      while (endpoints.some((endpoint) => endpoint.id === newId)) {
        newId++;
      }

      const newEndpoint = {
        id: newId,
        name: "",
        params: [],
        returns: [],
        notes: "",
      };

      return {
        ...prevState,
        systemAPIs: {
          ...prevState.systemAPIs,
          endpoints: [...endpoints, newEndpoint],
        },
      };
    });
  }, [setSystemDesignState]);

export const useDeleteEndpointsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number) => {
      console.log("useDeleteEndpointsHandler");
      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.filter(
              (endpoint) => endpoint.id !== endpointId
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateEndpointNameHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, name: string) => {
      console.log("useUpdateEndpointNameHandler", endpointId, name);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    name: name,
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateEndpointNotesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, notes: string) => {
      console.log("useUpdateEndpointNotesHandler", endpointId, notes);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    notes: notes,
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateReturnsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, returnId: number, returnText: string) => {
      console.log("useUpdateReturnsHandler", endpointId, returnId, returnText);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    returns: endpoint.returns.map((endpointReturn) =>
                      endpointReturn.id === returnId
                        ? { ...endpointReturn, text: returnText }
                        : endpointReturn
                    ),
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useDeleteReturnsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, returnId: number) => {
      console.log("useDeleteReturnsHandler", endpointId, returnId);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    returns: endpoint.returns.filter(
                      (endpointReturn) => endpointReturn.id !== returnId
                    ),
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useAddReturnsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number) => {
      console.log("useAddReturnsHandler");

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;
        const endpoint = endpoints.find(
          (endpoint) => endpoint.id === endpointId
        );
        const returns = endpoint!.returns;
        let newId = returns.length;

        while (returns.some((endpointReturn) => endpointReturn.id === newId)) {
          newId++;
        }

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    returns: [...returns, { id: newId, text: "" }],
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateParamsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, paramId: number, paramText: string) => {
      console.log("useUpdateParamsHandler", endpointId, paramId);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    params: endpoint.params.map((param) =>
                      param.id === paramId
                        ? { ...param, text: paramText }
                        : param
                    ),
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useDeleteParamsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number, paramId: number) => {
      console.log("useDeleteParamsHandler", endpointId, paramId);

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    params: endpoint.params.filter(
                      (param) => param.id !== paramId
                    ),
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useAddParamsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (endpointId: number) => {
      console.log("useAddParamsHandler");

      setSystemDesignState((prevState: SystemDesignState) => {
        const endpoints = prevState.systemAPIs.endpoints;
        const endpoint = endpoints.find(
          (endpoint) => endpoint.id === endpointId
        );
        const params = endpoint!.params;
        let newId = params.length;

        while (params.some((param) => param.id === newId)) {
          newId++;
        }

        return {
          ...prevState,
          systemAPIs: {
            ...prevState.systemAPIs,
            endpoints: endpoints.map((endpoint) =>
              endpoint.id === endpointId
                ? {
                    ...endpoint,
                    params: [...params, { id: newId, text: "" }],
                  }
                : endpoint
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateCapacityEstimatesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (estimate: string) => {
      console.log("useUpdateCapacityEstimatesHandler", estimate);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        scaleEstimates: {
          ...prevState.scaleEstimates,
          capacity: estimate,
        },
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateStorageEstimatesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (estimate: string) => {
      console.log("useUpdateStorageEstimatesHandler", estimate);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        scaleEstimates: {
          ...prevState.scaleEstimates,
          storage: estimate,
        },
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateBandwidthEstimatesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (estimate: string) => {
      console.log("useUpdateBandwidthEstimatesHandler", estimate);
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        scaleEstimates: {
          ...prevState.scaleEstimates,
          bandwidth: estimate,
        },
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateNonFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (reqId: number, reqText: string) => {
      console.log("useUpdateNonFunctionalRequirementsHandler", reqId, reqText);
      const updatedReq = {
        id: reqId,
        text: reqText,
      };
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        requirements: {
          ...prevState.requirements,
          nonFunctional: prevState.requirements.nonFunctional.map(
            (requirement) =>
              requirement.id === reqId ? updatedReq : requirement
          ),
        },
      }));
    },
    [setSystemDesignState]
  );

export const useAddNonFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(() => {
    console.log("useAddNonFunctionalRequirementsHandler");

    setSystemDesignState((prevState: SystemDesignState) => {
      const nonFunctionalRequirements = prevState.requirements.nonFunctional;

      let newId = nonFunctionalRequirements.length;

      while (nonFunctionalRequirements.some((req) => req.id === newId)) {
        newId++;
      }

      return {
        ...prevState,
        requirements: {
          ...prevState.requirements,
          nonFunctional: [
            ...nonFunctionalRequirements,
            { id: newId, text: "" },
          ],
        },
      };
    });
  }, [setSystemDesignState]);

export const useDeleteNonFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (req: Requirement) => {
      console.log("useDeleteNonFunctionalRequirementsHandler");
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        requirements: {
          ...prevState.requirements,
          nonFunctional: prevState.requirements.nonFunctional.filter(
            (requirement) => requirement.id !== req.id
          ),
        },
      }));
    },
    [setSystemDesignState]
  );

export const useUpdateFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (reqId: number, reqText: string) => {
      console.log("useUpdateRequirementsHandler", reqId, reqText);
      const updatedReq = {
        id: reqId,
        text: reqText,
      };
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        requirements: {
          ...prevState.requirements,
          functional: prevState.requirements.functional.map((requirement) =>
            requirement.id === reqId ? updatedReq : requirement
          ),
        },
      }));
    },
    [setSystemDesignState]
  );

export const useAddFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(() => {
    console.log("useAddFunctionalRequirementsHandler");

    setSystemDesignState((prevState: SystemDesignState) => {
      const functionalRequirements = prevState.requirements.functional;

      let newId = functionalRequirements.length;

      while (functionalRequirements.some((req) => req.id === newId)) {
        newId++;
      }

      return {
        ...prevState,
        requirements: {
          ...prevState.requirements,
          functional: [...functionalRequirements, { id: newId, text: "" }],
        },
      };
    });
  }, [setSystemDesignState]);

export const useDeleteFunctionalRequirementsHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (req: Requirement) => {
      console.log("useDeleteFunctionalRequirementsHandler");
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        requirements: {
          ...prevState.requirements,
          functional: prevState.requirements.functional.filter(
            (requirement) => requirement.id !== req.id
          ),
        },
      }));
    },
    [setSystemDesignState]
  );

export const useNodesChangeHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (changes: NodeChange<AppNode>[]) => {
      console.log("useNodesChangeHandler called with changes:", changes);

      setSystemDesignState((prevState: SystemDesignState) => {
        console.log("Previous state:", prevState);
        const updatedState = {
          ...prevState,
          diagram: {
            ...prevState.diagram,
            nodes: applyNodeChanges(changes, prevState.diagram.nodes),
          },
        };
        console.log("Updated state:", updatedState);
        return updatedState;
      });
    },
    [setSystemDesignState]
  );

export const useAddNodesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (newNodes: AppNode[]) => {
      console.log("useAddNodesHandler", newNodes);
      setSystemDesignState((prevState: SystemDesignState) => {
        const nodes = prevState.diagram.nodes;
        let newId = nodes.length;
        const newIdStr = newId + ": " + newNodes[0].data.label;

        while (nodes.some((node) => node.id === newIdStr)) {
          newId++;
        }

        newNodes[0].id = newIdStr;

        const pageWidth = document.documentElement.clientWidth;
        newNodes[0].position.x = pageWidth / 2;

        return {
          ...prevState,
          diagram: {
            ...prevState.diagram,
            nodes: [...prevState.diagram.nodes, ...newNodes],
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateNodesHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>,
  systemDesignState: SystemDesignState
) =>
  useCallback(
    (updatedNode: AppNode) => {
      console.log("useUpdateNodesHandler", updatedNode);

      setSystemDesignState((prevState: SystemDesignState) => {
        const nodes = prevState.diagram.nodes;

        let newId = nodes.length;
        let newIdStr = newId + updatedNode.data.label;

        while (nodes.some((node) => node.id === newIdStr)) {
          newId++;
          newIdStr = newId + updatedNode.data.label;
        }

        const currentId = updatedNode.id;

        return {
          ...prevState,
          diagram: {
            ...prevState.diagram,
            nodes: prevState.diagram.nodes.map((node) =>
              node.id === currentId ? updatedNode : node
            ),
          },
        };
      });

      console.log("updated States", systemDesignState.diagram.nodes);
    },
    [setSystemDesignState, systemDesignState]
  );

export const useEdgesChangeHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setSystemDesignState((prevState: SystemDesignState) => ({
        ...prevState,
        diagram: {
          ...prevState.diagram,
          edges: applyEdgeChanges(changes, prevState.diagram.edges),
        },
      })),
    [setSystemDesignState]
  );

export const useConnectionHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback<OnConnect>(
    (connection) => {
      console.log("connection: ", connection);
      setSystemDesignState((prevState: SystemDesignState) => {
        const edges = prevState.diagram.edges;

        let newId = edges.length;

        while (edges.some((edge) => edge.id === newId + "")) {
          newId++;
        }

        const nodes = prevState.diagram.nodes;

        const sourceNode = nodes.find((node) => node.id === connection.source);
        const targetNode = nodes.find((node) => node.id === connection.target);

        const data = {
          dataFlow: `Data Flows from ${sourceNode?.data.label} to ${targetNode?.data.label}`,
          notes: "",
        };

        return {
          ...prevState,
          diagram: {
            ...prevState.diagram,
            edges: addEdge(
              {
                ...connection,
                id: "" + newId,
                type: "system-component-edge",
                data: data,
              },
              prevState.diagram.edges
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );

export const useUpdateConnectionHandler = (
  setSystemDesignState: React.Dispatch<React.SetStateAction<SystemDesignState>>
) =>
  useCallback<OnConnect>(
    (connection) => {
      console.log("useUpdateConnectionHandler: ", connection);
      setSystemDesignState((prevState: SystemDesignState) => {
        const edges = prevState.diagram.edges;

        let newId = edges.length;

        while (edges.some((edge) => edge.id === newId + "")) {
          newId++;
        }

        const nodes = prevState.diagram.nodes;

        const sourceNodeLabel =
          nodes.find((node) => node.id === connection.source) ||
          "Node Not Found";
        const targetNodeLabel =
          nodes.find((node) => node.id === connection.target) ||
          "Node Not Found";

        const data = {
          dataFlow: `Data Flows between ${sourceNodeLabel} and ${targetNodeLabel}`,
          notes: "",
        };

        return {
          ...prevState,
          diagram: {
            ...prevState.diagram,
            edges: addEdge(
              {
                ...connection,
                id: "" + newId,
                type: "system-component-edge",
                data: data,
              },
              prevState.diagram.edges
            ),
          },
        };
      });
    },
    [setSystemDesignState]
  );
