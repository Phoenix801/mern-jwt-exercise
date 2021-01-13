import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/exerciseActions';
import { IExerciseReduxProps, IExerciseList, IExistingExercise } from '../types/interfaces';

const ExerciseList = ({
  getItems,
  exercise,
  auth,
  deleteItem
}: IExerciseList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const darkGrey = 'rgba(20, 20, 20, 0.85)';
  const white = 'rgba(240, 240, 240, 0.85)';

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

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
          {todaysPersonalExercises.map(({ _id, exerciseName, sets, reps, days }) => (
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
                      style={{ backgroundColor: white, color: darkGrey }}> 
                      {exerciseName + ' - Sets: ' + sets + ', Reps: ' + reps + ' - Days: ' + getExerciseDays(days).toString()}
                </Button>
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

export default connect(mapStateToProps, { getItems, deleteItem })(ExerciseList);
