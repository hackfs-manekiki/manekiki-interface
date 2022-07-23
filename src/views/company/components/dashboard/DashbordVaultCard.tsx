import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Dialog, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import numeral from "numeral";
import { useState } from "react";
import { CopyIcon } from "src/svgs";
import { shortenAddress } from "src/utils/shortenAddress";
import { VaultAddFundsCard } from "../create-company/VaultAddFundsCard";

export const DashboardVaultCard = () => {
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{ mr: 2, mb: 2, px: 5, py: 3, backgroundColor: "white", width: 255, borderRadius: 26 }}
      >
        <Box>
          <Typography variant="h6">Vault Name</Typography>
          <Typography variant="body2">
            <Typography
              component="span"
              sx={{ fontSize: "inherit", color: "#9494EB", fontWeight: 700 }}
            >
              <i>Acc: </i>
            </Typography>
            <Typography component="span" sx={{ fontSize: "inherit", color: "textPrimary" }}>
              {shortenAddress(`0x${"1234".repeat(10)}`)}
            </Typography>
            <Typography component="span" sx={{ color: "#9494EB" }}>
              <IconButton size="small" color="inherit" disableRipple>
                <CopyIcon width={18} height={null} />
              </IconButton>
            </Typography>
          </Typography>
          <Divider sx={{ my: 1.75 }} />
          <Stack spacing={1.75}>
            <Box>
              <Typography sx={{ fontSize: 10, lineHeight: 1.2, mb: 0.5 }}>
                <i>Total amount</i>
              </Typography>
              <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ lineHeight: "30px" }}>
                  {numeral(15000).format("0,0")}
                </Typography>
                <Typography variant="body2">USD</Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 10, lineHeight: 1.2, mb: 0.5 }}>
                <i>Income</i>
              </Typography>
              <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ lineHeight: "30px" }}>
                  {/* {numeral("").format("0,0")} */}-
                </Typography>
                <Typography variant="body2">USD</Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 10, lineHeight: 1.2, mb: 0.5 }}>
                <i>Expenses</i>
              </Typography>
              <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h3" sx={{ lineHeight: "30px" }}>
                  {/* {numeral(15000).format("0,0")} */}-
                </Typography>
                <Typography variant="body2">USD</Typography>
              </Box>
            </Box>
          </Stack>
          <Button
            variant="text"
            startIcon={
              <Box color="success.main">
                <FontAwesomeIcon icon={faPlusCircle} size="sm" />
              </Box>
            }
            sx={{ ":hover": { backgroundColor: "transparent" } }}
            onClick={() => setIsTransferDialogOpen(true)}
            disableRipple
          >
            <Typography variant="subtitle2" sx={{ color: "#8D8D8D" }}>
              Transfer Money
            </Typography>
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={isTransferDialogOpen}
        onClose={() => setIsTransferDialogOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 12,
            backgroundColor: "#D7D7FD",
            width: 400,
          },
        }}
      >
        <VaultAddFundsCard vault={{ name: "Vault name" } as any} />
      </Dialog>
    </Box>
  );
};
