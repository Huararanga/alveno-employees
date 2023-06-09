import { createTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

export const theme = createTheme({
  //   overrides: {
  //     MuiTableCell: {
  //       head: {
  //         color: "grey",
  //       }
  //     }
  //   },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }),
      },
    },
  },
  palette: {
    primary: {
      main: "#02D076",
    },
    secondary: {
      main: "#10BFFC",
    },
  },
});
