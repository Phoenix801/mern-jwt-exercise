import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import ExerciseList from './components/ExerciseList';
import ExerciseModal from './components/ExerciseModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './flux/store';
import { loadUser } from './flux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ExerciseModal />
          <ExerciseList />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
