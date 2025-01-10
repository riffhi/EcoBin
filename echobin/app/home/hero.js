export default function Home() {
    return (
      <main className="bg-[#023838] text-white">
       {/* Hero Section */}
       <section className="bg-[#023838] text-white py-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold leading-tight font-[Montserrat]">
                Revolutionizing Waste Management for a {" "}
                <span className="text-[#FFD700] font-bold leading-tight font-[Arizonia]">Green Future!</span>
              </h1>
              <p className="mt-6 text-lg font-[Montserrat]">
                <i>EcoBin helps you segregate waste, track your impact, and earn rewards—all while making the planet a cleaner place. Join us in creating a zero-waste future!</i>
              </p>
              <a 
                href="#mission" 
                className="mt-8 inline-block px-10 py-4 bg-white text-[#023838] font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 font-[Montserrat]"
              >
                Learn More
              </a>
    </div>

    {/* Right Content */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src="/food2.jpg"
        alt="Waste Management"
        className="rounded-xl shadow-xl object-cover w-[90%] md:w-[80%] h-auto"
      />
    </div>
  </div>
</section>

  
        {/* Mission Section */}
        <section id="mission" className="bg-white text-[#023838] py-16">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-4 font-[Montserrat]">OUR MISSION</h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto font-[Montserrat]">
              At EcoBin, our mission is to empower individuals, communities, and organizations to adopt sustainable waste management practices. 
              We aim to simplify waste segregation and recycling through technology, promote environmental awareness to inspire green habits, and 
              reward sustainable actions to drive positive change.
            </p>
          </div>
        </section>
          {/* Why You Should Go Green Section */}
          <section className="bg-[#023838] text-white py-14">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 font-[Montserrat]">
              WHY YOU SHOULD GO GREEN?
            </h2>
            <div className="flex flex-col md:flex-row gap-8 text-center">
              {/* Segregate */}
              <div className="flex-1">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold mb-2 font-[Montserrat]">SEGREGATE</h3>
                <p className="font-[Montserrat]">
                  Adopt proper waste segregation to minimize your environmental impact.
                </p>
              </div>
  
              {/* Thrive */}
              <div className="flex-1">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold mb-2 font-[Montserrat]">THRIVE</h3>
                <p className="font-[Montserrat]">
                  Contribute to a cleaner, healthier community by making sustainable choices.
                </p>
              </div>
  
              {/* Reward */}
              <div className="flex-1">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold mb-2 font-[Montserrat]">REWARD</h3>
                <p className="font-[Montserrat]">
                  Earn EcoPoints while helping the planet grow greener and more sustainable.
                </p>
              </div>
            </div>
          </div>
        </section>
  
{/* FAQ Section */}
<section className="bg-white text-[#023838] py-16">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12 font-[Montserrat]">
      FREQUENTLY ASKING QUESTIONS
    </h2>
    <div className="space-y-4">
      {/* Question 1 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          What is EcoBin?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          EcoBin is a platform that empowers communities to segregate, track, and reward sustainable waste management efforts.
        </p>
      </details>

      {/* Question 2 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          How does EcoBin work?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          EcoBin simplifies waste segregation and tracks individual impact using innovative technology.
        </p>
      </details>

      {/* Question 3 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          Why is proper waste segregation important?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          Proper segregation ensures that biodegradable, recyclable, and hazardous waste are processed correctly, reducing environmental pollution and improving recycling efficiency.
        </p>
      </details>

      {/* Question 4 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          What are EcoPoints? How do I earn EcoPoints?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          EcoPoints are rewards earned for sustainable actions like proper waste segregation and recycling. These points can be redeemed for rewards or discounts.
        </p>
      </details>

      {/* Question 5 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          Can I report unclean areas in my neighborhood?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          Yes, EcoBin allows you to report unclean areas through our platform. Your report helps local authorities take action to maintain cleanliness.
        </p>
      </details>

      {/* Question 6 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          How does the leaderboard work?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          The leaderboard showcases top contributors in sustainable actions. Compete with others and earn recognition for your efforts to make a difference.
        </p>
      </details>

      {/* Question 7 */}
      <details className="group border border-gray-300 rounded-lg p-4 hover:bg-[#F3F4F6] transition-all">
        <summary className="font-bold cursor-pointer font-[Montserrat] flex justify-between items-center">
          Will EcoBin expand its reach to organizations?
          <span className="text-gray-500 group-open:rotate-180 transform transition-transform">
            ▼
          </span>
        </summary>
        <p className="mt-4 text-gray-700 font-[Montserrat]">
          Yes, EcoBin plans to collaborate with organizations to implement sustainable waste management solutions at a larger scale.
        </p>
      </details>
    </div>
  </div>
</section>

      </main>
    );
}

