
const pointSort = (a, b) => b.points - a.points;

const goalScoredSort = (a,b) => b.goalsFor - a.goalsFor;

const goalDiffSort = (a,b) => (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);

const rankCalcs = {
	pointSort:pointSort,
	goalScoredSort:goalScored,
	goalDiffSort:goalDiffSort
};

export default rankCalcs;