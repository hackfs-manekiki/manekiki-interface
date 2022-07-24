import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, InputLabel, MenuItem, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Contract, utils } from "ethers";
import { useEffect, useId, useState } from "react";
import { ERC20ABI, VaultABI } from "src/abis";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { NumberFormatCurrency } from "src/components/inputs/NumberFormatCurrency";
import { WhiteBackgroundInput } from "src/components/inputs/WhiteBackgroundInput";
import { GeneralSelect } from "src/components/selects/GeneralSelect";
import type { ContractAddresses, ContractAddressKey } from "src/constants/contracts";
import type { SupportedChainIds } from "src/constants/enums/chain-id.enum";
import { useConstant } from "src/hooks/useConstant";
import { useUserVaults } from "src/hooks/vaults/useUserVaults";
import { useVaultBalances } from "src/hooks/vaults/useVaultBalances";
import { shortenAddress } from "src/utils/shortenAddress";

export const CompanyCreatePaymentPage = () => {
  const paymentNameId = useId();
  const amountId = useId();
  const detailsId = useId();
  const [imageBlobUrl, setImageBlobUrl] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const [name, setName] = useState("");
  const [selectedVaultAddress, setSelectVaultAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<ContractAddressKey>("kiusd");

  const { contractAddress } = useConstant();
  const { account, provider } = useWeb3React();
  const { data: vaults, loading: isVaultsLoading, error: isVaultsError } = useUserVaults();

  const amountInputId = useId();

  useEffect(() => {
    if (!imageFile) {
      setImageBlobUrl("");
      return;
    }
    const process = async () => {
      const ab = await imageFile.arrayBuffer();
      const blob = new Blob([ab], { type: imageFile.type });
      const objectUrl = URL.createObjectURL(blob);
      setImageBlobUrl(objectUrl);
      // const reader = new FileReader();
      // reader.addEventListener("load", () => setImageDataUrl(reader.result as string));
      // reader.readAsDataURL(blob);
    };
    process();
  }, [imageFile]);

  const validateInputs = () => {
    if (!name) {
      return false;
    }
    if (!selectedVaultAddress) {
      return false;
    }
    if (!amount) {
      return false;
    }
    return true;
  };

  const isContinueButtonDisabled = !validateInputs();

  const handleSubmit = async () => {
    const vault = vaults.find((v) => v.address === selectedVaultAddress);
    if (!vault || !provider) return;
    const signer = provider.getSigner();
    const vaultContract = new Contract(vault.address, VaultABI, signer);
    // if (selectedTokenSymbol === "eth") {
    //   const requestEthParams = {
    //     requester: account,
    //     to: account,
    //     requestType: "0",
    //     value: utils.parseEther(amount),
    //     budget: "0", // ??
    //     data: "0x",
    //     name: name,
    //     detail: details,
    //     attachments: "ipfs://null",
    //   };
    //   const { hash } = await vaultContract.requestApproval(requestEthParams);
    //   const receipt = await provider.waitForTransaction(hash);
    // } else {
    // const decimals = selectedTokenSymbol === "dai" ? 18 : 6;
    const decimals = 6;
    const tokenAddress = contractAddress[selectedTokenSymbol];
    const tokenInterface = new utils.Interface(ERC20ABI);
    const transferFunctionData = tokenInterface.encodeFunctionData("transfer", [
      account,
      utils.parseUnits(amount, decimals),
    ]);
    const requestTokenParams = {
      requester: account,
      to: tokenAddress,
      requestType: "1",
      value: "0",
      budget: "0", // ??
      data: transferFunctionData,
      name: name,
      detail: details,
      attachments: "ipfs://null",
    };
    const { hash } = await vaultContract.requestApproval(requestTokenParams);
    const receipt = await provider.waitForTransaction(hash);
    // }
  };

  return (
    <Box px={4} pt={2}>
      <Typography variant="h3">Create Payment</Typography>
      <Box display="flex" flexWrap="wrap" sx={{ mt: 3 }}></Box>
      <Stack spacing={3} maxWidth={600} pb={5}>
        <Box>
          <InputLabel htmlFor={paymentNameId} sx={{ pl: 0.5, mb: 1 }}>
            <Typography color="textPrimary">
              <b>Payment name*</b>
            </Typography>
          </InputLabel>
          <WhiteBackgroundInput
            id={paymentNameId}
            variant="outlined"
            placeholder="What is the money for?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel sx={{ pl: 0.5, mb: 1 }}>
            <Typography color="textPrimary">
              <b>Request from*</b>
            </Typography>
          </InputLabel>
          <GeneralSelect
            label="Select vault to request from"
            value={selectedVaultAddress}
            onChange={(e) => setSelectVaultAddress(e.target.value as string)}
            sx={{
              width: 600,
              "& .MuiOutlinedInput-input": { py: 1.5 },
            }}
            inputLabelProps={{ sx: { transform: "translate(14px, 12px)" } }}
          >
            {vaults?.length > 0 ? (
              vaults.map((vault) => {
                return (
                  <MenuItem key={vault.address} value={vault.address}>
                    <Typography component="span" sx={{ mr: 1 }}>
                      {vault.name}
                    </Typography>
                    <Typography component="span" variant="subtitle1" color="textSecondary">
                      ({shortenAddress(vault.address, 8)})
                    </Typography>
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled>
                <i>- No vaults found -</i>
              </MenuItem>
            )}
          </GeneralSelect>
        </Box>
        <Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <InputLabel htmlFor={amountId} sx={{ pl: 0.5, mb: 1 }}>
                <Typography color="textPrimary">
                  <b>Amount*</b>
                </Typography>
              </InputLabel>
              <WhiteBackgroundInput
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id={amountId}
                placeholder="Fill amount"
                sx={{ width: 340 }}
                InputProps={{
                  id: amountInputId,
                  inputComponent: NumberFormatCurrency as any,
                }}
              />
            </Box>
            <Box>
              <InputLabel sx={{ pl: 0.5, mb: 1 }}>
                <Typography color="textPrimary">
                  <b>Currency*</b>
                </Typography>
              </InputLabel>
              <GeneralSelect
                value={selectedTokenSymbol}
                onChange={(e) =>
                  setSelectedTokenSymbol(
                    e.target.value as keyof typeof ContractAddresses[SupportedChainIds],
                  )
                }
                sx={{
                  width: 240,
                  "& .MuiOutlinedInput-input": { py: 1.5 },
                }}
                inputLabelProps={{ sx: { transform: "translate(14px, 12px)" } }}
              >
                <MenuItem value="kiusd">KiUSD</MenuItem>
                <MenuItem value="usdt">USDT</MenuItem>
                <MenuItem value="usdc">USDC</MenuItem>
              </GeneralSelect>
            </Box>
          </Stack>
        </Box>
        <Box>
          <InputLabel htmlFor={detailsId} sx={{ pl: 0.5, mb: 1 }}>
            <Typography color="textPrimary">
              <b>Details</b>
            </Typography>
          </InputLabel>
          <WhiteBackgroundInput
            id={detailsId}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            multiline
            placeholder="Explain more about your payment"
          />
        </Box>
        {/* <Box>
          <InputLabel sx={{ pl: 0.5, mb: 1 }}>
            <Typography color="textPrimary">
              <b>Attached bill/evidence</b>
            </Typography>
          </InputLabel>
          {imageBlobUrl ? (
            <Box display="flex" alignItems="flex-end">
              <Box component="img" src={imageBlobUrl} sx={{ width: 600, borderRadius: 12 }} />
              <IconButton
                size="small"
                sx={{ ml: 0.5, color: "error.main" }}
                onClick={() => {
                  setImageFile(undefined);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButton>
            </Box>
          ) : (
            <Button
              component="label"
              sx={{
                width: "100%",
                height: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #CDCDFF",
                borderRadius: 6,
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImageFile(e.target.files?.[0])}
              />
              <ImageIcon />
              <Typography sx={{ mt: 1, color: "#9190D6" }}>attach evidence</Typography>
            </Button>
          )}
        </Box> */}
        <Box width="100%" maxWidth={1000} display="flex" justifyContent="space-between" my={5}>
          <Button
            variant="text"
            sx={{ height: 40 }}
            startIcon={
              <Box>
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              </Box>
            }
          >
            <Typography variant="button" color="primary">
              Back
            </Typography>
          </Button>
          <PrimaryGradientButton
            sx={{ height: 40 }}
            onClick={handleSubmit}
            disabled={isContinueButtonDisabled}
          >
            <Typography variant="button" color="textPrimary">
              Continue
            </Typography>
          </PrimaryGradientButton>
        </Box>
      </Stack>
    </Box>
  );
};
