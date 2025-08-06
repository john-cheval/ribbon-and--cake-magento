import { MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import { BlogPostItem } from '../shared/swiper/TestimonialSwiper'
import EventsDetails from './components/EventsDetails'

// import EventsTop from './components/EventsTop'

export type EventsPropsType = {
  eventsTopContent?: string
  eventsList?: MpBlogPostsQuery
}

function Events(props: EventsPropsType) {
  const { eventsTopContent, eventsList } = props
  return (
    <>
      {/*
      <EventsTop
        title='Corporate & events'
        description='Elevate your next event with Ribbons & Balloons. Our expert team specializes in
        personalizing cakes, cupcakes, and desserts with your brand or image. Just complete the form
        below to get started, no event is too big or small!Elevate your next event with Ribbons &
        Balloons. Our expert team specializes in personalizing cakes, cupcakes, and desserts with
        your brand or image. Just complete the form below to get started, no event is too big or
        small!Elevate your'
      /> */}
      {eventsTopContent && <div dangerouslySetInnerHTML={{ __html: eventsTopContent }} />}
      <EventsDetails list={eventsList} />
    </>
  )
}

export default Events
