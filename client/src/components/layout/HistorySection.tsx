const HistorySection = () => {
  const history = [
    { role: "Frontend Developer", score: 72 },
    { role: "Backend Engineer", score: 65 },
  ];

  return (
    <div className="border border-green-500/20 rounded-xl p-6 bg-black/60">
      <h2 className="text-xl font-semibold mb-4 text-green-400">
        Previous Comparisons
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No previous analysis found.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border border-green-500/10 rounded-lg px-4 py-3"
            >
              <span className="text-gray-300">{item.role}</span>
              <span className="text-green-400 font-semibold">
                ATS {item.score}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;
