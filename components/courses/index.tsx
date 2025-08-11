// import EventsTop from '../Events/components/EventsTop'
import CourseDetail from './components/CourseDetails'

function Courses({ coursesCategory, coursesTop, allCourses }) {
  return (
    <>
      {/*    <EventsTop
        title='Want to Bake On Your Own?'
        description='Ribbons & Balloons provides 10 baking & decorating courses in Dubai. Whether its baking or decorating, our experienced chefs are ready for all levels. See if there is a baking course that’s perfect for your hobby or your career below. You can buy the course for yourself or gift the course to your loved ones!'
        isBorder={true}
      />*/}
      {coursesTop && <div dangerouslySetInnerHTML={{ __html: coursesTop }} />}
      <CourseDetail categories={coursesCategory} coursesList={allCourses} />
    </>
  )
}

export default Courses
