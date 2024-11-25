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

import "@xyflow/react/dist/style.css";

const JSONToSend = {
  user: {
    id: 12345,
    name: "John Doe",
    contact: {
      email: "johndoe@example.com",
      phone: "+1234567890",
    },
    address: {
      street: "123 Main St",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    preferences: {
      notifications: true,
      language: "English",
      theme: "dark",
    },
  },
  orders: [
    {
      order_id: 98765,
      product: {
        id: 5678,
        name: "Laptop",
        price: 999.99,
      },
      shipping: {
        method: "standard",
        cost: 5.99,
        address: {
          street: "456 Elm St",
          city: "Brooklyn",
          zipcode: "11201",
        },
      },
      status: "shipped",
      date: "2024-11-20",
    },
    {
      order_id: 98766,
      product: {
        id: 5679,
        name: "Headphones",
        price: 199.99,
      },
      shipping: {
        method: "express",
        cost: 15.99,
        address: {
          street: "789 Oak St",
          city: "Queens",
          zipcode: "11354",
        },
      },
      status: "processing",
      date: "2024-11-22",
    },
  ],
};

const JSONVisualizer = () => {
  const [data, setData] = useState({});
  async function getData(url: string): Promise<void> {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(JSONToSend),
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setData(json);
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
    const url = `http://localhost:5000/api/visualize`;
    getData(url);
  }, []);

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
