import React, { Component } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
} from 'reactstrap';
import { Field, change, getFormValues } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment-business-days';
import momentLocaliser from 'react-widgets-moment';
import { renderDropdownList, renderDropdownListFilter, renderField, renderCheckboxToggle, renderTextField } from '../RenderInputs/renderInputs';
import { connect } from 'react-redux';

import status from '../../utils/status';

momentLocaliser(moment);


const required = value => value ? undefined : 'Required';



const renderDateTimePicker = ({ input: { onChange, value }, showTime, edit }) =>
  <div>

    <DateTimePicker
      onChange={onChange}
      time={showTime}
      value={!value ? null : new Date(value)}
      disabled={edit}
    />
  </div>;



class JobInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidUpdate(prevProps) {
    const { formState } = this.props;
    if (formState && formState.job_info && formState.job_info.customer) {
      if (formState.job_info.customer !== prevProps.formState.job_info.customer) {

        const customer = formState.job_info.customer;

        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.Address1',
            customer.Shipping_Address1 || customer.Address1
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.Address2',
            customer.Shipping_Address2 || customer.Address2
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.City',
            customer.Shipping_City || customer.City
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.State',
            customer.Shipping_State || customer.State
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.Zip',
            customer.Shipping_Zip || customer.Zip
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.Phone',
            customer.Shipping_Phone || customer.Phone1
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'Taxable',
            customer.Taxable
          )
        );
        this.props.dispatch(
          change(
            'DrawerOrder',
            'job_info.Notes',
            customer.Notes
          )
        );
      }
    }
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { customers, edit, shippingMethods, formState } = this.props;

    const dateDifference = moment(new Date()).businessDiff(moment(formState && formState.job_info && formState.job_info.DueDate));

    return (

      <div>
        <Row>
          <Col lg='10' />
          <Col lg='1'>
            <FormGroup>
              <Label htmlFor="dueDate">Sample</Label>
              <Field
                name="Sample"
                component={renderCheckboxToggle}
                edit={edit}
              />
            </FormGroup>
          </Col>
          <Col lg='1'>
            <FormGroup>
              <Label htmlFor="dueDate">Rush</Label>
              <Field
                name="Rush"
                component={renderCheckboxToggle}
                edit={edit}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FormGroup>
              <Label htmlFor="dueDate">Due Date</Label>

              <Field
                name="DueDate"
                showTime={false}
                component={renderDateTimePicker}
                edit={edit}
              />
              <p>{dateDifference} Business Day Lead Time</p>
            </FormGroup>
          </Col>
          <Col xs="5" />
          <Col xs='3'>
            <FormGroup>
              <Label htmlFor="shipping_method">Shipping Method</Label>
              <Field
                name="ShippingMethod"
                component={renderDropdownList}
                data={shippingMethods}
                valueField="value"
                edit={edit}
                validate={required}
                textField="NAME" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="7">
            <FormGroup>
              <Label htmlFor="companyName">Customers</Label>
              <Field
                name="customer"
                component={renderDropdownListFilter}
                data={customers}
                valueField="value"
                textField="Company"
                edit={edit}
                validate={required} />

            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="poNum">PO #</Label>
              <Field
                name="poNum"
                component={renderField}
                valueField="value"
                textField="name"
                edit={edit}
                validate={required}
              />
            </FormGroup>
          </Col>
          <Col xs="2">
            <FormGroup>
              <Label htmlFor="status">Status</Label>
              <Field
                name="status"
                component={renderDropdownList}
                data={status}
                valueField="value"
                edit={edit}
                textField="value"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <h6>Shipping Address</h6>
          </Col>
        </Row>




        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="address1">Address 1</Label>
              <Field
                name='Address1'
                type="text"
                component={renderField}
                edit={edit}
                label="Address1" />
            </FormGroup>
          </Col>





          <Col xs="6">
            <FormGroup>
              <Label htmlFor="address2">Address 2</Label>
              <Field
                name='Address2'
                type="text"
                component={renderField}
                edit={edit}
                label="Address2" />
            </FormGroup>
          </Col>

        </Row>



        <Row>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="city">City</Label>
              <Field
                name='City'
                type="text"
                component={renderField}
                edit={edit}
                label="City" />
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="state">State</Label>
              <Field
                name='State'
                type="text"
                component={renderField}
                edit={edit}
                label="State" />
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="zipcode">Zip Code</Label>
              <Field
                name='Zip'
                type="text"
                component={renderField}
                edit={edit}
                label="Zip" />
            </FormGroup>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Field
                name='Phone'
                type="text"
                component={renderField}
                edit={edit}
                label="Phone" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <FormGroup>
              <Label htmlFor="phone">Customer Note</Label>
              <Field
                name={'Notes'}
                type="text"
                component={renderTextField}
                edit={true}
                label="Notes" />
            </FormGroup>
          </Col>
        </Row>


        <hr />


      </div>
    );
  }
}


const mapStateToProps = state => ({
  formState: getFormValues('DrawerOrder')(state),
  shippingMethods: state.misc_items.shippingMethods,
});


export default connect(
  mapStateToProps,
  null
)(JobInfo);

