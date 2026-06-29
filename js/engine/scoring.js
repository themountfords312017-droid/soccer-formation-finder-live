// Upgraded scoring engine with 8 detailed categories
export function calculateScores(answers) {
  const formationsList = ['4-4-2', '4-2-3-1', '4-3-3', '4-1-4-1', '3-5-2', '5-3-2', '3-4-3', '4-3-1-2', '4-5-1'];

  // Base scores (0 - 100) for each formation across the 8 categories
  const baseCategories = {
    '4-4-2': {
      defensive: 75,
      midfield: 45,
      wide: 75,
      pressing: 60,
      counter: 80,
      simplicity: 95,
      training: 95,
      clarity: 90
    },
    '4-2-3-1': {
      defensive: 85,
      midfield: 80,
      wide: 80,
      pressing: 75,
      counter: 75,
      simplicity: 75,
      training: 70,
      clarity: 75
    },
    '4-3-3': {
      defensive: 65,
      midfield: 85,
      wide: 90,
      pressing: 90,
      counter: 70,
      simplicity: 60,
      training: 55,
      clarity: 70
    },
    '4-1-4-1': {
      defensive: 90,
      midfield: 85,
      wide: 60,
      pressing: 65,
      counter: 70,
      simplicity: 75,
      training: 70,
      clarity: 75
    },
    '3-5-2': {
      defensive: 80,
      midfield: 90,
      wide: 70,
      pressing: 70,
      counter: 80,
      simplicity: 50,
      training: 45,
      clarity: 60
    },
    '5-3-2': {
      defensive: 95,
      midfield: 75,
      wide: 65,
      pressing: 50,
      counter: 90,
      simplicity: 70,
      training: 65,
      clarity: 75
    },
    '3-4-3': {
      defensive: 55,
      midfield: 60,
      wide: 95,
      pressing: 95,
      counter: 75,
      simplicity: 40,
      training: 35,
      clarity: 50
    },
    '4-3-1-2': {
      defensive: 70,
      midfield: 85,
      wide: 45,
      pressing: 70,
      counter: 75,
      simplicity: 60,
      training: 55,
      clarity: 65
    },
    '4-5-1': {
      defensive: 95,
      midfield: 80,
      wide: 55,
      pressing: 45,
      counter: 85,
      simplicity: 85,
      training: 85,
      clarity: 80
    }
  };

  // Clone base categories to apply personalized squad modifiers
  const categories = {};
  formationsList.forEach(id => {
    categories[id] = { ...baseCategories[id] };
  });

  // Helper to adjust a specific category score
  const adjustCategory = (id, category, value) => {
    if (categories[id]) {
      categories[id][category] = Math.min(100, Math.max(0, categories[id][category] + value));
    }
  };

  // --- SQUAD MODIFIERS ---

  // --- INPUT VARIABLES ---
  const cbs = answers.reliable_center_backs;
  const cbPace = answers.cb_pace_comfort;
  const fbFit = answers.fullback_fitness;
  const strikers = answers.reliable_strikers;
  const wingers = answers.natural_wingers;
  const cmStr = answers.central_midfield_strength;
  const holdMid = answers.holding_midfielder;
  const creative10 = answers.creative_10;
  const freq = answers.training_frequency;
  const level = answers.player_tactical_level;
  const defStyle = answers.defensive_style;
  const posStyle = answers.possession_style;
  const priority = answers.top_priority;
  if (cbs === '1') {
    // Heavy defense hit to back-3/5
    ['3-5-2', '5-3-2', '3-4-3'].forEach(id => {
      adjustCategory(id, 'defensive', -40);
      adjustCategory(id, 'clarity', -20);
    });
  } else if (cbs === '2') {
    ['3-5-2', '5-3-2', '3-4-3'].forEach(id => {
      adjustCategory(id, 'defensive', -20);
      adjustCategory(id, 'clarity', -10);
    });
  } else if (cbs === '3' || cbs === '4-plus') {
    ['3-5-2', '5-3-2', '3-4-3'].forEach(id => {
      adjustCategory(id, 'defensive', 10);
    });
  }

  // 2. CB Pace
  if (cbPace === 'no') {
    // Penalize defensive security of high line setups
    adjustCategory('4-3-3', 'defensive', -15);
    adjustCategory('3-4-3', 'defensive', -20);
    adjustCategory('3-5-2', 'defensive', -12);
  } else if (cbPace === 'yes') {
    adjustCategory('4-3-3', 'defensive', 5);
    adjustCategory('3-4-3', 'defensive', 5);
  }

  // 3. Fullback fitness
  if (fbFit === 'no') {
    // Penalize wide systems and defensive security of systems reliant on wingbacks
    ['3-5-2', '3-4-3', '5-3-2'].forEach(id => {
      adjustCategory(id, 'wide', -30);
      adjustCategory(id, 'defensive', -15);
    });
    adjustCategory('4-3-3', 'wide', -15);
  } else if (fbFit === 'yes-both') {
    ['3-5-2', '3-4-3', '5-3-2'].forEach(id => {
      adjustCategory(id, 'wide', 10);
    });
    adjustCategory('4-3-3', 'wide', 10);
  }

  // 4. Reliable Strikers
  if (strikers === '1') {
    // Lone strikers favor single forward setups
    ['4-2-3-1', '4-3-3', '4-1-4-1', '4-5-1'].forEach(id => {
      adjustCategory(id, 'counter', 8);
      adjustCategory(id, 'clarity', 5);
    });
    ['4-4-2', '3-5-2', '5-3-2', '4-3-1-2'].forEach(id => {
      adjustCategory(id, 'counter', -15);
      adjustCategory(id, 'clarity', -10);
    });
  } else if (strikers === '2' || strikers === '3-plus') {
    // Double striker setups favor two-forward systems
    ['4-4-2', '3-5-2', '5-3-2', '4-3-1-2'].forEach(id => {
      adjustCategory(id, 'counter', 10);
      adjustCategory(id, 'clarity', 10);
    });
    ['4-2-3-1', '4-3-3', '4-1-4-1', '4-5-1'].forEach(id => {
      adjustCategory(id, 'counter', -10);
    });
  }

  // 5. Natural Wingers
  if (wingers === 'no-wingers') {
    // Narrow setups get a boost, wide ones get penalized
    adjustCategory('4-3-1-2', 'wide', 15);
    adjustCategory('4-4-2', 'wide', 5);
    adjustCategory('4-3-3', 'wide', -30);
    adjustCategory('3-4-3', 'wide', -25);
  } else if (wingers === 'yes-both') {
    adjustCategory('4-3-3', 'wide', 10);
    adjustCategory('3-4-3', 'wide', 10);
  }

  // 6. Central Midfield Strength
  if (cmStr === 'weak') {
    ['4-3-3', '3-5-2', '4-3-1-2'].forEach(id => {
      adjustCategory(id, 'midfield', -25);
      adjustCategory(id, 'defensive', -15);
    });
  } else if (cmStr === 'very-strong') {
    ['4-3-3', '3-5-2', '4-2-3-1', '4-1-4-1', '4-3-1-2'].forEach(id => {
      adjustCategory(id, 'midfield', 10);
    });
  }

  // 7. Holding Midfielder
  if (holdMid === 'no') {
    // Penalize defensive structure of single-pivot setups
    adjustCategory('4-1-4-1', 'defensive', -25);
    adjustCategory('4-3-3', 'defensive', -15);
  } else if (holdMid === 'yes') {
    adjustCategory('4-1-4-1', 'defensive', 10);
    adjustCategory('4-3-3', 'defensive', 8);
  }

  // 8. Creative 10
  if (creative10 === 'no') {
    adjustCategory('4-2-3-1', 'midfield', -10);
    adjustCategory('4-3-1-2', 'midfield', -15);
  } else if (creative10 === 'yes') {
    adjustCategory('4-2-3-1', 'midfield', 10);
    adjustCategory('4-3-1-2', 'midfield', 10);
  }

  // 9. Team Problems
  const problems = answers.team_problems || [];
  if (problems.includes('concede_too_many')) {
    ['4-2-3-1', '4-1-4-1', '4-5-1', '5-3-2'].forEach(id => adjustCategory(id, 'defensive', 12));
  }
  if (problems.includes('counterattacked_easily')) {
    // Conceding counters boosts defensive/midfield rating of rest defense setups
    ['4-2-3-1', '4-1-4-1', '4-5-1', '5-3-2'].forEach(id => {
      adjustCategory(id, 'defensive', 15);
      adjustCategory(id, 'midfield', 5);
    });
  }
  if (problems.includes('striker_isolated')) {
    // Isolated strikers favor double strikers/CAM
    ['4-4-2', '3-5-2', '5-3-2', '4-3-1-2', '4-2-3-1'].forEach(id => {
      adjustCategory(id, 'counter', 15);
      adjustCategory(id, 'clarity', 10);
    });
  }
  if (problems.includes('lose_midfield_battle')) {
    // Boost 3-midfielder setups
    ['4-3-3', '4-2-3-1', '4-1-4-1', '3-5-2', '5-3-2', '4-3-1-2', '4-5-1'].forEach(id => {
      adjustCategory(id, 'midfield', 15);
    });
    adjustCategory('4-4-2', 'midfield', -15);
  }
  if (problems.includes('lack_width')) {
    ['4-3-3', '4-2-3-1', '3-4-3'].forEach(id => adjustCategory(id, 'wide', 12));
  }
  if (problems.includes('exposed_wide') || problems.includes('fullbacks_overloaded')) {
    ['5-3-2', '3-5-2', '4-1-4-1', '4-4-2'].forEach(id => adjustCategory(id, 'defensive', 10));
  }
  if (problems.includes('struggle_build_from_back') || problems.includes('give_ball_away')) {
    ['4-4-2', '4-5-1'].forEach(id => adjustCategory(id, 'simplicity', 10));
  }
  if (problems.includes('not_enough_chances')) {
    ['4-3-3', '3-4-3', '4-2-3-1'].forEach(id => adjustCategory(id, 'counter', 10));
  }
  if (problems.includes('cannot_press')) {
    ['4-4-2', '4-5-1', '5-3-2'].forEach(id => adjustCategory(id, 'simplicity', 10));
  }
  if (problems.includes('too_stretched')) {
    ['4-1-4-1', '4-5-1', '5-3-2'].forEach(id => adjustCategory(id, 'defensive', 12));
  }
  if (problems.includes('dont_understand_roles')) {
    ['4-4-2', '4-5-1'].forEach(id => adjustCategory(id, 'clarity', 15));
    ['3-4-3', '3-5-2'].forEach(id => adjustCategory(id, 'clarity', -15));
  }

  // 10. Team Strengths
  const strengths = answers.team_strengths || [];
  if (strengths.includes('pace_wide')) {
    ['4-3-3', '3-4-3', '4-2-3-1'].forEach(id => adjustCategory(id, 'wide', 10));
  }
  if (strengths.includes('strong_central_midfield')) {
    ['4-3-3', '3-5-2', '4-1-4-1', '4-2-3-1', '4-3-1-2'].forEach(id => adjustCategory(id, 'midfield', 10));
  }
  if (strengths.includes('good_defenders')) {
    ['5-3-2', '3-5-2', '4-1-4-1'].forEach(id => adjustCategory(id, 'defensive', 10));
  }
  if (strengths.includes('physical_players')) {
    ['4-4-2', '5-3-2', '4-5-1'].forEach(id => adjustCategory(id, 'defensive', 8));
  }
  if (strengths.includes('technical_players')) {
    ['4-3-3', '4-2-3-1', '4-3-1-2'].forEach(id => adjustCategory(id, 'midfield', 8));
  }
  if (strengths.includes('hard_working')) {
    ['4-4-2', '4-5-1', '3-5-2'].forEach(id => adjustCategory(id, 'pressing', 8));
  }
  if (strengths.includes('good_attacking')) {
    ['4-3-3', '3-4-3', '4-2-3-1'].forEach(id => adjustCategory(id, 'counter', 8));
  }
  if (strengths.includes('good_target_striker')) {
    ['4-2-3-1', '4-5-1', '4-1-4-1'].forEach(id => adjustCategory(id, 'counter', 10));
  }
  if (strengths.includes('two_good_forwards')) {
    ['4-4-2', '3-5-2', '4-3-1-2'].forEach(id => adjustCategory(id, 'counter', 10));
  }
  if (strengths.includes('understand_tactics')) {
    ['4-3-3', '3-5-2', '3-4-3'].forEach(id => adjustCategory(id, 'clarity', 8));
  }
  if (strengths.includes('strong_fitness')) {
    ['4-3-3', '3-5-2', '3-4-3'].forEach(id => adjustCategory(id, 'pressing', 10));
  }
  if (strengths.includes('good_counter')) {
    ['4-4-2', '5-3-2', '4-5-1', '4-2-3-1'].forEach(id => adjustCategory(id, 'counter', 10));
  }
  if (strengths.includes('good_possession')) {
    ['4-3-3', '4-2-3-1', '4-3-1-2'].forEach(id => adjustCategory(id, 'midfield', 10));
  }

  // 11. Conditional Rules & Overrides
  const isLowTraining = freq === 'less-than-once' || level === 'beginner' || answers.coaching_time === 'very-little';
  if (defStyle === 'high-press' && isLowTraining) {
    ['4-3-3', '3-4-3'].forEach(id => {
      adjustCategory(id, 'pressing', -25);
      adjustCategory(id, 'defensive', -15);
    });
  }
  if (wingers === 'no-wingers' && fbFit === 'yes-both') {
    adjustCategory('4-3-3', 'wide', 15);
  }
  if (holdMid === 'no' && cmStr === 'weak') {
    adjustCategory('4-3-3', 'defensive', -15);
    adjustCategory('4-3-3', 'midfield', -15);
  }
  if (isLowTraining) {
    ['4-4-2', '4-5-1'].forEach(id => {
      adjustCategory(id, 'simplicity', 20);
      adjustCategory(id, 'training', 20);
    });
    ['3-5-2', '3-4-3', '4-3-1-2'].forEach(id => {
      adjustCategory(id, 'simplicity', -20);
      adjustCategory(id, 'training', -20);
    });
  }

  // --- COACHING WEIGHTS & PRIORITIES ---

  // Default weights (all equal)
  const weights = {
    defensive: 1.0,
    midfield: 1.0,
    wide: 1.0,
    pressing: 1.0,
    counter: 1.0,
    simplicity: 1.0,
    training: 1.0,
    clarity: 1.0
  };

  // Map of selected priority categories to highlight in results later
  const userPriorities = [];

  // Top Priority
  if (priority === 'harder-to-beat') {
    weights.defensive += 2.0;
    weights.simplicity += 1.0;
    userPriorities.push('defensive', 'simplicity');
  } else if (priority === 'create-chances') {
    weights.wide += 1.2;
    weights.counter += 1.2;
    weights.pressing += 0.8;
    userPriorities.push('wide', 'counter');
  } else if (priority === 'control-midfield') {
    weights.midfield += 2.5;
    userPriorities.push('midfield');
  } else if (priority === 'protect-defense') {
    weights.defensive += 2.5;
    userPriorities.push('defensive');
  } else if (priority === 'use-wide') {
    weights.wide += 2.5;
    userPriorities.push('wide');
  } else if (priority === 'two-forwards') {
    weights.counter += 1.5;
    weights.simplicity += 1.0;
    userPriorities.push('counter', 'simplicity');
  } else if (priority === 'improve-pressing') {
    weights.pressing += 2.5;
    userPriorities.push('pressing');
  } else if (priority === 'stop-counters') {
    weights.defensive += 2.0;
    userPriorities.push('defensive');
  } else if (priority === 'clear-identity') {
    weights.clarity += 2.0;
    weights.simplicity += 1.0;
    userPriorities.push('clarity', 'simplicity');
  }

  // Defensive Style
  if (defStyle === 'high-press') {
    weights.pressing += 1.5;
    if (!userPriorities.includes('pressing')) userPriorities.push('pressing');
  } else if (defStyle === 'low-block') {
    weights.defensive += 1.5;
    weights.counter += 1.0;
    if (!userPriorities.includes('defensive')) userPriorities.push('defensive');
  } else if (defStyle === 'compact-difficult') {
    weights.defensive += 1.5;
    if (!userPriorities.includes('defensive')) userPriorities.push('defensive');
  }

  // Possession Style
  if (posStyle === 'build-back') {
    weights.midfield += 1.0;
    weights.clarity += 1.0;
  } else if (posStyle === 'through-midfield') {
    weights.midfield += 1.5;
    if (!userPriorities.includes('midfield')) userPriorities.push('midfield');
  } else if (posStyle === 'wide-crosses') {
    weights.wide += 1.5;
    if (!userPriorities.includes('wide')) userPriorities.push('wide');
  } else if (posStyle === 'counter-quick') {
    weights.counter += 2.0;
    if (!userPriorities.includes('counter')) userPriorities.push('counter');
  } else if (posStyle === 'simple-balanced') {
    weights.simplicity += 1.5;
    if (!userPriorities.includes('simplicity')) userPriorities.push('simplicity');
  }

  // Environmental Bottlenecks (Training and player tactical level)

  if (freq === 'less-than-once' || level === 'beginner') {
    // Simplicity and training efficiency are massive bottlenecks
    weights.simplicity += 2.0;
    weights.training += 2.0;
    weights.clarity += 1.5;
    if (!userPriorities.includes('simplicity')) userPriorities.push('simplicity');
    if (!userPriorities.includes('training')) userPriorities.push('training');
  } else if (freq === 'once-week' || level === 'mixed-ability') {
    weights.simplicity += 1.0;
    weights.training += 1.0;
  }

  // If they have very little detail threshold
  if (answers.tactical_detail_level === 'very-little') {
    weights.simplicity += 1.5;
    weights.clarity += 1.5;
  }

  // Ensure we have at least 2 default priorities flagged if empty
  if (userPriorities.length === 0) {
    userPriorities.push('defensive', 'simplicity');
  }

  // Limit priorities to top 3 for clean visual layout
  const topPriorities = userPriorities.slice(0, 3);


  // --- CALCULATE FINAL WEIGHTED AVERAGE FOR EACH FORMATION ---

  const rawWeightedScores = {};
  formationsList.forEach(id => {
    let weightedSum = 0;
    let weightSum = 0;
    
    for (const [cat, score] of Object.entries(categories[id])) {
      const w = weights[cat] || 1.0;
      weightedSum += score * w;
      weightSum += w;
    }
    
    rawWeightedScores[id] = weightedSum / weightSum;
  });

  // Normalize scores into percentages (scaled 55% - 99%)
  const rawValues = Object.values(rawWeightedScores);
  const minRaw = Math.min(...rawValues);
  const maxRaw = Math.max(...rawValues);

  const rankings = [];
  formationsList.forEach(id => {
    let percentage = 50;
    if (maxRaw > minRaw) {
      percentage = Math.round(((rawWeightedScores[id] - minRaw) / (maxRaw - minRaw)) * 40 + 55);
    }
    percentage = Math.min(99, Math.max(25, percentage));
    rankings.push({
      id,
      score: percentage,
      rawScore: rawWeightedScores[id],
      categories: categories[id] // Include personalized categories scores for charting
    });
  });

  // Sort descending
  rankings.sort((a, b) => b.score - a.score);

  const recommended = { id: rankings[0].id, score: rankings[0].score };
  const alternative = { id: rankings[1].id, score: rankings[1].score };

  // Determine system to avoid (usually lowest, but check CB rules)
  let avoidId = rankings[rankings.length - 1].id;
  if (cbs === '1' || cbs === '2') {
    const back3 = rankings.filter(r => ['3-5-2', '5-3-2', '3-4-3'].includes(r.id));
    if (back3.length > 0) {
      avoidId = back3[back3.length - 1].id;
    }
  }

  return {
    rankings,
    recommended,
    alternative,
    avoid: { id: avoidId, score: rankings.find(r => r.id === avoidId).score },
    topPriorities // Pass top priorities along to rendering engine
  };
}
