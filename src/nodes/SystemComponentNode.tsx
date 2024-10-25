import { useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { AppNode, type SystemComponentNode } from "./types";
import "./nodes.css";
import { Button } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { EditNodeForm } from "../views/component_design/EditNodeForm";
import { useSystemDesignState } from "../state/FlowStateContext";

export function SystemComponentNode({
  id,
  data, // Contains the node's data, including "notes"
}: NodeProps<SystemComponentNode>) {
  // Local state for input (you could also use the data.notes initially)

  const { systemDesignState, setSystemDesignState } = useSystemDesignState();
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(data.label || "node: " + id);
  const [color, setColor] = useState(data.color || "white");
  const [shape, setShape] = useState(data.shape || "square");
  const [leftHandle, setLeftHandle] = useState(data.leftHandle || "source");
  const [rightHandle, setRightHandle] = useState(data.rightHandle || "target");

  const [notes, setNotes] = useState(data.notes || "");
  const [showEditNodeForm, setShowEditNodeForm] = useState(false);

  // Function to handle input changes and update the notes state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    data.notes = newNotes; // Update the data with the new notes value
  };

  const handleCreateNodeFormClose = () => {
    setShowEditNodeForm(false);
    console.log(`Close Create Node Form`);
    return false;
  };

  const updateNodeView = (formData: {
    label: string;
    notes: string;
    leftHandle: string;
    rightHandle: string;
    shape: string;
    color: string;
  }) => {
    setLabel(formData.label);
    setNotes(formData.notes);
    setColor(formData.color);
    setLeftHandle(formData.leftHandle);
    setRightHandle(formData.rightHandle);
    setShape(formData.shape);
  };

  const deleteNode = () => {
    console.log("Delete Node");
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  }

  return (
    <>
      <EditNodeForm
        show={showEditNodeForm}
        id={id}
        handleClose={handleCreateNodeFormClose}
        updateNodeView={updateNodeView}
        deleteNode={deleteNode}
      />
      <div
        className={`react-flow__node-default ${shape} ${color}`}
        // style={{ backgroundColor: color }}
      >
        {/* Display node label if provided */}
        <div>
          <span>{label}</span>
          <div>
            <SettingsTwoToneIcon
              style={{ fontSize: "15px" }}
              onClick={() => setShowEditNodeForm(true)}
            ></SettingsTwoToneIcon>
          </div>
        </div>

        {/* <Button
      style={{
        width: '5px',
        height: '5px',
        fontSizeAdjust: 'true'
      }}
    >
      Hey
    </Button> */}
        <Handle
          type={leftHandle as "source" | "target"}
          position={Position.Left}
          style={{ backgroundColor: leftHandle === "source" ? "black" : "red" }}
        />
        <Handle
          type={rightHandle as "source" | "target"}
          position={Position.Right}
          style={{
            backgroundColor: rightHandle === "source" ? "black" : "red",
          }}
        />
      </div>
    </>
  );
}
