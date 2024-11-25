import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import Tooltip from "../Tooltip/Tooltip";

const CustomNode = ({ id, data }) => {
  let _data = "";
  let isObject = false;
  let info = [];
  let extraDetails = [];

  try {
    let text = data?.label || "";
    let lastAppareance = text?.lastIndexOf("=");
    info = text.substring(lastAppareance + 1);
    extraDetails = typeof info;
  } catch (e) {
    _data = JSON.parse(data.label);
    isObject = true;
  }
  if (isObject) {
    for (let el in _data) {
      extraDetails.push([`${el}: ${typeof _data[el]}`]);
      info.push(
        <div id={`Node-KeyValuePair-${el}`} className="Node-KeyValuePair">
          <div className="Node-Key">{el}:</div>
          <div className="Node-Value">{JSON.stringify(_data[el])},</div>
        </div>
      );
    }
    //info.push(<div>{JSON.stringify('}')}</div>)
  }
  return (
    <div className="Node Node_custom">
      <Tooltip data={extraDetails} />
      <Handle position={Position.Top} type="target" />
      <div className="Node-Information">{info}</div>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};

export default memo(CustomNode);
