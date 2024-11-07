import { useSystemDesignState } from "../../../state/FlowStateContext";

export default function PayloadService() {
  const { systemDesignState } = useSystemDesignState();

  const descriptionPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const requirementsPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const scaleEstimatesPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const systemAPIsPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      systemAPIs: systemDesignState.systemAPIs,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const dbSchemaPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      systemAPIs: systemDesignState.systemAPIs,
      dbSchema: systemDesignState.dbSchema,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const diagramPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      systemAPIs: systemDesignState.systemAPIs,
      dbSchema: systemDesignState.dbSchema,
      diagram: systemDesignState.diagram,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const extraConsiderationsPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      systemAPIs: systemDesignState.systemAPIs,
      dbSchema: systemDesignState.dbSchema,
      diagram: systemDesignState.diagram,
      extra: systemDesignState.extraConsiderations,
      reevaluation: reevaluation,
    };
    return payload;
  };

  const fullSystemPayload = (reevaluation: boolean) => {
    const payload = {
      description: systemDesignState.description,
      requirements: systemDesignState.requirements,
      scaleEstimates: systemDesignState.scaleEstimates,
      systemAPIs: systemDesignState.systemAPIs,
      dbSchema: systemDesignState.dbSchema,
      diagram: systemDesignState.diagram,
      extra: systemDesignState.extraConsiderations,
      reevaluation: reevaluation,
    };
    return payload;
  };

  return {
    descriptionPayload,
    requirementsPayload,
    scaleEstimatesPayload,
    systemAPIsPayload,
    dbSchemaPayload,
    diagramPayload,
    extraConsiderationsPayload,
    fullSystemPayload,
  };
}
