
import React,{ useState, useEffect } from "react"
import { motion } from "framer-motion"
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-gray-100 min-h-screen flex flex-col"
    >
      <Navbar onSearch={handleSearch} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />

      <motion.main 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-grow pt-20 pb-12 flex flex-col"
      >
        <div className="container mx-auto px-4 md:px-6 flex-grow">
          {/* Weather Widget for Mobile */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="md:hidden mb-6 mt-4"
          >
            <WeatherWidget />
          </motion.div>

          {/* Mobile Subscription Widget */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="md:hidden mb-6"
          >
            <SubscriptionWidget />
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mb-6 mt-6 pb-2 border-b border-zinc-800"
          >
            <motion.h1 
              layout
              className="text-2xl md:text-3xl font-bold text-white"
            >
              {getHeadingText()}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-sm text-zinc-400 mt-1"
            >
              Latest updates and trending stories
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="lg:col-span-2"
            >
              <motion.div 
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900 rounded-xl shadow-lg shadow-black/40 overflow-hidden min-h-[600px] border border-zinc-800"
              >
                <NewsGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  className="w-full mx-auto min-h-[600px]"
                />
              </motion.div>
            </motion.div>

            <motion.aside 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="lg:col-span-1 space-y-6 hidden lg:block sticky top-24"
            >
              <motion.div 
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-zinc-900 rounded-xl shadow-lg shadow-black/40 p-4 border border-zinc-800"
              >
                <WeatherWidget />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <SubscriptionWidget />
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-auto"
      >
        <Footer />
      </motion.footer>
    </motion.div>
  )
}

export default App

