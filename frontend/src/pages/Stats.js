import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Copy, ExternalLink, Trash2, LinkIcon } from "lucide-react";

export default function Stats() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const loadStats = async () => {
    try {
      const res = await api.get(`/api/links/${code}`);
      setData(res.data);
    } catch (err) {
      navigate("/"); // if not found → redirect home
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!data)
    return (
      <div className="text-center text-lg text-gray-500 mt-20">
        Loading stats...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F7FF] p-10">

      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8 border border-[#E2E2F9]">

        <h2 className="text-[#5A4FCF] font-bold text-3xl text-center mb-6">
          Short Link Stats
        </h2>

        {/* Short Code */}
        <div className="flex items-center justify-center gap-2 text-lg mb-5">
          <LinkIcon className="text-[#5A4FCF]" size={20} />
          <span className="font-semibold text-[#4338CA]">{code}</span>
        </div>

        {/* Stats List */}
        <div className="space-y-3 text-gray-700 text-sm">
          <p>
            <b className="font-semibold">Original URL:</b>{" "}
            <a 
              href={data.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-[#5A4FCF] underline"
            >
              {data.url}
            </a>
          </p>
          <p><b>Total Clicks:</b> {data.clicks}</p>
          <p><b>Last Used:</b> {data.last_clicked || "Never"}</p>
          <p><b>Created:</b> {new Date(data.created_at).toLocaleString()}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">

          {/* Copy Button */}
          <button
            onClick={() =>
              navigator.clipboard.writeText(`http://localhost:5000/${code}`)
            }
            className="flex items-center gap-1 px-4 py-2 bg-[#65BFA6] text-white rounded-lg shadow hover:bg-[#57a891] transition"
          >
            <Copy size={16} /> Copy
          </button>

          {/* Open Button */}
          <a
            href={`http://localhost:5000/${code}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-4 py-2 bg-[#5A4FCF] text-white rounded-lg shadow hover:bg-[#4a3fbd] transition"
          >
            <ExternalLink size={16} /> Open
          </a>

          {/* Delete Button */}
          <button
            onClick={async () => {
              await api.delete(`/api/links/${code}`);
              navigate("/");
            }}
            className="flex items-center gap-1 px-4 py-2 bg-[#E26969] text-white rounded-lg shadow hover:bg-[#cc5b5b] transition"
          >
            <Trash2 size={16} /> Delete
          </button>

        </div>

      </div>
    </div>
  );
}
