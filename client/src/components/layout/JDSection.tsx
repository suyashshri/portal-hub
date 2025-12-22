import { Button } from "@/components/ui/button";

const JDSection = () => {
  return (
    <div className="border border-green-500/20 rounded-xl p-6 bg-black/60 space-y-4">
      <h2 className="text-xl font-semibold text-green-400">Job Description</h2>

      <textarea
        placeholder="Paste job description here..."
        className="w-full h-32 bg-black border border-green-500/30 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
      />

      <input
        type="text"
        placeholder="Or paste job link (LinkedIn, Indeed, etc.)"
        className="w-full bg-black border border-green-500/30 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
      />

      <Button className="w-full">Analyze & Compare</Button>
    </div>
  );
};

export default JDSection;
