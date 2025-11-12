import { Link } from "react-router-dom";

const VolunteerCTA = () => {
  return (
    <section className="container mx-auto my-16 px-4">
      <div className="hero min-h-[300px] bg-base-200 rounded-lg shadow-xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Join a Clean Drive</h1>
            <p className="py-6">
              Want to make a direct impact? Join other community members in
              our upcoming cleanup drives. Be a part of the change.
            </p>
            {/* CTA button */}
            <Link to="/all-issues" className="btn btn-primary">
              Get Involved Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;