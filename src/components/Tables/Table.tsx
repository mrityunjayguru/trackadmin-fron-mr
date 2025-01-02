import React, { useState, useEffect } from 'react';

interface TableProps {
  data: Record<string, any>[]; // Array of objects containing table data
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<Record<string, any>[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    // Ensure data is available and update sortedData when data changes
    if (data?.length) {
      setSortedData(data);
    }
  }, [data]);

  /**
   * Handles sorting by column key
   */
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] === null || a[key] === undefined) return 1;
      if (b[key] === null || b[key] === undefined) return -1;

      if (typeof a[key] === 'string') {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  /**
   * Render the table headers dynamically
   */
  const renderHeaders = () => {
    if (!data || data.length === 0) return null;
    return Object.keys(data[0]).map((key) => (
      <th
        key={key}
        onClick={() => handleSort(key)}
        style={{ cursor: 'pointer' }}
      >
        {key}
        {sortConfig?.key === key ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : ''}
      </th>
    ));
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      {sortedData.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {renderHeaders()}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {row[key] !== null && row[key] !== undefined ? row[key] : 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Table;
