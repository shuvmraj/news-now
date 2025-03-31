
import React,{ useState, useEffect, useRef } from "react"
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

  // Initialize EmailJS with correct public key
  useEffect(() => {
    emailjs.init("vyG59rxXCCAaZ01JV")
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e)
    }
  }

  const scroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200
      if (direction === "left") {
        categoriesRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleNotificationSubscribe = async (e) => {
    e.preventDefault()

    // Basic email validation
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
      // Prepare the template parameters
      const templateParams = {
        to_email: email,
        reply_to: email,
        from_name: "Team NewsNow",
        to_name: email.split("@")[0],
        subject: "NewsNow Subscription Confirmation",
        message: `Dear Subscriber,

Thank you for subscribing to NewsNow! We're delighted to confirm that your subscription has been successfully processed and is now active.

Best regards,
The NewsNow Team`,
      }

      // Send email using EmailJS
      const response = await emailjs.send("service_whdnycp", "template_w1cng48", templateParams)

      if (response.status === 200) {
        setSubscriptionStatus({
          success: true,
          message: "Confirmation email sent! Please check your inbox.",
        })

        // Show a browser notification if supported
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Subscription Confirmed", {
            body: "A confirmation email has been sent to your inbox.",
          })
        }

        // Clear form after successful submission
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
    // Reset states when closing modal
    if (isNotificationModalOpen) {
      setEmail("")
      setSubscriptionStatus(null)
    }
  }

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationModalOpen && !event.target.closest(".notification-modal")) {
        setIsNotificationModalOpen(false)
        setSubscriptionStatus(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isNotificationModalOpen])

  return (
    <nav className="fixed top-0 left-0 w-full z-10">
      {/* Main navbar */}
      <div className="bg-black border-b border-zinc-800 py-4 shadow-lg shadow-black/40">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                NEWS<span className="text-blue-400">NOW</span>
              </h1>
              <Mic className="h-5 w-5 text-blue-400" />
            </div>

            {/* Quote - Centered */}
            <div className="hidden md:block text-center absolute left-1/2 transform -translate-x-1/2">
              <p className="text-zinc-400 text-sm font-medium whitespace-nowrap">
                Stay Ahead, Stay Informed
                <span className="text-zinc-500 text-xs block mt-0.5">Your window to the world's stories</span>
              </p>
            </div>

            {/* Desktop Icons and Links */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={toggleNotificationModal}
                className="text-zinc-400 hover:text-blue-400 transition-colors relative group"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 h-2 w-2 bg-blue-400 rounded-full group-hover:animate-ping"></span>
              </button>
              <div className="flex items-center space-x-5 border-l border-zinc-800 pl-5">
                <a
                  href="https://github.com/shuvmraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://shuvm.me/" 
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <UserSearch className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Mobile Search Bar - Shown when search is open */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 p-4 bg-black border-b border-zinc-800 md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search news..."
                    className="w-full px-4 py-2 pl-9 rounded-full border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-900 text-zinc-200 placeholder-zinc-500 text-sm"
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

            {/* Mobile controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-zinc-400 hover:text-blue-400 transition-colors"
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleNotificationModal}
                className="text-zinc-400 hover:text-blue-400 transition-colors relative group"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 h-2 w-2 bg-blue-400 rounded-full group-hover:animate-ping"></span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-400 hover:text-blue-400 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories bar with Search */}
      <div className="bg-black border-b border-zinc-800 shadow-lg shadow-black/40">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between py-2">
            <div className="flex-1 overflow-x-auto scrollbar-hide" ref={categoriesRef}>
              <div className="flex items-center space-x-2 whitespace-nowrap">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => onCategoryChange(category.value)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                      selectedCategory === category.value
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    {category.display}
                  </button>
                ))}
              </div>
            </div>

            {/* Search bar */}
            <div className="relative ml-4 w-64 hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search news..."
                className="w-full px-4 py-1.5 pl-9 rounded-full border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-900 text-zinc-200 placeholder-zinc-500 text-sm"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black shadow-lg absolute left-0 right-0 z-20 border-t border-zinc-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col py-4">
              <div className="flex justify-center space-x-6 py-4">
                <a
                  href="https://github.com/shuvmraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shubham-raj-b8185a311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://shuvm.me/" 
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <UserSearch className="h-5 w-5" />
                </a>
              </div>
              <div className="border-t border-zinc-800 my-2"></div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      onCategoryChange(category.value)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm py-2 px-3 rounded-md transition-colors ${
                      selectedCategory === category.value
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
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

      {/* Notification Subscription Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="notification-modal bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-zinc-100">Get News Notifications</h3>
                <button onClick={toggleNotificationModal} className="text-zinc-400 hover:text-zinc-200">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {subscriptionStatus?.success ? (
                <div className="bg-blue-900/20 border border-blue-900/30 rounded-md p-4 text-blue-400 text-center">
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
                      className="w-full px-4 py-2 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-800 text-zinc-200 placeholder-zinc-500"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {subscriptionStatus?.success === false && (
                    <div className="mb-4 bg-red-900/20 border border-red-900/30 rounded-md p-3 text-red-400 text-sm">
                      {subscriptionStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white ${
                      isSubmitting
                        ? "bg-blue-600/80 cursor-wait"
                        : "bg-blue-500 hover:bg-blue-600 transition-colors"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Subscribe"}
                  </button>

                  <p className="mt-3 text-xs text-zinc-500">We won't spam you. You can unsubscribe at any time.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

