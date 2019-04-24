import 'firebase/database';

import firebase from 'firebase/app';
import Rebase from 're-base';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDyEKqWXgmCR_2vmoPZV1RDzVi9QvMnUsE',
  authDomain: 'wesbos-react-beginners.firebaseapp.com',
  databaseURL: 'https://wesbos-react-beginners.firebaseio.com',
  projectId: 'wesbos-react-beginners',
  storageBucket: 'wesbos-react-beginners.appspot.com',
  messagingSenderId: '231618237155'
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export { app, db };

export default base;
