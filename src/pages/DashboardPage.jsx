import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { useAuth } from "../context/AuthContext";
import LogisticsTable from "../components/LogisticsTable";

const NAVIGATION = [
  { segment: "bid", title: "Bid", icon: <DashboardIcon /> },
  { segment: "pod", title: "POD", icon: <DashboardIcon /> },
  { segment: "vendor", title: "Vendor", icon: <DashboardIcon /> },
  { segment: "user", title: "User", icon: <DashboardIcon /> },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardPage(props) {
  const { window } = props;
  const { user, signOut } = useAuth();
  const router = useDemoRouter("/dashboard");

  // Debug: Log the current segment
  console.log("Current router.segment:", router.segment);
  // console.log("User object:", user);

  // If no segment is selected, navigate to "bid" (using a relative path)
  React.useEffect(() => {
    if (!router.segment || router.segment === "") {
      console.log("No segment detected. Redirecting to 'bid'.");
      router.navigate("bid", { replace: true });
    }
  }, [router.segment, router]);

  return (
    <AppProvider
      session={user ? { user } : null}
      authentication={{ signOut }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={window}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'LOGO',
        homeUrl: '/toolpad/core/introduction',
      }}
    >
      <DashboardLayout >
        {(!router.segment || router.segment === "bid") && <LogisticsTable />}
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardPage;
