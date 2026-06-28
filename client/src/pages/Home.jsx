import React from 'react'
import Hero from '../components/Hero'
import FeaturedCollections from '../components/FeaturedCollectionss'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import HeroProducts from '../components/HeroProducts'

const Home = () => {
  return (
    
    <div>
        <Hero/>
        <FeaturedCollections/>
        <WhyChooseUs/>
        <HeroProducts/>
        <Testimonials/>
        <Newsletter/>
    </div>
  )
}

export default Home