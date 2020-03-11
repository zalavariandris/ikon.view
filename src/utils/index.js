function groupBy(list, by){
  console.assert(typeof by == 'string' || typeof by =='function');

  let map = list.reduce(function (r, a) {
    if(typeof by == 'function')
      var group = by(a);
    else if(typeof by == 'string')
      var group = a[by];
    
    r.set(group, r.get(group) || []);
    r.get(group).push(a);
    return r;
  }, new Map());

  return [...map.entries()].sort( (a, b)=>b-a );
}

export {groupBy};