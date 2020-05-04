import React, { useState } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import Cookies from "js-cookie";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { FileUploader } from 'devextreme-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFurnitureFeet, updateProduct, addProduct, deleteProduct } from '../../../../../../redux/part_list/actions'


const cookie = Cookies.get("jwt");
const header = { 'Authorization': 'Bearer ' + cookie };



const Furniture_Feet = (props) => {

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
    const p = {
      NAME: '',
      UPCHARGE: '',
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
    await props.updateProduct(id, updatedProduct, "furniture-feet", cookie)
    await setModal(!modal)
    await props.getFurnitureFeet(cookie)
  }

  const deleteProduct = async () => {
    let id = product.id

    await props.deleteProduct(id, 'furniture-feet', cookie)
    await props.getFurnitureFeet(cookie)
    await toggleWarningModal()
    await toggle()
  }

  const submitProduct = async () => {
    const item = props.applied_profiles.length + 1
    const submittedProduct = {
      NAME: product.NAME,
      UPCHARGE: product.UPCHARGE,
      photo: product.photo ? product.photo.id : '',
      Item: item
    }
    await props.addProduct(submittedProduct, 'furniture-feet', cookie)
    await setModal(!modal)
    await props.getFurnitureFeet(cookie)
  }


  const card = props.applied_profiles.map(card => {
    return (
      <div key={card.id} className="mr-1 ml-1 flex-wrap" style={{ width: "200px" }}>
        <Card style={{ height: "100%" }} onClick={() => setCard(card)}>
          {card.photo ? <CardImg top width="100%" src={card.photo.url} alt="Card image cap" /> : <CardImg top width="100%" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"} alt="Card image cap" />}
          <CardBody>
            <CardTitle><strong>{card.NAME}</strong></CardTitle>
            <CardTitle><strong>Price: </strong> {card.UPCHARGE}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  })

  console.log(product)
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
                <Input  value={product.NAME} name="NAME" onChange={(e) => change(e)}></Input>
              </Col>
            </Row>

            <Row>
              <Col>
                <Label for="4/4_Price">Price</Label>
                <Input value={product.UPCHARGE} name="UPCHARGE" onChange={(e) => change(e)}></Input>
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
  applied_profiles: state.part_list.furniture_feets,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFurnitureFeet,
      updateProduct,
      addProduct,
      deleteProduct
    },
    dispatch
  );



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Furniture_Feet);