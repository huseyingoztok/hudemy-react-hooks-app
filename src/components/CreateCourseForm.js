import React, { useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../actions/courses";
import { clearFix } from "../helpers/customStyles";
import { Redirect } from "react-router-dom";
function CreateCourseForm() {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [cover, setCover] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSubmitOk, setIsSubmitOk] = useState(false);
  const dispatch = useDispatch();
  const createCourseReducer = useSelector(state => state.createCourseReducer);
  const { loading } = createCourseReducer;
  const handleChange = (e, setterFunc) => {
    setterFunc(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = formHasError();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const course = { title, instructor, cover };
      dispatch(createCourse(course));
      setIsSubmitOk(true);
    }
  };

  const formHasError = () => {
    const errors = {};
    if (!title) {
      errors.titleError = "Course Name can not be empty.";
    }
    if (!instructor) {
      errors.instructorError = "Instructor can not be empty.";
    }
    if (!cover) {
      errors.coverError = "Cover Photo can not be empty.";
    }
    return errors;
  };
  return (
    <div>
      <Form loading={loading}>
        <Form.Input
          error={errors.titleError ? errors.titleError : false}
          fluid
          label="Course Name"
          placeholder="Course Name"
          name="title"
          value={title}
          onChange={e => handleChange(e, setTitle)}
        />
        <Form.Input
          error={errors.instructorError ? errors.instructorError : false}
          fluid
          label="Intructor"
          placeholder="Intructor"
          name="instructor"
          value={instructor}
          onChange={e => handleChange(e, setInstructor)}
        />
        <Form.Input
          error={errors.coverError ? errors.coverError : false}
          fluid
          label="Cover Photo"
          placeholder="Cover Photo"
          name="cover"
          value={cover}
          onChange={e => handleChange(e, setCover)}
        />
        <Image src={cover} size="small" />
        <div style={clearFix}></div>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      {!loading && isSubmitOk && <Redirect to="/courses" />}
    </div>
  );
}

export default CreateCourseForm;
