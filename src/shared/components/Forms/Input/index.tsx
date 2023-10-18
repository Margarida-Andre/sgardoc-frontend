import React, { FC } from "react";
import { CFormGroup, CInput, CLabel, CSelect } from "@coreui/react";
import { InputProps } from "./types";

const Input: FC<InputProps> = ({
  type = "text",
  name,
  label,
  data,
  placeholder,
  required,
}) => {
  switch (type) {
    case "text":
      return (
        <TextInput
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
        />
      );

    case "select":
      return (
        <SelectInput
          data={data}
          name={name}
          label={label}
          required={required}
        />
      );

    case "date":
      return <InputDate name={name} label={label} placeholder={placeholder} />;

    default:
      return <h2>Input type is invalid</h2>;
  }
};

const TextInput: FC<InputProps> = ({ name, label, placeholder, required }) => {
  return (
    <CFormGroup>
      <CLabel htmlFor={name}>{label}</CLabel>
      <CInput id={label} placeholder={placeholder} required={required} />
    </CFormGroup>
  );
};

interface SelectProps {
  label: string;
  value: string;
}

const SelectInput: FC<InputProps> = ({ data, name, label, required }) => {
  return (
    <CFormGroup>
      <CLabel htmlFor={name}>{label}</CLabel>

      <CSelect name={name} id={name} required={required}>
        {data?.map((item: SelectProps, index: number) => (
          <option key={index} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </CSelect>
    </CFormGroup>
  );
};

const InputDate: FC<InputProps> = ({ name, label, placeholder }) => {
  return (
    <CFormGroup>
      <CLabel htmlFor={name}>{label}</CLabel>
      <CInput type="date" id={name} name={name} placeholder={placeholder} />
    </CFormGroup>
  );
};

export { Input };
