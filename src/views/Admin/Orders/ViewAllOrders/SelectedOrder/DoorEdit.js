import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  CardSubtitle,
  Input,
  Button
} from 'reactstrap';
import {
  reduxForm,
  getFormValues,
  change,
  FieldArray,
  reset
} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  linePriceSelector,
  subTotalSelector,
  taxSelector,
  totalSelector,
  addPriceSelector
} from '../../../../../selectors/doorPricing';
import { updateOrder, loadOrders } from '../../../../../redux/orders/actions';
import JobInfo from './components/DoorOrder/JobInfo';
import DoorInfo from './components/DoorOrder/DoorInfo';
import Ratio from 'lb-ratio';
import Cookies from "js-cookie";

const cookie = Cookies.get("jwt");

const fraction = num => {
  let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
  return fraction.toLocaleString();
};

class DoorEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.formState !== prevProps.formState) {
      const update = () => {
        const customer = this.props.formState && this.props.formState.customer;
        const part_list = this.props.formState && this.props.formState.part_list;

        if (customer && (customer !== (prevProps.formState && prevProps.formState.customer))) {
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.Address1',
              customer.Shipping_Address1 || customer.Address1
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.Address2',
              customer.Shipping_Address2 || customer.Address2
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.City',
              customer.Shipping_City || customer.City
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.State',
              customer.Shipping_State || customer.State
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.Zip',
              customer.Shipping_Zip || customer.Zip
            )
          );
          this.props.dispatch(
            change(
              'DoorOrder',
              'shippingAddress.Phone',
              customer.Shipping_Phone || customer.Phone1
            )
          );
        }

        part_list.forEach((part, i) => {
          if (part.dimensions) {
            return part.dimensions.forEach((info, index) => {
              if (info.panelsW > 1) {
                if (
                  info.panelsW !==
                  (prevProps.formState && prevProps.formState.part_list[i].dimensions[index].panelsW)
                ) {
                  return this.props.dispatch(
                    change(
                      'DoorOrder',
                      `part_list[${i}].dimensions[${index}].verticalMidRailSize`,
                      fraction(part.design.V_MULL_WTH)
                    )
                  );
                }
              }

              if (info.panelsH > 1) {
                if (
                  info.panelsH !==
                  (prevProps.formState && prevProps.formState.part_list[i].dimensions[index].panelsH)
                ) {
                  return this.props.dispatch(
                    change(
                      'DoorOrder',
                      `part_list[${i}].dimensions[${index}].horizontalMidRailSize`,
                      fraction(part.design.H_MULL_WTH)
                    )
                  );
                }
              }
            });
          } else {
            return null;
          }
        });
      };

      update();
    }
  }

  submit = async (values, e) => {

    const { updateOrder, loadOrders, reset, prices, itemPrice, subTotal, tax, total, orderNum, orderType } = this.props;

    console.log(values)

    const jobInfo = {
      jobName: values.jobInfo.jobName,
      status: values.jobInfo.status,
      poNum: values.jobInfo.poNum,
      Address1: values.jobInfo.Address1,
      Address2: values.jobInfo.Address2,
      City: values.jobInfo.City,
      State: values.jobInfo.State,
      Zip: values.jobInfo.Zip,
      Phone: values.jobInfo.Phone,
      DueDate: values.jobInfo.DueDate,
      customer: {
        Company: values.jobInfo.customer.Company
      }
    }

    const order = {
      part_list: values.part_list,
      jobInfo: jobInfo,
      companyprofile: values.jobInfo.customer.id,
      linePrice: prices,
      itemPrice: itemPrice,
      subTotals: subTotal,
      tax: tax,
      total: total,
    };

    const orderId = values.id;

    await updateOrder(orderId, order, cookie);
    await this.props.toggle();
    await loadOrders(cookie);
    await this.props.dispatch(reset('DoorOrder'))
  };

  cancelOrder = async() => {
    await this.props.reset();

    await this.props.editable();
  };

  render() {
    const {
      handleSubmit,
      prices,
      subTotal,
      woodtypes,
      designs,
      edges,
      moulds,
      panels,
      arches,
      grades,
      finish,
      doorExtras,
      doorOptions,
      formState,
      hinges,
      order,
      dimensions,
      part_list,
      tax,
      total
    } = this.props;

    console.log(order)

    return (
      <div className="animated resize">
        <Form onSubmit={handleSubmit(this.submit)}>
          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <strong>Door Order</strong>
                </CardHeader>
                <CardBody>
                  <CardSubtitle className="mt-4">Job Info</CardSubtitle>
                  <JobInfo name="jobInfo" companies={this.props.companies} />

                  <FieldArray
                    name="part_list"
                    component={DoorInfo}
                    woodtypes={woodtypes}
                    designs={designs}
                    edges={edges}
                    moulds={moulds}
                    panels={panels}
                    grades={grades}
                    finish={finish}
                    arches={arches}
                    doorOptions={doorOptions}
                    doorExtras={doorExtras}
                    hinges={hinges}
                    order={order}
                    formState={formState}
                    prices={prices}
                    dimensions={dimensions}
                    subTotal={subTotal}
                    part_list={part_list}
                  />
                  <hr />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="4" />
            <Col xs="5" />
            <Col xs="3">
              <strong>Tax: </strong>
              <Input placeholder={'$' + tax.toFixed(2)} className="mb-2" />
              <strong>Total: </strong>
              <Input placeholder={'$' + total.toFixed(2)} className="mb-3" />
            </Col>
          </Row>
          <Row>
            <Col xs="4" />
            <Col xs="5" />
            <Col xs="3">
              <Row>
                <Col>
                  <Button color="primary" className="submit">Submit</Button>
                </Col>
                <Col>
                  <Button color="danger" onClick={this.cancelOrder} style={{ width: "100%" }}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: props.selectedOrder[0],
  order: props.selectedOrder[0],
  part_list: state.part_list,
  woodtypes: state.part_list.woodtypes,
  designs: state.part_list.designs,
  edges: state.part_list.edges,
  moulds: state.part_list.moulds,
  panels: state.part_list.panels,
  grades: state.part_list.grades,
  finish: state.part_list.finish,
  arches: state.part_list.arches,
  hinges: state.part_list.hinges,
  doorOptions: state.part_list.doorOptions,
  doorExtras: state.part_list.doorExtras,
  construction: state.part_list.construction,
  orderType: state.part_list.orderType,
  thickness: state.part_list.thickness,
  companies: state.Orders.customerDB,
  dimensions: state.form.dimensions,

  prices: linePriceSelector(state),
  subTotal: subTotalSelector(state),
  total: totalSelector(state),
  formState: getFormValues('DoorOrder')(state),
  tax: taxSelector(state),
  addPriceSelector: addPriceSelector(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateOrder,
      loadOrders
    },
    dispatch
  );

DoorEdit = reduxForm({
  form: 'DoorOrder',
  enableReinitialize: true,
  destroyOnUnmount: false,
})(DoorEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoorEdit);
