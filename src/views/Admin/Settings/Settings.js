import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  NavbarText
} from 'reactstrap';
import Selection from './Selection'


const Settings = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState('index')

  const toggle = () => setIsOpen(!isOpen);

  console.log(selection)

  return (
    <div>
      <Row>
        <Col>
          <Navbar color="light" light expand="md">
            <NavbarBrand onClick={() => setSelection('index')}>Settings</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Doors
              </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => setSelection('cope_door')}>
                      Cope and Stick
                </DropdownItem>
                    <DropdownItem onClick={() => setSelection('mt_door')}>
                      MT Door
                </DropdownItem>
                  <DropdownItem onClick={() => setSelection('miter_door')}>
                      Mitre Door
                </DropdownItem>
                <DropdownItem onClick={() => setSelection('face_frame')}>
                      Slab Type Door
                </DropdownItem>
                <DropdownItem onClick={() => setSelection('one_piece_door')}>
                      One Piece Door
                </DropdownItem>
                
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Drawer Fronts
              </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => setSelection('cope_df')}>
                      Cope and Stick
                </DropdownItem>
                    <DropdownItem onClick={() => setSelection('mt_df')}>
                      MT Design
                </DropdownItem>
                    <DropdownItem onClick={() => setSelection('miter_df')}>
                      Mitre Design
                </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Drawer Boxes
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Dovetail Drawer Box
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Face Frames
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Face Frames
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Pricing
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Doors
                  </DropdownItem>
                  <DropdownItem>
                      Drawer Boxes
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem>
                  <NavLink href="/components/">Account Settings</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Selection selection={selection} />
        </Col>
      </Row>
    </div>
  );
}

export default Settings