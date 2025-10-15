const Logo = ({ className = "", textColor = "text-gray-900", iconColor = "#0891b2" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Custom SVG Logo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer ornamental circle */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke={iconColor}
          strokeWidth="1.5"
          opacity="0.3"
        />
        
        {/* Inner decorative elements */}
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke={iconColor}
          strokeWidth="2"
        />
        
        {/* Stylized house/roof shape */}
        <path
          d="M24 10L34 18V32C34 33.1046 33.1046 34 32 34H16C14.8954 34 14 33.1046 14 32V18L24 10Z"
          fill={iconColor}
          opacity="0.9"
        />
        
        {/* Door */}
        <rect
          x="20"
          y="26"
          width="8"
          height="8"
          rx="1"
          fill="white"
          opacity="0.9"
        />
        
        {/* Windows */}
        <rect
          x="17"
          y="20"
          width="4"
          height="4"
          rx="0.5"
          fill="white"
          opacity="0.7"
        />
        <rect
          x="27"
          y="20"
          width="4"
          height="4"
          rx="0.5"
          fill="white"
          opacity="0.7"
        />
        
        {/* Decorative stars */}
        <path
          d="M24 8L24.5 9.5L26 10L24.5 10.5L24 12L23.5 10.5L22 10L23.5 9.5L24 8Z"
          fill={iconColor}
        />
        <path
          d="M34 14L34.3 14.7L35 15L34.3 15.3L34 16L33.7 15.3L33 15L33.7 14.7L34 14Z"
          fill={iconColor}
          opacity="0.6"
        />
        <path
          d="M14 14L14.3 14.7L15 15L14.3 15.3L14 16L13.7 15.3L13 15L13.7 14.7L14 14Z"
          fill={iconColor}
          opacity="0.6"
        />
      </svg>
      
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold text-2xl tracking-wide ${textColor}`}>
          Mamazu
        </span>
        <span className={`text-xs tracking-[0.2em] uppercase ${textColor} opacity-70`}>
          Bed & Breakfast
        </span>
      </div>
    </div>
  )
}

export default Logo
