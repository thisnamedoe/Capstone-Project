/**
  Merge the two different sources of same cart items.
*/

export const deDupeItems = Items => Items.reduce((total, cur) => {
  const i = total.findIndex(obj => obj.id === cur.id);
  if (i >= 0) {
    total[i].qty += cur.qty;
  } else {
    total.push(cur);
  }
  return total;
}, []);
