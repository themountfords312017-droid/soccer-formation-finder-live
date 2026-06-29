export const SECTIONS = [
  {
    id: 'context',
    title: 'Coach & Team Context',
    description: 'Tell us about your team and environment.',
    icon: '🏟️',
    questions: [
      {
        id: 'coaching_level',
        text: 'What level do you coach?',
        type: 'single',
        options: [
          { value: 'u13-u15', label: 'U13–U15 youth' },
          { value: 'u16-u19', label: 'U16–U19 youth' },
          { value: 'high-school', label: 'High school' },
          { value: 'college-club', label: 'College club' },
          { value: 'adult-amateur', label: 'Adult amateur' },
          { value: 'mens', label: "Men's team" },
          { value: 'womens', label: "Women's team" },
          { value: 'other', label: 'Other full-sided team' }
        ]
      },
      {
        id: 'coach_experience',
        text: 'How experienced are you as a coach?',
        type: 'single',
        options: [
          { value: 'new-coach', label: 'New coach' },
          { value: '1-2-years', label: '1–2 years' },
          { value: '3-5-years', label: '3–5 years' },
          { value: '5-plus-years', label: '5+ years' },
          { value: 'experienced-structure', label: 'Experienced but want more tactical structure' }
        ]
      },
      {
        id: 'training_frequency',
        text: 'How often does your team train?',
        type: 'single',
        options: [
          { value: 'less-than-once', label: 'Less than once per week' },
          { value: 'once-week', label: 'Once per week' },
          { value: 'twice-week', label: 'Twice per week' },
          { value: 'three-plus-week', label: 'Three or more times per week' }
        ]
      },
      {
        id: 'player_tactical_level',
        text: 'How tactically experienced are your players?',
        type: 'single',
        options: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'mixed-ability', label: 'Mixed ability' },
          { value: 'average-grassroots', label: 'Average grassroots level' },
          { value: 'good-understanding', label: 'Good tactical understanding' },
          { value: 'advanced-amateur', label: 'Advanced amateur level' }
        ]
      }
    ]
  },
  {
    id: 'squad',
    title: 'Squad Profile',
    description: 'Help us map your players\' strengths and positions.',
    icon: '👥',
    questions: [
      {
        id: 'strongest_unit',
        text: 'What is your strongest unit?',
        type: 'single',
        options: [
          { value: 'goalkeeper', label: 'Goalkeeper' },
          { value: 'defense', label: 'Defense' },
          { value: 'midfield', label: 'Midfield' },
          { value: 'wide-players', label: 'Wide players' },
          { value: 'forwards', label: 'Forwards' },
          { value: 'none', label: 'No clear strongest unit' }
        ]
      },
      {
        id: 'weakest_unit',
        text: 'What is your weakest unit?',
        type: 'single',
        options: [
          { value: 'goalkeeper', label: 'Goalkeeper' },
          { value: 'defense', label: 'Defense' },
          { value: 'midfield', label: 'Midfield' },
          { value: 'wide-players', label: 'Wide players' },
          { value: 'forwards', label: 'Forwards' },
          { value: 'none', label: 'No clear weakest unit' }
        ]
      },
      {
        id: 'reliable_center_backs',
        text: 'How many reliable center backs do you have?',
        type: 'single',
        options: [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4-plus', label: '4+' }
        ]
      },
      {
        id: 'cb_pace_comfort',
        text: 'Do your center backs have pace and comfort defending space?',
        type: 'single',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'somewhat', label: 'Somewhat' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'fullback_fitness',
        text: 'Do your fullbacks/wingbacks have the fitness to attack and recover?',
        type: 'single',
        options: [
          { value: 'yes-both', label: 'Yes, both sides' },
          { value: 'one-side', label: 'Only one side' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'central_midfield_strength',
        text: 'How strong is your central midfield?',
        type: 'single',
        options: [
          { value: 'very-strong', label: 'Very strong' },
          { value: 'good', label: 'Good' },
          { value: 'average', label: 'Average' },
          { value: 'weak', label: 'Weak' },
          { value: 'physical-not-technical', label: 'Physically strong but not technical' },
          { value: 'technical-not-athletic', label: 'Technical but not athletic' }
        ]
      },
      {
        id: 'holding_midfielder',
        text: 'Do you have a natural holding midfielder who protects the defense?',
        type: 'single',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'maybe', label: 'Maybe' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'creative_10',
        text: 'Do you have a creative number 10 type player?',
        type: 'single',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'maybe', label: 'Maybe' },
          { value: 'no', label: 'No' }
        ]
      },
      {
        id: 'natural_wingers',
        text: 'Do you have natural wingers?',
        type: 'single',
        options: [
          { value: 'yes-both', label: 'Yes, both sides' },
          { value: 'one-strong', label: 'One strong winger' },
          { value: 'inconsistent', label: 'Wide players but inconsistent' },
          { value: 'no-wingers', label: 'No natural wingers' }
        ]
      },
      {
        id: 'reliable_strikers',
        text: 'How many reliable strikers do you have?',
        type: 'single',
        options: [
          { value: '0', label: '0' },
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3-plus', label: '3+' }
        ]
      }
    ]
  },
  {
    id: 'strengths',
    title: 'Team Strengths',
    description: 'Select up to 3 strengths of your squad.',
    icon: '💪',
    questions: [
      {
        id: 'team_strengths',
        text: 'What are your team\'s main strengths? (Select up to 3)',
        type: 'multi',
        maxSelections: 3,
        options: [
          { value: 'pace_wide', label: 'Pace in wide areas' },
          { value: 'strong_central_midfield', label: 'Strong central midfield' },
          { value: 'good_defenders', label: 'Good defenders' },
          { value: 'good_goalkeeper', label: 'Good goalkeeper' },
          { value: 'physical_players', label: 'Physical players' },
          { value: 'technical_players', label: 'Technical players' },
          { value: 'hard_working', label: 'Hard-working players' },
          { value: 'good_attacking', label: 'Good attacking players' },
          { value: 'good_target_striker', label: 'Good target striker' },
          { value: 'two_good_forwards', label: 'Two good forwards' },
          { value: 'understand_tactics', label: 'Players understand tactics well' },
          { value: 'strong_fitness', label: 'Strong fitness levels' },
          { value: 'good_counter', label: 'Good at counterattacking' },
          { value: 'good_possession', label: 'Good at keeping possession' },
          { value: 'strong_set_pieces', label: 'Strong from set pieces' }
        ]
      }
    ]
  },
  {
    id: 'problems',
    title: 'Team Problems',
    description: 'Select up to 3 recurring problems in matches.',
    icon: '⚠️',
    questions: [
      {
        id: 'team_problems',
        text: 'What are your team\'s biggest recurring problems? (Select up to 3)',
        type: 'multi',
        maxSelections: 3,
        options: [
          { value: 'concede_too_many', label: 'We concede too many goals' },
          { value: 'counterattacked_easily', label: 'We get counterattacked easily' },
          { value: 'striker_isolated', label: 'Our striker becomes isolated' },
          { value: 'lose_midfield_battle', label: 'We lose the midfield battle' },
          { value: 'lack_width', label: 'We lack width' },
          { value: 'exposed_wide', label: 'We are exposed in wide areas' },
          { value: 'fullbacks_overloaded', label: 'Our fullbacks get overloaded' },
          { value: 'struggle_build_from_back', label: 'We struggle to build from the back' },
          { value: 'give_ball_away', label: 'We give the ball away too quickly' },
          { value: 'not_enough_chances', label: 'We do not create enough chances' },
          { value: 'cannot_press', label: 'We cannot press effectively' },
          { value: 'too_stretched', label: 'We are too stretched as a team' },
          { value: 'defend_too_deep', label: 'We defend too deep' },
          { value: 'struggle_vs_stronger', label: 'We struggle against stronger teams' },
          { value: 'dont_understand_roles', label: 'Players do not understand their roles' }
        ]
      }
    ]
  },
  {
    id: 'preference',
    title: 'Tactical Preference',
    description: 'How do you want your team to behave on the pitch?',
    icon: '🎯',
    questions: [
      {
        id: 'possession_style',
        text: 'How do you want your team to play in possession?',
        type: 'single',
        options: [
          { value: 'build-back', label: 'Build patiently from the back' },
          { value: 'through-midfield', label: 'Play through midfield' },
          { value: 'wide-crosses', label: 'Use wide areas and crosses' },
          { value: 'direct-forwards', label: 'Play direct into forwards' },
          { value: 'counter-quick', label: 'Counterattack quickly' },
          { value: 'simple-balanced', label: 'Keep it simple and balanced' },
          { value: 'not-sure', label: 'Not sure' }
        ]
      },
      {
        id: 'defensive_style',
        text: 'How do you want your team to defend?',
        type: 'single',
        options: [
          { value: 'high-press', label: 'High press' },
          { value: 'mid-block', label: 'Mid-block' },
          { value: 'low-block', label: 'Low block' },
          { value: 'compact-difficult', label: 'Compact and difficult to beat' },
          { value: 'press-triggers', label: 'Press only on triggers' },
          { value: 'not-sure', label: 'Not sure' }
        ]
      },
      {
        id: 'top_priority',
        text: 'What matters most to you right now?',
        type: 'single',
        options: [
          { value: 'harder-to-beat', label: 'Be harder to beat' },
          { value: 'create-chances', label: 'Create more chances' },
          { value: 'control-midfield', label: 'Control midfield' },
          { value: 'protect-defense', label: 'Protect the defense' },
          { value: 'use-wide', label: 'Use wide players better' },
          { value: 'two-forwards', label: 'Get two forwards on the pitch' },
          { value: 'improve-pressing', label: 'Improve pressing' },
          { value: 'stop-counters', label: 'Stop being counterattacked' },
          { value: 'clear-identity', label: 'Build a clearer identity' }
        ]
      }
    ]
  },
  {
    id: 'reality',
    title: 'Coaching Reality',
    description: 'Understand the constraints of amateur and grassroots soccer.',
    icon: '⚙️',
    questions: [
      {
        id: 'tactical_detail_level',
        text: 'How much tactical detail can your players handle?',
        type: 'single',
        options: [
          { value: 'very-little', label: 'Very little — keep it simple' },
          { value: 'some-detail', label: 'Some detail' },
          { value: 'good-detail', label: 'Good level of detail' },
          { value: 'advanced-detail', label: 'Advanced detail' }
        ]
      },
      {
        id: 'coaching_time',
        text: 'How much time do you have to coach tactical ideas?',
        type: 'single',
        options: [
          { value: 'very-limited', label: 'Very limited' },
          { value: 'one-session', label: 'One session per week' },
          { value: 'two-sessions', label: 'Two sessions per week' },
          { value: 'plenty-time', label: 'Plenty of time' }
        ]
      },
      {
        id: 'system_preference',
        text: 'Do you prefer a simple system players can repeat or a more flexible system?',
        type: 'single',
        options: [
          { value: 'simple-repeatable', label: 'Simple and repeatable' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'flexible-adaptable', label: 'Flexible and adaptable' }
        ]
      }
    ]
  }
];
