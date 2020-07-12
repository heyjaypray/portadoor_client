
export default (item, part, breakdowns) => {

    const b = breakdowns[0]

    const height = item.height;
    const width = item.width;
    const boxThickness = part.box_thickness.NAME

    return {
        qty: (parseInt(item.qty) * 2),
        measurement: `${eval(b.fronts_height)} x ${eval(b.fronts_width)} x ${eval(b.fronts_thickness)}`,
        pattern: "Fronts/Backs"
    }
};
