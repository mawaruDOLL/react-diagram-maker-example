import React from 'react';
import {
  nodeHeight,
  nodeWidth,
} from '../services/diagram';
import Node from './Node';

/** Displays the list of package steps */
export default function StepLibraryPanel() {
  return (
    <div
      id="stepLibrary"
      className="bg-white h-100"
      data-event-target={true}
      data-dropzone={true}
    >

      <h5 className="text-primary text-center font-weight-bold mt-2">Node Library</h5>

      <div className="overflow-auto">
        <div className="p-1">
          <div
            className="stepLibraryNode d-flex justify-content-center"
            data-id="node"
            data-type="DiagramMaker.PotentialNode"
            data-draggable={true}
            data-event-target={true}
            data-width={nodeWidth}
            data-height={nodeHeight}
          >
            <Node displayName="Node" />
          </div>
        </div>
      </div>
    </div>
  );
}
