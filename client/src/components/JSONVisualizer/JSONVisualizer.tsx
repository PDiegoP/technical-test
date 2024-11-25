import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
} from "@xyflow/react";
import CustomNode from "../CustomNode/CustomNode";
const BASE_URL = import.meta.env.VITE_API_URL;
import "@xyflow/react/dist/style.css";

const JSONVisualizer = ({ source }) => {
  const [data, setData] = useState({});
  async function getData(url: string): Promise<void> {
    try {
      if (source) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(url, {
          method: "POST",
          body: source,
          headers: myHeaders,
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        console.log(response);

        const json = await response.json();
        setData(json);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();

  const nodesTypes = {
    customNode: CustomNode,
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  useEffect(() => {
    const url = `${BASE_URL}/api/visualize`;
    getData(url);
  }, [source]);

  useEffect(() => {
    const _nodes = data?.newNodes || [];
    const _edges = data?.newEdges || [];
    for (let el in _nodes) {
      _nodes[el].type = "customNode";
      _nodes[el].style = {};
    }
    setNodes(_nodes);
    setEdges(_edges);
  }, [data]);
  return (
    <div className="JSONVisualizer">
      <ReactFlow
        nodes={nodes || []}
        edges={edges || []}
        onConnect={onConnect}
        nodeTypes={nodesTypes}
      >
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default JSONVisualizer;
