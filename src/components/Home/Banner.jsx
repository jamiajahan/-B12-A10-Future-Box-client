const Banner = () => {
  // TODO: Replace these with your real banner images
  const banner1 = "https://i.ibb.co/q5k9v6Z/banner1.jpg";
  const banner2 = "https://i.ibb.co/q5k9v6Z/banner1.jpg";
  const banner3 = "https://i.ibb.co/q5k9v6Z/banner1.jpg";

  return (
    <div className="carousel w-full h-[550px] rounded-lg">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={banner1} className="w-full object-cover" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center p-4 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-3xl font-bold">Report Local Issues</h2>
          <p>See garbage buildup? Report it and help keep your community clean.</p>
        </div>
      </div>
      
      <div id="slide2" className="carousel-item relative w-full">
        <img src={banner2} className="w-full object-cover" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center p-4 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-3xl font-bold">Join Community Cleaning</h2>
          <p>Get involved in local cleanup drives and make a difference.</p>
        </div>
      </div>
      
      <div id="slide3" className="carousel-item relative w-full">
        <img src={banner3} className="w-full object-cover" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center p-4 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-3xl font-bold">Sustainable Action</h2>
          <p>Promoting a greener, more sustainable future for everyone.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;