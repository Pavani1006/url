import { useEffect, useState } from "react";
import { api } from "./lib/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Copy, Trash2, LinkIcon } from "lucide-react";

export default function App() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const res = await api.get("/api/links");
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e) => {
    e.preventDefault();

    const trimmedURL = url.trim();

    if (!trimmedURL.startsWith("http://") && !trimmedURL.startsWith("https://")) {
      return toast.error("Enter a valid URL starting with http:// or https://");
    }

    try {
      await api.post("/api/links", { url: trimmedURL, code: code.trim() });
      setUrl("");
      setCode("");
      fetchLinks();
      toast.success("Short link created! 🎉");
    } catch (err) {
      toast.error("Short code already exists!");
    }
  };

  const deleteLink = async (c) => {
    await api.delete(`/api/links/${c}`);
    fetchLinks();
    toast.success("Deleted!");
  };

  return (
    <div className="min-h-screen bg-[#F7F7FF] p-10">

      <h1 className="text-4xl font-bold text-center text-[#5A4FCF] mb-8">
        TinyLink Shortener
      </h1>

      {/* Form */}
      <form
        onSubmit={createLink}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 border border-[#E2E2F9] space-y-4"
      >
        <input
          type="text"
          className="p-3 w-full border rounded-lg focus:border-[#5A4FCF] outline-none bg-[#FBFBFF]"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <input
          type="text"
          className="p-3 w-full border rounded-lg focus:border-[#5A4FCF] outline-none bg-[#FBFBFF]"
          placeholder="Custom short code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="w-full p-3 bg-[#5A4FCF] text-white rounded-lg font-semibold hover:bg-[#4a3fbd] transition">
          Create Short Link
        </button>
      </form>

      {/* Table */}
      <div className="max-w-4xl mx-auto mt-10">
        {links.length === 0 ? (
          <p className="text-gray-500 text-center">No links created yet.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg border border-[#E2E2F9] overflow-hidden">
            <thead className="bg-[#ECEBFF]">
              <tr className="text-[#5A4FCF] font-semibold">
                <th className="p-3 text-left">Short Code</th>
                <th className="p-3 text-left">URL</th>
                <th className="p-3 text-left">Clicks</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {links.map((l) => (
                <tr key={l.code} className="border-t hover:bg-[#F4F4FF] transition">
                  <td className="p-3">
                    <Link
                      to={`/code/${l.code}`}
                      className="text-[#5A4FCF] hover:text-[#4338CA]"
                    >
                      <span className="flex items-center gap-1">
                        <LinkIcon size={16} />
                        {l.code?.trim() !== "" ? l.code : "Auto"}
                      </span>
                    </Link>
                  </td>

                  <td className="p-3 max-w-[240px] truncate">
                    {l.url?.trim() !== "" ? l.url : "—"}
                  </td>

                  <td className="p-3 font-medium">
                    {l.clicks !== null && l.clicks !== undefined ? l.clicks : "—"}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">

                      {/* Copy */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`http://localhost:5000/${l.code}`);
                          toast.success("Copied!");
                        }}
                        className="p-2 rounded-lg bg-[#65BFA6] text-white hover:bg-[#57a891] transition"
                      >
                        <Copy size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteLink(l.code)}
                        className="p-2 rounded-lg bg-[#E26969] text-white hover:bg-[#cc5b5b] transition"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

    </div>
  );
}
