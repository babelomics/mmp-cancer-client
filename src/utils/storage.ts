export interface IUserData {
  username: string | null;
  token: string | null;
}

// Methods to save user date on login

export const loadFromStorage = (): IUserData | null => {
  const dataStr = localStorage.getItem('user');
  const data = dataStr ? JSON.parse(dataStr) : null;
  const result = data
    ? {
        username: data.username,
        token: data.token
      }
    : null;

  return result;
};

export const saveToStorage = (user: any): void => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (err) {}
};
