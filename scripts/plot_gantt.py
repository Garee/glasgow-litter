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
            Completion="",
        ),
        dict(
            Task="Plan Literature Review",
            Start="2021-10-09",
            Finish="2021-10-11",
            Type="Preparation",
        ),
        dict(
            Task="Object Detection Literature Review",
            Start="2021-10-19",
            Finish="2021-10-31",
            Type="Report",
        ),
        dict(
            Task="Collect Street View Images",
            Start="2021-10-09",
            Finish="2021-10-31",
            Type="Data Collection",
        ),
        dict(
            Task="Supervisor Meeting #1",
            Start="2021-10-14",
            Finish="2021-10-15",
            Type="Meeting",
        ),
        dict(
            Task="Create Object Detection Model",
            Start="2021-10-19",
            Finish="2021-12-07",
            Type="Implementation",
        ),
        dict(
            Task="Create Visualisation Web Application",
            Start="2021-12-07",
            Finish="2022-02-28",
            Type="Implementation",
        ),
        dict(
            Task="Supervisor Meeting #2",
            Start="2021-11-04",
            Finish="2021-10-22",
            Type="Meeting",
        ),
        dict(
            Task="Organise Documentation and Code",
            Start="2021-12-01",
            Finish="2021-12-07",
            Type="Preparation",
        ),
        dict(
            Task="Supervisor Meeting #3",
            Start="2021-12-07",
            Finish="2021-12-18",
            Type="Meeting",
        ),
        dict(
            Task="Regression Literature Review",
            Start="2021-12-07",
            Finish="2021-12-31",
            Type="Report",
        ),
        dict(
            Task="Apply Regression Techniques",
            Start="2021-12-07",
            Finish="2022-03-31",
            Type="Implementation",
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
            Task="Edit Final Draft",
            Start="2022-04-12",
            Finish="2022-04-19",
            Type="Report",
        ),
        dict(
            Task="Write Executive Summary",
            Start="2022-04-19",
            Finish="2022-04-20",
            Type="Report",
        ),
        dict(
            Task="Supervisor Meeting #6",
            Start="2022-04-19",
            Finish="2022-05-07",
            Type="Meeting",
        ),
        dict(
            Task="Presentation",
            Start="2022-05-07",
            Finish="2022-05-14",
            Type="Preparation",
        ),
        dict(
            Task="Submission", Start="2022-05-07", Finish="2022-05-31", Type="Deadline"
        ),
    ]
)

fig = px.timeline(
    df,
    x_start="Start",
    x_end="Finish",
    y="Task",
    title="MSc Data Analytics ODL Project Plan <0906796b@student.gla.ac.uk>",
    color="Type",
)
fig.update_yaxes(autorange="reversed")
fig.show()
