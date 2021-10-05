"""
This script produces a Gantt chart that illustrates the project plan.
"""
import plotly.express as px
import pandas as pd

df = pd.DataFrame(
    [
        dict(
            Task="Scrape Public Recycling Facilities",
            Start="2021-10-04",
            Finish="2021-10-05",
            Type="Data Collection",
        ),
        dict(
            Task="Compile Literature Review Resources",
            Start="2021-10-09",
            Finish="2021-10-11",
            Type="Other",
        ),
        dict(
            Task="Supervisor Meeting #1",
            Start="2021-10-14",
            Finish="2021-10-15",
            Type="Meeting",
        ),
        dict(
            Task="Supervisor Meeting #2",
            Start="2021-11-04",
            Finish="2021-10-22",
            Type="Meeting",
        ),
        dict(
            Task="Supervisor Meeting #3",
            Start="2021-12-07",
            Finish="2021-12-18",
            Type="Meeting",
        ),
        dict(
            Task="Write Sample Chapter",
            Start="2022-01-18",
            Finish="2022-01-25",
            Type="Report",
        ),
        dict(
            Task="Supervisor Meeting #4",
            Start="2022-01-25",
            Finish="2022-02-12",
            Type="Meeting",
        ),
        dict(
            Task="Supervisor Meeting #5",
            Start="2022-03-03",
            Finish="2022-03-15",
            Type="Meeting",
        ),
        dict(
            Task="Supervisor Meeting #6",
            Start="2022-04-19",
            Finish="2022-05-07",
            Type="Meeting",
        ),
        dict(
            Task="Submission", Start="2022-05-07", Finish="2022-05-31", Type="Deadline"
        ),
    ]
)

fig = px.timeline(
    df, x_start="Start", x_end="Finish", y="Task", title="Project Plan", color="Type"
)
fig.update_yaxes(autorange="reversed")
fig.show()
