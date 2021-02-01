import React, { Component } from 'react';
import {
  Field,
  reduxForm,
  FieldArray,
  getFormValues,
  change,
} from 'redux-form';
import {
  renderField,
  renderNumber,
  renderDropdownListFilter,
  renderPrice,
  renderInt
} from '../RenderInputs/renderInputs';
import {
  Button,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  miscItemPriceSelector,
  miscItemLinePriceSelector,
  miscTotalSelector,
} from '../../selectors/doorPricing';
import { createNumberMask } from 'redux-form-input-masks';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

const currencyMask = createNumberMask({
  decimalPlaces: 2,
  locale: 'en-US',
});

let Inputs = (props) => {
  const { fields, misc_items, formState, linePrices, miscTotal } = props;

  const changeMiscItem = (e, index) => {

    console.log({e});
    console.log({formState});

    let total_qty = 0;

    props.dispatch(change('DoorOrder', `misc_items[${index}].price`, e.Price));

    if(e.count_items){
      const categories = e.categories.map(i => i.value);
      if(categories.includes('Door')){
        const matched_orders = formState.part_list.filter(i => i.orderType.value.includes('Door'));
        const quantities = matched_orders.map(i => {
          const qty = i.dimensions.map(j => {
            return parseInt(j.qty);
          });
          const sub_total_qty = parseFloat(qty.reduce((acc, item) => acc + item, 0));
          return sub_total_qty;
        });
        const sub_quantity = quantities.reduce((acc, item) => acc + item, 0);
        total_qty = total_qty+sub_quantity;
      }
      if(categories.includes('DF')){
        const matched_orders = formState.part_list.filter(i => i.orderType.value.includes('DF'));
        const quantities = matched_orders.map(i => {
          const qty = i.dimensions.map(j => {
            return parseInt(j.qty);
          });
          const sub_total_qty = parseFloat(qty.reduce((acc, item) => acc + item, 0));
          return sub_total_qty;
        });
        const sub_quantity = quantities.reduce((acc, item) => acc + item, 0);
        total_qty = total_qty+sub_quantity;
      }
      props.dispatch(change('DoorOrder', `misc_items[${index}].qty`, total_qty));
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>QTY</th>
            <th>Item</th>
            <th>Price Per</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((table, index) => {
            return (
              <tr key={index}>
                <td style={{ width: '90px' }}>
                  <Field
                    name={`${table}.qty`}
                    component={renderInt}
                    type="text"
                  />
                </td>
                <td style={{ width: '400px' }}>
                  {formState &&
                  formState.misc_items &&
                  formState.misc_items[index] &&
                  formState.misc_items[index].category === 'preselect' ? (
                      <Field
                        name={`${table}.item`}
                        component={renderDropdownListFilter}
                        data={misc_items}
                        onChange={(e) => changeMiscItem(e, index)}
                        valueField="value"
                        textField="NAME"
                      />
                    ) : (
                      <Field
                        name={`${table}.item2`}
                        component={renderField}
                        valueField="value"
                        textField="NAME"
                      />
                    )}
                </td>
                {formState &&
                formState.misc_items &&
                formState.misc_items[index] &&
                formState.misc_items[index].category === 'preselect' ? (
                    <>
                      <td style={{ width: '150px' }}>
                        <InputGroup>
                          <Field
                            name={`${table}.price`}
                            type="text"
                            component={renderPrice}
                            label="price"
                            {...currencyMask}
                          />
                        </InputGroup>
                      </td>
                      <td style={{ width: '150px' }}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                          </InputGroupAddon>
                          <NumberFormat
                            thousandSeparator={true}
                            value={linePrices[index]}
                            disabled={true}
                            customInput={Input}
                            {...currencyMask}
                            prefix={'$'}
                          />
                        </InputGroup>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ width: '150px' }}>
                        <Field
                          name={`${table}.pricePer`}
                          component={renderPrice}
                          type="text"
                          required
                          {...currencyMask}
                        />
                      </td>
                      <td style={{ width: '150px' }}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                          </InputGroupAddon>
                          <NumberFormat
                            thousandSeparator={true}
                            value={linePrices[index]}
                            disabled={true}
                            customInput={Input}
                            {...currencyMask}
                            prefix={'$'}
                          />
                        </InputGroup>
                      </td>
                    </>
                  )}
                <td>
                  <Button color="danger" onClick={() => fields.remove(index)}>
                    X
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Row>
        <Col>
          <>
            <Button
              color="primary"
              className="mt-3"
              onClick={() =>
                fields.push({
                  category: 'preselect',
                  qty: 1,
                  price: 0,
                })
              }
            >
              Add Item{' '}
            </Button>

            <Button
              color="primary"
              className="mt-3"
              onClick={() =>
                fields.push({
                  category: 'custom',
                  qty: 1,
                  price: 0,
                  pricePer: 0,
                })
              }
            >
              Custom Item
            </Button>
          </>
        </Col>
        <Col />
        <Col>
          <Label htmlFor="companyName">Added to Total</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <NumberFormat
              thousandSeparator={true}
              value={miscTotal}
              disabled={true}
              customInput={Input}
              {...currencyMask}
              prefix={'$'}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

class MiscItems extends Component {
  render() {
    return (
      <div>
        <h3>Misc Items</h3>
        <FieldArray name="misc_items" component={Inputs} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formState: getFormValues('DoorOrder')(state),
  misc_items: state.misc_items.misc_items,
  prices: miscItemPriceSelector(state),
  linePrices: miscItemLinePriceSelector(state),
  miscTotal: miscTotalSelector(state),
});

MiscItems = reduxForm({
  form: 'DoorOrder',
  enableReinitialize: true,
})(MiscItems);

export default connect(mapStateToProps, null)(MiscItems);
