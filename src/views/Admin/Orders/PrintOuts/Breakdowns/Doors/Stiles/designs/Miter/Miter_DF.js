import numQty from 'numeric-quantity';
import Ratio from 'lb-ratio';
import frac2dec from '../../../frac2dec'


const fraction = num => {
  let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
  return fraction.toLocaleString();
};

export default (info, part) => {

  const vMidRail = info.verticalMidRailSize ? info.verticalMidRailSize : 0
  const hMidRail = info.horizontalMidRailSize ? info.horizontalMidRailSize : 0

  const top_rail_add = part.design.TOP_RAIL_ADD
  const btm_rail_add = part.design.BTM_RAIL_ADD

  const topRail = numQty(info.topRail)
  const bottomRail = numQty(info.bottomRail)
  const leftStile = numQty(info.leftStile)
  const rightStile = numQty(info.rightStile)
  const vertMull = numQty(vMidRail)
  const horizMull = numQty(hMidRail)
  const panelsH = parseInt(info.panelsH)
  const panelsW = parseInt(info.panelsW)
  const height = numQty(info.height)
  const width = numQty(info.width)
  const qty = parseInt(info.qty)

  // const inset = part.profile.INSET


  const add_len = 0;
  const tenon_factor = 0;



  if (leftStile === rightStile) {
    if (((panelsW > 1) && (panelsH > 1)) || ((panelsW > 1) && (panelsH == 1))) {
      return [
        {
          qty: `(${(qty * 2)})`,
          measurement: `${fraction(
            leftStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "LR"
        },
        {
          qty: `(${ (panelsW > 1 ? (panelsH > 1 ? panelsH : panelsW - 1) : panelsW - 1)})`,
          measurement: `${fraction(vertMull)} x ${fraction(
            Math.round((
              ((height - topRail - bottomRail - (horizMull * (panelsH- 1))) / panelsH)
              ) * 16) / 16
          )}`,
          pattern: "VM3"
        },
      ]
    } else {
      return [
        {
          qty: `(${(qty * 2)})`,
          measurement: `${fraction(
            leftStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "LR"
        }
      ]
    }
  }
  else {
    if (((panelsW > 1) && (panelsH > 1)) || ((panelsW > 1) && (panelsH == 1))) {
      return [
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            leftStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "L"
        },
        {
          qty:  `(${(qty)})`,
          measurement: `${fraction(
            rightStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "R"
        },
        {
          qty: `(${ (panelsW > 1 ? (panelsH > 1 ? panelsH : panelsW - 1) : panelsW - 1)})`,
          measurement: `${fraction(vertMull)} x ${fraction(
            Math.round((
              ((height - topRail - bottomRail - (horizMull * (panelsH- 1))) / panelsH)
              ) * 16) / 16
          )}`,
          pattern: "VM9"
        },
      ]
    }
    else {
      return [
        {
          qty:  `(${(qty)})`,
          measurement: `${fraction(
            leftStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "L"
        },
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            rightStile
          )} x ${fraction(height + 0.125)}`,
          pattern: "R"
        }

      ]
    }
  }
};
