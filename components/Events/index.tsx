import { MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import EventsDetails from './components/EventsDetails'

export type EventsPropsType = {
  eventsTopContent?: string
  eventsList?: MpBlogPostsQuery
}

function Events(props: EventsPropsType) {
  const { eventsTopContent, eventsList } = props
  return (
    <>
      {eventsTopContent && <div dangerouslySetInnerHTML={{ __html: eventsTopContent }} />}
      <EventsDetails list={eventsList} />
    </>
  )
}

export default Events
