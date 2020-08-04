import { useState } from 'react';

function useForm(iniValues) {
  const [values, setValues] = useState(iniValues);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(infoEvent) {
    setValue(
      infoEvent.target.getAttribute('name'),
      infoEvent.target.value,
    );
  }

  function clearForm() {
    setValues(iniValues);
  }
  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
