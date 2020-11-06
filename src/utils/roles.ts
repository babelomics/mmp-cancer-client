interface IUserType {
  [x: string]: number;
}
const userTypes: IUserType = {
  User: 0,
  Admin: 1
};

export const getUserTypeByStr = (str: string): number => {
  return userTypes[str];
};

export const getUserTypeByValue = (value: number): string => {
  return Object.keys(userTypes).find((key) => userTypes[key] === value) || 'User';
};
