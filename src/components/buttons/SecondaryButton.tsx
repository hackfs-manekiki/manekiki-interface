import { Button } from "@mui/material";
import { useMuiTheme } from "src/hooks/themes";
import type { FC } from "react";
import type { ButtonProps } from "@mui/material";

export const SecondaryButton: FC<ButtonProps> = (props) => {
  const theme = useMuiTheme();
  return (
    <Button
      {...props}
      sx={{
        px: 4,
        height: 48,
        fontSize: '0.875rem',
        background: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: 999,
        "&:hover": {
          boxShadow: `0 0 5px 3px ${theme.palette.secondary.main}`,
          // boxShadow: `0 10px 20px ${theme.palette.secondary.light}`,
        },
        "&.Mui-disabled": {
          background: "linear-gradient(to bottom, #EEE, #CCC)",
        },
        ...props.sx,
      }}
    />
  );
};
