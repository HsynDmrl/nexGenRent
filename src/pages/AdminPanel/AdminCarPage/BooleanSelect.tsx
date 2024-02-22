import React from 'react';

interface BooleanSelectProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const BooleanSelect: React.FC<BooleanSelectProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value === 'true';
    onChange(selectedValue);
  };

  return (
    <select value={value ? value.toString() : 'false'} onChange={handleChange}>
      <option value="true">Aktif</option>
      <option value="false">Pasif</option>
    </select>
  );
};

export default BooleanSelect;
