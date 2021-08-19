import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {
  getDiagramRoute,
  getHomeRoute,
} from '../services/route';

/** Represents the component's props */
interface IProps {
  /** The child elements contained by the layout */
  children: JSX.Element | Array<JSX.Element>
}

/** Displays the application layout */
export default function Layout(props:IProps) {
  return (
    <div className="h-100">
      <Nav variant="pills" defaultActiveKey={getHomeRoute()}>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={getHomeRoute()}
            eventKey={getHomeRoute()}>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={getDiagramRoute()}
            eventKey={getDiagramRoute()}>
            Diagram
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <React.Fragment>
        {props.children}
      </React.Fragment>
    </div>
  );
}
