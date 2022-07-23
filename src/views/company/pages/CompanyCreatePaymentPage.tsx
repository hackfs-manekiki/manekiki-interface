import { faChevronLeft, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, IconButton, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useId, useState } from "react";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { WhiteBackgroundInput } from "src/components/inputs/WhiteBackgroundInput";
import { GeneralSelect } from "src/components/selects/GeneralSelect";
import { ImageIcon } from "src/svgs";

export const CompanyCreatePaymentPage = () => {
  const paymentNameId = useId();
  const amountId = useId();
  const detailsId = useId();
  const [imageBlobUrl, setImageBlobUrl] = useState("");
  const [imageFile, setImageFile] = useState<File>();

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
            sx={{
              width: 600,
              "& .MuiOutlinedInput-input": { py: 1.5 },
            }}
            inputLabelProps={{ sx: { transform: "translate(14px, 12px)" } }}
          ></GeneralSelect>
        </Box>
        <Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <InputLabel htmlFor={amountId} sx={{ pl: 0.5, mb: 1 }}>
                <Typography color="textPrimary">
                  <b>Amount*</b>
                </Typography>
              </InputLabel>
              <WhiteBackgroundInput id={amountId} placeholder="Fill amount" sx={{ width: 340 }} />
            </Box>
            <Box>
              <InputLabel sx={{ pl: 0.5, mb: 1 }}>
                <Typography color="textPrimary">
                  <b>Currency*</b>
                </Typography>
              </InputLabel>
              <GeneralSelect
                sx={{
                  width: 240,
                  "& .MuiOutlinedInput-input": { py: 1.5 },
                }}
                inputLabelProps={{ sx: { transform: "translate(14px, 12px)" } }}
              ></GeneralSelect>
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
            multiline
            placeholder="Explain more about your payment"
          />
        </Box>
        <Box>
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
        </Box>
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
          <PrimaryGradientButton sx={{ height: 40 }}>
            <Typography variant="button" color="textPrimary">
              Continue
            </Typography>
          </PrimaryGradientButton>
        </Box>
      </Stack>
    </Box>
  );
};
