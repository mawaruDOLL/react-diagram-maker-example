import React from 'react';
import {
  Card
} from 'react-bootstrap';
import {
  nodeHeight,
  nodeWidth,
} from '../services/diagram';

/** Represents the component's props */
interface IProps {
  /** The text displayed inside of the node */
  displayName: string,
  /** The node id, not supplied for potential nodes */
  id?: string,
  /** A flag that determines whether the node is selected, not supplied for potential nodes */
  selected?: boolean,
}

import '../styles/node';

/** Displays a workflow step node or potential node */
export default function WorkflowNode(props:IProps) {
  const inlineStyle = {
    minWidth: `${nodeWidth}px`,
    maxWidth: `${nodeWidth}px`,
    minHeight: `${nodeHeight}px`,
    maxHeight: `${nodeHeight}px`,
  };

  return <Card className={`node ${props.selected === true ? 'selected' : ''}`} style={inlineStyle}>
    <Card.Body>
      <div style={inlineStyle}>
        <div className="rounded-left d-inline-block float-left w-25 bg-primary" style={{height: `${nodeHeight - 2}px`}}>
        </div>
        <div className="d-inline-block w-75 px-1 py-1" style={{height: `${nodeHeight}px`}}>
          <div className="text-wrap text-primary">
            {props.displayName}
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>;
}