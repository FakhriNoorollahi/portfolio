import { Grid, Stack, Typography } from "@mui/material";
import Heading from "../../common/components/Heading";
import AppTimeLine from "../../ui/AppTimeLine";
import ResumeTitle from "./ResumeTitle";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const RESUME_DATA = [
  {
    id: 1,
    headerTitle: "Education",
    icon: <SchoolIcon color="primary" />,
    data: [
      {
        id: "11",
        title: "M.Sc. IT - Network Computers",
        date: "2018 - 2022",
        place: "Urmia University",
      },
      {
        id: "12",
        title: "B.Sc. Computer Engineering (Software Engineering)",
        date: "2012 - 2016",
        place: "Guilan University",
      },
    ],
  },
  {
    id: 2,
    headerTitle: "Work Experience",
    icon: <BusinessCenterIcon color="primary" />,
    data: [
      {
        id: "21",
        title: "Front-End Developer (Part-Time)",
        date: "March 2026 - July 2026",
        place: "Maroon Software Development Company",
      },
      {
        id: "22",
        title: "Front-End Developer (Full-Time)",
        date: "2025 - 2026",
        place: "Maroon Software Development Company",
      },
    ],
  },
];

function ResumeMain() {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading label="RESUME" />
      </Stack>

      <Grid container>
        {RESUME_DATA.map((item) => (
          <Grid size={6} key={item.id}>
            <ResumeTitle icon={item.icon} text={item.headerTitle} />

            {item.data.map((itemData) => (
              <AppTimeLine key={itemData.id}>
                <Typography variant="h6">{itemData.title}</Typography>

                <Typography variant="body2">{itemData.date}</Typography>

                <Typography>{itemData.place}</Typography>
              </AppTimeLine>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default ResumeMain;
