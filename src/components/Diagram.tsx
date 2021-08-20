import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  ConnectorPlacement,
  DiagramMaker,
  DiagramMakerActions,
  DiagramMakerData,
  DiagramMakerConfig,
  DiagramMakerEdge,
  DiagramMakerNode,
  DiagramMakerPotentialNode,
  EditorMode,
  Size,
} from 'diagram-maker';
import {
  IWorkflowEdge,
  IWorkflowNode,
  nodeWidth,
  nodeHeight,
} from '../services/diagram';
import StepLibraryPanel from './StepLibraryPanel';
import Node from './Node';

import 'diagram-maker/dist/diagramMaker.css';
import '../styles/diagram';

/** Displays a diagram */
export default function Diagram() {
  const container = useRef<HTMLDivElement>(null);
  let diagramMaker:DiagramMaker<IWorkflowNode, IWorkflowEdge>;

  const libraryPanelWidth = 250;

  /** Calculates the height of the diagram content div */
  const getWorkspaceHeight = () => {
    return ($('#root').outerHeight() ?? 600) - ($('#headerContainer').outerHeight() ?? 0);
  }

  /** Calcualtes the width of the diagram content div */
  const getWorkspaceWidth = () => {
    return (($('#root').outerWidth() ?? 1000) - ($('#navmenuContainer').outerWidth() ?? 0));
  }

  const config:DiagramMakerConfig<IWorkflowNode, IWorkflowEdge> = {
    options: {
      connectorPlacement: ConnectorPlacement.TOP_BOTTOM,
      showArrowhead: true
    },
    renderCallbacks: {
      node: (node: DiagramMakerNode<IWorkflowNode>, diagramContainer: HTMLElement) =>
        ReactDOM.render(<Node
          id={node.id}
          displayName="Node"
          selected={node.diagramMakerData.selected} />, diagramContainer),
      potentialNode: (node: DiagramMakerPotentialNode, diagramContainer: HTMLElement) => {
        ReactDOM.render(<Node
          displayName="Node" />, diagramContainer)
      },
      panels: {
        library: (panel: any, state: any, diagramContainer: HTMLElement) => {
          ReactDOM.render(<StepLibraryPanel />, diagramContainer);
        },
      },
      destroy: (cont: HTMLElement) => ReactDOM.unmountComponentAtNode(cont)
    },
  };

  useEffect(() => {
    const nodes: {[id:string]: DiagramMakerNode<IWorkflowNode>} = {};
    const edges: {[id:string]: DiagramMakerEdge<IWorkflowEdge>} = {};

    const workspaceWidth = getWorkspaceWidth();
    const workspaceHeight = getWorkspaceHeight();

    nodes['n1'] = {
      id: 'n1',
      typeId: 'node',
      diagramMakerData: {
        position: {
          x: libraryPanelWidth + 30,
          y: 30
        },
        size: { width: nodeWidth, height: nodeHeight },
      },
    };

    nodes['n2'] = {
      id: 'n2',
      typeId: 'node',
      diagramMakerData: {
        position: {
          x: libraryPanelWidth + 30,
          y: 30 + nodeHeight + 30
        },
        size: { width: nodeWidth, height: nodeHeight },
      },
    };

    nodes['n3'] = {
      id: 'n3',
      typeId: 'node',
      diagramMakerData: {
        position: {
          x: libraryPanelWidth + 30,
          y: 30 + (nodeHeight * 2) + (30 * 2)
        },
        size: { width: nodeWidth, height: nodeHeight },
      },
    };

    edges.e1 = {
      id: 'e1',
      src: 'n1',
      dest: 'n2',
      diagramMakerData: {}
    };

    edges.e2 = {
      id: 'e2',
      src: 'n2',
      dest: 'n3',
      diagramMakerData: {}
    };

    const canvasSize:Size = {
      width: workspaceWidth * 2,
      height: workspaceHeight * 2
    };

    const initialData:DiagramMakerData<IWorkflowNode, IWorkflowEdge> = {
      nodes,
      edges,
      workspace: {
        position: { x: 0, y: 0 },
        scale: 1,
        canvasSize,
        viewContainerSize: {
          width: workspaceWidth,
          height: workspaceHeight
        }
      },
      editor: { mode: EditorMode.DRAG },
      panels: {
        library: {
          id: 'library',
          position: { x: 0, y: 0 },
          size: {
            width: libraryPanelWidth,
            height: workspaceHeight
          },
        },
      }
    };

    diagramMaker = new DiagramMaker(
      container.current as HTMLElement,
      config,
      {
        initialData,
      }
    );

    window.addEventListener('resize', () => {
      const newHeight = getWorkspaceHeight();
      diagramMaker.updateContainer();
      diagramMaker.api.dispatch({
        type: DiagramMakerActions.PANEL_RESIZE,
        payload: {
          id: 'library',
          size: {
            width: libraryPanelWidth,
            height: newHeight,
          }
        }
      });
    });

    return () => {
      if (container.current != null) {
        diagramMaker.destroy();
      }
    };
  }, []);

  return <div id="diagram" ref={container} />;
}
