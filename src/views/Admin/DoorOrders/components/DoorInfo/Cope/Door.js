import React, { Component, useState, Fragment, useEffect } from "react";
import {
  Row,
  Col,
  CardSubtitle,
  FormGroup,
  Label,
  Button,
  Input
} from "reactstrap";
import { Field } from "redux-form";
import {
  getWoodtypes,
  getCopeDesigns,
  getEdges,
  getPanels,
  getProfiles,
  getAppliedMoulds,
  getFinish
} from "../../../../../../redux/part_list/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from "js-cookie";
import { renderMultiSelect, renderDropdownList, renderDropdownListFilter, renderField } from '../../RenderInputs/renderInputs'

const required = value => (value ? undefined : 'Required');


class CopeDoor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const cookie = await Cookies.get("jwt");
    const {
      getWoodtypes,
      getCopeDesigns,
      getEdges,
      getPanels,
      getProfiles,
      getAppliedMoulds,
      getFinish
    } = this.props;

    if(cookie){
      await getWoodtypes(cookie);
      await getCopeDesigns(cookie);
      await getEdges(cookie);
      await getPanels(cookie);
      await getProfiles(cookie);
      await getAppliedMoulds(cookie);
      await getFinish(cookie);
      
    } else {
      alert('not logged in')
    }
  }


  render() {
    const {
      part,
      woodtypes,
      cope_designs,
      edges,
      profiles,
      panels,
      applied_moulds,
      finishes
    } = this.props;
    return (
      <div>
        <Row>
          <Col xs="4">
            <FormGroup>
              <Label htmlFor="woodtype">Woodtype</Label>
              <Field
                name={`${part}.woodtype`}
                component={renderDropdownListFilter}
                data={woodtypes}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

          <Col xs="4">
            <FormGroup>
              <Label htmlFor="design">Design</Label>
              <Field
                name={`${part}.design`}
                component={renderDropdownListFilter}
                data={cope_designs}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

          <Col xs="4">
            <FormGroup>
              <Label htmlFor="mould">Edge</Label>
              <Field
                name={`${part}.edges`}
                component={renderDropdownList}
                data={edges}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>



        </Row>
        <Row>

          <Col xs="3">
            <FormGroup>
              <Label htmlFor="edge">Profile</Label>
              <Field
                name={`${part}.profile`}
                component={renderDropdownListFilter}
                data={profiles}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

          <Col xs="3">
            <FormGroup>
              <Label htmlFor="panel">Panel</Label>
              <Field
                name={`${part}.panels`}
                component={renderDropdownListFilter}
                data={panels}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

          <Col xs="3">
            <FormGroup>
              <Label htmlFor="arches">Applied Profiles</Label>
              <Field
                name={`${part}.arches`}
                component={renderDropdownListFilter}
                data={applied_moulds}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

          <Col xs="3">
            <FormGroup>
              <Label htmlFor="hinges">Finish Color</Label>
              <Field
                name={`${part}.hinges`}
                component={renderDropdownList}
                data={finishes}
                valueField="value"
                textField="NAME"
                validate={required}
              />
            </FormGroup>
          </Col>

        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  woodtypes: state.part_list.woodtypes,
  cope_designs: state.part_list.cope_designs,
  edges: state.part_list.edges,
  finishes: state.part_list.finishes,
  panels: state.part_list.panels,
  profiles: state.part_list.profiles,
  applied_moulds: state.part_list.applied_moulds,
  finishes: state.part_list.finishes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWoodtypes,
      getCopeDesigns,
      getEdges,
      getPanels,
      getProfiles,
      getAppliedMoulds,
      getFinish
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopeDoor);