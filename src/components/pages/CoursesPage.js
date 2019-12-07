import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCourses, removeCourse } from "../../actions/courses";
import NegativeErrorMessages from "../NegativeErrorMessages";
import { Card, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { hashLoaderStyle } from "../../helpers/customStyles";
function CoursesPage() {
  const listCoursesReducer = useSelector(state => state.listCoursesReducer);
  const deleteCourseReducer = useSelector(state => state.deleteCourseReducer);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState("");
  const [courseId, setCourseId] = useState("");
  const dispatch = useDispatch();
  const handleDelete = (e, id) => {
    if (id) {
      dispatch(removeCourse(id));
    }
  };
  useEffect(() => {
    dispatch(getCourses());
  },[dispatch]);
  useEffect(() => {
    setCourses(listCoursesReducer.courses);
    setError(listCoursesReducer.error);
    setFetching(listCoursesReducer.fetching || deleteCourseReducer.fetching);
    setCourseId(deleteCourseReducer.courseId)
  })
  const extra = id => {
    return (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="blue" as={Link} to={`/course/edit/${id}`}>
            <Icon name="pencil" />
            Edit
          </Button>
          <Button basic color="red" onClick={e => handleDelete(e, id)}>
            <Icon name="trash" />
            Delete
          </Button>
        </div>
      </Card.Content>
    );
  };
  const isCourseListEmpty = (
    <div>
      <h4>There are no courses yet.</h4>
    </div>
  );
  const fetchingCoursesHasError = (
    <div>
      <NegativeErrorMessages message={error} />
    </div>
  );
  const courseList = (
    <Card.Group itemsPerRow={3}>
      {courses
        .filter(c => !courseId || c._id !== courseId)
        .map(course => {
          return (
            <Card
              key={course._id}
              image={course.cover}
              header={`${course.title} - ${course.instructor}`}
              extra={extra(course._id)}
            />
          );
        })}
    </Card.Group>
  );
  const pageLoading = (
    <HashLoader
      css={hashLoaderStyle}
      sizeUnit={"px"}
      size={150}
      color={"#123abc"}
      loading={fetching}
    />
  );
  return (
    <div>
      <h2>
        Courses
        <Button
          style={{ float: "right" }}
          color="green"
          as={Link}
          to="/course/create"
        >
          <Icon name="plus" />
          Add New Course
        </Button>
      </h2>
      <hr />
      {pageLoading}
      {!fetching &&
        (error
          ? fetchingCoursesHasError
          : courses.length === 0 && !fetching
          ? isCourseListEmpty
          : courseList)}
    </div>
  );
}

export default CoursesPage