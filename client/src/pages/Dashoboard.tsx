import HistorySection from "@/components/layout/HistorySection";
import JDSection from "@/components/layout/JDSection";
import ResumeSection from "@/components/layout/ResumeSection";
import { useUser } from "@clerk/clerk-react";

const Dashoboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-4xl text-green-400 flex text-center p-8 gap-4 ">
        <span>Sign in to view this page</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white px-16 py-10 space-y-10 font-mono">
      <h1 className="text-3xl font-bold text-green-400">
        Resume Analysis Dashboard : {user.firstName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResumeSection />
        <JDSection />
      </div>

      <HistorySection />
    </div>
  );
};

export default Dashoboard;
