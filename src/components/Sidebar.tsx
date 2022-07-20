import { Box, Drawer } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

type SidebarProps = {
  
};

const menuList = [
  {
    label: 'Home',
    isTopLevel: true
  },
  {
    label: 'Payment',
    isTopLevel: true
  },
  {
    label: "Create Payment",
    isTopLevel: false
  },
  {
    label: "Submit Billing",
    isTopLevel: false
  },
  {
    label: "History",
    isTopLevel: true
  },
  {
    label: "Setting",
    isTopLevel: true
  },
  {
    label: "Manage Vault",
    isTopLevel: false
  },
  {
    label: "Manage Member",
    isTopLevel: false
  }
]
export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paperAnchorDockedLeft': {
          marginTop: '127px',
          backgroundColor: 'white',
          borderRadius: '40px 40px 0px 0px',
          width: '216px'
        }
      }}
    >
      <List sx={{ marginTop: '63px' }}>
        {
          menuList.map((menu, index) => (
            <ListItem 
              key={menu.label} 
              disablePadding
              sx={{
                "&$selected": {
                  backgroundColor: "#D7D7FD",
                  color: "white",
                },
                "&$selected:hover": {
                  backgroundColor: "#D7D7FD",
                },
                "&:hover": {
                  backgroundColor: "#D7D7FD",
                }
              }}
            >
              <ListItemButton>
                <Box marginLeft="18px" fontWeight={menu.isTopLevel ? '700' : 'normal'}>
                  {menu.label}
                </Box>
                {/* <ListItemText sx={{ fontWeight: menu.isTopLevel ? '700' : 'normal' }} primary={menu.label} /> */}
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
};
