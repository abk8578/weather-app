import { motion } from "framer-motion";
import { KomalProfile, SumeshProfile } from "../../_assets";
import ProfileCard from "../profileCard/profileCard";

// College Project About Us Page – SkyCast Weather App

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-slate-800">
          About Us – SkyCast Weather App
        </h1>
        <div className="text-slate-600 mt-3 space-y-2">
          <p>
            A modern weather forecasting web application that allows users to
            search cities, view current weather conditions, and explore
            location-based information through an interactive map interface.
          </p>
          <p>
            The project demonstrates practical implementation of React-based UI
            development, API integration, responsive design principles, and
            real-world application architecture suitable for academic evaluation
            and demonstration.
          </p>
          <p className="text-sm text-slate-500">
            If you would like to connect with the development team, share
            feedback, or report issues, you can reach us using the contact
            section below.
          </p>
        </div>
      </motion.div>

      {/* Team Members — Enhanced Student Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProfileCard
            profileImage={KomalProfile}
            name="Komal Thakur"
            role="Frontend Developer"
            course="BCA(5th semester"
            rollNo={6232730016}
            email="komalthakur1805@gmail.com"
            contact={7018785155}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <ProfileCard
            profileImage={SumeshProfile}
            name="Sumesh Kumar"
            role="Backend & API Developer"
            course="BCA(5th semester)"
            rollNo={6232730039}
            email="Sumeshkumar8378@gmail.com"
            contact={8091215033}
          />
        </motion.div>
      </div>
    </div>
  );
}
