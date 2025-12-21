import { useEffect, useRef, useState } from "react";
import { Plus, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getResume } from "@/lib/tsquery";

const ResumeSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { userId, getToken } = useAuth();

  if (!userId) return null;

  const { data, isPending } = useQuery({
    queryKey: ["resume", userId],
    enabled: !!userId,
    queryFn: async () => {
      const token = await getToken();
      return getResume(userId, token!);
    },
  });

  useEffect(() => {
    if (data) {
      setResume(data);
    }
  }, [data]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF resumes are allowed");
      return;
    }

    setUploading(true);

    try {
      //   await uploadResume(file);
      setResume(file);
    } catch (err) {
      alert("Upload failed");
      console.log("Upload Failed with error: ", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-green-500/20 rounded-xl p-6 bg-black/60">
      <h2 className="text-xl font-semibold mb-4 text-green-400">Your Resume</h2>

      {resume ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="text-green-400" />
            <span className="text-gray-300">{resume.name}</span>
          </div>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Replace
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-green-400/40 rounded-lg p-10">
          {uploading ? (
            <Loader2 className="animate-spin text-green-400 mb-3" />
          ) : (
            <Plus className="text-green-400 mb-3" size={28} />
          )}

          <p className="text-gray-400 mb-4">Upload your resume (PDF)</p>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="hover:border-2 hover:border-green-400"
          >
            Upload Resume
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ResumeSection;
