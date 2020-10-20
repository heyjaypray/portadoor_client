import React, { useState } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import Cookies from 'js-cookie';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProduct, addProduct, deleteProduct } from '../../../../../../../redux/part_list/actions';
import FileUploader from '../../../../../../../components/FileUploader/FileUploader';

const cookie = Cookies.get('jwt');

const Designs = (props) => {

  const {
    className,
    role
  } = props;

  const [modal, setModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    NAME: '',
    UPCHARGE: '',
    UPCHARGE_THICK: '',
    PROFILE_WIDTH: '',
    photo: null
  });
  const [newProduct, setNewProduct] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(props.designs);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleWarningModal = () => {
    setWarningModal(!warningModal);
  };


  const setCard = card => {
    setNewProduct(false);
    setProduct(card);
    toggle();
  };

  const addProd = () => {
    const p = {
      NAME: '',
      UPCHARGE: '',
      UPCHARGE_THICK: '',
      PROFILE_WIDTH: '',
      photo: null
    };
    setNewProduct(true);
    setProduct(p);
    toggle();
  };

  const change = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setProduct((prevState) => {
      return ({
        ...prevState,
        [name]: value
      });
    });
  };

  const onUploaded = (e) => {
    setProduct((prevState) => {
      return ({
        ...prevState,
        photo: e[0]
      });
    });
    return;
  };

  const updateProduct = async () => {
    let id = product.id;
    let updatedProduct = product;
    await props.updateProduct(id, updatedProduct, 'miter-df-designs', cookie);
    await setModal(!modal);
  };

  const deleteProduct = async () => {
    let id = product.id;

    await props.deleteProduct(id, 'miter-df-designs', cookie);
    await toggleWarningModal();
    await toggle();
  };

  const submitProduct = async () => {
    const item = props.designs.length + 1;
    const submittedProduct = {
      NAME: product.NAME,
      UPCHARGE: product.UPCHARGE,
      UPCHARGE_THICK: product.UPCHARGE_THICK,
      PROFILE_WIDTH: product.PROFILE_WIDTH,
      photo: product.photo ? product.photo.id : '',
      Item: item
    };
    await props.addProduct(submittedProduct, 'miter-df-designs', cookie);
    await setModal(!modal);
  };

  const changeFilterValue = (e) => {
    setFilteredProducts(props.designs.filter(i => i.NAME.split(' ').join('').toLowerCase().includes(e.target.value.split(' ').join(''))));
  };


  const card = filteredProducts.map(card => {
    return (
      <div key={card.id} className="mr-1 ml-1 flex-wrap" style={{ width: '200px' }}>
        <Card style={{ height: '100%' }} onClick={() => setCard(card)}>
          {card.photo ? <CardImg top width="100%" src={card.photo.url} alt="Card image cap" /> : <CardImg top width="100%" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'} alt="Card image cap" />}
          <CardBody>
            <CardTitle><strong>{card.NAME}</strong></CardTitle>
            <CardTitle><strong>4/4 Price:</strong> ${card.UPCHARGE}</CardTitle>
            <CardTitle><strong>5/4 Price:</strong> ${card.UPCHARGE_THICK}</CardTitle>
            <CardTitle><strong>Profile Width:</strong> {card.PROFILE_WIDTH}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  });

  if(role && (role.type === 'management' || role.type === 'authenticated' ||  role.type === 'owner')) {
    return (

      <div>

        <Row className="mb-2">
          <Col>
            <FormGroup>
              <Label htmlFor="search">Search</Label>
              <Input onChange={(e) => changeFilterValue(e)} />
            </FormGroup>
          </Col>
          <Col xs='9' />
        </Row>
  
        <Row className="mb-2">
          <Col>
            <Button color="primary" onClick={addProd} >Add New</Button>
          </Col>
        </Row>
  
        <Row style={{ height: '600px' }}>
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
                    {product.photo ? <CardImg top src={product.photo.url} alt="Card image cap" /> : <CardImg top width="200px" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'} alt="Card image cap" />}
                  </div>
  
                  <FileUploader onUploaded={onUploaded} multi={false} />
  
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Label for="Name">Name</Label>
                  <Input value={product.NAME} name="NAME" onChange={(e) => change(e)}></Input>
                </Col>
              </Row>
  
              <Row>
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
                  <Label for="4/4_Price">Profile Width</Label>
                  <Input value={product.PROFILE_WIDTH} name="PROFILE_WIDTH" onChange={(e) => change(e)}></Input>
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
    );
  } else {
    return (

      <div>

        <Row className="mb-2">
          <Col>
            <FormGroup>
              <Label htmlFor="search">Search</Label>
              <Input onChange={(e) => changeFilterValue(e)} />
            </FormGroup>
          </Col>
          <Col xs='9' />
        </Row>

        <Row style={{ height: '600px' }}>
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
                    {product.photo ? <CardImg top src={product.photo.url} alt="Card image cap" /> : <CardImg top width="200px" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'} alt="Card image cap" />}
                  </div>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Label for="Name">Name</Label>
                  <Input value={product.NAME} name="NAME" onChange={(e) => change(e)}></Input>
                </Col>
              </Row>
  
              <Row>
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
                  <Label for="4/4_Price">Profile Width</Label>
                  <Input value={product.PROFILE_WIDTH} name="PROFILE_WIDTH" onChange={(e) => change(e)}></Input>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
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
    );
  }

  


};

const mapStateToProps = (state) => ({
  designs: state.part_list.miter_df_designs,
  role: state.users.user.role
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
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
