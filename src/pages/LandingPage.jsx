import { CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="relative bg-linear-to-br from-blue-400 to-blue-800 text-white overflow-hidden">
        {/* DECORATION BEGINS... */}

        {/* blur circle */}
        <div className="absolute top-15 right-10 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        {/* blur circle  */}
        <div className="absolute bottom-15 left-15 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        {/* transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-blue-800 opacity-30 blur-2xl"></div>

        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-60 right-20 w-64 h-64 bg-white opacity-8 rounded-full"></div>

        {/* ...DECORATION TEM ENDS */}

        {/* HERO */}
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* apps name */}
            <h1 className="apps-name text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              TicketFlow
            </h1>
            {/* catchy description */}
            <p className="text-xl sm:text-2xl max-w-9/12 m-auto text-blue-100 mb-10 leading-relaxed">
              Streamline Your Ticket Management <br />
              Track, manage, and resolve tickets with ease. Built for teams that value efficiency and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              ) : (

              // {/* CTA -BTNS  */}
                <>
                  <Link
                    href="/signup"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>

                  <Link
                    href="/login"
                    className="bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white"
                  >
                    Login
                  </Link>

                </>
               )} 
            </div>
          </div>
        </div>
        {/* WAVY BG */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </section>
      
        {/* features sect */}
      <section className="relative py-20">
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-200 rounded-full opacity-30"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TicketFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage tickets efficiently in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-600" />}
              title="Lightning Fast"
              description="Create and update tickets in seconds. Our intuitive interface keeps you productive."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-600" />}
              title="Secure & Private"
              description="Your data is protected with industry-standard encryption and security measures."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-amber-600" />}
              title="Insightful Analytics"
              description="Track your progress with real-time statistics and comprehensive dashboards."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-blue-600" />}
              title="Status Tracking"
              description="Monitor ticket status from open to closed with clear visual indicators."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-green-600" />}
              title="Priority Management"
              description="Organize tickets by priority to focus on what matters most."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-amber-600" />}
              title="Full CRUD Support"
              description="Complete control with create, read, update, and delete operations."
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gray-50">
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using TicketFlow to streamline their workflow
              </p>
              {/* {!user && ( */}
                <Link
                  to="/signup"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  Create Your Free Account
                </Link>
              {/* )} */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
