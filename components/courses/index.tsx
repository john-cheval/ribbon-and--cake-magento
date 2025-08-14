import CourseDetail from './components/CourseDetails'

function Courses({ coursesCategory, coursesTop, allCourses }) {
  return (
    <>
      {coursesTop && <div dangerouslySetInnerHTML={{ __html: coursesTop }} />}
      <CourseDetail categories={coursesCategory} coursesList={allCourses} />
    </>
  )
}

export default Courses
