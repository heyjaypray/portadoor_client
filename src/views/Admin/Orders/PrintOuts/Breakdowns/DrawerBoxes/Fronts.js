
export default (item, part) => {

    return {
        qty: (parseInt(item.qty) * 2),
        measurement: `${item.height} x ${item.width} x ${part.boxThickness.Thickness}`,
        pattern: "Fronts/Backs"
    }
};