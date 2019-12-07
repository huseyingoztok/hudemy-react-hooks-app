import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditCourseForm from "../EditCourseForm";
import { getCourseById } from "../../actions/courses";

function EditPage(props) {
  const dispatch = useDispatch();
  const getCourseReducer = useSelector(state => state.getCourseReducer)
  const [currentCourse, setCurrentCourse] = useState({});
  useEffect(() => {
    dispatch(getCourseById(props.match.params._id));
  }, [dispatch, props.match.params._id]);
  
  useEffect(() => {
    setCurrentCourse(getCourseReducer.course)
  }, [getCourseReducer.course])
  return (
    <div>
      <h2>Edit Page</h2>
      <hr />
      <EditCourseForm currentCourse={currentCourse} />
    </div>
  );
}
export default EditPage;
