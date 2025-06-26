// Badge Component
const Badge = ({ children, variant = "default" }) => {
  const variants = {
    "Follow-Up": "bg-orange-100 text-orange-800 border border-orange-200",
    "Qualified": "bg-green-100 text-green-800 border border-green-200",
    "Converted": "bg-purple-100 text-purple-800 border border-purple-200",
    "New": "bg-blue-100 text-blue-800 border border-blue-200",
    default: "bg-gray-100 text-gray-800 border border-gray-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

export default Badge;