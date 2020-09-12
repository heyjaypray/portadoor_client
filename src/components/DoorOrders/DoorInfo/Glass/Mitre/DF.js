import React, { Component } from 'react';
import {
  Row,
  Col,
  CardSubtitle,
  FormGroup,
  Label
} from 'reactstrap';
import { Field, FieldArray, change } from 'redux-form';
import { connect } from 'react-redux';

import { renderDropdownList, renderDropdownListFilter, renderField } from '../../../../RenderInputs/renderInputs';
import Miter_Table from '../../../Table/DFs/Miter_Table';
import Ratio from 'lb-ratio';
import {
  linePriceSelector,
  itemPriceSelector,
  subTotalSelector
} from '../../../../../selectors/doorPricing';

const required = value => (value ? undefined : 'Required');

const fraction = num => {
  let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
  return fraction.toLocaleString();
};

class MiterDF extends Component {


  onChangeProfile = () => {
    const part_list = this.props.formState.part_list;
    const { index } = this.props;
    const part = part_list[index];



    if (part.dimensions) {
      part.dimensions.forEach((info, j) => {

        this.props.dispatch(
          change(
            'DoorOrder',
            `part_list[${index}].dimensions[${j}].leftStile`,
            fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
          )
        );

        this.props.dispatch(
          change(
            'DoorOrder',
            `part_list[${index}].dimensions[${j}].rightStile`,
            fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
          )
        );

        if (info.full_frame) {
          this.props.dispatch(
            change(
              'DoorOrder',
              `part_list[${index}].dimensions[${j}].topRail`,
              fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
            )
          );


          this.props.dispatch(
            change(
              'DoorOrder',
              `part_list[${index}].dimensions[${j}].bottomRail`,
              fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
            )
          );
        } else {
          this.props.dispatch(
            change(
              'DoorOrder',
              `part_list[${index}].dimensions[${j}].topRail`,
              fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
            )
          );


          this.props.dispatch(
            change(
              'DoorOrder',
              `part_list[${index}].dimensions[${j}].bottomRail`,
              fraction(part.miter_df_design ? part.miter_df_design.PROFILE_WIDTH : 0)
            )
          );
        }
      });
    }
  }

  render() {
    const {
      part,
      woodtypes,
      miter_designs,
      panels,
      finishes,
      isValid,
      index,
      part_list,
      formState,
      prices,
      subTotal,
      lites,
      edit
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs="12" md='12' lg="3">
            <FormGroup>
              <Label htmlFor="woodtype">Woodtype</Label>
              <Field
                name={`${part}.woodtype`}
                component={renderDropdownListFilter}
                data={woodtypes}
                valueField="value"
                textField="NAME"
                validate={required}
                edit={edit}
              />
            </FormGroup>
          </Col>

          <Col xs="12" md='12' lg="3">
            <FormGroup>
              <Label htmlFor="design">Design</Label>
              <Field
                name={`${part}.miter_df_design`}
                component={renderDropdownListFilter}
                data={miter_designs}
                valueField="value"
                textField="NAME"
                validate={required}
                onBlur={() => this.onChangeProfile()}
                edit={edit}
              />
            </FormGroup>
          </Col>

          <Col xs="12" md='12' lg="3">
            <FormGroup>
              <Label htmlFor="design">Lites</Label>
              <Field
                name={`${part}.lite`}
                component={renderDropdownListFilter}
                data={lites}
                valueField="value"
                textField="NAME"
                validate={required}
                edit={edit}
              />
            </FormGroup>
          </Col>

          <Col xs="12" md='12' lg="3">
            <FormGroup>
              <Label htmlFor="hinges">Finish Color</Label>
              <Field
                name={`${part}.finish`}
                component={renderDropdownList}
                data={finishes}
                valueField="value"
                textField="NAME"
                validate={required}
                edit={edit}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs="12" md='12' lg="4">
            <FormGroup>
              <strong>
                <Label for="jobNotes">Job Notes</Label>
                <Field
                  name={`${part}.notes`}
                  type="textarea"
                  component={renderField}
                  edit={edit}
                />
              </strong>
            </FormGroup>
          </Col>
        </Row>

        <div>
          <CardSubtitle className="mt-4 mb-1">Dimensions</CardSubtitle>
          <div className="mt-1" />
          <FieldArray
            name={`${part}.dimensions`}
            component={Miter_Table}
            i={index}
            prices={prices}
            subTotal={subTotal}
            part_list={part_list}
            formState={formState}
            isValid={isValid}
            part={part}
            edit={edit}
          // updateSubmit={updateSubmit}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  woodtypes: state.part_list.woodtypes,
  miter_designs: state.part_list.miter_DF_designs,
  panels: state.part_list.panels,
  finishes: state.part_list.finishes,
  lites: state.part_list.lites,
  prices: linePriceSelector(state),
  itemPrice: itemPriceSelector(state),
  subTotal: subTotalSelector(state),
});


export default connect(
  mapStateToProps,
  null
)(MiterDF);