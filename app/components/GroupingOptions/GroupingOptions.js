import React from 'react';

const GroupingOptions = ({ table }) => {
  const groupableColumns = table.getAllColumns().filter(column => 
    column.getCanGroup() && (column.id === 'category' || column.id === 'subcategory')
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Group by:</h3>
      {groupableColumns.map(column => (
        <div key={column.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={column.id}
            checked={column.getIsGrouped()}
            onChange={column.getToggleGroupingHandler()}
          />
          <label htmlFor={column.id}>{column.id}</label>
        </div>
      ))}
    </div>
  );
};

export default GroupingOptions;