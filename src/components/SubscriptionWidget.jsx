
import React,{ useState } from "react"
import emailjs from "@emailjs/browser"

const SubscriptionWidget = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubscribe = async (e) => {
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
        to_name: email.split("@")[0], // Use part before @ as name
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
          message: "Subscription successful! Check your inbox for confirmation.",
        })

        // Clear form after successful submission
        setTimeout(() => {
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
        message: `Failed to subscribe: ${error.message || "Unknown error. Please try again."}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm p-4">
      <h2 className="font-semibold text-lg mb-2 text-white">Stay updated</h2>
      <p className="text-gray-400 text-sm mb-4">Get the daily digest delivered to your inbox</p>

      {subscriptionStatus?.success ? (
        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-md p-3 text-emerald-400 text-sm text-center mb-2">
          {subscriptionStatus.message}
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500 w-full text-sm placeholder-gray-400"
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 ${isSubmitting ? "bg-emerald-600 cursor-wait" : "bg-emerald-500 hover:bg-emerald-600"} text-white rounded-lg font-medium transition-colors text-sm`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {subscriptionStatus?.success === false && (
        <div className="mt-2 bg-red-500/20 border border-red-500/50 rounded-md p-2 text-red-400 text-xs">
          {subscriptionStatus.message}
        </div>
      )}

      <p className="mt-3 text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  )
}

export default SubscriptionWidget

