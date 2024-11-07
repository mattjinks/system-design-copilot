import { useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { type SystemComponentNode } from "./types";
import "./nodes.css";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { EditNodeForm } from "./EditNodeForm";

export function SystemComponentNode({
  id,
  data,
}: NodeProps<SystemComponentNode>) {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(data.label || "node: " + id);
  const [color, setColor] = useState(data.color || "white");
  const [shape, setShape] = useState(data.shape || "square");
  const [leftHandle, setLeftHandle] = useState(data.leftHandle || "source");
  const [rightHandle, setRightHandle] = useState(data.rightHandle || "target");

  const [notes, setNotes] = useState(data.notes || "");
  const [showEditNodeForm, setShowEditNodeForm] = useState(false);

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
  };

  return (
    <>
      <EditNodeForm
        show={showEditNodeForm}
        id={id}
        handleClose={handleCreateNodeFormClose}
        updateNodeView={updateNodeView}
        deleteNode={deleteNode}
      />
      <div className={`react-flow__node-default ${shape} ${color}`}>
        <div>
          <span>{label}</span>
          <div>
            <SettingsTwoToneIcon
              style={{ fontSize: "15px" }}
              onClick={() => setShowEditNodeForm(true)}
            ></SettingsTwoToneIcon>
          </div>
        </div>

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
