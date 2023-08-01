import { roleData } from "./role_data.js";

const fullUserInput = {
  outdoorPreference: 5,
  handsOnPreference: 5,
  technologyExtent: 4,
  salary: 15000,

};

function calc(roles) {
  const JobsWithScores = roles.map((role) => ({
    role: role.name,
    score: getScore(fullUserInput, role),
}));

  console.log(sortMatches(JobsWithScores));

  const sortedMatches = sortMatches(JobsWithScores);
  const top3Matches = sortedMatches.slice(0, 3); // Extract the highest 3 matches

  console.log(top3Matches);
}
calc(roleData);


function getScore(userInput, job) {
  const individualScores = [
    matchingJobsExtent(userInput.outdoorPreference, job.outdoorsExtent),
    matchingJobsExtent(userInput.handsOnPreference, job.handsOnExtent),
    matchingJobsExtent(userInput.technologyExtent, job.technologyExtent),
    matchingSalaryRange(userInput.salary, job.salaryRange)
  ];

  return average(individualScores);
}

// // The arrow length algorithm 
// function matchingJobsExtent(userInput, jobExtent) {
//   // TODO: convert userInput into -1 to 1 scale
//   userInput = ((userInput - 1) * 2) / (5 - 1) - 1;

//   // x is the length of the arrow
//   // Length 0 is the best match, 2 is worst match
//   const x = Math.abs(userInput - jobExtent);

//   // Final job score match in range 0 - 10
//   const score = 10 - 5 * x;
//   return score;
// }

function average(scores) {
  const sum = scores.reduce((acc, current) => acc + current, 0);
  return sum / scores.length;
}

// Function to return the top 3 matches

function sortMatches(scores) {
  return scores.sort((a, b) => b.score - a.score);
}

// I would call this the product algorithm 

function matchingJobsExtent(userInput, jobExtent) {
  // TODO: convert userInput into -1 to 1 scale
  userInput = ((userInput - 1) * 2) / (5 - 1) - 1;
  return (userInput * jobExtent + 1) * 5;
}

function matchingSalaryRange(userSalary, salaryRange) {
    if (userSalary <= salaryRange.low) {
        return 10
    } 
    else if (userSalary <= salaryRange.medium) {
        return 7.5
    }
    else if (userSalary <= salaryRange.high) {
        return 5
    }
    else {
        return 0
    }
}