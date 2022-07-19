import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { NextPage } from "next";
import Color from "color";
import { useMuiTheme } from "src/hooks/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const companies = [{ name: "Manekiki", slug: "manekiki" }];

export const SelectCompanyPage: NextPage = () => {
  const theme = useMuiTheme();

  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "background.onboard" }}
    >
      <Paper sx={{ backgroundColor: "common.lightPurple", borderRadius: 40, width: 550 }}>
        <Box px={10} py={8.5}>
          <Typography variant="h2" textTransform="uppercase" textAlign="center">
            choose company
          </Typography>
          <Stack spacing={2} mt={5}>
            {companies.map((company, _index) => {
              return (
                <Link href={`/company/${company.slug}/dashboard`} key={company.slug} passHref>
                  <Button
                    key={company.slug}
                    variant="text"
                    fullWidth
                    sx={{
                      px: 3.5,
                      justifyContent: "flex-start",
                      backgroundColor: "common.purple",
                      borderRadius: 12,
                      height: 48,
                      boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
                      ":hover": {
                        backgroundColor: Color(theme.palette.common.purple).darken(0.05).hex(),
                      },
                    }}
                  >
                    <Typography variant="h6" color="textPrimary">
                      {company.name}
                    </Typography>
                  </Button>
                </Link>
              );
            })}
            <Link href={`/company/create`} passHref>
              <Button
                variant="text"
                fullWidth
                sx={{
                  px: 2,
                  justifyContent: "flex-start",
                  // backgroundColor: "common.purple",
                  borderRadius: 12,
                  height: 48,
                  ":hover": {
                    backgroundColor: Color(theme.palette.common.lightPurple).darken(0.05).hex(),
                  },
                  ".MuiButton-startIcon": {
                    mr: 0.5,
                  },
                }}
                startIcon={
                  <Box>
                    <FontAwesomeIcon icon={faPlus} />
                  </Box>
                }
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Add more
                </Typography>
              </Button>
            </Link>
          </Stack>
          <Typography sx={{ maxWidth: 300, mx: "auto", mt: 4.5 }} textAlign="center">
            <i>Select your company to continue.</i>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
