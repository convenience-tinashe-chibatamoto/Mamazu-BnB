import { useState, useEffect } from 'react'
import { 
  Home, Bed, Bath, Wifi, Shield, Sun, Droplet, 
  Camera, Car, Phone, Mail, MapPin, ChevronLeft, 
  ChevronRight, Check, Sparkles, Send 
} from 'lucide-react'
import Logo from './components/Logo'

function App() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [navbarBg, setNavbarBg] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const images = [
    './images/Mamazu BnB (1).jpg',
    './images/Mamazu BnB (2).jpg',
    './images/Mamazu BnB (3).jpg',
    './images/Mamazu BnB (4).jpg',
    './images/Mamazu BnB (5).jpg',
    './images/Mamazu BnB (6).jpg',
    './images/Mamazu BnB (7).jpg',
    './images/Mamazu BnB (8).jpg',
    './images/Mamazu BnB (9).jpg',
    './images/Mamazu BnB (10).jpg',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: Bed, text: '4 Spacious Bedrooms', desc: 'With fitted cupboards & en-suite' },
    { icon: Bath, text: '3 Modern Bathrooms', desc: 'Luxury fixtures & fittings' },
    { icon: Home, text: 'Modern Kitchen', desc: 'Granite countertops & appliances' },
    { icon: Sun, text: '5 KVA Solar Backup', desc: 'Uninterrupted power supply' },
    { icon: Wifi, text: 'Full Wi-Fi Coverage', desc: 'High-speed internet' },
    { icon: Shield, text: 'Premium Security', desc: 'CCTV & motion sensors' },
    { icon: Droplet, text: 'Prolific Borehole', desc: 'Reliable water supply' },
    { icon: Car, text: 'Covered Parking', desc: 'Secure carport & paved driveway' },
  ]

  const amenities = [
    'Double door fridge',
    'Washing machine',
    'Electric and gas cooker',
    'Electric oven',
    'Microwave',
    'Lounge and dining room',
    'Beautiful garden with water feature',
    'Walled and gated',
    'Paved driveway',
    'CCTV surveillance',
    'External motion sensors',
  ]

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % images.length)
  }

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus({ type: 'success', message: data.message })
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredContact: 'email'
        })
      } else {
        setFormStatus({ type: 'error', message: data.message })
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try calling us directly.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg ? 'glass-effect shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo 
              textColor={navbarBg ? 'text-gray-900' : 'text-white text-shadow'}
              iconColor={navbarBg ? '#0891b2' : '#ffffff'}
            />
            <div className="hidden md:flex space-x-8">
              {['home', 'features', 'gallery', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`font-medium capitalize transition-colors ${
                    navbarBg ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200 text-shadow'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <a
              href="tel:+263772363429"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Mamazu BnB ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 gradient-overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-shadow animate-fade-in">
              Executive Luxury Living
            </h2>
            <p className="text-xl md:text-2xl text-white mb-4 text-shadow">
              Fully Furnished Rental Home in Greendale, Harare
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-shadow max-w-2xl mx-auto">
              Experience unparalleled comfort and sophistication in this stunning 4-bedroom executive property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border-2 border-white/50"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Exceptional Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every detail designed for comfort, luxury, and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-primary-100"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.text}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 bg-primary-600 text-white">
                <h3 className="text-3xl font-display font-bold mb-6">Property Details</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-3 flex items-center">
                      <Home className="w-5 h-5 mr-2" />
                      Modern Kitchen
                    </h4>
                    <ul className="space-y-2 ml-7 text-primary-100">
                      <li>• Granite countertops</li>
                      <li>• Double door fridge</li>
                      <li>• Electric & gas cooker</li>
                      <li>• Electric oven & microwave</li>
                      <li>• Washing machine</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security & Utilities
                    </h4>
                    <ul className="space-y-2 ml-7 text-primary-100">
                      <li>• CCTV surveillance</li>
                      <li>• External motion sensors</li>
                      <li>• Walled and gated</li>
                      <li>• 5 KVA solar backup</li>
                      <li>• Prolific borehole</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-12">
                <h3 className="text-3xl font-display font-bold mb-6 text-gray-900">Additional Amenities</h3>
                <div className="grid grid-cols-1 gap-3">
                  {amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ideal For Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-8 text-center">Ideal For</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Researchers</h4>
                <p className="text-primary-100">Perfect quiet environment for focused work</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Executive Tenants</h4>
                <p className="text-primary-100">Luxury and security for discerning professionals</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Diplomats & Expatriates</h4>
                <p className="text-primary-100">Premium accommodation in prime location</p>
              </div>
            </div>
            <p className="text-center mt-8 text-lg text-primary-100">Chinese nationals welcome</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Photo Gallery
            </h2>
            <p className="text-xl text-gray-600">
              Explore our beautiful property
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setGalleryIndex(idx)
                  setIsGalleryOpen(true)
                }}
                className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary-400 transition-colors"
          >
            ×
          </button>
          <button
            onClick={prevGalleryImage}
            className="absolute left-4 text-white hover:text-primary-400 transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button
            onClick={nextGalleryImage}
            className="absolute right-4 text-white hover:text-primary-400 transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
          <img
            src={images[galleryIndex]}
            alt={`Gallery ${galleryIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
            {galleryIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to experience luxury? Contact us today
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-12 h-full min-h-[700px] flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
                <div className="space-y-6 flex-grow">
                  <a
                    href="tel:+263772363429"
                    className="flex items-center space-x-4 group"
                  >
                    <div className="bg-primary-100 group-hover:bg-primary-600 w-14 h-14 rounded-full flex items-center justify-center transition-colors">
                      <Phone className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        +263 772 363 429
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:mamazu@gmail.com"
                    className="flex items-center space-x-4 group"
                  >
                    <div className="bg-primary-100 group-hover:bg-primary-600 w-14 h-14 rounded-full flex items-center justify-center transition-colors">
                      <Mail className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        mamazu@gmail.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-lg font-semibold text-gray-900">
                        Greendale, Harare
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Lease Terms</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary-600 mr-3" />
                      Available immediately
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary-600 mr-3" />
                      Minimum 3-month lease
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-primary-600 mr-3" />
                      Short-term rentals available
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative min-h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={images[0]}
                alt="Mamazu BnB"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
              
              {/* Contact Form Overlay */}
              <div className="relative h-full flex flex-col justify-center p-6 md:p-8">
                {/* Contact Form */}
                <div className="p-6 md:p-8">
                  <h4 className="text-2xl font-display font-bold text-cyan-400 mb-2 text-center drop-shadow-lg">Send Us a Message</h4>
                  <p className="text-cyan-300 text-center mb-6 text-sm drop-shadow">Fill out the form and we'll get back to you soon</p>
                  
                  {formStatus.message && (
                    <div className={`p-3 rounded-lg mb-4 text-sm ${
                      formStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {formStatus.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-white drop-shadow mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          className="w-full px-3 py-2 text-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-white drop-shadow mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full px-3 py-2 text-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-white drop-shadow mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                          placeholder="+263 772 363 429"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferredContact" className="block text-xs font-semibold text-white drop-shadow mb-1">
                          Contact Method
                        </label>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 text-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-white drop-shadow mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 text-sm bg-white/80 border border-white/40 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Logo 
            className="justify-center mb-4"
            textColor="text-white"
            iconColor="#22d3ee"
          />
          <p className="text-gray-400 mb-6">
            Executive Luxury Accommodation in Greendale, Harare
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="tel:+263772363429" className="text-gray-400 hover:text-primary-400 transition-colors">
              +263 772 363 429
            </a>
            <a href="mailto:mamazu@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors">
              mamazu@gmail.com
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mamazu BnB. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
