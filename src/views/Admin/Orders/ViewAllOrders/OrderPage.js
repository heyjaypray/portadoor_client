import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col
} from 'reactstrap';
import SelectedOrder from './SelectedOrder/SelectedOrder';
import EditSelectedOrder from './SelectedOrder/EditSelectedOrder';
import Invoice from '../../Invoice/Invoice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOrder, loadOrders } from '../../../../redux/orders/actions';
import Edit from '@material-ui/icons/Edit';
import Dashboard from '@material-ui/icons/Dashboard';
import Print from '@material-ui/icons/Print';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DoorPDF from './PrintOuts/Pages/DoorPDF';
import DrawerPDF from './PrintOuts/Pages/DrawerPDF';
import StilesPDF from './PrintOuts/Pages/StilesPDF';
import RailsPDF from './PrintOuts/Pages/RailsPDF';
import PanelsPDF from './PrintOuts/Pages/PanelsPDF';
import MaterialsPDF from './PrintOuts/Pages/MaterialsPDF';
import QCPDF from './PrintOuts/Pages/QCPDF';
import InvoicePDF from './PrintOuts/Pages/InvoicePDF';

import Select from 'react-select';

const options = [
  { value: 'All', label: 'All' },
  { value: 'Acknowledgement', label: 'Acknowledgement' },
  { value: 'Invoice', label: 'Invoice' },
  { value: 'Stiles', label: 'Stiles' },
  { value: 'Rails', label: 'Rails' },
  { value: 'Panels', label: 'Panels' },
  { value: 'Materials', label: 'Materials' },
  { value: 'QC', label: 'QC' },
];

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      orderEdit: false,
      page: [],
      tooltipOpen: false,
      selectedOption: [],
    };
  }

  breakdown = e => {
    e.preventDefault();
    this.setState({ page: 'breakdowns' });
  };

  invoice = e => {
    e.preventDefault();
    this.setState({ page: 'invoice' });
  };

  close = e => {
    e.preventDefault();
    this.setState({ page: [] });
  };

  editable = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  downloadPDF = () => {
    const data = this.props.selectedOrder[0];
    if (data.orderType === "Door Order") {
      this.state.selectedOption.map((option, index) => {
        switch (option.value) {
          case 'All':
            DoorPDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Acknowledgement':
            InvoicePDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Invoice':
            InvoicePDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Stiles':
            StilesPDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Rails':
            RailsPDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Panels':
            PanelsPDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'Materials':
            MaterialsPDF(data);
            this.setState({ selectedOption: [] })
            break;
          case 'QC':
            QCPDF(data);
            this.setState({ selectedOption: [] })
            break;
          default:
            return
        }
      })

    } else {
      DrawerPDF(data)
    }
  };

  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const props = this.props;




    if (this.state.page === 'invoice') {
      return (
        <div className="animated noPrint">
          <Modal
            isOpen={props.modal}
            toggle={props.toggle}
            className="modal-lg"
          >
            <ModalHeader toggle={props.toggle}>Order</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <IconButton onClick={props.toggle && this.close}>
                    <ArrowBack style={{ width: '40', height: '40' }} />
                  </IconButton>
                </Col>
                <Col />
                <Col />
              </Row>

              <div>
                <Invoice />
              </div>
            </ModalBody>
            <ModalFooter>
              <IconButton onClick={props.toggle && this.close}>
                <ArrowBack style={{ width: '40', height: '40' }} />
              </IconButton>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="animated noPrint resize">
          <Modal
            isOpen={props.modal}
            toggle={props.toggle}
            className="modal-lg"
          >
            <ModalHeader toggle={props.toggle}>Order</ModalHeader>
            <ModalBody>
              {this.props.edit ? (
                <div>
                  <Row>
                    <Col>
                      <IconButton onClick={this.props.editable}>
                        <ArrowBack style={{ width: '40', height: '40' }} />
                      </IconButton>
                    </Col>
                    <Col />
                    <Col />
                  </Row>
                </div>
              ) : (
                  <div>
                    <Row></Row>
                    <Row>
                      <Col>
                        <Tooltip title="Edit" placement="top">
                          <IconButton onClick={this.props.editable}>
                            <Edit style={{ width: '40', height: '40' }} />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col />
                      <Col>
                        <Row>
                          <Col lg='8'>
                            <div className='mt-3 mb-2'>
                              <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                isMulti={true}
                              />
                            </div>
                          </Col>
                          <Col>
                            <Tooltip title="Print" placement="top" className="mb-3">
                              <IconButton onClick={this.downloadPDF}>
                                <Print style={{ width: '40', height: '40' }} />
                              </IconButton>
                            </Tooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
              <div>
                {!this.props.edit ? (
                  <SelectedOrder
                    selectedOrder={props.selectedOrder}
                  // ref={el => (this.componentRef = el)}
                  />
                ) : (
                    <div>
                      <EditSelectedOrder
                        selectedOrder={props.selectedOrder}
                        editable={this.props.editable}
                        toggle={props.toggle}
                      />
                    </div>
                  )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={props.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, prop) => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateOrder,
      loadOrders
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPage);
