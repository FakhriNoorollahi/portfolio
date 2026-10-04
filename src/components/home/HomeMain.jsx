import { Grid, Stack, Typography } from "@mui/material";
import Heading from "../../common/components/Heading";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import AppCard from "../../ui/AppCard";

const WHAT_I_DO = [
  {
    id: 1,
    title: "Web Development",
    icon: <CodeOutlinedIcon />,
    style: "#FFEBD1",
    content:
      "As a developer, I find myself most captivated by the power and flexibility of NEXT.js. I amm always eager to dive into new projects that leverage NEXT.js and discover innovative ways to create fast, scalable, and user-friendly applications",
  },
  {
    id: 2,
    title: "App Development",
    icon: <LaptopMacOutlinedIcon />,
    style: "#F2F7FC",
    content:
      "With a focus on user-centric design and cutting-edge technologies, I thrive on building intuitive and efficient apps  that make a positive impact on people's lives. Let's turn ideas into reality and shape the future together.",
  },
];

function HomeMain() {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading label="ABOUT ME" />
        <Typography variant="body1">
          Hello there! I'm thrilled to welcome you to my portfolio. I am a
          Front-End Developer with 3+ years of experience building enterprise
          dashboards, admin panels, and responsive web applications. Specialized
          in Angular with hands-on expertise in TypeScript, RxJS, Reactive
          Forms,Angular Material and REST API integration. Experienced in the
          React ecosystem (Redux Toolkit, React Query, Context API) and Tailwind
          CSS for modern UI development. Proven ability to deliver scalable,
          maintainable, and high-performance web applications while
          collaborating effectively with remote and cross-functional teams
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6">What I do!</Typography>
        <Grid container spacing={2}>
          {WHAT_I_DO.map((item) => (
            <Grid size={6} key={item.id}>
              <AppCard
                title={item.title}
                avatar={item.icon}
                cardSx={{ backgroundColor: item.style }}
                cardHeaderSx={{
                  "& .MuiCardHeader-title": {
                    fontSize: "20px",
                    fontWeight: "bold",
                  },

                  "& .MuiCardHeader-avatar": {
                    color: "primary.main",
                  },
                }}
              >
                {item.content}
              </AppCard>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default HomeMain;
