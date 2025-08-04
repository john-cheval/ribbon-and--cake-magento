import { HomeBanner } from './components/HomeBanner'
import { HomeCollection } from './components/HomeCollection'
import { HomeCta } from './components/HomeCta'
import { HomeJar } from './components/HomeJar'
import { HomeOccasion } from './components/HomeOccasion'
import { HomeSectionFour } from './components/HomeSectionFour'
import { HomeSectionThree } from './components/HomeSectionThree'
import { HomeStory } from './components/HomeStory'

export function HomePage({ dummy }) {
  return (
    <>
      <HomeBanner h={dummy} />
      <HomeStory />
      <HomeSectionThree />
      <HomeSectionFour />
      <HomeCta />
      <HomeOccasion />
      <HomeCollection />
      <HomeJar />
    </>
  )
}
