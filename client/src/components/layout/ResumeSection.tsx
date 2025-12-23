import { useEffect, useRef, useState } from "react";
import { Plus, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getResume } from "@/lib/query";
import { uploadResume } from "@/lib/mutation";

const MAXIMUN_FILE_SIZE = 5 * 1024 * 1024;

const ResumeSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { userId, getToken } = useAuth();

  const { data } = useQuery({
    queryKey: ["resumes", userId],
    queryFn: async () => {
      const token = await getToken();
      return getResume(token!);
    },
  });

  const uploadResumeMutation = useMutation({
    mutationKey: ["uploadResume", userId],
    mutationFn: async (file: File) => {
      const token = await getToken();
      return uploadResume(file, token!);
    },
  });

  useEffect(() => {
    if (data && data.length) {
      setResume(data);
    }
  }, [data]);

  if (!userId) {
    return (
      <div className="border border-green-500/20 rounded-xl p-6 bg-black/60">
        <p className="text-gray-400">Please sign in to upload your resume</p>
      </div>
    );
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF resumes are allowed");
      return;
    }

    if (file.size > MAXIMUN_FILE_SIZE) {
      alert("Upload file less than 5 MB");
      return;
    }

    setUploading(true);
    try {
      uploadResumeMutation.mutate(file);
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
        <div className="flex items-center justify-between text-black">
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
