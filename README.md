Calculates the story point velocity at confidence level.

#### Prerequisite packages

- ts-node

#### Input

Story points each sprint, followed by the desired confidence level.

#### Example

The following command will output the number of story points we can complete with 90% confidence, if over 3 sprints we finished 3, 4 and 5 story points:

`ts-node velocity.ts 4 5 6 .9`
