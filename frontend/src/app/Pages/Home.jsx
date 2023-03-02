import React from 'react'
import HeroSection from '../Components/Home/HeroSection.jsx';
import FeaturedThemes from '../Components/Home/FeaturedThemes.jsx';
import CategorySection from '../Components/Home/CategorySection.jsx';
import RecentThemes from '../Components/Home/RecentThemes.jsx';

function Home() {
    return (
        <>
            <HeroSection />
            <CategorySection />
            <RecentThemes />
            <FeaturedThemes />
        </>
    )
}

export default Home