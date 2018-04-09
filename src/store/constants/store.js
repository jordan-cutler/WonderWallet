import reducer from '../reducer';
import { createStore } from 'redux';

export const STORE = createStore(reducer);
