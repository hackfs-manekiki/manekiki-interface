import { TextField } from "@mui/material";
import type { FC } from "react";
import type { TextFieldProps } from "@mui/material";

export const GeneralOutlinedInput: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      type={"text"}
      {...props}
      variant="outlined"
      sx={{
        width: 600,
        "& > .MuiOutlinedInput-root": {
          backgroundColor: "#F4F4FF",
          borderRadius: 12,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "border.input",
          },
        },
        "& fieldset": {
          borderColor: "transparent",
        },
        "&.Mui-focused": {
          "& fieldset": {
            borderColor: "border.input",
          },
        },
        ...props.sx,
      }}
    />
  );
};
