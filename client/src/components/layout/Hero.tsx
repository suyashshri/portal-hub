import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-[55vh] flex flex-col items-center justify-center text-center px-6 bg-black text-white border-b border-gray-700">
      <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tight text-green-400">
        Optimize your resume for every job
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-300">
        Upload your resume, paste a job description, and instantly get ATS
        score, skill gaps, and personalized improvement suggestions.
      </p>

      <div className="mt-10 flex gap-4">
        <Button className="h-12 px-8 bg-green-400 text-black hover:bg-green-300">
          Upload Resume
        </Button>

        <Button
          variant="outline"
          className="h-12 px-8 transition border-green-400 text-green-600 hover:bg-green-400 hover:text-black"
        >
          View Sample Report
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
