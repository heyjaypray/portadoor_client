import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  FormGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DoorInfo from './components/DoorInfo/DoorInfo';
import JobInfo from './components/JobInfo/JobInfo';
import 'react-notifications/lib/notifications.css';
import {
  reduxForm,
  FormSection,
  getFormValues,
  change,
  FieldArray,
} from 'redux-form';
import {
  addToCart,
  loadCustomers,
  shippingAddress,
  submitOrder,
  loadOrders,
} from '../../../../../redux/orders/actions';
import {
  linePriceSelector,
  itemPriceSelector,
  subTotalSelector,
  taxSelector,
  totalSelector,
  addPriceSelector
} from '../../../../../selectors/doorPricing';

import PropTypes from 'prop-types';
import 'react-notifications/lib/notifications.css';
import SideBar from './components/SideBar';
import Ratio from 'lb-ratio'
import Sticky from 'react-stickynode';
import moment from 'moment-business-days'
import Cookies from "js-cookie";
import { FileUploader } from 'devextreme-react';

const cookie = Cookies.get("jwt");
const header = { 'Authorization': 'Bearer ' + cookie };


class DoorOrders extends Component {
  constructor(props) {
    super(props);
    this.makerJS = React.createRef();
    this.state = {
      collapse: true,
      loaded: false,
      customerAddress: [],
      updateSubmit: false,
      files: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  reloadPage = () => {
    window.location.reload();
  };

  submit = async (values, e) => {
    const {
      reset,
      prices,
      itemPrice,
      subTotal,
      tax,
      total,
      submitOrder,
      user,
      orders
    } = this.props;

    const orderType = 'Door Order';

    console.log(values.job_info.DueDate)

    const jobInfo = {
      jobName: values.job_info.jobName,
      status: values.job_info.status,
      poNum: values.job_info.poNum,
      Address1: values.job_info.Address1,
      Address2: values.job_info.Address2,
      City: values.job_info.City,
      State: values.job_info.State,
      Zip: values.job_info.Zip,
      Phone: values.job_info.Phone,
      DueDate: values.job_info.DueDate,
      customer: {
        Company: values.job_info.customer.Company
      }
    }

    const order = {
      part_list: values.part_list,
      status: values.job_info.status,
      jobInfo: jobInfo,
      companyprofile: values.job_info.customer.id,
      linePrice: prices,
      itemPrice: itemPrice,
      subTotals: subTotal,
      tax: tax,
      total: total,
      orderType: orderType,
      dueDate: values.job_info.DueDate,
      user: user.id,
      userName: user.username,
      files: this.state.files,
      tracking: [
        {
          "status": values.job_info.status,
          "date": new Date()
        }
      ]
    };

    if (values.part_list[0].dimensions.length > 0) {
      await submitOrder(order, cookie);
      this.setState({ updateSubmit: !this.state.updateSubmit })
      reset();
      window.scrollTo(0, 0);
    } else {
      return
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.formState !== prevProps.formState) {
      if (this.props.formState) {
        const update = async () => {
          const form = await this.props.formState;
          const customer = form.job_info.customer

          await this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.Address1',
              customer.Shipping_Address1 || customer.Address1
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.Address2',
              customer.Shipping_Address2 || customer.Address2
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.City',
              customer.Shipping_City || customer.City
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.State',
              customer.Shipping_State || customer.State
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.Zip',
              customer.Shipping_Zip || customer.Zip
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'job_info.Phone',
              customer.Shipping_Phone || customer.Phone1
            )
          );
        };
        update();
      }
    }
  }

  cancelOrder = async() => {
    await this.props.reset();

    await this.props.editable();
  };

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  onUploaded = (e) => {
    const data = JSON.parse(e.request.response);
    const id = data[0].id;
    const a = [...this.state.files, id]
    this.setState({ files: a })
  }

  render() {

    const {
      submitted,
      handleSubmit,
      prices,
      subTotal,
      customers,
      formState,
      isValid,
      address,

      edit,

      total,
      dispatch,
      tax,
    } = this.props;

    console.log('TOTAL!" ',total)

    return (
      <div className="animated fadeIn resize">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <Card>
              <CardHeader>
                <strong>Door Order</strong>
              </CardHeader>
              <CardBody>
                <form onKeyPress={this.onKeyPress} onSubmit={handleSubmit(this.submit)}>

                  <FormSection name="job_info">
                    <JobInfo
                      customers={customers}
                      change={change}
                      address={address}
                      loaded={this.state.loaded}
                      handleAddress={this.handleAddress}
                      edit={edit}
                    />
                  </FormSection>

                  <FieldArray
                    name="part_list"
                    component={DoorInfo}
                    // prices={prices}
                    formState={formState}
                    // subTotal={subTotal}
                    dispatch={dispatch}
                    isValid={isValid}

                    edit={edit}

                    updateSubmit={this.state.submit}
                  />

                  <div className="mb-3" />

                  <hr />
                  <hr />
                  <Row>
                    <Col xs="4" />
                    <Col xs="5" />
                    <Col xs="3">
                      <strong>Tax: </strong>
                      <Input disabled={edit} placeholder={'$' + tax.toFixed(2)} className="mb-2" />
                      <strong>Total: </strong>
                      <Input disabled={edit} placeholder={'$' + total.toFixed(2)} className="mb-3" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4" />
                    <Col xs="5" />
                    <Col xs="3">
                      {!edit ?
                        <Row>
                          <Col>
                            <Button color="primary" className="submit" style={{ width: "100%" }}>Submit</Button>
                          </Col>
                          <Col>
                            <Button color="danger" onClick={this.cancelOrder} style={{ width: "100%" }}>
                              Cancel
                            </Button>
                          </Col>
                        </Row> :
                        <div />
                    }
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {


  return {
    initialValues: props.selectedOrder[0],
    order: props.selectedOrder[0],
    customers: state.Orders.customerDB,
    customerDBLoaded: state.Orders.customerDBLoaded,

    user: state.users.user,

    woodtypes: state.part_list.woodtypes,
    cope_designs: state.part_list.cope_designs,
    edges: state.part_list.edges,
    finishes: state.part_list.finishes,
    panels: state.part_list.panels,
    profiles: state.part_list.profiles,
    applied_moulds: state.part_list.applied_moulds,

    part_list: props.selectedOrder[0].part_list,
    submitted: state.Orders.submitted,

    formState: getFormValues('DoorOrder')(state),
    // prices: linePriceSelector(state),
    // itemPrice: itemPriceSelector(state),
    // subTotal: subTotalSelector(state),
    total: totalSelector(state),
    tax: taxSelector(state),
    addPriceSelector: addPriceSelector(state)
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addToCart,
      loadCustomers,
      submitOrder,
      loadOrders,
    },
    dispatch
  );

// eslint-disable-next-line no-class-assign
DoorOrders = reduxForm({
  form: 'DoorOrder',
  enableReinitialize: true,
})(DoorOrders);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoorOrders);