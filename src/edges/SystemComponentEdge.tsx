import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EdgeDetailsForm } from "./EdgeDetailsForm";
import { AppNode } from "../nodes/types";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { CreateEdgeForm } from "./CreateEdgeForm";

interface SystemComponentEdgeProps extends EdgeProps{
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
  data: {
    dataFlow: string;
    notes: string;
  }
}

export default function SystemComponentEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  data,
}: SystemComponentEdgeProps) {
  const { setEdges, getNode, getEdge, updateEdge } = useReactFlow();

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const sourceNode = getNode(source);
  
  const targetNode = getNode(target);

  const [showEditEdgeForm, setShowEditEdgeForm] = useState(true);

  const [showCreateEdgeForm, setShowCreateEdgeForm] = useState(true);

  const [notes, setNotes] = useState<string>("");

  const [label, setLabel] = useState<string>("0 -> 1");

  const [dataFlow, setDataFlow] = useState(data.dataFlow);

  const handleEdgeUpdate = ( data: { dataFlow: string, notes: string } ) => {
    console.log('handleEdgeUpdate');
    const currentEdge = getEdge(id);
    const updatedEdge = {
      id,
      source,
      target,
      sourceX,
      sourceY,
      targetX,
      targetY,
      data: data, // update dataFlow
    };

    setDataFlow(data.dataFlow);
    
    if (currentEdge) {
      updateEdge(currentEdge.id as string, updatedEdge);
      console.log(`Edge updated: ${id} with dataFlow: ${data}`);
    } else {
      console.log(`ERROR: Edge Doesn't Exist`);
    } 
  };

  const handleEditEdgeFormClose = () => {
    setShowCreateEdgeForm(false);
    setShowEditEdgeForm(false);
    console.log(`Close Edge Form`);
    return true;
  };

  const handleCreateEdgeFormClose = () => {
    setShowCreateEdgeForm(false);
    console.log(`Close Edge Form`);
    return true;
  };


  const handleFlipEdge = () => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          // Swap source and target
          return {
            ...edge,
            source: target,
            target: source,
            sourceX: targetX,
            sourceY: targetY,
            targetX: sourceX,
            targetY: sourceY,
          };
        }
        return edge;
      })
    );
    console.log(`Flipped edge: ${id}`);
  };

  const handleEditEdgeFormShow = () => {
    setShowEditEdgeForm(true);
    console.log(`Close Edge Form: ` + source + " " + target);

    console.log(`Source Node: `, sourceNode);
    console.log(`Target Node: `, targetNode);
    //console.log(`Target Node: `, getEdge());

    return true;
  };

  const handleEdgeDetailsFormSubmit = (formData: { notes: string }) => {
    setNotes(formData.notes);
  };

  const deleteEdge = () => {
    console.log("Delete Edge");
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <SettingsTwoToneIcon
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            fontSize: "15px",
          }}
          className="nodrag nopan"
          // onClick={() => {
          //     setEdges((es) => es.filter((e) => e.id !== id));
          // }}
          onClick={handleEditEdgeFormShow}
        >
          {label}
        </SettingsTwoToneIcon>
      </EdgeLabelRenderer>
      
      <EdgeDetailsForm
        show={showEditEdgeForm}
        onClose={handleEditEdgeFormClose}
        handleEdgeUpdate={handleEdgeUpdate}
        deleteEdge={deleteEdge}
        source={getNode(source) as AppNode}
        target={getNode(target) as AppNode}
        dataFlow={dataFlow}
        setDataFlow={setDataFlow}
        createForm={showCreateEdgeForm ? true : false}
      />
    </>
  );
}
