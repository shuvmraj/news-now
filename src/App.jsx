
import React,{ useState, useEffect } from "react"
import Navbar from "./components/NavBar"
import NewsGrid from "./components/NewsGrid"
import WeatherWidget from "./components/WeatherWidget"
import SubscriptionWidget from "./components/SubscriptionWidget"
import Footer from "./components/Footer"
import emailjs from "@emailjs/browser"

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Initialize EmailJS with correct public key
  useEffect(() => {
    emailjs.init("vyG59rxXCCAaZ01JV")
  }, [])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSearchQuery("")
    setIsSearching(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setIsSearching(true)
    setSelectedCategory("")
  }

  const getHeadingText = () => {
    if (isSearching && searchQuery) {
      return `Search results for "${searchQuery}"`
    }
    if (selectedCategory === "general") {
      return "Your briefing"
    }
    return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />

      <main className="flex-grow pt-20 pb-12 flex flex-col">
        <div className="container mx-auto px-4 md:px-6 flex-grow">
          {/* Weather Widget for Mobile */}
          <div className="md:hidden mb-6 mt-4">
            <WeatherWidget />
          </div>

          {/* Mobile Subscription Widget */}
          <div className="md:hidden mb-6">
            <SubscriptionWidget />
          </div>

          <div className="mb-6 mt-6 pb-2 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getHeadingText()}</h1>
            <p className="text-sm text-gray-500 mt-1">Latest updates and trending stories</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[600px]">
                <NewsGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  className="w-full mx-auto min-h-[600px]"
                />
              </div>
            </div>

            <aside className="lg:col-span-1 space-y-6 hidden lg:block sticky top-24">
              <div className="bg-white rounded-xl shadow-sm p-4">
              
                <WeatherWidget />
              </div>

              {/* Desktop Subscription Widget */}
              <SubscriptionWidget />
            </aside>
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  )
}

export default App

