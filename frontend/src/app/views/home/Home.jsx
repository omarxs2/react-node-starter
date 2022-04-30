import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../../components/AppBar";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { workplaces, constructors } from "./data";
import { styled } from "@mui/material/styles";


const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100px",
  maxHeight: "150px",
});

export default function Home() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container
        component="top"
        maxWidth={false}
        sx={{ backgroundColor: "#262625" }}
      >
        <React.Fragment>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          {/* Hero unit */}
          <Container
            disableGutters
            maxWidth="lg"
            component="main"
            sx={{ pt: 8, pb: 4 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color={(theme) => theme.palette.grey[300]}
              gutterBottom
            >
              Lets Start New Report
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color={(theme) => theme.palette.grey[300]}
              component="p"
            >
              Quickly build and share effictive and bla bla reports!
            </Typography>
          </Container>

          <Container
            disableGutters
            component="sec"
            sx={{ pb: 6 }}
            align="center"
          >
            <IconButton></IconButton>
            <Button
              sx={{ mx: 2 }}
              variant="outlined"
              color="primary"
              startIcon={<PeopleIcon />}
            >
              اضف مقاول
            </Button>

            <Button
              sx={{ mx: 2 }}
              variant="contained"
              color="primary"
              startIcon={<MapsHomeWorkIcon />}
            >
              اضف ورشة
            </Button>
          </Container>

          {/* End hero unit */}
          <Container
            sx={{ display: "flex", overflowX: "scroll" }}
            align="center"
            maxWidth="lg"
            component="main"
          >
            {workplaces?.map((wp) => {
              return (
                <Grid
                  container
                  spacing={5}
                  alignItems="center"
                  sx={{ mx: 1, py: 5 }}
                >
                  <Card
                    sx={{
                      width: "260px",
                      maxWidth: "260px",
                      maxHeight: "400px",
                    }}
                  >
                    <CardHeader
                      title={wp.name}
                      subheader={wp.location}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Img src="images/generalicon.png" />
                      </Box>
                      <ul>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                          نوع الورشة: {wp.type} 
                        </Typography>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                            اخر تقرير اصدر: {wp.lastReported} 
                        </Typography>
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="contained">
                        انشئ تقرير
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Container>

          {/* End hero unit */}
          <Container
            sx={{ display: "flex", overflowX: "scroll" }}
            align="center"
            maxWidth="lg"
            component="main"
          >
            {constructors?.map((cn) => {
              return (
                <Grid
                  container
                  spacing={5}
                  alignItems="center"
                  sx={{ mx: 1, py: 5 }}
                >
                  <Card
                    sx={{
                      width: "260px",
                      maxWidth: "260px",
                      maxHeight: "400px",
                    }}
                  >
                    <CardHeader
                      title={cn.name}
                      subheader={`قطاع العمل: ${cn.field}`}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Img src="images/profile.png" />
                      </Box>
                      <ul>
                      <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                         {cn.email}   :البريد الالكتروني
                        </Typography>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                           الهاتف: {cn.phone} 
                        </Typography>
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                        >
                           المدينة: {cn.location} 
                        </Typography>
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="contained">
                        ابدأ التقييم
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Container>
          {/* Footer */}
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              py: [3, 6],
            }}
          >
            <Typography
              variant="h8"
              align="center"
              color={(theme) => theme.palette.grey[300]}
              component="p"
            >
              يمكنكم التواصل معنا عبر لينكدان
            </Typography>
          </Container>
          {/* End footer */}
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
}
