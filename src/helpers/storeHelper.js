import {store} from '../store/store'; // Adjust the import based on your store file location

export const getState = () => {
  return store.getState();
};