export const transformToArray = (obj: any | any[]) => {
  if (!obj) return obj;
  return Array.isArray(obj) ? obj : [obj];
};
