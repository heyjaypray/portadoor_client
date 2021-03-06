import Ratio from 'lb-ratio';
import frac2dec from '../../../frac2dec';
import numQty from 'numeric-quantity';

const fraction = num => {
  let fraction = Ratio.parse(num).toQuantityOf(2, 3, 4, 8, 16);
  return fraction.toLocaleString();
};


export default (info, part, breakdowns) => {

  const vMidRail = info.verticalMidRailSize ? info.verticalMidRailSize : 0;
  const hMidRail = info.horizontalMidRailSize ? info.horizontalMidRailSize : 0;

  const top_rail_add = part.face_frame_design.TOP_RAIL_ADD;
  const btm_rail_add = part.face_frame_design.BTM_RAIL_ADD;

  const topRail = numQty(info.topRail);
  const bottomRail = numQty(info.bottomRail);
  const leftStile = numQty(info.leftStile);
  const rightStile = numQty(info.rightStile);
  const vertMull = numQty(vMidRail);
  const horizMull = numQty(hMidRail);
  const panelsH = parseInt(info.panelsH);
  const panelsW = parseInt(info.panelsW);
  const height = numQty(info.height);
  const width = numQty(info.width);
  const qty = parseInt(info.qty);

  const inset = 0;
  const edge_factor = part.edge ? part.edge.LIP_FACTOR : 0;




  if (eval(breakdowns.topRail_width) === eval(breakdowns.bottomRail_width)) {
    if (((panelsW > 1) && (panelsH > 1)) || ((panelsH > 1) && (panelsW == 1))) {
      return [
        {
          qty: `(${(qty * 2)})`,
          measurement: `${fraction(
            eval(breakdowns.topRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.topRail_height)
              * 16) / 16
          )}`,
          pattern: 'TB'
        },
        {
          qty: `(${(((panelsH) - 1) * qty)})`,
          measurement: `${fraction(eval(breakdowns.horizontal_mid_rail_width))} x ${fraction(
            Math.round(
              eval(breakdowns.horizontal_mid_rail_height)
              * 16) / 16
          )}`,
          pattern: 'HM'
        }
      ];
    } else {
      return [
        {
          qty: `(${(qty * 2)})`,
          measurement: `${fraction(
            eval(breakdowns.topRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.topRail_height)
              * 16) / 16
          )}`,
          pattern: 'TB'
        }
      ];
    }
  } else {
    if (((panelsW > 1) && (panelsH > 1)) || ((panelsH > 1) && (panelsW == 1))) {
      return [
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            eval(breakdowns.topRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.topRail_height)
                * 16) / 16
          )}`,
          pattern: 'T'
        },
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            eval(breakdowns.bottomRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.bottomRail_height)
                * 16) / 16
          )}`,
          pattern: 'B'
        },
        {
          qty: `(${(((panelsH) - 1) * qty)})`,
          measurement: `${fraction(eval(breakdowns.horizontal_mid_rail_width))} x ${fraction(
            Math.round(
              eval(breakdowns.horizontal_mid_rail_height)
                * 16) / 16
          )}`,
          pattern: 'HM'
        }
      ];
    } else {
      return [
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            eval(breakdowns.topRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.topRail_height)
              * 16) / 16
          )}`,
          pattern: 'T'
        },
        {
          qty: `(${(qty)})`,
          measurement: `${fraction(
            eval(breakdowns.bottomRail_width)
          )} x ${fraction(
            Math.round(
              eval(breakdowns.bottomRail_height)
              * 16) / 16
          )}`,
          pattern: 'B'
        },
      ];
    }
  }
};