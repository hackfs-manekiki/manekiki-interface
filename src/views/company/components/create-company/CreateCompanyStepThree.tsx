import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { shortenAddress } from "src/utils/shortenAddress";

import type { FC } from "react";

type Props = {};
export const CreateCompanyStepThree: FC<Props> = observer(() => {
  const [isAdding, setIsAdding] = useState(true);
  const { account, ENSName } = useWeb3React();

  useEffect(() => {
    createCompanyStore.setOwnerAddress(account ?? "");
  }, [account]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {/* Owner card */}
      <Paper
        elevation={0}
        sx={{
          mx: 1.5,
          my: 1.5,
          width: 250,
          height: 315,
          borderRadius: 12,
          backgroundColor: "#D7D7FD",
          position: "relative",
        }}
      >
        <Stack spacing={2} p={3}>
          <Typography variant="h5">Owner</Typography>
          <Stack spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Your name</Typography>
            <GeneralOutlinedInput
              sx={{ width: "100%", "& > .MuiOutlinedInput-root > input": { py: 1.25 } }}
              placeholder="Input your name"
              value={createCompanyStore.owner.name}
              onChange={(e) => createCompanyStore.setOwnerName(e.target.value)}
            />
          </Stack>
          <Stack spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Public Key</Typography>
            <Box
              px={2}
              display="flex"
              alignItems="center"
              whiteSpace="pre"
              sx={{ background: "rgba(241, 241, 255, 0.2)", height: 40, borderRadius: 12 }}
            >
              <Typography component="span">{shortenAddress(account)}</Typography>
              {ENSName && (
                <Typography
                  component="span"
                  variant="caption"
                  color="textSecondary"
                  sx={{ lineHeight: "21px" }}
                >
                  {" "}
                  ({ENSName})
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack spacing={0.5}>
            <Typography sx={{ fontWeight: 600 }}>Role</Typography>

            <Autocomplete
              freeSolo
              getOptionDisabled={(option) => option === "Suggestion"}
              options={[
                "Suggestion",
                "Developer",
                "Designer",
                "Product Manager",
                "Operation",
                "Business Development",
              ]}
              value={createCompanyStore.owner.role}
              onChange={(e, value) => createCompanyStore.setOwnerRole(value ?? "")}
              renderInput={(params) => (
                <GeneralOutlinedInput
                  {...params}
                  sx={{ width: "100%", "& .MuiOutlinedInput-root": { py: 0.325 } }}
                  placeholder="Input role"
                />
              )}
              componentsProps={{
                paper: {
                  sx: {
                    backgroundColor: "common.white",
                    borderRadius: 12,
                    boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </Paper>
      {/* Member Cards */}
      {createCompanyStore.members.map((member, index) => {
        return (
          <Paper
            key={`${index}`}
            elevation={0}
            sx={{
              mx: 1.5,
              my: 1.5,
              width: 250,
              height: 315,
              borderRadius: 12,
              backgroundColor: "#D7D7FD",
              position: "relative",
            }}
          >
            <Stack spacing={2} p={3}>
              <Typography variant="h5">User {index + 1}</Typography>
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600 }}>Name</Typography>
                <GeneralOutlinedInput
                  value={member.name}
                  onChange={(e) => createCompanyStore.setMemberName(member, e.target.value)}
                  sx={{ width: "100%", "& > .MuiOutlinedInput-root > input": { py: 1.25 } }}
                  placeholder="Input member name"
                />
              </Stack>
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600 }}>Member address</Typography>
                <GeneralOutlinedInput
                  value={member.address}
                  onChange={(e) => createCompanyStore.setMemberAddress(member, e.target.value)}
                  sx={{ width: "100%", "& > .MuiOutlinedInput-root > input": { py: 1.25 } }}
                  placeholder="Member address"
                />
              </Stack>
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600 }}>Role</Typography>

                <Autocomplete
                  freeSolo
                  getOptionDisabled={(option) => option === "Suggestion"}
                  options={[
                    "Suggestion",
                    "Developer",
                    "Designer",
                    "Product Manager",
                    "Operation",
                    "Business Development",
                  ]}
                  value={member.role}
                  onInputChange={(e, value) =>
                    createCompanyStore.setMemberRole(member, value ?? "")
                  }
                  renderInput={(params) => (
                    <GeneralOutlinedInput
                      {...params}
                      sx={{ width: "100%", "& .MuiOutlinedInput-root": { py: 0.325 } }}
                      placeholder="Input role"
                    />
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        backgroundColor: "common.white",
                        borderRadius: 12,
                        boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
                      },
                    },
                  }}
                />
              </Stack>
            </Stack>
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 10, right: 10, color: "error.main", p: 0 }}
              onClick={() => createCompanyStore.removeMember(member)}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </IconButton>
          </Paper>
        );
      })}
      <Button
        variant="text"
        sx={{ p: 0, mx: 1.5, my: 1.5 }}
        disableRipple
        onClick={() => createCompanyStore.addMember()}
      >
        <Stack
          spacing={3.75}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 250,
            height: 315,
            background: "rgba(216, 216, 253, 0.1)",
            border: "1px solid #BBBBFF",
            borderRadius: 12,
          }}
        >
          <Box sx={{ color: "#E7E7FF", backgroundColor: "#CBCBFF", borderRadius: 999 }}>
            <FontAwesomeIcon icon={faPlusCircle} size="3x" />
          </Box>
          <Typography sx={{ fontSize: 16, lineHeight: 1.25, fontWeight: 600, color: "#6F6FE8" }}>
            Add more member
          </Typography>
        </Stack>
      </Button>
    </Box>
  );
});
