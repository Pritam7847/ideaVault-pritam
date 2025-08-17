import React from "react";
import DecryptedText from "../reactBits/DecryptedText.jsx";
import BlurText from "../reactBits/BlurText.jsx";

function Homepage() {
  return (
    <>
      <div>
        <div className="text-center justify-center mt-10 sm:mt-20 md:mt-32 px-4">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Welcome to{" "}
            <span className="text-red-500 glow-text">
              <DecryptedText
                text="IdeaVault"
                animateOn="view"
                revealDirection="center"
              />
            </span>
          </h1>
          <br />
          <p
            style={{ fontFamily: '"Grape Nuts", cursive' }}
          >
            <BlurText
              text="Where ideas ignite innovation And innovation finds its home."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl text-center justify-center sm:text-4xl md:text-6xl"
            />
          </p>
          <br />
          <p className="text-xl text-center justify-center sm:text-3xl md:text-2xl">Scroll For More Info👇</p>
        </div>
      </div>

      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}



      <div className="ml-10 mr-10 mt-10 sm:mt-20 md:mt-32">
        <section className="mt-16 text-left text-gray-800 space-y-8 text-base sm:text-lg">
          <h2 className="text-2xl font-semibold mb-4">What is IdeaVault?</h2>
          <p>
            IdeaVault is a vibrant platform where creativity meets opportunity.
            It’s a dedicated space for students and innovators to share,
            explore, and grow their ideas — no matter how big or small. Whether
            you’re dreaming up a breakthrough project, a useful app, or a
            community initiative, IdeaVault gives your idea the stage it
            deserves.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Does IdeaVault Do?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Connects Minds:</strong> IdeaVault brings together
              students from diverse backgrounds, enabling collaboration and
              feedback that turns simple thoughts into impactful solutions.
            </li>
            <li>
              <strong>Showcases Innovation:</strong> Your ideas get their own
              spotlight. Share detailed descriptions, images, and updates to
              inspire others and attract mentors or partners.
            </li>
            <li>
              <strong>Encourages Growth:</strong> Get upvotes and comments on
              your ideas to validate and improve them. The more support you get,
              the more your idea can grow!
            </li>
            <li>
              <strong>Fuels Opportunities:</strong> By sharing your ideas
              openly, you open doors to internships, funding, and real-world
              development possibilities.
            </li>
            <li>
              <strong>Builds a Community:</strong> Join a supportive network of
              like-minded creators passionate about innovation, learning, and
              making a difference.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Why Choose IdeaVault?</h2>
          <p>
            Easy-to-use platform to submit and explore ideas. Encourages
            creativity, teamwork, and entrepreneurial thinking. Your ideas are
            safe and respected here — originality matters.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Get Started Now!</h2>
          <p>
            Got a brilliant idea? Submit it, gather feedback, and watch your
            vision come alive with IdeaVault!
          </p>
          <br />
          <br />
        </section>
      </div>
    </>
  );
}

export default Homepage;
