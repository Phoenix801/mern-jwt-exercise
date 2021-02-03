import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Modal,
  ModalHeader, 
  ModalBody, 
  ListGroup, ListGroupItem, 
  Button,  
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../flux/actions/exerciseActions';
import { IExerciseReduxProps, IExerciseList, IExistingExercise, IExercise, ITarget } from '../types/interfaces';

const ExerciseList = ({
  getItems,
  exercise,
  auth,
  editItem,
  deleteItem,
}: IExerciseList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const darkGrey = 'rgba(20, 20, 20, 0.85)';
  const white = 'rgba(240, 240, 240, 0.85)';
  const green = 'rgba(0, 255, 0, 0.4)';

  const [exerciseName, setExercise] = useState('');
  const [numberOfSets, setSets] = useState('');
  const [numberOfReps, setReps] = useState('');
  const [daysModal, setDays] = useState(false);

  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);


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

  const handleExistingDays =  (daysArr: number[]) => 
  {
    if(daysArr.indexOf(0) !== -1)
    {
      handleToggleSunday();
    }
    if(daysArr.indexOf(1) !== -1)
    {
      handleToggleMonday();
    }
    if(daysArr.indexOf(2) !== -1)
    {
      handleToggleTuesday();
    }
    if(daysArr.indexOf(3) !== -1)
    {
      handleToggleWednesday();
    }
    if(daysArr.indexOf(4) !== -1)
    {
      handleToggleThursday();
    }
    if(daysArr.indexOf(5) !== -1)
    {
      handleToggleFriday();
    }
    if(daysArr.indexOf(6) !== -1)
    {
      handleToggleSaturday();
    }
  }

  const handleButtonColor = (e: any) => 
  {
    const buttonColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = buttonColor === white ? green : white;//toggle week day button color
                                                                           //if white turn green, else turn white
  }

  const handleOnSubmit = (e: any, phone: number, exerciseID: string) => {
    e.preventDefault();

const sets: number = Number(numberOfSets);
const reps: number = Number(numberOfReps);
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

    // edit item via edititem action
    editItem(exerciseID, newExercise);
    // Close modal
    handleToggleEdit();
    //window.location.reload();
  };

const handleOnSubmitDays = (daysArr: number[]) => {

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

  const handleEdit = (exerciseName: string, sets: string, reps: string) => {
    setExercise(exerciseName);
    setSets(sets);
    setReps(reps);

    handleToggleEdit();
  }

  const [editExerciseModal, setChanges] = useState(false); //edit Exercise
  const handleToggleEdit = () => setChanges(!editExerciseModal);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

/*  const handleUpdate = (id: string, exercise: IExercise) => {
    editItem(id, exercise);
  };*/

  const date: Date = new Date();
  const today: number = date.getDay();


function todaysUserExercises(exercise: IExistingExercise) {
    try {
      if (auth.isAuthenticated === true ) {
        if (exercise.phone === auth.user.phone && exercise.days.includes(today)) {
          return exercise;
        }
      }
     } catch (err) {
        console.log(err)
      }
  }

//translate day numbers to strings for display on the ExerciseList
function getExerciseDays(daysArr: number[]) {
    var daysArrObj = ['Sunday', ' Monday', ' Tuesday', ' Wednesday', ' Thursday', ' Friday', ' Saturday']
    let dayStrArr: String[] = [];

    daysArr.forEach((day) => dayStrArr.push(daysArrObj[(day)]))

    return dayStrArr;
}

const { exercises } = exercise;
const todaysPersonalExercises: IExistingExercise[] = exercises.filter(todaysUserExercises);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="exercise-list">
          {todaysPersonalExercises.map(({ _id, exerciseName, sets, reps, days, phone }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {auth.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                 ) : null}
                <Button
                      outline color="secondary"
                      style={{ backgroundColor: white, color: darkGrey }}
                      onClick={() => { handleEdit(exerciseName, sets, reps); handleExistingDays(days);}}> 
                      {exerciseName + ' - Sets: ' + sets + ', Reps: ' + reps + ' - Days: ' + getExerciseDays(days).toString()}
                </Button>
                <Modal isOpen={editExerciseModal} toggle={handleToggleEdit}>
                      <ModalHeader toggle={handleToggleEdit}>Edit Exercise</ModalHeader>
                      <ModalBody>
                      <Form onSubmit={(e) => {handleOnSubmit(e, phone, _id);}}>
            <FormGroup>
              <Label for="exerciseName">Exercise Name</Label>
              <Input
                type="text"
                name="exerciseName"
                id="exerciseName"
                className="mb-3"
                placeholder={exerciseName}
                onChange={handleChangeExercise}
              />
              <Label for="sets">Number of Sets</Label>
              <Input
                type="number"
                name="sets"
                id="sets"
                className="mb-3"
                placeholder={sets}
                onChange={handleChangeSets}
              />
              <Label for="reps">Number of Repetitions</Label>
              <Input
                type="number"
                name="reps"
                id="reps"
                className="mb-3"
                placeholder={reps}
                onChange={handleChangeReps}
              />
              <Button
                color="dark"
                style={{ marginBottom: '2rem' }}
                onClick={() => { handleToggleDays();}}
              >
                Pick Days
              </Button>
                      <Modal isOpen={daysModal} toggle={handleToggleDays}>
                      <ModalHeader toggle={handleToggleDays}>Add To Workout Plan</ModalHeader>
                      <ModalBody>
                    <Button
                      name="sunday"
                      id="sunday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(0) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleSunday();}}
                    >
                      Sun
                    </Button>              
                      <Button
                      name="monday"
                      id="monday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(1) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleMonday();}}
                    >
                      Mon
                    </Button>              
                      <Button
                      name="tuesday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(2) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleTuesday();}}
                    >
                      Tues
                    </Button>              
                      <Button
                      name="wednesday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(3) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleWednesday();}}
                    >
                      Wed
                    </Button>              
                      <Button
                      name="thursday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(4) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleThursday();}}
                    >
                      Thur
                    </Button>              
                      <Button
                      name="friday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(5) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
                      onClick={(e) => { handleButtonColor(e); handleToggleFriday();}}
                    >
                      Fri
                    </Button>              
                      <Button
                      name="saturday"
                      outline color="secondary"
                      style={{ backgroundColor: days.indexOf(6) === -1 ? white : green, marginLeft: '0.75rem', marginBottom: '2rem', color: darkGrey }}
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
                      <Button color="dark" style={{ marginTop: '2rem' }} block 
                      onClick={(e) => {handleToggleEdit(); handleOnSubmit(e, phone, _id);}}>
                      Save Changes
                    </Button>
                    </FormGroup>
                    </Form>
                      </ModalBody>
                      </Modal>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state: IExerciseReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  exercise: state.exercise,
  auth: state.auth
});

export default connect(mapStateToProps, { getItems, editItem, deleteItem })(ExerciseList);
