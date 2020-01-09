import React, { Component, Fragment } from 'react';
import {
  Button,
  Table,
  Input,
  FormFeedback,
  FormText,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, change } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';

const required = value => value ? undefined : 'Required';


const renderField = ({ input, props, meta: { touched, error, warning }, ...custom }) => (
  <Fragment>
    <Input autocomplete="new-password" {...input} {...custom} />
    {error && <FormFeedback>{error}</FormFeedback>}
    {!error && warning && <FormText>{warning}</FormText>}
  </Fragment>
);

const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) => (
  <div style={{ "width": "90px" }}>
    <DropdownList {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange}
    />
    {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span style={{ color: 'red' }}>{warning}</span>))}
  </div>
);


class OrderTable extends Component {

  render() {

    const { fields, scoop, dividers, prices, i, subTotal, part } = this.props;


    if (prices.length > 0) {
      return (
        <div>
          <Fragment>
            {fields.map((table, index) =>
              < Fragment key={index} >
                <Table>
                  <thead>
                    <tr>
                      <th>Qty</th>
                      <th>Width</th>
                      <th>Depth</th>
                      <th>Height</th>
                      <th>Scoop</th>
                      <th>Divider</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Field
                          name={`${table}.qty`}
                          type="text"
                          component={renderField}
                          label="qty" />
                      </td>
                      <td>
                        <Field
                          name={`${table}.width`}
                          type="text"
                          component={renderField}
                          label="width" />
                      </td>
                      <td>
                        <Field
                          name={`${table}.depth`}
                          type="text"
                          component={renderField}
                          label="depth" />
                      </td>
                      <td>
                        <Field
                          name={`${table}.height`}
                          type="text"
                          component={renderField}
                          label="height" />
                      </td>
                      <td >
                        <Field
                          name={`${table}.scoop`}
                          component={renderDropdownList}
                          data={scoop}
                          valueField="Value"
                          textField="Name"
                          validate={required} />
                      </td>
                      <td>
                        <Field
                          name={`${table}.dividers`}
                          component={renderDropdownList}
                          data={dividers}
                          valueField="Value"
                          textField="Name"
                          validate={required} />
                      </td>
                      <td>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder={"$" + prices[i][index].toFixed(2) || 0}
                          disabled
                        />

                     
                      </td>

                      <td >
                        <Button color="danger" className="btn-circle" onClick={() => fields.remove(index)}>X</Button>
                      </td>

                    </tr>


                    <tr>

                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col>
                    <strong>Notes</strong>
                    <Field
                      name={`${table}.notes`}
                      type="textarea"
                      component={renderField}
                      label="notes" />
                  </Col>
                  <Col>
                  </Col>
                  <Col></Col>
                </Row>
                <br />

              </Fragment>

            )}
            <Button color="primary"
              className="btn-circle" onClick={() => fields.push({
                scoop: scoop[0],
                dividers: dividers[0]
              })}>+</Button>
            <Row>
              <Col xs="4" />
              <Col xs="5" />
              <Col xs="2">
                <strong>Addtional Price: </strong>
                <Field
                  name={`${part}.addPrice`}
                  type="text"
                  component={renderField}
                  label="addPrice" />
                <strong>Sub Total: </strong>
                {subTotal[i] ? (
                  <Input placeholder={subTotal[i].toFixed(2) || 0} />
                ) : (
                    <Input placeholder="0" />
                  )}
              </Col>
            </Row>
          </Fragment >
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      )
    }


  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setMain: (table) => dispatch(change(`Orders`, `${table}.price`, 5))
}, dispatch);

export default connect(null, mapDispatchToProps)(OrderTable);