import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editor from './Editor';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { updateBreakdowns } from '../../../../../../../redux/part_list/actions';

const EditorPage = (props) => {
  const [breakdowns] = useState(props.breakdowns);
  const [topRailWidth, setTopRailWidth] = useState(false);
  const [topRailHeight, setTopRailHeight] = useState(false);
  const [bottomRailWidth, setBottomRailWidth] = useState(false);
  const [bottomRailHeight, setBottomRailHeight] = useState(false);
  const [leftStileWidth, setLeftStileWidth] = useState(false);
  const [leftStileHeight, setLeftStileHeight] = useState(false);
  const [rightStileWidth, setRightStileWidth] = useState(false);
  const [rightStileHeight, setRightStileHeight] = useState(false);
  const [panelWidth, setPanelWidth] = useState(false);
  const [panelHeight, setPanelHeight] = useState(false);

  return (
    <div>
      <h3>Breakdowns</h3>
      <Row className="mt-3">
        <Col>
          <p style={{ color: 'red' }}>**WARNING ** <br />
              EDITING THESE VALUES MAY BREAK COMPONENTS IF NOT DONE CORRECTLY. <br />
              PLEASE MAKE SURE YOUR MATH IS COMPLETE</p>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Top Rail</h4>
              </CardTitle>
              <Row>
                <Col>
                  Width
                  <Editor code={breakdowns ? breakdowns.topRail_width : ''} name={'topRail_width'} toggleEdit={setTopRailWidth}  edit={topRailWidth} />
                </Col>

              </Row>


              <div className="mt-2">
                <Button color="primary" onClick={() => setTopRailWidth(!topRailWidth)}>Edit</Button>
              </div>

            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Top Rail</h4>
              </CardTitle>
              <Row>
                <Col>
                  Height
                  <Editor code={breakdowns ? breakdowns.topRail_height : ''} name={'topRail_height'} toggleEdit={setTopRailHeight}  edit={topRailHeight} />
                </Col>
              </Row>

              <div className="mt-2">
                <Button color="primary" onClick={() => setTopRailHeight(!topRailHeight)}>Edit</Button>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Bottom Rail</h4>
              </CardTitle>
              <Row>
                <Col>
                  Width
                  <Editor code={breakdowns ? breakdowns.bottomRail_width : ''} name={'bottomRail_width'}  toggleEdit={setBottomRailWidth} edit={bottomRailWidth} />
                </Col>
              </Row>

              <div className="mt-2">
                <Button color="primary" onClick={() => setBottomRailWidth(!bottomRailWidth)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Bottom Rail</h4>
              </CardTitle>
              <Row>
                <Col>
                  Height
                  <Editor code={breakdowns ? breakdowns.bottomRail_height : ''} name={'bottomRail_height'}  toggleEdit={setBottomRailHeight} edit={bottomRailHeight} />
                </Col>
              </Row>
              <div className="mt-2">
                <Button color="primary" onClick={() => setBottomRailHeight(!bottomRailHeight)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Left Stile</h4>
              </CardTitle>
              <Row>
                <Col>
                  Width
                  <Editor code={breakdowns ? breakdowns.leftStile_width : ''} name={'leftStile_width'}  toggleEdit={setLeftStileWidth} edit={leftStileWidth} />
                </Col>
              </Row>
              <div className="mt-2">
                <Button color="primary" onClick={() => setLeftStileWidth(!leftStileWidth)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Left Stile</h4>
              </CardTitle>
              <Row>
                <Col>
                  Height
                  <Editor code={breakdowns ? breakdowns.leftStile_height : ''} name={'leftStile_height'}   toggleEdit={setLeftStileHeight} edit={leftStileHeight} />
                </Col>
              </Row>
              <div className="mt-2">
                <Button color="primary" onClick={() => setLeftStileHeight(!leftStileHeight)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Right Stile</h4>
              </CardTitle>
              <Row>
                <Col>
                  Width
                  <Editor code={breakdowns ? breakdowns.rightStile_width : ''} name={'rightStile_width'}  toggleEdit={setRightStileWidth} edit={rightStileWidth} />
                </Col>
              </Row>
              
              <div className="mt-2">
                <Button color="primary" onClick={() => setRightStileWidth(!rightStileWidth)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Right Stile</h4>
              </CardTitle>
              <Row>
                <Col>
                  Height
                  <Editor code={breakdowns ? breakdowns.rightStile_height : ''} name={'rightStile_height'}  toggleEdit={setRightStileHeight} edit={rightStileHeight} />
                </Col>
              </Row>
              
              <div className="mt-2">
                <Button color="primary" onClick={() => setRightStileHeight(!rightStileHeight)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-2">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Panel</h4>
              </CardTitle>
              <Row>
                <Col>
                  Width
                  <Editor code={breakdowns ? breakdowns.panel_width : ''} name={'panel_width'}   toggleEdit={setPanelWidth} edit={panelWidth} />
                </Col>
              </Row>

              
              <div className="mt-2">
                <Button color="primary" onClick={() => setPanelWidth(!panelWidth)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h4 style={{ textDecoration: 'underline' }}>Panel</h4>
              </CardTitle>
              <Row>
                <Col>
                  Height
                  <Editor code={breakdowns ? breakdowns.panel_height : ''} name={'panel_height'}  toggleEdit={setPanelHeight} edit={panelHeight} />
                </Col>
              </Row>
             
              <div className="mt-2">
                <Button color="primary" onClick={() => setPanelHeight(!panelHeight)}>Edit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  );
};


const mapStateToProps = (state) => ({
  breakdowns: state.part_list.breakdowns[3],
  woodtypes: state.part_list.woodtypes,
  designs: state.part_list.cope_designs,
  edges: state.part_list.edges,
  panels: state.part_list.panels,
  profiles: state.part_list.profiles,
  applied_profiles: state.part_list.applied_profiles
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateBreakdowns
    },
    dispatch
  );



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorPage);