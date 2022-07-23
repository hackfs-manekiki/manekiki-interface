import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { NumberFormatCurrency } from "src/components/inputs/NumberFormatCurrency";
import { GeneralSelect } from "src/components/selects/GeneralSelect";
import { CopyIcon } from "src/svgs";
import { shortenAddress } from "src/utils/shortenAddress";
import QRCode from "qrcode";

import type { FC } from "react";
import type { CompanyVault } from "src/classes/company/CompanyVault";
import { useWeb3React } from "@web3-react/core";
import { useConstant } from "src/hooks/useConstant";
import type { ContractAddresses } from "src/constants/contracts";
import type { SupportedChainIds } from "src/constants/enums/chain-id.enum";
import { ERC20ABI } from "src/abis";
import { ethers } from "ethers";

const vaultAddress = "0xD2a0Ce7B617Bc6268B2D32707a5bB17f4Ed8FD21"; // Anvil PK 1

type Props = {
  vault: CompanyVault;
};
export const VaultAddFundsCard: FC<Props> = ({ vault, ...props }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [selectedTokenSymbol, setSelectedTokenSymbol] =
    useState<keyof typeof ContractAddresses[SupportedChainIds]>("usdt");

  const { account, provider } = useWeb3React();
  const { contractAddress } = useConstant();

  useEffect(() => {
    const generateQrCode = async () => {
      const decimals = selectedTokenSymbol === "dai" ? 18 : 6;
      const tokenAddr = contractAddress[selectedTokenSymbol];
      const recipient = vaultAddress;
      const amount = ethers.utils.parseUnits(transferAmount, decimals);
      const text = `ethereum:${tokenAddr}/transfer?address=${recipient}&uint256=${amount}`;
      const qrCodeDataUrl = await QRCode.toDataURL(text, {
        margin: 3,
        scale: 6,
        width: undefined,
      });
      setQrCodeDataUrl(qrCodeDataUrl);
    };
    generateQrCode();
  }, [transferAmount, selectedTokenSymbol, contractAddress]);

  const handleTransferClick = async () => {
    if (!provider) return;
    const signer = provider.getSigner();
    const decimals = selectedTokenSymbol === "dai" ? 18 : 6;
    const tokenContract = new ethers.Contract(
      contractAddress[selectedTokenSymbol],
      ERC20ABI,
      signer,
    );
    const { hash } = await tokenContract.transfer(
      vaultAddress,
      ethers.utils.parseUnits(transferAmount, decimals),
    );
    const receipt = await provider.waitForTransaction(hash);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 12,
        backgroundColor: "#D7D7FD",
        width: "100%",
        maxWidth: 385,
        minHeight: 400,
        p: 3,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>{vault.name}</Typography>
        {qrCodeDataUrl ? (
          <Box
            component="img"
            src={qrCodeDataUrl}
            sx={{ width: 220, height: 220, borderRadius: 18 }}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={220}
            height={220}
            animation="wave"
            sx={{ borderRadius: 18 }}
          />
        )}
        <Stack spacing={0.5} width="100%" alignItems="flex-start">
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Vault Address</Typography>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              color: "#6F6FE8",
              px: 2,
              borderRadius: 999,
              backgroundColor: "#BBBBFF",
            }}
          >
            <Typography variant="body2" color="inherit">
              <b>{shortenAddress(vaultAddress)}</b>
            </Typography>
            <IconButton color="inherit" disableRipple>
              <CopyIcon />
              {/* <FontAwesomeIcon icon={faCopy} /> */}
            </IconButton>
          </Box>
        </Stack>
        <Stack spacing={0.5} width="100%" alignItems="flex-start">
          <Typography variant="body2">
            <b>Send Funds</b>
          </Typography>
          <Box width="100%" display="flex" justifyContent="space-between">
            <GeneralOutlinedInput
              placeholder="Enter Amount"
              type="text"
              sx={{ width: 130, "& .MuiOutlinedInput-input": { py: 1 } }}
              InputProps={{
                inputComponent: NumberFormatCurrency as any,
              }}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              inputProps={{ style: { textAlign: "right", marginTop: 0 } }}
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <GeneralSelect
              value={selectedTokenSymbol}
              onChange={(e) => setSelectedTokenSymbol(e.target.value as any)}
              sx={{ width: 100, "& .MuiOutlinedInput-input": { py: 1 } }}
            >
              <MenuItem value="usdt">USDT</MenuItem>
              <MenuItem value="usdc">USDC</MenuItem>
              <MenuItem value="dai">DAI</MenuItem>
            </GeneralSelect>
            <Button
              variant="contained"
              sx={{ backgroundColor: "white", borderRadius: 999, px: 1.5 }}
              onClick={handleTransferClick}
            >
              <Typography variant="body2">
                <b>Transfer</b>
              </Typography>
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};
