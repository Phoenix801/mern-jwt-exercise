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
import CSS from 'csstype';


const ExerciseModal = ({ auth, addItem  }: IExerciseModal) => {

  const darkGrey = 'rgba(20, 20, 20, 0.85)';
  const white = 'rgba(255, 255, 255, 0.85)';
  const green = 'rgba(0, 255, 0, 0.4)';

  const [modal, setModal] = useState(false);
  const [exerciseName, setExercise] = useState('');
  const [numberOfSets, setSets] = useState('');
  const [numberOfReps, setReps] = useState('');
  const [daysModal, setDays] = useState(false);

  let phoneHolder: number | undefined = 0;
  try {
    if (auth.isAuthenticated === true) {
      phoneHolder = auth.user.phone;
    }
   } catch (err) {
      console.log(err)
    }

  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const handleToggle = () => setModal(!modal);

  const handleChangeExercise = (e: ITarget) => setExercise(e.target.value);
  const handleChangeSets = (e: ITarget) => setSets(e.target.value);
  const handleChangeReps = (e: ITarget) => setReps(e.target.value);
  const handleToggleDays = () => setDays(!daysModal);
  
  const handleToggleSunday = () => setSunday(!sunday);
  const handleToggleMonday = () => setMonday(!monday);
  const handleToggleTuesday = () => setTuesday(!tuesday);
  const handleToggleWednesday = () => setWednesday(!wednesday);
  const handleToggleThursday = () => setThursday(!thursday);
  const handleToggleFriday = () => setFriday(!friday);
  const handleToggleSaturday = () => setSaturday(!saturday);

  const handleButtonColor = (e: any) => 
  {
    const buttonColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = buttonColor === white ? green : white;//toggle week day button color
                                                                           //if white turn green, else turn white
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

const sets: number = Number(numberOfSets);
const reps: number = Number(numberOfReps);
const phone = Number(phoneHolder);
let days: number[] = [];

handleOnSubmitDays(days); //fill days array 

    // Create exercise object
    const newExercise = {
      exerciseName,
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

  const handleOnSubmitDays = (daysArr: number[]) => {
    console.log(daysArr);

    if(sunday)
    {
      daysArr.push(0);
      handleToggleSunday();
    }
    if(monday)
    {
      daysArr.push(1);
      handleToggleMonday();
    }
    if(tuesday)
    {
      daysArr.push(2);
      handleToggleTuesday();
    }
    if(wednesday)
    {
      daysArr.push(3);
      handleToggleWednesday();
    }
    if(thursday)
    {
      daysArr.push(4);
      handleToggleThursday();
    }
    if(friday)
    {
      daysArr.push(5);
      handleToggleFriday();
    }
    if(saturday)
    {
      daysArr.push(6);
      handleToggleSaturday();
    }
  }

  

  return (
    <div>
      {auth.isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Exercise
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage exercises</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Workout Plan</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="exerciseName">Exercise Name</Label>
              <Input
                type="text"
                name="exerciseName"
                id="exerciseName"
                placeholder="Exercise"
                className="mb-3"
                onChange={handleChangeExercise}
              />
              <Label for="sets">Number of Sets</Label>
              <Input
                type="number"
                name="sets"
                id="sets"
                placeholder="Sets"
                className="mb-3"
                onChange={handleChangeSets}
              />
              <Label for="reps">Number of Repetitions</Label>
              <Input
                type="number"
                name="reps"
                id="reps"
                placeholder="Reps"
                className="mb-3"
                onChange={handleChangeReps}
              />
              <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={handleToggleDays}
              >
                Pick Days
              </Button>
                      <Modal isOpen={daysModal} toggle={handleToggleDays}>
                      <ModalHeader toggle={handleToggleDays}>Add To Workout Plan</ModalHeader>
                      <ModalBody>
                    <Button
                      name="sunday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleSunday();}}
                    >
                      Sun
                    </Button>              
                      <Button
                      name="monday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleMonday();}}
                    >
                      Mon
                    </Button>              
                      <Button
                      name="tuesday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleTuesday();}}
                    >
                      Tues
                    </Button>              
                      <Button
                      name="wednesday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleWednesday();}}
                    >
                      Wed
                    </Button>              
                      <Button
                      name="thursday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleThursday();}}
                    >
                      Thur
                    </Button>              
                      <Button
                      name="friday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleFriday();}}
                    >
                      Fri
                    </Button>              
                      <Button
                      name="saturday"
                      outline color="secondary"
                      style={{ backgroundColor: white, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleSaturday();}}
                    >
                      Sat
                    </Button>
                    <Button color="dark" style={{ marginTop: '2rem' }} block 
                      onClick={handleToggleDays}>
                      Save Days
                    </Button>
                      </ModalBody>
                      </Modal>
              
      
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Exercise
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
  exercise: state.exercise,
  auth: state.auth
});

export default connect(mapStateToProps, { addItem })(ExerciseModal);
