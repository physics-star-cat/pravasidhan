interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
}

export default function ComparisonTable({
  headers,
  rows,
  highlightColumn,
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left font-semibold text-sm ${
                  highlightColumn === i
                    ? "bg-gold text-white"
                    : "bg-navy text-white"
                }`}
              >
                {header}
                {highlightColumn === i && (
                  <span className="ml-2 text-xs font-normal bg-white/20 px-1.5 py-0.5 rounded">
                    Recommended
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-cream"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 border-b border-gray-100 ${
                    highlightColumn === cellIndex
                      ? "border-l-2 border-r-2 border-l-gold border-r-gold bg-gold-light/30 font-medium"
                      : ""
                  } ${cellIndex === 0 ? "font-medium text-navy" : "text-text-dark"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
