import { Link } from "react-router-dom";
import siayaLogo from "../assets/download.jpeg";
import landsLogo from "../assets/download.png";
import partnerLogo from "../assets/download (1).jpeg";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team2.jpg";
import landHero from "../assets/page-image.jpg";
import missionImage from "../assets/mission-image.jpg";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Section 1: Overview */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <img src={landHero} alt="Land Overview" className="w-full h-80 object-cover rounded-lg shadow" />
        <div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">About LandWise</h1>
          <p className="text-gray-700 text-lg">
            LandWise is your trusted platform for land discovery and management. We make buying, selling, and listing land
            seamless and transparent. Partnered with county and national institutions, we aim to empower users with smart digital tools.
          </p>
        </div>
      </section>

      {/* Section 2: Mission */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-blue-50 p-6 rounded shadow">
        <div>
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Empowering communities by providing access to verified land listings, secure transactions, and sustainable land
            management practices for future generations.
          </p>
        </div>
        <img src={missionImage} alt="Mission" className="w-full h-80 object-cover rounded-lg shadow" />
      </section>

      {/* Section 3: Our Team */}
      <section>
        <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[{
            img: team2,
            name: "Susan Ngesa",
            title: "Lead Developer",
            desc: "Susan designs and implements core system features for our land registry and user management.",
          }, {
            img: team1,
            name: "Paul Ouma",
            title: "UI/UX Designer",
            desc: "Brian creates intuitive, user-centered interfaces for seamless browsing and land listing.",
          }, {
            img: team3,
            name: "Grace Kamau",
            title: "Partnership Manager",
            desc: "Grace drives collaboration between LandWise and key national/county institutions.",
          }].map((member, i) => (
            <div key={i} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-lg font-bold text-green-700">{member.name}</h3>
              <p className="text-sm text-gray-600 italic mb-2">{member.title}</p>
              <p className="text-sm text-gray-700 mb-3">{member.desc}</p>
              <div className="flex justify-center text-yellow-500 text-lg">
                {"★★★★★"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Affiliate Partners */}
      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Affiliate Partners</h2>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center space-x-4">
            <img src={siayaLogo} alt="Siaya County Logo" className="w-16 h-16 rounded-full object-cover border border-green-500" />
            <div>
              <h3 className="text-lg font-bold text-green-700">County Government of Siaya</h3>
              <p className="text-sm text-gray-600">Supporting land digitization and community development.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <img src={landsLogo} alt="Ministry of Lands Logo" className="w-16 h-16 rounded-full object-cover border border-green-500" />
            <div>
              <h3 className="text-lg font-bold text-green-700">Ministry of Lands</h3>
              <p className="text-sm text-gray-600">Transparent land policy implementation nationwide.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <img src={partnerLogo} alt="SmartFarm Initiative" className="w-16 h-16 rounded-full object-cover border border-green-500" />
            <div>
              <h3 className="text-lg font-bold text-green-700">SmartFarm Initiative</h3>
              <p className="text-sm text-gray-600">Digitizing agricultural land access and utilization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Need Help Contact */}
      <section className="bg-green-50 p-6 rounded shadow text-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-2">Need Help?</h2>
        <p className="text-gray-700 mb-4">If you have any questions or need support, feel free to contact us.</p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
