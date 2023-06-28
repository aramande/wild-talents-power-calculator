

export function contains<T>(orig: T[], filter: T[], compare?: (a: T, b: T) => boolean) {
  let res = filter.map(item => {
    if(!compare) return orig.includes(item);
    else return orig.find(oItem => compare(oItem, item)) !== undefined;
  });
  return !res.includes(false);
}