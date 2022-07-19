import { Dialog, Stack } from "@mui/material";
import { connectors } from "src/utils/connectors";
import { getConnectorName } from "src/utils/getConnectorName";
import { ConnectorCard } from "./ConnectorCard";
import { walletStore } from "src/stores/walletStore";

import type { FC } from "react";
import type { DialogProps } from "@mui/material";

export const WalletSelectDialog: FC<DialogProps> = (props) => {
  return (
    <Dialog
      {...props}
      onClose={() => walletStore.setWalletOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 500,
          // backgroundColor: "background.paper",
          p: 2,
          borderRadius: 16,
          backgroundImage: "none",
        },
      }}
    >
      <Stack spacing={2}>
        {connectors.map(([connector, hooks], _index) => {
          return (
            <ConnectorCard key={getConnectorName(connector)} connector={connector} hooks={hooks} />
          );
        })}
      </Stack>
    </Dialog>
  );
};
