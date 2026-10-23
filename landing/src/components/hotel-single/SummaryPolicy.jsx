import React from "react";
import { Box, Tabs, Tab, Typography, Grid } from "@mui/material";
import { Cancel as CancelIcon, Info as InfoIcon } from "@mui/icons-material";

function SummaryPolicy({ item }) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <section id="rooms" className="pt-30">
      <div className="container">
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="white" // Disabling the default indicator
            textColor="primary"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                padding: "6px 12px", // Reduced padding to shrink the tab height
                minHeight: "50px", // Set minimum height for the tab
              },
              "& .MuiTab-root.Mui-selected": {
                backgroundColor: "#662EA7", // Custom background color for selected tab
                color: "white", // Change text color for selected tab
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#662EA7", // Apply custom background to the indicator
              },
            }}
          >
            <Tab
              label="Cancellation Policy"
              icon={<InfoIcon />}
              iconPosition="start"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "none",
                padding: "12px",
              }}
            />
            {/* <Tab
              label="Summary"
              icon={<InfoIcon />}
              iconPosition="start"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "none",
                padding: "12px",
              }}
            /> */}
          </Tabs>

          <Box sx={{ padding: 2 }}>
            {selectedTab === 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
               
                </Typography>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
                    <h3 className="text-22 fw-500 pt-40 border-top-light">
                      Cancellation
                    </h3>
                    <p> {item.policy?.[0]?.cancellation}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <h3 className="text-22 fw-500 pt-40 border-top-light">
                      refund
                    </h3>
                    <p> {item.policy?.[0]?.refund}</p>
                  </Grid> */}
                  <Grid className="mb-2" item xs={12}>
                 
                    <p dangerouslySetInnerHTML={{ __html:item.policy?.[0]?.terms }}></p>
                  </Grid>
                </Grid>
              </Box>
            )}
            {selectedTab === 1 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 2, fontWeight: "bold" }}
                >
                  Summary Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  
                    <h3 className="text-22 fw-500 pt-40 border-top-light">Features</h3>
                    <p>  {item.summary?.[0]?.features}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
               
                    <h3 className="text-22 fw-500 pt-40 border-top-light">Highlights</h3>
                    <p>  {item.summary?.[0]?.highlights}</p>
                  </Grid>
                  <Grid item xs={12}>
                  <h3 className="text-22 fw-500 pt-40 border-top-light">Brief Description</h3>
        <p> {item.summary?.[0]?.briefDescription}</p>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </section>
  );
}

export default SummaryPolicy;
