import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import CommunityStats from "../components/Home/CommunityStats"; 
import VolunteerCTA from "../components/Home/VolunteerCTA";
import RecentComplaints from "../components/Home/RecentComplaints";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Category Section */}
      <Categories />

      {/* Recent Complaints Section */}
      <RecentComplaints />
      
      {/* Community Stats Section  */}
      <CommunityStats />

      {/* Volunteer Call-to-Action Section  */}
      <VolunteerCTA />

    </div>
  );
};

export default Home;