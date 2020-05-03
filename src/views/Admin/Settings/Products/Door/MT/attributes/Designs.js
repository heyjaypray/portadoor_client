import React, { useState } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import Cookies from "js-cookie";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { FileUploader } from 'devextreme-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMTDesigns, updateProduct, addProduct, deleteProduct } from '../../../../../../../redux/part_list/actions'

const cookie = Cookies.get("jwt");
const header = { 'Authorization': 'Bearer ' + cookie };



const Designs = (props) => {

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    NAME: '',
    UPCHARGE: '',
    UPCHARGE_THICK: '',
    RAIL_ADD: '',
    RAIL_FACTOR: '',
    MINIMUM_STILE_WIDTH:'',
    MID_RAIL_MINIMUMS: '',
    INSET: '',
    photo: null
  });
  const [newProduct, setNewProduct] = useState(false)

  const toggle = () => {
    setModal(!modal)
  };

  const toggleWarningModal = () => {
    setWarningModal(!warningModal)
  };


  const setCard = card => {
    setNewProduct(false)
    setProduct(card)
    toggle()
  }

  const addProd = () => {
    console.log("clicked")
    const p = {
      NAME: '',
      UPCHARGE: '',
      UPCHARGE_THICK: '',
      RAIL_ADD: '',
      RAIL_FACTOR: '',
      MID_RAIL_MINIMUMS: '',
      INSET: '',
      photo: null
    }
    setNewProduct(true)
    setProduct(p)
    toggle()
  }

  const change = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setProduct((prevState) => {
      return ({
        ...prevState,
        [name]: value
      })
    })
  }

  const onUploaded = (e) => {
    const data = JSON.parse(e.request.response);
    setProduct((prevState) => {
      return ({
        ...prevState,
        photo: data[0]
      })
    })
    return
  }

  const updateProduct = async () => {
    let id = product.id
    let updatedProduct = product
    await props.updateProduct(id, updatedProduct, "mt-designs", cookie)
    await setModal(!modal)
    await props.getMTDesigns(cookie)
  }

  const deleteProduct = async () => {
    let id = product.id

    await props.deleteProduct(id, 'mt-designs', cookie)
    await props.getMTDesigns(cookie)
    await toggleWarningModal()
    await toggle()
  }

  const submitProduct = async () => {
    const item = props.designs.length + 1
    const submittedProduct = {
      NAME: product.NAME,
      UPCHARGE: product.UPCHARGE,
      UPCHARGE_THICK: product.UPCHARGE_THICK,
      RAIL_FACTOR: product.RAIL_FACTOR,
      MINIMUM_STILE_WIDTH:product.MINIMUM_STILE_WIDTH,
      MID_RAIL_MINIMUMS: product.MID_RAIL_MINIMUMS,
      INSET: product.INSET,
      photo: product.photo ? product.photo.id : '',
      Item: item
    }
    await props.addProduct(submittedProduct, 'mt-designs', cookie)
    await setModal(!modal)
    await props.getMTDesigns(cookie)
  }

  console.log(product)


  const card = props.designs.map(card => {
    return (
      <div key={card.id} className="mr-1 ml-1 flex-wrap" style={{ width: "200px" }}>
        <Card style={{ height: "100%" }} onClick={() => setCard(card)}>
          {card.photo ? <CardImg top width="100%" src={card.photo.url} alt="Card image cap" /> : <CardImg top width="100%" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"} alt="Card image cap" />}
          <CardBody>
          <CardTitle><strong>{card.NAME}</strong></CardTitle>
              <CardTitle><strong>4/4 Price:</strong> ${card.UPCHARGE}</CardTitle>
              <CardTitle><strong>5/4 Price:</strong> ${card.UPCHARGE_THICK}</CardTitle>
              <CardTitle><strong>Rail Factor:</strong> {card.RAIL_FACTOR}</CardTitle>
              <CardTitle><strong>Stile/Rail Width:</strong> {card.MID_RAIL_MINIMUMS}</CardTitle>
              <CardTitle><strong>Inset:</strong> {card.INSET}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  })


  return (

    <div>

      <Row className="mb-2">
        <Col>
          <Button color="primary" onClick={addProd} >Add New</Button>
        </Col>
      </Row>

      <Row style={{ height: "600px" }}>
        <PerfectScrollbar>
          <div className="col d-flex align-content-start flex-wrap">{card}</div>
        </PerfectScrollbar>
      </Row>

      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{product.NAME}</ModalHeader>
          <ModalBody>
            <Row className="mb-2">

              <Col>
                <div className="col d-flex align-content-start flex-wrap">
                  {product.photo ? <CardImg top src={product.photo.url} alt="Card image cap" /> : <CardImg top width="200px" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"} alt="Card image cap" />}
                </div>

                <form id="form" method="post" action="" encType="multipart/form-data">
                  <FileUploader name="files" uploadMode="instantly" onUploaded={onUploaded} uploadHeaders={header} uploadUrl="https://server.portadoor.com/upload" />
                </form>

              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Label for="Name">Name</Label>
                <Input value={product.NAME} name="NAME" onChange={(e) => change(e)}></Input>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <Label for="4/4_Price">4/4 Price</Label>
                <Input value={product.UPCHARGE} name="UPCHARGE" onChange={(e) => change(e)}></Input>
              </Col>
              <Col>
                <Label for="5/4_Price">5/4 Price</Label>
                <Input value={product.UPCHARGE_THICK} name="UPCHARGE_THICK" onChange={(e) => change(e)}></Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="4/4_Price">Rail Factor</Label>
                <Input value={product.RAIL_FACTOR} name="RAIL_FACTOR" onChange={(e) => change(e)}></Input>
              </Col>
              <Col>
                <Label for="5/4_Price">Stile/Rail Width</Label>
                <Input value={product.MID_RAIL_MINIMUMS} name="MID_RAIL_MINIMUMS" onChange={(e) => change(e)}></Input>
              </Col>
              <Col>
                <Label for="5/4_Price">Inset</Label>
                <Input value={product.INSET} name="INSET" onChange={(e) => change(e)}></Input>
              </Col>
            </Row>


            <Row className="mt-5">
             
              <Col>
                {newProduct ?
                  <div />
                  :
                  <div>
                    <Button color="danger" onClick={toggleWarningModal}>Delete</Button>
                  </div>
                }
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {newProduct ?
              <div>
                <Button color="primary" onClick={submitProduct}>Submit</Button>

              </div>
              :
              <div>
                <Button color="primary" onClick={updateProduct}>Update</Button>
              </div>
            }

            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

      <Modal isOpen={warningModal} toggle={toggleWarningModal} className={className}>
        <ModalHeader toggle={warningModal}>Are You Sure?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
          </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteProduct}>Yes</Button>
          <Button color="primary" onClick={warningModal}>No</Button>
        </ModalFooter>
      </Modal>
    </div>
  )


}

const mapStateToProps = (state) => ({
  designs: state.part_list.mt_designs,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMTDesigns,
      updateProduct,
      addProduct,
      deleteProduct
    },
    dispatch
  );



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Designs);