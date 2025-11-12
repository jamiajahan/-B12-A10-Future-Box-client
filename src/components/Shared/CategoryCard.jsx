import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { name, img } = category;

  return (
    <Link to={`/all-issues?category=${name}`} className="card bg-base-100 shadow-xl image-full">
      <figure>
        <img src={img} alt={name} className="object-cover" />
      </figure>
      <div className="card-body justify-center items-center">
        <h2 className="card-title text-2xl font-bold text-white">{name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;