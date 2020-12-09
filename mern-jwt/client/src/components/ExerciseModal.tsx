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


  const handleOnSubmit = (e: any) => {
    e.preventDefault();

const sets: number = Number(numberOfSets);
const reps: number = Number(numberOfReps);
const phone = Number(phoneHolder);
let days: string[] = [];

handleOnSubmitDays(days);


console.log('logging days before creating an exercise object: ' + days);

    // Create exercise object
    const newExercise = {
      exerciseName,
      sets,
      reps,
      days,
      phone
    };

    console.log(newExercise);

    // Add item via addItem action
    addItem(newExercise);
    // Close modal
    handleToggle();

    while (days.length)
    {
      days.pop();
    }
  };

  const handleOnSubmitDays = (daysArr: string[]) => {
    console.log('logging sunday boolean status ' + sunday);

    if(sunday)
    {
      daysArr.push('sunday');
    }
    if(monday)
    {
      daysArr.push('monday');
    }
    if(tuesday)
    {
      daysArr.push('tuesday');
    }
    if(wednesday)
    {
      daysArr.push('wednesday');
    }
    if(thursday)
    {
      daysArr.push('thursday');
    }
    if(friday)
    {
      daysArr.push('friday');
    }
    if(saturday)
    {
      daysArr.push('saturday');
    }

    console.log('logging days ' + daysArr);

    handleToggleDays();
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
              <Label for="exercise">Exercise Name</Label>
              <Input
                type="text"
                name="exercise"
                id="exercise"
                placeholder="Exercise"
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
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleSunday}
                    >
                      Sunday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleMonday}
                    >
                      Monday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleTuesday}
                    >
                      Tuesday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleWednesday}
                    >
                      Wedday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleThursday}
                    >
                      Thursday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleFriday}
                    >
                      Friday
                    </Button>              
                      <Button
                      color="dark"
                      style={{ marginBottom: '2rem' }}
                      onClick={handleToggleSaturday}
                    >
                      Saturday
                    </Button>
                    <Button color="dark" style={{ marginTop: '2rem' }} block 
                      onClick={handleToggleDays}>
                      Submit Days
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
