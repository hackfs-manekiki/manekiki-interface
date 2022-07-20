import { useId } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputLabel, Select } from "@mui/material";

import type { FC } from "react";
import type { SelectProps } from "@mui/material";

export const GeneralSelect: FC<SelectProps> = ({ label, ...props }) => {
  const id = useId();

  return (
    <FormControl>
      {label && (
        <InputLabel
          id={`${id}-label`}
          sx={{ color: "#B6B6B6", "&.MuiInputLabel-shrink": { display: "none" } }}
        >
          {label}
        </InputLabel>
      )}
      <Select
        IconComponent={(props) => <FontAwesomeIcon {...props} size="lg" icon={faChevronDown} />}
        {...props}
        labelId={`${id}-label`}
        id={id}
        label={label}
        sx={{
          borderRadius: 12,
          backgroundColor: "#F1F1FF",
          "& fieldset": {
            border: "none",
          },
          "& .MuiSelect-icon": {
            color: "#8383FF",
            right: 16,
          },
          ...props.sx,
        }}
        MenuProps={{
          ...props.MenuProps,
          sx: {
            "& > .MuiPaper-root": {
              borderRadius: 12,
              backgroundColor: "white",
              boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
            },
            ...props?.MenuProps?.sx,
          },
        }}
      />
    </FormControl>
  );
};
