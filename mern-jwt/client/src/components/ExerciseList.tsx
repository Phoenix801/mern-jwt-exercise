import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/exerciseActions';
import { IExerciseReduxProps, IExerciseList } from '../types/interfaces';

const ExerciseList = ({
  getItems,
  exercise,
  auth,
  deleteItem
}: IExerciseList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const { exercises } = exercise;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="exercise-list">
          {exercises.map(({ _id, exerciseName }) => (
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
                {exerciseName}
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
