import React from 'react';
import { useField, FieldHookConfig } from 'formik';

type BooleanSelectProps = FieldHookConfig<boolean>;

const BooleanSelect: React.FC<BooleanSelectProps> = (props) => {
  const [field, , helpers] = useField(props);

  return (
    <select
      {...field}
      className={props.className}
      onChange={(e) => helpers.setValue(e.target.value === 'true' ? true : false)}
      value={field.value ? 'true' : 'false'}
    >
      <option value="true">Aktif</option>
      <option value="false">Pasif</option>
    </select>
  );
};

export default BooleanSelect;
