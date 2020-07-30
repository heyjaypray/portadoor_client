import React, { Component } from 'react';
import { Field, reduxForm, FieldArray, getFormValues, change } from 'redux-form';
import { renderField, renderDropdownListFilter, renderPrice } from '../../DoorOrders/components/RenderInputs/renderInputs';
import { Button, Row, Col, Table, Input } from 'reactstrap';
import { connect } from 'react-redux';


let Inputs = props => {
    const { fields, misc_items } = props

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>QTY</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((table, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ width: '90px' }}><Field name={`${table}.qty`} component={renderField} type="text" /></td>
                                <td >
                                    <Field
                                        name={`${table}.item`}
                                        component={renderDropdownListFilter}
                                        data={misc_items}
                                        valueField="value"
                                        textField="NAME"
                                    />
                                </td>
                                <td style={{ width: '150px' }}><Field name={`${table}.price`} component={renderPrice} type="text" /></td>
                                <td><Button color="danger" onClick={() => fields.remove(index)}>X</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Button color="primary" className="mt-3" onClick={() => fields.push({
                qty: 1,
                price: 0
            })}>Add Item</Button>
        </div>
    )
}

class MiscItems extends Component {

    componentDidUpdate(prevProps) {
        const { formState } = this.props;
        if (formState && formState.misc_items) {
            if (formState.misc_items !== prevProps.formState.misc_items) {

                const misc_items = formState.misc_items

                // console.log("MISCCCCCC ===>", misc_items)

                misc_items.forEach((i, index) => {
                    if (i.item) {
                        console.log("MISC ITEM", i)

                        if (i.item.Price !== 0) {
                            this.props.dispatch(
                                change(
                                    'DrawerOrder',
                                    `misc_items[${index}].price`,
                                    (i.qty ? (i.item.Price * parseInt(i.qty)) : i.item.Price)
                                )
                            );
                        } else {
                            return
                        }

                    }

                })

            }
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, misc_items } = this.props
        return (
            <div>
                <h3>Misc Items</h3>
                <FieldArray name="misc_items" component={Inputs} misc_items={misc_items} />
            </div>
        );
    }
}



const mapStateToProps = state => ({
    formState: getFormValues('DrawerOrder')(state),
    misc_items: state.misc_items.misc_items
});

MiscItems = reduxForm({
    form: 'DrawerOrder',
    enableReinitialize: true
})(MiscItems)


export default connect(
    mapStateToProps,
    null
)(MiscItems);