export interface IUserData {
  username: string | null;
  token: string | null;
}

// Methods to save user date on login

export const loadFromStorageUser = (): IUserData | null => {
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

export const loadFromStorageLaunch = (): boolean | null => {
  const data = localStorage.getItem('configured');
  console.log(data);
  let result = true;
  if (data === 'true') {
    result = true;
  }
  else if (data === 'false') {
    result =  false;
  }
  return result;
};

export const saveToStorageLaunch = (launch:any) : void => {
  try {
    localStorage.setItem('configured', launch);
  } catch (err) {}
}

export const saveToStorage = (user: any, launch: any): void => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
    localStorage.setItem('configured', launch);
  } catch (err) {}
};
