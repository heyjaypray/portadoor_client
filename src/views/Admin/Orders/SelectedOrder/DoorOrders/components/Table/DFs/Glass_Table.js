import React, { useState, Fragment, useEffect } from "react";
import {
  Label,
  Table,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";
import 'semantic-ui-css/semantic.min.css';
import { Field, change } from "redux-form";
import Ratio from "lb-ratio";
import Maker from '../../MakerJS/Maker';
import 'react-widgets/dist/css/react-widgets.css';
import { renderMultiSelect, renderDropdownList, renderDropdownListFilter, renderField, renderFieldDisabled, renderCheckboxToggle } from '../../RenderInputs/renderInputs'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numQty from 'numeric-quantity'


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

const Cope_Table = ({ fields, formState, i, prices, subTotal, part, updateSubmit, doorOptions, dispatch, edit }) => {

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

  const updateFullFrame = (e, index) => {
    const part = formState.part_list[i]

    if (e) {
      dispatch(
        change(
          'DoorOrder',
          `part_list[${i}].dimensions[${index}].topRail`,
          fraction(part.profile ? (part.profile.MINIMUM_STILE_WIDTH + part.cope_design.TOP_RAIL_ADD) : 0)
        )
      );

      dispatch(
        change(
          'DoorOrder',
          `part_list[${i}].dimensions[${index}].bottomRail`,
          fraction(part.profile ? (part.profile.MINIMUM_STILE_WIDTH + part.cope_design.BTM_RAIL_ADD) : 0)
        )
      );
    } else {
      dispatch(
        change(
          'DoorOrder',
          `part_list[${i}].dimensions[${index}].topRail`,
          fraction(part.profile ? (part.profile.DF_Reduction) : 0)
        )
      );

      dispatch(
        change(
          'DoorOrder',
          `part_list[${i}].dimensions[${index}].bottomRail`,
          fraction(part.profile ? (part.profile.DF_Reduction) : 0)
        )
      );
    }

  }



  return (
    formState ?
      <div>
        <Fragment>
          {fields.map((table, index) => (
            <Fragment key={index}>


              <Table>

                <Field
                  name={`${table}.item`}
                  type="text"
                  component={renderFieldDisabled}
                  label="item"
                />

                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Field
                        name={`${table}.qty`}
                        type="text"
                        component={renderField}
                        label="qty"
                        validate={required}
                        edit={edit}
                      />
                    </td>
                    <td>
                      <Field
                        name={`${table}.width`}
                        type="text"
                        component={renderField}
                        onBlur={e => w(e, formState.part_list[i].dimensions[index].width, index)}
                        label="width"
                        validate={required}
                        edit={edit}
                      />
                    </td>

                    <td>
                      <Field
                        name={`${table}.height`}
                        type="text"
                        component={renderField}
                        onBlur={e => h(e, formState.part_list[i].dimensions[index].height, index)}
                        label="height"
                        validate={required}
                        edit={edit}
                      />
                    </td>

                    <td>
                      {prices[i] ?
                        <Input
                          type="text"
                          className="form-control"
                          disabled={edit}
                          placeholder={"$" + prices[i][index].toFixed(2) || 0}
                        /> :
                        <Input
                          type="text"
                          className="form-control"
                          placeholder={"$0.00"}
                        />
                      }

                    </td>
                    <td>
                    {!edit ?
                        <Button color="danger" className="btn-circle" onClick={() => fields.remove(index)}>
                          X
                        </Button>
                        : <div />
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>
                        <p>Left Stile</p>
                      </strong>
                      <Field
                        name={`${table}.leftStile`}
                        type="text"
                        component={renderField}
                        label="leftStile"
                        edit={edit}
                      />
                    </td>
                    <td>
                      <strong>
                        <p>Right Stile</p>
                      </strong>
                      <Field
                        name={`${table}.rightStile`}
                        type="text"
                        component={renderField}
                        label="rightStile"
                        edit={edit}

                      />
                    </td>
                    <td>
                      <strong>
                        <p>Top Rail</p>
                      </strong>
                      <Field
                        name={`${table}.topRail`}
                        type="text"
                        component={renderField}
                        label="topRail"
                        edit={edit}

                      />
                    </td>
                    <td>
                      <strong>
                        <p>Bottom Rail</p>
                      </strong>
                      <Field
                        name={`${table}.bottomRail`}
                        type="text"
                        component={renderField}
                        label="bottomRail"
                        edit={edit}
                      />
                    </td>
                  </tr>
                  <Row>
                    <p className="ml-3">*Finish Stile/Rail Sizes*</p>
                  </Row>
                  <tr />
                </tbody>

              </Table>





              <Row>
                <Col lg='9'>
                  {numQty(height[index]) > 0 ?
                    <Field
                      name={`${table}.showBuilder`}
                      component={renderCheckboxToggle}
                      label="Show Builder" />
                    : null
                  }

                </Col>
                <Col>
                {!edit ?
                  <Field
                    name={`${table}.full_frame`}
                    component={renderCheckboxToggle}
                    onChange={(e) => updateFullFrame(e, index)}
                    label="Full Frame"
                    />
                    : null }
                </Col>
              </Row>

              <Row>
                <Col>
                  {((numQty(height[index]) > 0) && formState.part_list[i].dimensions[index].showBuilder) ?
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
                    edit={edit}
                  />
                </Col>

              </Row>
              <br />
            </Fragment>
          ))}
          <Row>
            <Col>
            {!edit ?
              <Button
                color="primary"
                className="btn-circle"
                onClick={(e) =>
                  (
                    (formState.part_list[formState.part_list.length - 1].construction.value === "Glass" && formState.part_list[formState.part_list.length - 1].profile) ?
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
                          formState.part_list[formState.part_list.length - 1].profile.DF_Reduction
                        ),
                        bottomRail: fraction(
                          formState.part_list[formState.part_list.length - 1].profile.DF_Reduction
                        ),
                        horizontalMidRailSize: 0,
                        verticalMidRailSize: 0,
                        unevenSplitInput: "0",
                        showBuilder: false,
                        full_frame: false,
                        item: fields.length + 1
                      })
                      : alert('please select a profile')
                  )}
              >
                +
                </Button>
                : null }
            </Col>
          </Row>

          <Row>
            <Col xs="4" />
            <Col xs="5" />
            <Col xs="3">
              <strong>Addtional Price: </strong>
              <Field
                name={`${part}.addPrice`}
                type="text"
                component={renderField}
                label="addPrice"
                edit={edit}
              />
              <strong>Sub Total: </strong>
              {subTotal[i] ? (
                <Input placeholder={subTotal[i].toFixed(2) || 0} disabled={edit} />

              ) : (
                  <Input placeholder="0" />
                )}
            </Col>
          </Row>
        </Fragment>
      </div> : <div />
  )
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {


    },
    dispatch
  );


export default connect(
  mapStateToProps,
  null
)(Cope_Table);
