import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const UpdatedStars = ({ value }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="w-5 h-5" />
      ))}
      {halfStar && <FaStarHalfAlt className="w-5 h-5" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} className="w-5 h-5" />
      ))}
    </div>
  );
};

export default UpdatedStars;
