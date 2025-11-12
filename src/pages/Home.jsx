import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
// !! UNCOMMENT THE LINE BELOW !!
import RecentComplaints from "../components/Home/RecentComplaints";
// import CommunityStats from "../components/Home/CommunityStats";
// import VolunteerCTA from "../components/Home/VolunteerCTA";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Category Section */}
      <Categories />

      {/* Recent Complaints Section */}
      {/* !! UNCOMMENT THE LINE BELOW !! */}
      <RecentComplaints />

      {/* Extra Sections (Coming next) */}
      {/* <CommunityStats /> */}
      {/* <VolunteerCTA /> */}
    </div>
  );
};

export default Home;