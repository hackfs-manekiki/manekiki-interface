import { TextField } from "@mui/material";
import type { FC } from "react";
import type { TextFieldProps } from "@mui/material";

export const WhiteBackgroundInput: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      type={"text"}
      {...props}
      variant="outlined"
      sx={{
        width: 600,
        "& .MuiOutlinedInput-input": {
          py: props.multiline ? 0 : 1.5,
        },
        "& > .MuiOutlinedInput-root": {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          ...(props.multiline && {
            minHeight: 100,
            alignItems: "flex-start",
          }),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "border.input",
          },
        },
        "& fieldset": {
          // border: 'none'
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
