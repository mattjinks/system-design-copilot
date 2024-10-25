import { useSystemDesignState } from '../../state/FlowStateContext';

export default function PayloadService() {
  const { systemDesignState } = useSystemDesignState();

  const descriptionPayload = () => {
    const payload = {
      "description": systemDesignState.description
    }
    return payload;
  }

  const requirementsPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements
    }
    return payload;
  }

  const scaleEstimatesPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
    }
    return payload;
  }

  const systemAPIsPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
      "systemAPIs": systemDesignState.systemAPIs,
    }
    return payload;
  }

  const dbSchemaPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
      "systemAPIs": systemDesignState.systemAPIs,
      "dbSchema": systemDesignState.dbSchema
    }
    return payload;
  }

  const diagramPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
      "systemAPIs": systemDesignState.systemAPIs,
      "dbSchema": systemDesignState.dbSchema,
      "diagram": systemDesignState.diagram,
    }
    return payload;
  }

  const extraConsiderationsPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
      "systemAPIs": systemDesignState.systemAPIs,
      "dbSchema": systemDesignState.dbSchema,
      "diagram": systemDesignState.diagram,
      "extra": systemDesignState.extraConsiderations,
    }
    return payload;
  }

  const fullSystemPayload = () => {
    const payload = {
      "description": systemDesignState.description,
      "requirements": systemDesignState.requirements,
      "scaleEstimates": systemDesignState.scaleEstimates,
      "systemAPIs": systemDesignState.systemAPIs,
      "dbSchema": systemDesignState.dbSchema,
      "diagram": systemDesignState.diagram,
      "extra": systemDesignState.extraConsiderations,
    }
    return payload;
  }

  return {
    descriptionPayload,
    requirementsPayload,
    scaleEstimatesPayload,
    systemAPIsPayload,
    dbSchemaPayload,
    diagramPayload,
    extraConsiderationsPayload,
    fullSystemPayload
  }
}
  
// const payload = JSON.stringify({
//   "description": "A system design example",
//   "requirements": {
//     "functional": [{ "id": 1, "text": "Requirement 1" }],
//     "nonFunctional": [{ "id": 2, "text": "Non-functional Requirement 1" }],
//     "notes": "Some notes"
//   },
//   "scaleEstimates": {
//     "capacity": "High",
//     "storage": "1TB",
//     "bandwidth": "1Gbps"
//   },
//   "systemAPIs": {
//     "endpoints": [
//       {
//         "id": 1,
//         "name": "GetUsers",
//         "params": [{ "id": 1, "text": "userId" }],
//         "returns": [{ "id": 1, "text": "User data" }],
//         "notes": "Retrieves a list of users"
//       }
//     ]
//   },
//   "dbSchema": {
//     "models": [
//       {
//         "id": 1,
//         "name": "User",
//         "data": [{ "id": 1, "text": "username" }],
//         "notes": "User model schema"
//       }
//     ]
//   },
//   "diagram": {
//     "nodes": [{ "id": "1", "data": { "color": "red", "label": "Node 1" }, "position": { "x": 100, "y": 200 }, "type": "default" }],
//     "edges": [{ "id": "e1", "source": "1", "target": "2", "type": "straight" }]
//   }
// });