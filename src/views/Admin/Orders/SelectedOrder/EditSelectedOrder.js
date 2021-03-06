import React from 'react';
// import DoorEdit from './DoorEdit'
import DoorOrder from './DoorOrders/DoorOrders';
import DrawerOrder from './DrawerOrders/DrawerOrder';
import MiscItems from './MiscItems/MiscItemsComponent';
import Mouldings from './Mouldings/MouldingsComponent';
import { connect } from 'react-redux';
import FaceFrame from './FaceFrames/FaceFrame';



class EditSelectedOrder extends React.Component {

  render() {
    
    const { editable, edit, toggle, selectedOrder } = this.props;

    if(selectedOrder) {
      return (
        <div>
          {selectedOrder.orderType === 'Door Order' ?
            <DoorOrder
              editable={editable}
              edit={edit}
              toggle={toggle}
            />  
            :
            selectedOrder.orderType === 'Misc Items' ?
              <MiscItems
                editable={editable}
                edit={edit}
                toggle={toggle}
              />
              :
              selectedOrder.orderType === 'Mouldings' ?
                <Mouldings
                  editable={editable}
                  edit={edit}
                  toggle={toggle}
                />
                :
                selectedOrder.orderType === 'Face Frame' ?
                  <FaceFrame
                    editable={editable}
                    edit={edit}
                    toggle={toggle}
                  />
                  :

                  <DrawerOrder
                    editable={editable}
                    edit={edit}
                    toggle={toggle}
                  />
          }
        </div>
  
      );
    } else {
      return (
        <div />
      );
    }
    
  }
}





const mapStateToProps = (state, prop) => ({
  selectedOrder: state.Orders.selectedOrder

});



export default connect(
  mapStateToProps,
  null
)(EditSelectedOrder);

