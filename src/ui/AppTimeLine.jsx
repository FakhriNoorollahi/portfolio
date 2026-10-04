import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

function AppTimeLine({ children }) {
  return (
    <Timeline
      sx={{
        p: 0,
        "& .MuiTimelineItem-root:before": {
          display: "none",
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent>{children}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default AppTimeLine;
