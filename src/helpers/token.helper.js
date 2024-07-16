// jwt token getter setter

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const saveRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

// set data to local storage
export const setData = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
}

// get data by key from local storage
export const getData = (key) => {
  return JSON.parse(localStorage.getItem('data'))[key];
}

// remove token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
}

// clear local storage
export const clearStorage = () => {
  localStorage.clear();
}
