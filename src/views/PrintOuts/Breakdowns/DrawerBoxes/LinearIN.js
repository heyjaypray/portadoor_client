
import numQty from 'numeric-quantity';

export default (v, part) => {



  const calc = v.map(item => {
    const sides = (numQty(item.depth) * 2) * parseInt(item.qty);
    const fronts = (numQty(item.width) * 2) * parseInt(item.qty);
    const s = (sides + fronts);
    return s;
  });
  const sum = calc.reduce((acc, item) => acc + item, 0);
  return sum.toFixed(2);


};
