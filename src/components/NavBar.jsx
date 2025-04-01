
import React, { useState, useEffect, useRef } from "react"
import { Search, Github, Linkedin, UserSearch, Mic, Menu, X, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import emailjs from "@emailjs/browser"

const Navbar = ({ onSearch, onCategoryChange, selectedCategory }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const categoriesRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  const categories = [
    { display: "General", value: "general" },
    { display: "Business", value: "business" },
    { display: "Technology", value: "technology" },
    { display: "Entertainment", value: "entertainment" },
    { display: "Sports", value: "sports" },
    { display: "Science", value: "science" },
    { display: "Health", value: "health" },
  ]

  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) onSearch(searchQuery.trim())
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearchSubmit(e)
  }

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  const handleNotificationSubscribe = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubscriptionStatus({
        success: false,
        message: "Please enter a valid email address.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const templateParams = {
        to_email: email,
        reply_to: email,
        from_name: "Team NewsNow",
        to_name: email.split("@")[0],
        subject: "NewsNow Subscription Confirmation",
        message: `Dear Subscriber,\n\nThank you for subscribing to NewsNow! We're delighted to confirm that your subscription has been successfully processed and is now active.\n\nBest regards,\nThe NewsNow Team`,
      }

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      
      if (response.status === 200) {
        setSubscriptionStatus({
          success: true,
          message: "Confirmation email sent! Please check your inbox.",
        })

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Subscription Confirmed", {
            body: "A confirmation email has been sent to your inbox.",
          })
        }

        setTimeout(() => {
          setIsNotificationModalOpen(false)
          setSubscriptionStatus(null)
          setEmail("")
        }, 3000)
      } else {
        throw new Error(`Response status: ${response.status}`)
      }
    } catch (error) {
      console.error("EmailJS error:", error)
      setSubscriptionStatus({
        success: false,
        message: `Failed to send email: ${error.message || "Unknown error. Please try again."}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen)
    if (isNotificationModalOpen) {
      setEmail("")
      setSubscriptionStatus(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationModalOpen && !event.target.closest(".notification-modal")) {
        setIsNotificationModalOpen(false)
        setSubscriptionStatus(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isNotificationModalOpen])

  return (
    <nav className="fixed top-0 left-0 w-full z-10">
      {/* Main navbar */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-zinc-800/50 py-4">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                NEWS<span className="text-blue-400 group-hover:text-white transition-colors">NOW</span>
              </h1>
              <Mic className="h-5 w-5 text-blue-400 animate-pulse" />
            </div>

            {/* Quote */}
            <div className="hidden md:block text-center absolute left-1/2 transform -translate-x-1/2">
              <p className="text-zinc-300 text-sm font-medium whitespace-nowrap tracking-wide">
                Stay Ahead, Stay Informed
                <span className="text-zinc-500 text-xs block mt-1 font-normal">
                  Your window to the world's stories
                </span>
              </p>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={toggleNotificationModal}
                className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110 relative group"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 h-2 w-2 bg-blue-400 rounded-full animate-ping" />
              </button>
              <div className="flex items-center space-x-6 border-l border-zinc-700/50 pl-6">
                <a
                  href="https://github.com/shuvmraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://shuvm.me/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <UserSearch className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleNotificationModal}
                className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110 relative group"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 h-2 w-2 bg-blue-400 rounded-full animate-ping" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Search */}
      <div className="bg-black/60 backdrop-blur-lg border-b border-zinc-800/50 shadow-lg shadow-black/10">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex-1 overflow-x-auto scrollbar-hide" ref={categoriesRef}>
              <div className="flex items-center space-x-3 whitespace-nowrap">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => onCategoryChange(category.value)}
                    className={`text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {category.display}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Search */}
            <div className="relative ml-6 w-72 hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search news..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-zinc-900/50 text-zinc-200 placeholder-zinc-500 text-sm backdrop-blur-sm transition-all"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-blue-400 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-black/80 backdrop-blur-lg border-b border-zinc-800/50 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="Search news..."
              className="w-full px-4 py-2 pl-9 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-zinc-900/50 text-zinc-200 placeholder-zinc-500 text-sm"
              autoFocus
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg shadow-lg absolute left-0 right-0 z-20 border-t border-zinc-800/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col py-4">
              <div className="flex justify-center space-x-6 py-4">
                <a
                  href="https://github.com/shuvmraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://shuvm.me/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-zinc-400 hover:text-blue-400 transition-all hover:scale-110"
                >
                  <UserSearch className="h-5 w-5" />
                </a>
              </div>
              <div className="border-t border-zinc-800/50 my-2" />
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      onCategoryChange(category.value)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.value
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {category.display}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="notification-modal bg-zinc-900/90 border border-zinc-800/50 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-zinc-100">Get News Notifications</h3>
                <button 
                  onClick={toggleNotificationModal} 
                  className="text-zinc-400 hover:text-zinc-200 hover:scale-110 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {subscriptionStatus?.success ? (
                <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 text-blue-400 text-center">
                  {subscriptionStatus.message}
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleNotificationSubscribe}>
                  <p className="mb-4 text-zinc-300 text-sm">
                    Subscribe to receive news updates directly to your inbox.
                  </p>

                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-300">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-zinc-800/50 text-zinc-200 placeholder-zinc-500 transition-all"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {subscriptionStatus?.success === false && (
                    <div className="mb-4 bg-red-900/20 border border-red-900/30 rounded-lg p-3 text-red-400 text-sm">
                      {subscriptionStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg text-white transition-all ${
                      isSubmitting
                        ? "bg-blue-600/80 cursor-wait"
                        : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Subscribe"}
                  </button>

                  <p className="mt-3 text-xs text-zinc-500">
                    We won't spam you. You can unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

