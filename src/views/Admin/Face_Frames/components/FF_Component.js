import React, { Component, Suspense } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  FormGroup,
  InputGroup, InputGroupAddon, InputGroupText, Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import DoorInfo from './components/DoorInfo/DoorInfo';
// import JobInfo from './components/JobInfo/JobInfo';
import 'react-notifications/lib/notifications.css';
import {
  reduxForm,
  FormSection,
  getFormValues,
  FieldArray,
  Field
} from 'redux-form';
import {
  submitOrder,
  loadOrders,
} from '../../../../redux/orders/actions';
import {
  linePriceSelector,
  itemPriceSelector,
  subTotalSelector,
  taxSelector,
  totalSelector,
  addPriceSelector,
  miscTotalSelector,
} from '../../../../selectors/doorPricing';
import 'react-notifications/lib/notifications.css';
import SideBar from '../../../../components/DoorOrders/SideBar';
import Sticky from 'react-stickynode';
import moment from 'moment-business-days';
import Cookies from 'js-cookie';
import { renderField, renderCheckboxToggle } from '../../../../components/RenderInputs/renderInputs';
import MiscItems from '../../../../components/DoorOrders/MiscItems';
import FileUploader from '../../../../components/FileUploader/FileUploader';
import NumberFormat from 'react-number-format';
import validate from '../../DoorOrders/validate';
import currencyMask from '../../../../utils/currencyMask';
import CheckoutBox from './CheckoutBox';

const DoorInfo = React.lazy(() => import('../../../../components/DoorOrders/DoorInfo/FFInfo'));
const JobInfo = React.lazy(() => import('../../../../components/JobInfo/JobInfo'));

const loading  = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

const cookie = Cookies.get('jwt');

const maxValue = max => value => value && value > max ? `Cannot be greater than ${max}%` : undefined;

const dueDate = moment(new Date()).businessAdd(7)._d;


class DoorOrders extends Component {
  constructor(props) {
    super(props);
    this.makerJS = React.createRef();
    this.state = {
      collapse: true,
      loaded: false,
      customerAddress: [],
      updateSubmit: false,
      files: [],
      subNavModal: false,
      subNavPage: 'misc',
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
      
    } = this.props;

    const orderType = 'Face Frame';

    const jobInfo = {
      ...values.job_info,
      customer: {
        id: values.job_info.customer.id,
        Company: values.job_info.customer.Company,
        TaxRate: values.job_info.customer.TaxRate,
        sale: values.job_info.customer && values.job_info.customer.sale && values.job_info.customer.sale.id,
        Taxable: values.job_info.customer.Taxable,
        Address1: values.job_info.customer.Address1,
        Address2: values.job_info.customer.Address2,
        City: values.job_info.customer.City,
        Zip: values.job_info.customer.Zip,
        Phone1: values.job_info.customer.Phone1,
        Fax: values.job_info.customer.Fax,
        Email: values.job_info.customer.Email,
        PMT_TERMS: values.job_info.customer.PMT_TERMS,
      },
    };

    const order = {
      ...values,
      status: values.job_info.status,
      Rush: values.job_info.Rush,
      Sample: values.job_info.Sample,
      job_info: jobInfo,
      companyprofile: values.job_info.customer.id,
      linePrice: prices,
      itemPrice: itemPrice,
      subTotals: subTotal,
      tax: tax,
      total: total,
      balance_due: total,
      orderType: orderType,
      dueDate: values.job_info.DueDate,
      Date: new Date(),
      user: user.id,
      userName: user.username,
      files: this.state.files,
      submittedBy: user.FirstName,
      tracking: [
        {
          'status': values.job_info.status,
          'date': new Date()
        }
      ],
      balance_history: [
        {
          'balance_paid': values.balance_paid,
          'date': new Date()
        }
      ],
      sale: values.job_info && values.job_info.customer && values.job_info.customer.sale && values.job_info.customer.sale.id,
    };


    let canSubmit = false;

    values.part_list.map(v => {
      return v.dimensions.length > 0 ? canSubmit = true : canSubmit = false;
    });


    if(canSubmit){
      await submitOrder(order, cookie);
      this.setState({ updateSubmit: !this.state.updateSubmit });
      reset();
      window.scrollTo(0, 0);
      return;
    } else {
      alert('Submission Error: Please double check your order');
      return;
    }
  };

  cancelOrder = e => {
    e.preventDefault();
    this.setState({ updateSubmit: false });
    this.props.reset();
  };

  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  onUploaded = (e) => {
    const id = e.map(i => (i.id));
    const a = [...this.state.files, id];
    this.setState({ files: a });
  }

  onSubNav = (nav) => {
    this.setState({
      subNavModal: !this.state.subNavModal,
      subNavPage: nav
    });
  };

