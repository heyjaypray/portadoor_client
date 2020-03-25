import Ratio from 'lb-ratio';

const fraction = num => {
    let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
    return fraction.toLocaleString();
};
export default (item, part) => {

    const depth = (parseInt(item.depth) - (part.boxThickness.Decimal * 2) + 0.6875)
    const thickness = part.boxThickness.Thickness
    return {
        qty: (parseInt(item.qty) * 2),
        depth: depth,
        measurement: `${item.height} x ${fraction(depth)} x ${thickness}`,
        pattern: "Sides"
    }

};