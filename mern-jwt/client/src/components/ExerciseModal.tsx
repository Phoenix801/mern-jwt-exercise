import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/exerciseActions';
import { IExerciseReduxProps, IExerciseModal, ITarget } from '../types/interfaces';

const ExerciseModal = ({ auth, addItem  }: IExerciseModal) => {
  const [modal, setModal] = useState(false);
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [days, setDays] = useState('');
  const phone = auth.user.phone!;

  const handleToggle = () => setModal(!modal);

  const handleChangeExercise = (e: ITarget) => setExercise(e.target.value);
  const handleChangeSets = (e: ITarget) => setSets(e.target.value);
  const handleChangeReps = (e: ITarget) => setReps(e.target.value);
  const handleChangeDays = (e: ITarget) => setDays(e.target.value);


  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    // Create user object
    const newExercise = {
      exercise,
      sets,
      reps,
      days,
      phone
    };

    // Add item via addItem action
    addItem(newExercise);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeExercise}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IExerciseReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  item: state.item,
  auth: state.auth
});

export default connect(mapStateToProps, { addItem })(ExerciseModal);