  render() {

    const {
      submitted,
      handleSubmit,
      customers,
      formState,
      isValid,
      address,
      total,
      dispatch,
      tax,
      addPriceSelector
    } = this.props;

    return (
      <div className="animated fadeIn">
        <div className="orderForm">
          <div className="orderFormCol1">
            <Card>
              <CardHeader>
                <strong>Door Order</strong>
              </CardHeader>
              <CardBody>
                <form onKeyPress={this.onKeyPress} onSubmit={handleSubmit(this.submit)}>
                  {!submitted ? (
                    <FormSection name="job_info">
                      <Suspense fallback={loading()}>
                        <JobInfo
                          customers={customers}
                          formState={formState}
                          address={address}
                          loaded={this.state.loaded}
                          handleAddress={this.handleAddress}
                        />
                      </Suspense>

                    </FormSection>
                  ) : null}

                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <FormGroup>
                            <h3>Upload Files</h3>
                            <p>Please Upload Sketches with Design References</p>
                            <FileUploader onUploaded={this.onUploaded} multi={true} />
                          </FormGroup>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <Suspense fallback={loading()}>
                    <FieldArray
                      name="part_list"
                      component={DoorInfo}
                      // prices={prices}
                      formState={formState}
                      // subTotal={subTotal}
                      addPriceSelector={addPriceSelector}
                      dispatch={dispatch}
                      isValid={isValid}
                      updateSubmit={this.state.updateSubmit}
                      onUploaded={this.onUploaded}
                    />
                  </Suspense>


                  <div className="mb-3" />

                  <hr />
                  <hr />
                  <Row>
                    <Col xs="4" />
                    <Col xs="5" />
                    <Col xs="3">
                      <Row className='mb-0'>
                        <Col xs='9' />
                      </Row>



                      <strong>Discount: </strong>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                        <Field
                          name={'discount'}
                          type="text"
                          edit={true}
                          component={renderField}
                          label="discount"
                        />
                      </InputGroup>

                      
                      <strong>Tax: </strong>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <NumberFormat thousandSeparator={true} value={tax} disabled={true} customInput={Input} {...currencyMask} prefix={'$'} />
                      </InputGroup>


                      <strong>Total: </strong>
                      <InputGroup className='mb-3'>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        <NumberFormat thousandSeparator={true} value={total} disabled={true} customInput={Input} {...currencyMask} prefix={'$'} />
                      </InputGroup>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </div>
          <div className="orderFormCol2">

            <Sticky
              top={100}
              // bottomBoundary={`#item-${i}`}
              enabled={true}
              // key={i}
            >
              {/* <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <FormGroup>
                        <h3>Upload Files</h3>
                        <FileUploader onUploaded={this.onUploaded} multi={true} />
                      </FormGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}

              <CheckoutBox
                {...this.props}
                {...this.state}
                onSubNav={this.onSubNav}
                handleSubmit={handleSubmit}
                submit={this.submit}
                cancelOrder={this.cancelOrder}
                maxValue={maxValue}
                onUploaded={this.onUploaded}
              />
            </Sticky>


            

           
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers.customerDB,
  customerDBLoaded: state.customers.customerDBLoaded,
  user: state.users.user,
  submitted: state.Orders.submitted,
  initialValues: {
    misc_items: [],
    balance_paid: 0,
    open: true,
    discount: 0,
    Taxable: state.customers.customerDB[0].Taxable ? state.customers.customerDB[0].Taxable : false,
    part_list: [
      
      {
        construction: {
          name: 'Cope And Stick',
          value: 'Cope'
        },
        orderType: {
          name: 'Face Frame',
          value: 'Face_Frame'
        },
        thickness:   {
          name: '3/4"',
          value: 0.75,
        },
        door_piece_number: state.part_list.door_piece_number[0],
        dimensions: [],
        addPrice: 0,
      }
    ],
    job_info: {
      customer: state.customers.customerDB[0],
      jobName: '',
      status: 'Quote',
      poNum: '',
      Address1: state.customers.customerDB[0].Address1,
      Address2: state.customers.customerDB[0].Address2,
      City: state.customers.customerDB[0].City,
      State: state.customers.customerDB[0].State,
      Zip: state.customers.customerDB[0].Zip,
      Phone: state.customers.customerDB[0].Phone,
      DueDate: dueDate,
      // PaymentMethod: {
      //   NAME: state.customers.customerDB[0].PaymentMethod
      // }
    }
  },
  formState: getFormValues('DoorOrder')(state),
  prices: linePriceSelector(state),
  itemPrice: itemPriceSelector(state),
  subTotal: subTotalSelector(state),
  total: totalSelector(state),
  tax: taxSelector(state),
  addPriceSelector: addPriceSelector(state),
  miscTotalSelector: miscTotalSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitOrder,
      loadOrders,
    },
    dispatch
  );

// eslint-disable-next-line no-class-assign
DoorOrders = reduxForm({
  form: 'DoorOrder',
  enableReinitialize: true,
  validate
})(DoorOrders);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoorOrders);
