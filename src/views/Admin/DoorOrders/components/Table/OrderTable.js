import React, { useState, Fragment, useEffect } from "react";
import {
  Label,
  Table,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";
import { Checkbox as CheckboxUI } from 'semantic-ui-react';
// import Checkbox from 'material-ui/Checkbox'
import 'semantic-ui-css/semantic.min.css';
import { Field } from "redux-form";
import Ratio from "lb-ratio";
import Maker from '../MakerJS/Maker';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';
import PanelsTable from './Table'
import GlassTable from './Glass'
import { renderMultiSelect, renderDropdownList, renderDropdownListFilter, renderField, renderFieldDisabled, renderCheckboxToggle } from '../RenderInputs/renderInputs'


const required = value => (value ? undefined : 'Required');


const unevenDirection = [
  {
    name: 'Top to Bottom',
    value: 'Top'
  },
  {
    name: 'Bottom to Top',
    value: "Bottom"
  }
];




const fraction = num => {
  let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
  return fraction.toLocaleString();
};

const OrderTable = ({ fields, formState, i, prices, subTotal, part, updateSubmit, doorOptions }) => {

  const [width, setWidth] = useState([])
  const [height, setHeight] = useState([])



  useEffect(() => {

    let init = []
    setWidth(init)
    setHeight(init)

  }, [updateSubmit])

  const w = (e, v, i) => {
    e.preventDefault();
    let newWidth = [...width]
    if (width[i]) {
      newWidth.splice(i, 1, v)
    } else {
      newWidth = [...newWidth, v]
    }
    setWidth(newWidth);
  }

  const h = (e, v, i) => {
    e.preventDefault();
    let newHeight = [...height]
    if (height[i]) {
      newHeight.splice(i, 1, v)
    } else {
      newHeight = [...newHeight, v]
    }
    setHeight(newHeight);
  }


  return (
    formState ?
      <div>
        <Fragment>
          {fields.map((table, index) => (
            <Fragment key={index}>


              <PanelsTable
                table={table}
                index={index}
                required={required}
                w={w}
                formState={formState}
                i={i}
                h={h}
                prices={prices}
                fields={fields}
              />





              <Row>
                <Col lg='9'>
                  {(height[index] > 0) ?
                    <Field name={`${table}.showBuilder`} component={renderCheckboxToggle} label="Show Builder" />
                    :
                    null}
                </Col>
                <Col>
                  {(parseInt(formState.part_list[i].dimensions[index].panelsH) > 1 && parseInt(formState.part_list[i].dimensions[index].panelsW) === 1) ? <Field name={`${table}.unevenCheck`} component={renderCheckboxToggle} label="Uneven Split" /> : null}
                </Col>
              </Row>

              <Row>
                <Col>

                  {(height[index] > 0 && formState.part_list[i].dimensions[index].showBuilder) ?
                    <div id={`makerJS${index}`} style={{ width: '100%', height: '300px' }}>
                      <Maker
                        width={width[index]}
                        height={height[index]}
                        i={i}
                        index={index}
                        style={{ width: '100%', height: '300px' }}
                      />
                    </div> : <div />
                  }


                </Col>
              </Row>

              {formState.part_list[i].dimensions[index].unevenCheck ?
                <div className='mb-3'>
                  <Row>
                    {Array.from(Array(parseInt(formState.part_list[i].dimensions[index].panelsH)).keys()).slice(1).map((i, index) => {
                      return (
                        <div>
                          <Col />
                          <Col>
                            <p style={{ textAlign: 'center', marginTop: "10px" }}><strong>Panel Opening {index + 1}</strong></p>
                            <Field
                              name={`${table}.unevenSplitInput${index}`}
                              component={renderField}
                            />
                          </Col>
                          <Col />
                        </div>
                      )
                    })}
                  </Row>
                </div>
                : null
              }

              <Row>
                <Col xs="4">
                  <strong>Notes</strong>
                  <Field
                    name={`${table}.notes`}
                    type="textarea"
                    component={renderField}
                    label="notes"
                  />
                </Col>

              </Row>
              <br />
            </Fragment>
          ))}
          <Row>
            <Col>
              <Button
                color="primary"
                className="btn-circle"
                onClick={(e) =>
                  ((formState.part_list[formState.part_list.length - 1].construction.value === "M" && formState.part_list[formState.part_list.length - 1].design) ?
                    fields.push({
                      panelsH: 1,
                      panelsW: 1,
                      leftStile: fraction(
                        formState.part_list[formState.part_list.length - 1].design.PROFILE_WIDTH
                      ),
                      rightStile: fraction(
                        formState.part_list[formState.part_list.length - 1].design.PROFILE_WIDTH
                      ),
                      topRail: fraction(
                        formState.part_list[formState.part_list.length - 1].design.PROFILE_WIDTH
                      ),
                      bottomRail: fraction(
                        formState.part_list[formState.part_list.length - 1].design.PROFILE_WIDTH
                      ),
                      horizontalMidRailSize: 0,
                      verticalMidRailSize: 0,
                      unevenSplitInput: "0",
                      showBuilder: false
                    })
                    :
                    (formState.part_list[formState.part_list.length - 1].construction.value === "MT" && formState.part_list[formState.part_list.length - 1].design) ?
                      fields.push({
                        panelsH: 1,
                        panelsW: 1,
                        leftStile: fraction(
                          formState.part_list[formState.part_list.length - 1].design.MID_RAIL_MINIMUMS
                        ),
                        rightStile: fraction(
                          formState.part_list[formState.part_list.length - 1].design.MID_RAIL_MINIMUMS
                        ),
                        topRail: fraction(
                          formState.part_list[formState.part_list.length - 1].design.MID_RAIL_MINIMUMS
                        ),
                        bottomRail: fraction(
                          formState.part_list[formState.part_list.length - 1].design.MID_RAIL_MINIMUMS
                        ),
                        horizontalMidRailSize: 0,
                        verticalMidRailSize: 0,
                        unevenSplitInput: "0",
                        showBuilder: false
                      })
                      :
                      (formState.part_list[formState.part_list.length - 1].construction.value === "Cope" && formState.part_list[formState.part_list.length - 1].profile) ?
                        fields.push({
                          panelsH: 1,
                          panelsW: 1,
                          leftStile: fraction(
                            formState.part_list[formState.part_list.length - 1].profile.MINIMUM_STILE_WIDTH
                          ),
                          rightStile: fraction(
                            formState.part_list[formState.part_list.length - 1].profile.MINIMUM_STILE_WIDTH
                          ),
                          topRail: fraction(
                            formState.part_list[formState.part_list.length - 1].profile.MINIMUM_STILE_WIDTH
                          ),
                          bottomRail: fraction(
                            formState.part_list[formState.part_list.length - 1].profile.MINIMUM_STILE_WIDTH
                          ),
                          horizontalMidRailSize: 0,
                          verticalMidRailSize: 0,
                          unevenSplitInput: "0",
                          showBuilder: false
                        })
                        : alert('please select a profile')
                    )}
              >
                +
                </Button>
            </Col>
          </Row>

          <Row>
            <Col xs="4" />
            <Col xs="5" />
            {/* <Col xs="3">
              <strong>Addtional Price: </strong>
              <Field
                name={`${part}.addPrice`}
                type="text"
                component={renderField}
                label="addPrice"
              />
              <strong>Sub Total: </strong>
              {subTotal[i] ? (
                <Input placeholder={subTotal[i].toFixed(2) || 0} />

              ) : (
                  <Input placeholder="0" />
                )}
            </Col> */}
          </Row>
        </Fragment>
      </div> : <div />
  )
};

export default OrderTable;