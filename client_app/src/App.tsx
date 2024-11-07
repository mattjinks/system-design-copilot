import { useState } from "react";
import { Controls, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { nodeTypes } from "./views/components_diagram/nodes";
import { edgeTypes } from "./views/components_diagram/edges";
import { AppNode } from "./views/components_diagram/nodes/types";
import NavigationMenu from "./views/nav_menu/NavigationMenu";
import { CreateNodeForm } from "./views/components_diagram/nodes/CreateNodeForm";
import RequirementsAndGoals from "./views/requirements_and_goals/RequirementsAndGoals";
import {
  useNodesChangeHandler,
  useEdgesChangeHandler,
  useConnectionHandler,
  useAddNodesHandler,
} from "./state/FlowStateHooks";
import { Col, Row } from "react-bootstrap";
import Description from "./views/description/Description";
import SystemAPIs from "./views/system_apis/SystemAPIs";
import DatabaseSchema from "./views/database_design/DatabaseSchema";
import ExtraConsiderations from "./views/extra_considerations/ExtraConsiderations";
import { useSystemDesignState } from "./state/FlowStateContext";
import ScaleEstimates from "./views/scale_estimations/ScaleEstimates";
import FlowDiagramControls from "./views/components_diagram/FlowDiagramControls";

export default function App() {
  const viewOptions = new Set([
    "description",
    "requirements",
    "scale",
    "apis",
    "db-schema",
    "extra",
  ]);

  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const [activeTab, setActiveTab] = useState("description");

  const [showCreateNodeForm, setShowCreateNodeForm] = useState(false);

  const handleNodesChange1 = useNodesChangeHandler(setSystemDesignState);
  const handleEdgesChange1 = useEdgesChangeHandler(setSystemDesignState);
  const handleConnection1 = useConnectionHandler(setSystemDesignState);

  const handleNewNodes = useAddNodesHandler(setSystemDesignState);

  const handleTabSelect = (item: string) => {
    setActiveTab(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(`Selected Tab: ${item}`);
  };

  const handleCreateNodeFormClose = () => {
    setShowCreateNodeForm(false);
    console.log(`Close Create Node Form`);
    return false;
  };

  const handleCreateNodeFormSubmit = (formData: {
    label: string;
    notes: string;
    leftHandle: string;
    rightHandle: string;
    shape: string;
    color: string;
  }) => {
    const newNodes: AppNode[] = [
      {
        id: "",
        data: formData,
        position: { x: 50, y: 50 },
        type: "system-component-node",
      },
    ];
    console.log(`Handle Form Submit`, formData);
    handleNewNodes(newNodes);
    console.log(systemDesignState);
  };

  return (
    <>
      <div
        className="navigation-container"
        style={{ position: "fixed", top: "24px", left: "24px", zIndex: 10 }}
      >
        <NavigationMenu onItemSelect={handleTabSelect} />
      </div>

      {activeTab === "flow" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "24px",
            zIndex: "12",
          }}
        >
          <FlowDiagramControls openForm={() => setShowCreateNodeForm(true)} />
        </div>
      )}

      <CreateNodeForm
        show={showCreateNodeForm}
        handleClose={handleCreateNodeFormClose}
        onSubmit={handleCreateNodeFormSubmit}
      />

      <ReactFlow
        hidden={activeTab !== "flow"}
        nodes={systemDesignState.diagram.nodes}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange1}
        edges={systemDesignState.diagram.edges}
        edgeTypes={edgeTypes}
        onEdgesChange={handleEdgesChange1}
        onConnect={handleConnection1}
        fitView
      >
        <Controls />
      </ReactFlow>

      <Row
        hidden={!viewOptions.has(activeTab)}
        style={{ height: "100%", backgroundColor: "transparent" }}
      >
        <Col
          md={{ span: 2, offset: 0 }}
          style={{ backgroundColor: "transparent" }}
        ></Col>

        <Col md={{ offset: 1 }} style={{ backgroundColor: "transparent" }}>
          {activeTab === "description" && <Description />}

          {activeTab === "requirements" && <RequirementsAndGoals />}

          {activeTab === "scale" && <ScaleEstimates />}

          {activeTab === "apis" && <SystemAPIs />}

          {activeTab === "db-schema" && <DatabaseSchema />}

          {activeTab === "extra" && <ExtraConsiderations />}
        </Col>
      </Row>
    </>
  );
}
