import { Button } from "@mui/material";
import { useMuiTheme } from "src/hooks/themes";
import type { FC } from "react";
import type { ButtonProps } from "@mui/material";

export const PrimaryGradientButton: FC<ButtonProps> = (props) => {
  const theme = useMuiTheme();
  return (
    <Button
      {...props}
      sx={{
        px: 4,
        height: 48,
        background: theme.palette.gradient.linear.primary,
        backgroundBlendMode: "darken",
        borderRadius: 999,
        boxShadow: "0 10px 20px rgba(149, 44, 185, 0.1)",
        "&:hover": {
          // boxShadow: "0 0 5px 3px #D0D0FF",
          boxShadow: "0 10px 20px #D0D0FF",
        },
        "&.Mui-disabled": {
          background: "linear-gradient(to bottom, #EEE, #CCC)",
        },
        ...props.sx,
      }}
    />
  );
};
