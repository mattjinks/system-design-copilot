import { useCallback, useState, useEffect, useRef } from "react";
import {
  ReactFlow,
  ReactFlowInstance,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnConnect,
  Edge,
  EdgeChange,
  NodeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { AppNode } from "./nodes/types";
import NavigationMenu from "./NavigationMenu";
import ChatStream from "./ChatStream";
import { CreateNodeForm } from "./views/component_design/CreateNodeForm";
import RequirementsAndGoals from "./views/requirements_and_goals/RequirementsAndGoals";
import {
  useNodesChangeHandler,
  useEdgesChangeHandler,
  useConnectionHandler,
  useAddNodesHandler,
} from "./state/FlowStateHooks";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Description from "./views/description/Description";
import SystemAPIs from "./views/system_apis/SystemAPIs";
import DatabaseSchema from "./views/database_design/DatabaseSchema";
import ComplexityEstimations from "./views/complexity_estimations/ScaleEstimates";
import ExtraConsiderations from "./views/extra_considerations/ExtraConsiderations";
import { useSystemDesignState, SystemDesignStateProvider } from "./state/FlowStateContext";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ScaleEstimates from "./views/complexity_estimations/ScaleEstimates";
import FlowDiagramControls from "./views/component_design/FlowDiagramControls";
import NavBar from "./NavBar";

export default function App() {
  // const [nodes1, setNodes1] = useState(initialNodes);

  const viewOptions = new Set([
    "description",
    "requirements",
    "scale",
    "apis",
    "db-schema",
    "extra",
  ]);

  // const [flowStates, setFlowStates] = useState({
  //   '1': { nodes: initialNodes, edges: initialEdges },
  //   '2': { nodes: initialNodes, edges: initialEdges },
  //   '3': { nodes: initialNodes, edges: initialEdges },
  //   '4': { nodes: initialNodes, edges: initialEdges },
  // });

  const { systemDesignState, setSystemDesignState } = useSystemDesignState();

  const [activeTab, setActiveTab] = useState("description");
  const [ showCopilot, setShowCopilot ] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [showRequirements, setShowRequirements] = useState(false);

  const [showCreateNodeForm, setShowCreateNodeForm] = useState(false);

  // Handlers for Flow 1
  const handleNodesChange1 = useNodesChangeHandler(setSystemDesignState);
  const handleEdgesChange1 = useEdgesChangeHandler(setSystemDesignState);
  const handleConnection1 = useConnectionHandler(setSystemDesignState);

  // const handleNodesChange2 = useNodesChangeHandler('2', setFlowStates);
  // const handleEdgesChange2 = useEdgesChangeHandler('2', setFlowStates);
  // const handleConnection2 = useConnectionHandler('2', setFlowStates);

  const handleNewNodes = useAddNodesHandler(setSystemDesignState);

  const printNodes = () => {
    // console.log(flowStates['1']);
    console.log(activeTab);
  };

  const handleTabSelect = (item: string) => {
    setActiveTab(item);
    console.log(`Selected Tab: ${item}`);
  };

  const handleCreateNodeFormShow = () => {
    setShowCreateNodeForm(true);
    console.log(`Show Create Node Form`);
    return true;
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
    // createNode();
    console.log(systemDesignState);
  };

  return (
    <>
      {/* <NavBar onItemSelect={handleTabSelect}/> */}
      <div
        className="navigation-container"
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 10 }}
      >
        <NavigationMenu onItemSelect={handleTabSelect} />
      </div>

      {activeTab === 'flow' &&
        <FlowDiagramControls openForm={() => setShowCreateNodeForm(true)}/>
      }

      <CreateNodeForm
        show={showCreateNodeForm}
        handleClose={handleCreateNodeFormClose}
        onSubmit={handleCreateNodeFormSubmit}
      />

      {/* { !flowStateOptions.has(activeTab) && ( */}
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

      {/* )} */}

      <Row
        hidden={!viewOptions.has(activeTab)}
        style={{ height: "100%", backgroundColor: "transparent" }}
      >
        <Col
          md={{ span: 2, offset: 0 }}
          style={{ backgroundColor: "transparent" }}
        ></Col>

        <Col 
          md={{ offset: 1 }} 
          style={{ backgroundColor: "transparent" }}
          >
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
