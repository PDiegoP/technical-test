import React from "react";

const Tooltip = ({ data }) => {
    let content = data;
    if (Array.isArray(content)) {
        content = data.map((el, id) => {
            <div id={`tooltipEl${id}`} className="Tooltip-Element">{el}</div>
        })
    } else if (typeof (data) === 'object') {
        content = [];
        for (let el in data) {
            content.push(<div>{data[el]}</div>)
        }
    }

    return <div className={`Tooltip`}>
        {content}
    </div>
}

export default Tooltip;