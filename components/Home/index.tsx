import { HomeBanner } from './components/HomeBanner'
// import { HomeCollection } from './components/HomeCollection'
import { HomeCta } from './components/HomeCta'
import { HomeJar } from './components/HomeJar'
import { HomeOccasion } from './components/HomeOccasion'
import { HomeSectionFour } from './components/HomeSectionFour'
import { HomeSectionThree } from './components/HomeSectionThree'
import { HomeStory } from './components/HomeStory'

export function HomePage({
  Categories,
  justinHeading,
  justInProductList,
  cakes,
  occasionProdcutList,
  miniBytesProductList,
  storyTitle,
  occasionTitle,
  miniBytesTitle,
  CollectionSectionData,
  homeCta,
  homeCeleberate,
  sectionFourProducts,
  homeImagination,
  homeHeroData,
  statementProducts,
}) {
  const cakesCategory = Categories.find((cat) => cat.uid === 'Mw==')
  const occasionsCategory = Categories.find((cat) => cat.uid === 'MTE=')
  const jarsAndMniBytesCategory = Categories.find((cat) => cat.uid === 'MTA=')
  return (
    <>
      <HomeBanner content={homeHeroData} productList={justInProductList} title={justinHeading} />
      <HomeStory title={storyTitle} cakesCategories={cakesCategory} products={cakes} />
      <HomeSectionThree content={homeImagination} />
      <HomeSectionFour content={homeCeleberate} products={statementProducts} />
      <HomeCta content={homeCta} />
      <HomeOccasion
        title={occasionTitle}
        occasionCategories={occasionsCategory}
        products={occasionProdcutList}
      />
      {CollectionSectionData && <div dangerouslySetInnerHTML={{ __html: CollectionSectionData }} />}

      {/* <HomeCollection content={CollectionSectionData} /> */}

      <HomeJar
        title={miniBytesTitle}
        jarsAndMniBytesCategories={jarsAndMniBytesCategory}
        products={miniBytesProductList}
      />
    </>
  )
}
