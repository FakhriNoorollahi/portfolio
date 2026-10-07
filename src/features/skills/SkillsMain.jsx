import { Stack } from "@mui/material";
import Heading from "../../common/components/Heading";
// import AppCard from "../../ui/AppCard";
// import LabelImportantIcon from "@mui/icons-material/LabelImportant";

const SKILLS_TECH = [
  {
    id: 1,
    title: "FRONTEND",
    skills: ["Angular", "React", "TypeScript", "JavaScript"],
  },
  {
    id: 2,
    title: "State & Data",
    skills: ["RxJS", "React Query", "Redux Toolkit"],
  },
  {
    id: 3,
    title: "UI & Styling",
    skills: ["Angular Material", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    id: 4,
    title: "Forms & Libraries",
    skills: [
      "React Hook Form",
      "ngx-translate",
      "FullCalendar",
      "ECharts",
      "jalali-moment",
    ],
  },
  {
    id: 5,
    title: "API & Development",
    skills: ["REST API", "Swagger", "Postman"],
  },
  {
    id: 6,
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "Jira", "Figma", "Clockify", "VS Code"],
  },
];

function SkillsMain() {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Heading label="SKILLS & TECHNOLOGIES" />
      </Stack>

      {/* <Grid container spacing={2}>
        {SKILLS_TECH.map((item) => (
          <Grid size={3} key={item.id}>
            <AppCard
              title={item.title}
              avatar={<LabelImportantIcon />}
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
              {item.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </AppCard>
          </Grid>
        ))}
      </Grid> */}
    </Stack>
  );
}

export default SkillsMain;
