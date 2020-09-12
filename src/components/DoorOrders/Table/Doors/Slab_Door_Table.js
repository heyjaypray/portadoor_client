import React, { useState, Fragment, useEffect } from 'react';
import {
  Table,
  Input,
  Row,
  Col,
  Button
} from 'reactstrap';
import 'semantic-ui-css/semantic.min.css';
import { Field } from 'redux-form';
import Maker from '../../MakerJS/Maker';
import 'react-widgets/dist/css/react-widgets.css';
import { renderField, renderFieldDisabled, renderCheckboxToggle, renderPrice } from '../../../RenderInputs/renderInputs';
import RenderPriceHolder from '../../../RenderInputs/RenderPriceHolder';

const required = value => (value ? undefined : 'Required');

const Slab_Door_Table = ({ fields, formState, i, prices, subTotal, part, updateSubmit, doorOptions, edit }) => {

  const [width, setWidth] = useState([]);
  const [height, setHeight] = useState([]);



  useEffect(() => {

    let init = [];
    setWidth(init);
    setHeight(init);

  }, [updateSubmit]);

  const w = (e, v, i) => {
    e.preventDefault();
    let newWidth = [...width];
    if (width[i]) {
      newWidth.splice(i, 1, v);
    } else {
      newWidth = [...newWidth, v];
    }
    setWidth(newWidth);
  };

  const h = (e, v, i) => {
    e.preventDefault();
    let newHeight = [...height];
    if (height[i]) {
      newHeight.splice(i, 1, v);
    } else {
      newHeight = [...newHeight, v];
    }
    setHeight(newHeight);
  };


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
                          disabled={edit}
                          className="form-control"
                          placeholder={'$' + prices[i][index].toFixed(2) || 0}
                        /> :
                        <Input
                          type="text"
                          disabled={edit}
                          className="form-control"
                          placeholder={'$0.00'}
                        />
                      }

                    </td>
                    <td>
                      {!edit ?
                        <Button color="danger" className="btn-circle" onClick={() => fields.remove(index)}>
                          X
                        </Button>
                        :
                        <div />
                      }
                    </td>
                  </tr>

                  <tr />
                </tbody>

              </Table>





              <Row>
                <Col lg='9'>
                  {(height[index] > 0) ?
                    <Field name={`${table}.showBuilder`} component={renderCheckboxToggle} label="Show Builder" />
                    :
                    null}
                </Col>
                <Col>
                  {!edit ?
                    (parseInt(formState.part_list[i].dimensions[index].panelsH) > 1 && parseInt(formState.part_list[i].dimensions[index].panelsW) === 1) ? <Field name={`${table}.unevenCheck`} component={renderCheckboxToggle} label="Uneven Split" /> : null
                    :
                    null
                  }
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
                            <p style={{ textAlign: 'center', marginTop: '10px' }}><strong>Panel Opening {index + 1}</strong></p>
                            <Field
                              name={`${table}.unevenSplitInput${index}`}
                              component={renderField}
                              edit={edit}
                            />
                          </Col>
                          <Col />
                        </div>
                      );
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
                    edit={edit}
                    label="notes"
                  />
                </Col>
                <Col xs='5' />
                <Col xs='3'>
                  <strong>Extra Design Cost</strong>
                  <Field
                    name={`${table}.extraCost`}
                    type="text"
                    component={renderPrice}
                    edit={edit}
                    label="extraCost"
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
                    fields.push({
                      showBuilder: false,
                      item: fields.length + 1
                    })
                  }
                >
                  +
                </Button> : <div />
              }
            </Col>
          </Row>

          <Row>
            <Col xs="4" />
            <Col xs="5" />
            <Col xs="3">
              <strong>Sub Total: </strong>
              {subTotal[i] ? (
                <RenderPriceHolder input={subTotal[i].toFixed(2)} edit={true} />
              ) : (
                <RenderPriceHolder input={'0.00'} edit={true} />
              )}
            </Col>
          </Row>
        </Fragment>
      </div> : <div />
  );
};

export default Slab_Door_Table;