import { forwardRef } from "react";
import NumberFormat from "react-number-format";
import type { InputAttributes } from "react-number-format";

export const NumberFormatCurrency = forwardRef<
  NumberFormat<InputAttributes>,
  { onChange: (event: { target: { value: string } }) => void }
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      isNumericString
    />
  );
});
