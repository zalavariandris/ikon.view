function groupBy(list, by){
  console.assert(typeof by == 'string' || typeof by =='function');

  return list.reduce(function (r, a) {
    let group;
    if(typeof by == 'function')
      group = by(a);
    else if(typeof by == 'string')
      group = a[by];
    
    r.set(group, r.get(group) || []);
    r.get(group).push(a);
    return r;
  }, new Map());
}

function peaks(values, distance){
  return values.map((v, i) => {
    const neighbours = [
    ...values.slice(i-distance, i),
    ...values.slice(i+1, i+1+distance)
    ]
    return neighbours.every((n)=>n<v)
  });
}

export {groupBy, peaks};