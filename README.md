### Estimating how much will get done this sprint

Time estimates for software is highly variable, but stakeholders require reliable estimates. Our average velocity is readily available, but it does not tell the whole story. This function accounts for the variability over past sprints and clarifies to stakeholders how many story points we expect to complete.

#### Example

The following command will output the number of story points we can complete with 90% confidence, if over 3 sprints we finished 3, 4 and 5 story points:

`ts-node velocity.ts 3 4 5 .9`

#### Input

Story points each sprint, followed by the desired confidence level.

#### Prerequisite packages

- ts-node

### Estimating how long a workload will require

Stakeholders wish to know when a work item will be completed. This function will approximate the number of sprints we require to complete the work. This has some caveats--it assumes that

- the story point total is accurate
  - this is rarely the case. For large workloads it is typical that some work has not been accounted for, and thus the eventual work total will exceed the initial estimate.
- all team members are contributing toward the work item
  - does not hold if the team's velocity is shared among multiple ongoing epics
