// We will create CategoryCard.jsx in the next step
import CategoryCard from "../Shared/CategoryCard";

const Categories = () => {
  const categoryData = [
    {
      id: 1,
      name: "Garbage",
      img: "https://i.ibb.co/dKqfKqK/garbage.jpg",
    },
    {
      id: 2,
      name: "Illegal Construction",
      img: "https://i.ibb.co/dKqfKqK/garbage.jpg",
    },
    {
      id: 3,
      name: "Broken Public Property",
      img: "https://i.ibb.co/dKqfKqK/garbage.jpg",
    },
    {
      id: 4,
      name: "Road Damage",
      img: "https://i.ibb.co/dKqfKqK/garbage.jpg",
    },
  ];

  return (
    <section className="container mx-auto my-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">
        Issue Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryData.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;