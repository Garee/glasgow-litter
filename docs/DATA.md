# Data

This document describes the data sources in the [data](../data) directory that have been used for the project.

The contents of this directory are stored using [Git Large File Storage](https://git-lfs.github.com/).

## [simd2020v2.xlsx](../data/simd2020v2.xlsx)

The [Scottish Index of Multiple Deprivation](https://www.gov.scot/publications/scottish-index-multiple-deprivation-2020/pages/1/) data set ranks different areas of Scotland from most deprived to least deprived using a number of indicators. There are 6977 observations and it was published on the 28th January 2020.

### Indicator Features

| Indicator                      | Feature                | Type                                 | Description                                                                                                                           |
| ------------------------------ | ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Geography                      | Data_Zone              | Code (String)                        | 2011 Data Zone                                                                                                                        |
| Geography                      | Intermediate_Zone      | Name (String)                        | 2011 Intermediate Zone name                                                                                                           |
| Geography                      | Council_area           | Name (String)                        | Council area name                                                                                                                     |
| Population                     | Total_population       | Count (Integer)                      | 2017 NRS small area population estimates                                                                                              |
| Population                     | Working_age_population | Count (Integer)                      | based on 2017 NRS small area population estimate and state pension age                                                                |
| Income                         | Income_rate            | Percentage (Integer)                 | Percentage of people who are income deprived                                                                                          |
| Income                         | Income_count           | Count (Integer)                      | Number of people who are income deprived                                                                                              |
| Employment                     | Employment_rate        | Percentage (Integer)                 | Percentage of people who are employment deprived                                                                                      |
| Employment                     | Employment_count       | Count (Integer)                      | Number of people who are employment deprived                                                                                          |
| Health                         | CIF                    | Standardised ratio (Integer)         | Comparative Illness Factor: standardised ratio                                                                                        |
| Health                         | ALCOHOL                | Standardised ratio (Integer)         | Hospital stays related to alcohol misuse: standardised ratio                                                                          |
| Health                         | DRUG                   | Standardised ratio (Integer)         | Hospital stays related to drug misuse: standardised ratio                                                                             |
| Health                         | SMR                    | Standardised ratio (Integer)         | Standardised mortality ratio                                                                                                          |
| Health                         | DEPRESS                | Percentage (Integer)                 | Proportion of population being prescribed drugs for anxiety, depression or psychosis                                                  |
| Health                         | LBWT                   | Percentage (Integer)                 | Proportion of live singleton births of low birth weight                                                                               |
| Health                         | EMERG                  | Standardised ratio (Integer)         | Emergency stays in hospital: standardised ratio                                                                                       |
| Education, Skills and Training | Attendance             | Percentage (Integer)                 | School pupil attendance                                                                                                               |
| Education, Skills and Training | Attainment             | Score (Float)                        | Attainment of school leavers                                                                                                          |
| Education, Skills and Training | no_qualifications      | Standardised ratio (Integer)         | Working age people with no qualifications: standardised ratio                                                                         |
| Education, Skills and Training | not_participating      | Percentage (Integer)                 | Proportion of people aged 16-19 not participating in education, employment or training                                                |
| Education, Skills and Training | University             | Percentage (Integer)                 | Proportion of 17-21 year olds entering university                                                                                     |
| Geographic Access to Services  | drive_petrol           | Time in minutes (Float)              | Average drive time to a petrol station in minutes                                                                                     |
| Geographic Access to Services  | drive_GP               | Time in minutes (Float)              | Average drive time to a GP surgery in minutes                                                                                         |
| Geographic Access to Services  | drive_PO               | Time in minutes (Float)              | Average drive time to a post office in minutes                                                                                        |
| Geographic Access to Services  | drive_primary          | Time in minutes (Float)              | Average drive time to a primary school in minutes                                                                                     |
| Geographic Access to Services  | drive_retail           | Time in minutes (Float)              | Average drive time to a retail centre in minutes                                                                                      |
| Geographic Access to Services  | drive_secondary        | Time in minutes (Float)              | Average drive time to a secondary school in minutes                                                                                   |
| Geographic Access to Services  | PT_GP                  | Time in minutes (Float)              | Public transport travel time to a GP surgery in minutes                                                                               |
| Geographic Access to Services  | PT_Post                | Time in minutes (Float)              | Public transport travel time to a post office in minutes                                                                              |
| Geographic Access to Services  | PT_retail              | Time in minutes (Float)              | Public transport travel time to a retail centre in minutes                                                                            |
| Geographic Access to Services  | broadband              | Percentage (Integer)                 | Percentage of premises without access to superfast broadband (at least 30Mb/s download speed)                                         |
| Crime                          | crime_count            | Count (Integer)                      | Number of recorded crimes of violence, sexual offences, domestic housebreaking, vandalism, drugs offences, and common assault         |
| Crime                          | crime_rate             | Rate per 10,000 population (Integer) | Recorded crimes of violence, sexual offences, domestic housebreaking, vandalism, drugs offences, and common assault per 10,000 people |
| Housing                        | overcrowded_count      | Count (Integer)                      | Number of people in households that are overcrowded                                                                                   |
| Housing                        | nocentralheat_count    | Count (Integer)                      | Number of people in households without central heating                                                                                |
| Housing                        | overcrowded_rate       | Percentage (Integer)                 | Percentage of people in households that are overcrowded                                                                               |
| Housing                        | nocentralheat_rate     | Percentage (Integer)                 | Percentage of people in households without central heating                                                                            |

### Missing Data

In some data zones, the population in the considered age range is zero for some years. In these cases, a rate cannot be determined. This is denoted by '\*'.

There are 1743 observation features that have a missing value.

### Standardised Ratios

A value of 100 is the Scotland average for a population with the same age and sex profile.

## [glasgow-simd2020v2.csv](../data/glasgow-simd2020v2.csv)

The subset of simd2020v2.xlsx observations with `Council_area` equal to `Glasgow City`. There are 747 observations and 137 missing feature values.

## [publicRecyclingPoints.json](../data/publicRecylingPoints.json)

The location and details of over 700 communal public recycling facilities in Glasgow City.

It was scraped from the public [Map](https://glasgowgis.maps.arcgis.com/apps/webappviewer/index.html?id=345f389a91ff4f1fa193b24df832fb05) hosted by [Glasgow City Council](https://www.glasgow.gov.uk/index.aspx?articleid=16569).

## [images](../data/images)

This directory contains Google Street View JPEG images of Glasgow City which have been obtained using the Google Street View Static API. Each image has a 640x640 pixel resolution, which is the maximum size the API offers.

## [geojson](../data/geojson)

This directory contains GeoJSON information about the wards and data zones within Glasgow City. They are used to render the associated app's map.
