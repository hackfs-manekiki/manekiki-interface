import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { GnosisSafe } from "@web3-react/gnosis-safe";
import { WalletConnect } from "@web3-react/walletconnect";
import { useCallback } from "react";
import { getAddChainParameters } from "src/constants/chains";
import { connectors } from "src/utils/connectors";
import { ConnectorIcon } from "src/components/ConnectorIcon";
import { getConnectorName } from "src/utils/getConnectorName";
import { useMuiTheme } from "src/hooks/themes";
import Color from "color";
import type { Connector } from "@web3-react/types";

const desiredChainId = -1;

export const ConnectWalletPage = () => {
  const theme = useMuiTheme();
  // const onClick = useCallback(async () => {
  //   try {
  //     if (connector instanceof GnosisSafe) {
  //       await connector.activate();
  //     } else if (connector instanceof WalletConnect || connector instanceof Network) {
  //       await connector.activate(desiredChainId === -1 ? undefined : desiredChainId);
  //     } else {
  //       await connector.activate(
  //         desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId),
  //       );
  //     }
  //   } catch (error) {
  //     console.log(`🚀 ~ error`, error);
  //     // Toast/Alert
  //   }
  //   walletStore.setWalletOpen(false);
  // }, [connector, desiredChainId]);

  const getOnClickHandler = useCallback(
    (connector: Connector) => async () => {
      try {
        if (connector instanceof GnosisSafe) {
          await connector.activate();
        } else if (connector instanceof WalletConnect) {
          await connector.activate(desiredChainId === -1 ? undefined : desiredChainId);
        } else {
          await connector.activate(
            desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId),
          );
        }
      } catch (error) {
        console.log(`🚀 ~ error`, error);
        // Toast/Alert
      }
    },
    [],
  );

  return (
    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
      <Paper sx={{ backgroundColor: "common.lightPurple", borderRadius: 40, width: 550 }}>
        <Box px={10} py={8.5}>
          <Typography variant="h2" textTransform="uppercase" textAlign="center">
            connect wallet
          </Typography>
          <Stack spacing={2} mt={5}>
            {connectors.map(([connector], _index) => {
              return (
                <Button
                  key={getConnectorName(connector)}
                  onClick={getOnClickHandler(connector)}
                  variant="text"
                  fullWidth
                  sx={{
                    backgroundColor: "common.purple",
                    borderRadius: 12,
                    height: 48,
                    boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
                    ":hover": {
                      backgroundColor: Color(theme.palette.common.purple).darken(0.05).hex(),
                    },
                  }}
                >
                  <Box
                    alignItems="center"
                    width="100%"
                    px={3.5}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "50px 1fr",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ConnectorIcon connector={connector} sx={{ justifySelf: "center" }} />
                    <Typography variant="h6" textAlign="end" color="textPrimary">
                      {getConnectorName(connector)}
                    </Typography>
                  </Box>
                </Button>
              );
            })}
          </Stack>
          <Typography sx={{ maxWidth: 220, mx: "auto", mt: 4.5 }} textAlign="center">
            <i>
              Select your wallet
              <br />
              from the options to get started.
            </i>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
