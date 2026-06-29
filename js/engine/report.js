import { FORMATIONS, getFormation } from '../data/formations.js';

export function generateReport(answers, scoreResult) {
  const recommendedId = scoreResult.recommended.id;
  const recommendedScore = scoreResult.recommended.score;
  const alternativeId = scoreResult.alternative.id;
  const alternativeScore = scoreResult.alternative.score;
  const avoidId = scoreResult.avoid.id;
  const avoidScore = scoreResult.avoid.score;

  const recFormation = getFormation(recommendedId);
  const altFormation = getFormation(alternativeId);
  const avFormation = getFormation(avoidId);

  // Map of category keys to user-facing labels
  const categoryLabels = {
    defensive: 'Defensive Security',
    midfield: 'Midfield Control',
    wide: 'Wide Threat',
    pressing: 'Pressing Suitability',
    counter: 'Counterattack Suitability',
    simplicity: 'Simplicity',
    training: 'Training-Time Suitability',
    clarity: 'Player-Role Clarity'
  };

  // Convert topPriority keys to user-friendly text
  const priorityTexts = scoreResult.topPriorities.map(key => categoryLabels[key] || key);
  
  // Custom priority description string
  let prioritySummary = `Your answers suggest that **${priorityTexts.join(' and ')}** are your biggest priorities. `;
  
  // Add customized formation fit description based on recommended
  if (recommendedId === '4-2-3-1') {
    prioritySummary += `The 4-2-3-1 scored highly because it gives you a double pivot in front of the back four, protects central spaces, and still allows attacking support through the number 10 and wide players.`;
  } else if (recommendedId === '4-4-2') {
    prioritySummary += `The 4-4-2 scored highly because it keeps player roles extremely simple, builds clear partnerships across the pitch, and covers the width of the field with minimal training time.`;
  } else if (recommendedId === '4-3-3') {
    prioritySummary += `The 4-3-3 scored highly because it creates natural triangles for midfield possession, unlocks dynamic 1v1 wide forwards, and provides an aggressive structure to press high up the pitch.`;
  } else if (recommendedId === '4-1-4-1') {
    prioritySummary += `The 4-1-4-1 scored highly because it sets up a single pivot screen to protect the center backs, compresses the distance between midfield lines, and keeps the shape compact.`;
  } else if (recommendedId === '3-5-2') {
    prioritySummary += `The 3-5-2 scored highly because it creates an immediate overload in central midfield, secures the defensive box with three center backs, and maintains a dangerous two-striker threat.`;
  } else if (recommendedId === '5-3-2') {
    prioritySummary += `The 5-3-2 scored highly because it sets up a concrete back-five block to protect the penalty area, remains narrow to block the middle, and transitions rapidly into counterattacks.`;
  } else if (recommendedId === '3-4-3') {
    prioritySummary += `The 3-4-3 scored highly because it overloads the final third with five attackers, provides a coordinated structure for high pressing, and dominates wide areas.`;
  } else if (recommendedId === '4-3-1-2') {
    prioritySummary += `The 4-3-1-2 scored highly because it packs the central midfield with a diamond overload, features a creative playmaker, and keeps two strikers on the field.`;
  } else if (recommendedId === '4-5-1') {
    prioritySummary += `The 4-5-1 scored highly because it establishes a flat bank of five midfielders that blocks passing channels, makes the team hard to beat, and creates low-risk counter chances.`;
  } else {
    prioritySummary += `The ${recommendedId} matches your squad priorities, offering structural protection and optimizing your key players' strengths.`;
  }

  // 1. Build recommended formation personalized "why" paragraph
  let whyText = `Based on your answers, the ${recommendedId} is the optimal formation to structure your squad. `;
  
  // Add squad size / center back commentary
  if (answers.reliable_center_backs === '3' || answers.reliable_center_backs === '4-plus') {
    if (['3-5-2', '5-3-2', '3-4-3'].includes(recommendedId)) {
      whyText += `Your squad profile indicates you have a good selection of center backs (${answers.reliable_center_backs} reliable defenders), making a three-at-the-back system highly secure and effective. `;
    }
  } else if (answers.reliable_center_backs === '2') {
    if (!['3-5-2', '5-3-2', '3-4-3'].includes(recommendedId)) {
      whyText += `Since you have only two reliable center backs, keeping a four-at-the-back line ensures your defensive core remains stable without overstretching your coverage. `;
    }
  }

  // Add striker count commentary
  if (answers.reliable_strikers === '2' && ['4-4-2', '3-5-2', '5-3-2', '4-3-1-2'].includes(recommendedId)) {
    whyText += `Having two reliable forwards allows you to play with a strike partnership, placing constant pressure on opponent center backs without isolating a lone attacker. `;
  } else if (answers.reliable_strikers === '1' && ['4-2-3-1', '4-3-3', '4-1-4-1', '4-5-1'].includes(recommendedId)) {
    whyText += `With one main striker available, this formation maximizes their presence by surrounding them with supportive wide players and central midfielders. `;
  }

  // Add training/detail constraints commentary
  if (answers.training_frequency === 'less-than-once' || answers.player_tactical_level === 'beginner') {
    whyText += `Given your limited training time and developing players, this system is chosen for its structural simplicity, clear individual roles, and ease of implementation during matches. `;
  } else if (answers.training_frequency === 'three-plus-week' && answers.player_tactical_level === 'advanced-amateur') {
    whyText += `Since your team trains frequently and possesses advanced understanding, this layout allows you to execute more complex tactical rotations and fluid transitions. `;
  }

  // Add problem-solving commentary
  const problems = answers.team_problems || [];
  if (problems.includes('concede_too_many') || problems.includes('too_stretched')) {
    if (['4-2-3-1', '4-1-4-1', '4-5-1', '5-3-2'].includes(recommendedId)) {
      whyText += `To address your concern of conceding goals and becoming stretched, this system provides compact central layers that shield your defense and choke the opponent's passing channels. `;
    }
  }
  if (problems.includes('lose_midfield_battle')) {
    if (['4-3-3', '4-2-3-1', '3-5-2', '4-1-4-1'].includes(recommendedId)) {
      whyText += `Additionally, it deploys three central midfielders to combat your issue of losing the midfield battle, giving you numbers to control tempo and recover second balls. `;
    }
  }

  // Fallback sentence if paragraph is too short
  if (whyText.split('.').length < 3) {
    whyText += `This setup matches your preferred tactical choices and leverages your squad's strongest units while minimizing structural vulnerability.`;
  }

  // 2. Build alternative formation explanation
  let altText = `The ${alternativeId} serves as an excellent alternative system. `;
  if (alternativeId === '4-4-2') {
    altText += `It can be deployed when you want to simplify player roles, get two forwards high on the pitch, or pivot to direct wide play.`;
  } else if (alternativeId === '4-2-3-1') {
    altText += `It is a great option if you need to gain central midfield security with a double pivot while keeping wide outlets and a playmaker active.`;
  } else if (alternativeId === '4-3-3') {
    altText += `It offers an alternative when you want to press higher up the field and exploit wide channels with wing forwards.`;
  } else if (alternativeId === '5-3-2' || alternativeId === '4-5-1') {
    altText += `Use it as a defensive adjustment against stronger opponents, ensuring you remain compact and hard to break down.`;
  } else {
    altText += `It matches key parts of your squad profile and can be used to adapt your setup based on match requirements or opponent structures.`;
  }

  // 3. Build avoid formation explanation
  let avoidText = `You should avoid the ${avoidId} for now. `;
  if (['3-4-3', '3-5-2', '5-3-2'].includes(avoidId) && (answers.reliable_center_backs === '1' || answers.reliable_center_backs === '2')) {
    avoidText += `This system relies heavily on having three reliable central defenders. With only ${answers.reliable_center_backs} in your squad, deploying this system will leave your defensive flanks exposed and place dangerous workloads on your center backs.`;
  } else if (avoidId === '3-4-3') {
    avoidText += `The 3-4-3 is a highly aggressive, tactically demanding system. Without high fitness levels, pacey center backs, and plenty of training time, it risks getting heavily overrun in midfield and counterattacked down the channels.`;
  } else if (avoidId === '4-3-1-2' && answers.natural_wingers === 'yes-both') {
    avoidText += `This formation is highly narrow and does not utilize wide wingers. Since you have strong natural wingers in your squad, this setup would waste their pace and crossing abilities.`;
  } else if (answers.training_frequency === 'less-than-once' || answers.player_tactical_level === 'beginner') {
    avoidText += `This system is too complex and fluid for a squad with limited training time and developing tactical understanding. It risks confusing players and leading to structural breakdown during matches.`;
  } else {
    avoidText += `This formation represents a poor fit for your squad strengths, and would exacerbate your current recurring team problems.`;
  }

  // 4. Generate Game Model statements
  const gameModel = {
    inPossession: '',
    outOfPossession: '',
    winBall: '',
    loseBall: ''
  };

  const possessionStyle = answers.possession_style;
  const defensiveStyle = answers.defensive_style;

  // In possession
  if (possessionStyle === 'build-back') {
    gameModel.inPossession = 'Build patiently from the back, utilizing short passes between center backs and midfielders to find passing lanes into advanced players.';
  } else if (possessionStyle === 'through-midfield') {
    gameModel.inPossession = 'Control the center of the pitch, combining through central midfield triangles to overload the opponent and feed forwards.';
  } else if (possessionStyle === 'wide-crosses') {
    gameModel.inPossession = 'Circulate the ball to wide areas quickly, using overlapping runs from fullbacks to deliver crosses to our targets inside the box.';
  } else if (possessionStyle === 'direct-forwards') {
    gameModel.inPossession = 'Play direct vertical passes into our target forwards, bypassing the opponent press and supporting second balls quickly.';
  } else if (possessionStyle === 'counter-quick') {
    gameModel.inPossession = 'Absorb pressure in our block and quickly launch forward passes into wide spaces or deep runs the moment we recover the ball.';
  } else {
    gameModel.inPossession = 'Maintain simple, balanced positioning, circulating the ball safely and taking low-risk attacking opportunities.';
  }

  // Out of possession
  if (defensiveStyle === 'high-press') {
    gameModel.outOfPossession = 'Press the opponent high in their own third, with our front line coordinating pressure on the center backs to force turnovers.';
  } else if (defensiveStyle === 'mid-block') {
    gameModel.outOfPossession = 'Establish a compact mid-block in the middle third, compressing the space between lines and forcing the opponent to play wide.';
  } else if (defensiveStyle === 'low-block') {
    gameModel.outOfPossession = 'Drop into a compact low-block inside our own half, protecting the box, blocking shots, and denying space in behind.';
  } else if (defensiveStyle === 'compact-difficult') {
    gameModel.outOfPossession = 'Stay narrow and vertically compact, prioritizing defensive structure over ball pressure to remain hard to beat.';
  } else if (defensiveStyle === 'press-triggers') {
    gameModel.outOfPossession = 'Maintain a stable mid-block, but press aggressively the moment the opponent plays a slow pass or takes a poor touch.';
  } else {
    gameModel.outOfPossession = 'Recover quickly behind the ball, keeping defensive lines compact and forcing the opponent into low-value wide actions.';
  }

  // Win ball
  if (possessionStyle === 'counter-quick' || defensiveStyle === 'low-block') {
    gameModel.winBall = 'Look for immediate forward passes into the opponent\'s half before their defenders can organize their rest defense.';
  } else {
    gameModel.winBall = 'Play a secure first pass out of pressure to establish possession and transition cleanly into our attacking shape.';
  }

  // Lose ball
  if (defensiveStyle === 'high-press') {
    gameModel.loseBall = 'Counterpress aggressively for 3-5 seconds to win the ball back immediately or force a rushed, inaccurate clearance.';
  } else {
    gameModel.loseBall = 'Drop off immediately, delaying the opponent\'s advance while our players sprint back into their defensive structure.';
  }

  // Extract top 3 matches for visual comparison chart
  const top3Rankings = scoreResult.rankings.slice(0, 3).map(rank => {
    return {
      id: rank.id,
      name: rank.id,
      score: rank.score,
      categories: rank.categories
    };
  });

  return {
    recommended: {
      formation: recFormation,
      score: recommendedScore,
      whyText: whyText,
      prioritySummary: prioritySummary, // Upgraded priority explanation
      teamShape: {
        inPossession: recFormation.inPossession,
        outOfPossession: recFormation.outOfPossession,
        winBall: recFormation.winBall,
        loseBall: recFormation.loseBall
      },
      keyRoles: Object.values(recFormation.keyRoles),
      tacticalPriorities: recFormation.tacticalPriorities,
      trainingFocus: recFormation.trainingFocus,
      matchDayCoachingPoints: recFormation.matchDayCoachingPoints
    },
    alternative: {
      formation: altFormation,
      score: alternativeScore,
      whyText: altText
    },
    avoid: {
      formation: avFormation,
      score: avoidScore,
      whyText: avoidText
    },
    gameModel: gameModel,
    top3Rankings: top3Rankings, // Attach top 3 for charting
    topPriorities: scoreResult.topPriorities, // Attach priority keys
    categoryLabels: categoryLabels // Labels map helper
  };
}
