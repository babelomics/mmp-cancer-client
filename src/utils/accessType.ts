interface IAccessType {
  [x: string]: number;
}
const accessTypes: IAccessType = {
  Local: 0,
  LDAP: 1,
  ElixirAAI: 2
};

export const getAccessTypeByStr = (str: string): number => {
  return accessTypes[str];
};

export const getAccessTypeByValue = (value: number): string => {
  return Object.keys(accessTypes).find((key) => accessTypes[key] === value) || 'Local';
};
