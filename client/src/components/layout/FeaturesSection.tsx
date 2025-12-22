import {
  FileTextIcon,
  SearchIcon,
  BarChart3Icon,
  GraduationCapIcon,
} from "lucide-react";

const features = [
  {
    icon: FileTextIcon,
    title: "Resume Parsing",
    description:
      "Automatically extracts skills, experience, and roles from your resume.",
  },
  {
    icon: SearchIcon,
    title: "JD Matching",
    description:
      "Compare your resume with any job description or job portal link.",
  },
  {
    icon: BarChart3Icon,
    title: "ATS Score",
    description:
      "Understand how ATS systems evaluate your resume before recruiters do.",
  },
  {
    icon: GraduationCapIcon,
    title: "Skill Gap Analysis",
    description:
      "Find missing skills and get recommendations on what to learn next.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-black text-white border-b border-gray-700">
      <h2 className="text-4xl font-bold font-mono text-center text-green-400">
        Features built for job seekers
      </h2>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="border border-green-500/20 rounded-xl p-6 bg-black/60 hover:border-green-400 transition"
          >
            <feature.icon size={32} className="text-green-400" />
            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
