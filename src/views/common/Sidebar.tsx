import { Drawer, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useResponsive } from "src/hooks/useResponsive";
import Link from "next/link";
import type { DrawerProps } from "@mui/material";
import type { FC } from "react";
import { useRouter } from "next/router";
import Color from "color";

const menuList = [
  {
    label: "Home",
    isTopLevel: true,
    pathname: "/company/[slug]/dashboard",
  },
  {
    label: "Payment",
    isTopLevel: true,
  },
  {
    label: "Create Payment",
    isTopLevel: false,
    pathname: "/company/[slug]/payment/create",
  },
  {
    label: "Submit Billing",
    isTopLevel: false,
  },
  {
    label: "History",
    isTopLevel: true,
    pathname: "/company/[slug]/history",
  },
  {
    label: "Setting",
    isTopLevel: true,
  },
  {
    label: "Manage Vault",
    isTopLevel: false,
    pathname: "/company/[slug]/manage/vault",
  },
  {
    label: "Manage Member",
    isTopLevel: false,
    pathname: "/company/[slug]/manage/member",
  },
];

type Props = {} & DrawerProps;
export const Sidebar: FC<Props> = (props) => {
  const { ...drawerProps } = props;
  const router = useRouter();
  const slug = router.query.slug as string;

  const { isMobile } = useResponsive({ noSsr: true });
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      ModalProps={{
        keepMounted: true,
      }}
      {...drawerProps}
      sx={{
        "& .MuiDrawer-paper": {
          border: "none",
          backgroundColor: "white",
          borderRadius: "40px 40px 0 0",
          mt: "127px",
          width: 216,
        },
        ...drawerProps.sx,
      }}
    >
      <List sx={{ marginTop: "63px" }}>
        {menuList.map((menu, index) => (
          <ListItem
            key={menu.label}
            disablePadding
            sx={{
              ...(!!menu.pathname && {
                "&:hover": {
                  backgroundColor: Color("#D7D7FD").lighten(0.05).hex(),
                },
              }),
            }}
          >
            <Link
              passHref={!!menu.pathname}
              href={
                menu.pathname
                  ? {
                      pathname: menu.pathname,
                      query: { slug },
                    }
                  : router.asPath
              }
            >
              <ListItemButton
                disabled={!menu.pathname}
                selected={router.pathname === menu.pathname}
                sx={{
                  px: 2.25,
                  "&.Mui-selected": { backgroundColor: "#D7D7FD !important" },
                  "&.Mui-disabled": { opacity: 1 },
                }}
              >
                {/* <Box marginLeft="18px" fontWeight={menu.isTopLevel ? "700" : "normal"}>
                </Box> */}
                <Typography
                  sx={{
                    fontSize: menu.isTopLevel ? 16 : 14,
                    fontWeight: menu.isTopLevel ? 700 : 400,
                  }}
                >
                  {menu.label}
                </Typography>
                {/* <ListItemText sx={{ fontWeight: menu.isTopLevel ? '700' : 'normal' }} primary={menu.label} /> */}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
