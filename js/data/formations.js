export const FORMATIONS = [
  {
    id: '4-4-2',
    name: '4-4-2',
    category: 'four-at-back',
    shortDesc: 'Simple, balanced, two-forward system with clear partnerships and strong defensive structure.',
    bestFor: 'Teams needing defensive organization, simplicity, clear roles, two forwards, and wide midfield protection. Highly suitable for squads with limited training time.',
    avoidIf: 'Avoid if your central midfielders lack the athleticism to cover space, or when you are facing a highly technical opponent that dominates central midfield with three players.',
    defaultShape: 'Back four, two central midfielders, two wide midfielders, and two strikers.',
    recommendedAttackingShape: '2-4-4 or 3-2-5',
    recommendedDefensiveShape: '4-4-2 mid-block',
    fallbackDefensivePrinciple: 'If the opponent breaks your press or players lose their positions, recover immediately into a compact 4-4-2 mid-block shape. Focus on denying central passes and force the opponent wide.',
    attackingShapeExplanation: 'In possession, one fullback can step higher to join the midfield while the opposite fullback stays deeper to form a back three. The wide midfielders push high to provide width, while the central midfielders support underneath the strikers, creating a threat with at least 5 players in the final third.',
    defensiveShapeExplanation: 'Out of possession, the team drops into two compact banks of four. The front two forwards screen passes into the opposition central midfielders, while the wide midfielders protect the flanks and support their fullbacks.',
    overview: 'The traditional 4-4-2 offers exceptional structural balance and is highly effective at teaching fundamental tactical partnerships. With two banks of four, it provides an inherently solid defensive shape and covers the width of the pitch naturally. In possession, it creates direct passing lanes to two strikers, facilitating quick counterattacks and cross-heavy attacks.',
    strengths: [
      'Simple to understand, requiring minimal training time to organize.',
      'Clear, natural partnerships across all lines (center backs, central midfielders, wingers/fullbacks, and the front two).',
      'Excellent defensive cover across the entire width of the pitch.',
      'Always keeps two center forwards on the pitch to pressure the opponent\'s back line.'
    ],
    weaknesses: [
      'Can easily be outnumbered in central midfield against 3-midfielder systems (like 4-3-3 or 4-2-3-1).',
      'The distance between the midfield bank and the strikers can become too large, isolating the forwards.',
      'Can lack flexibility and predictability if players do not rotate or drop between lines.'
    ],
    keyRoles: {
      gk: { name: 'Balanced Goalkeeper', description: 'Focuses on command of the box, safe distribution, and organizing the back four.' },
      cb: { name: 'Partnership Center Backs', description: 'One aggressive stopper to contest headers/challenges, one covering defender to sweep behind.' },
      fb: { name: 'Defensive-First Fullbacks', description: 'Provide security, support wide midfielders, and overlap only when balanced by the opposite fullback.' },
      cm: { name: 'Complementary Central Midfielders', description: 'One disciplined holding player who keeps shape, and one box-to-box engine who supports attacks.' },
      winger: { name: 'Traditional Wingers', description: 'Provide width, deliver crosses into the box, and track back to help the fullbacks defend.' },
      st: { name: 'Target & Runner Strikers', description: 'One target player to hold up the ball, and one runner who searches for space behind the defense.' }
    },
    attackingPrinciples: [
      'Create width with wide players holding the touchline.',
      'Support the striker partnership through complementary runs.',
      'Only allow one fullback to attack at a time to maintain rest defense.',
      'Occupy the five attacking spaces: left width, left half-space, central striker positions, right half-space, and right width.'
    ],
    defensivePrinciples: [
      'Form two compact lines of four (mid-block).',
      'Front two screen passing lanes into central midfield.',
      'Central midfielders shift side-to-side together to deny gaps.',
      'Forwards initiate pressing on triggers (e.g. slow backpass).'
    ],
    transitionPrinciples: {
      attacking: 'Counterattack quickly: release wide midfielders into space or play directly into the target striker\'s chest/feet to hold up play.',
      defensive: 'Delay the opponent\'s advance. If the ball cannot be won back within 3-5 seconds, recover immediately into the compact 4-4-2 mid-block shape.'
    },
    trainingTopics: [
      {
        title: 'Defensive Compactness in the 4-4-2 mid-block',
        setup: '8v8 game on a half-pitch. The defending team is organized in a 4-4 block and must shift side-to-side relative to the ball, preventing passes into mini-goals.',
        coachingPoints: 'Keep vertical distances between lines under 10-12 yards. Shift together. Force play wide.',
        matchLink: 'Ensures wide midfielders and central midfielders stay connected during matches.'
      },
      {
        title: 'Attacking Combinations of the Front Two',
        setup: 'Grid-based attacking drills. 2 strikers combined with 2 midfielders against 3 defenders. Focus on one striker dropping short while the other runs deep.',
        coachingPoints: 'Timing of runs. One short, one deep. Look for third-man runs from central midfielders.',
        matchLink: 'Prevents strikers from standing on the same line and becoming isolated.'
      },
      {
        title: 'Wide Overlaps and Crossing',
        setup: 'Phase of play starting in midfield. Midfielders distribute wide to wingers. Fullbacks time overlapping runs to deliver crosses to the front two.',
        coachingPoints: 'Timing of the fullback run. Wingers tucking in to create space. Strikers attacking the near and far post.',
        matchLink: 'Creates our attacking width and threat in possession.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Do the players know their default positions and partner responsibilities?',
        'Do the fullbacks know who overlaps and when to sit?',
        'Do the strikers know who drops short and who runs deep?'
      ],
      during: [
        'Are our two central midfielders staying connected, or is there a massive gap between them?',
        'Are the wide players recovering quickly to support their fullbacks?',
        'Are our strikers working together, or are they standing on the same line?'
      ],
      halftime: [
        'Is the opponent exploiting the center with a midfield overload?',
        'Are we getting enough crosses into the box for our front two?',
        'Do we need to adjust one central midfielder to play more defensively?'
      ],
      after: [
        'Did our central midfield get overrun?',
        'Did our strikers create enough opportunities together?',
        'What recurring tactical problem did we observe that we need to train next?'
      ]
    },
    commonProblems: [
      'Strikers become isolated and run on separate lines.',
      'Central midfield gets outnumbered and bypassed easily.',
      'Fullbacks push high together, leaving no cover behind.'
    ],
    fixes: [
      'Coach one striker to drop into a temporary No. 10 position in possession.',
      'Instruct wide players to tuck inside to help central midfielders when defending.',
      'Enforce the rule: only one fullback attacks at a time while the other forms a back three.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 45, y: 200, label: 'LM' },
      { x: 115, y: 210, label: 'CM' },
      { x: 185, y: 210, label: 'CM' },
      { x: 255, y: 200, label: 'RM' },
      { x: 110, y: 100, label: 'ST' },
      { x: 190, y: 100, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 120, y: 210, label: 'CM' },
      { x: 180, y: 210, label: 'CM' },
      { x: 35, y: 80, label: 'LM' },
      { x: 110, y: 70, label: 'ST' },
      { x: 190, y: 70, label: 'ST' },
      { x: 265, y: 80, label: 'RM' },
      { x: 230, y: 100, label: 'RB' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 45, y: 200, label: 'LM' },
      { x: 120, y: 210, label: 'CM' },
      { x: 180, y: 210, label: 'CM' },
      { x: 255, y: 200, label: 'RM' },
      { x: 120, y: 130, label: 'ST' },
      { x: 180, y: 130, label: 'ST' }
    ]
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    category: 'four-at-back',
    shortDesc: 'Modern, flexible system with a double pivot protecting the defense and a creative playmaker.',
    bestFor: 'Teams needing defensive security, central midfield control, a clear creative playmaker (No. 10), and dangerous wide attacking options.',
    avoidIf: 'Avoid when your wingers lack defensive discipline, or when your lone striker lacks the physical strength to hold off defenders alone.',
    defaultShape: 'Back four, two holding midfielders (double pivot), three attacking midfielders, and one striker.',
    recommendedAttackingShape: '3-2-5',
    recommendedDefensiveShape: '4-4-2 mid-block',
    fallbackDefensivePrinciple: 'If the press is broken or ball is lost under pressure, recover immediately into a compact 4-4-2 mid-block. The No. 10 drops alongside the striker to form the front line.',
    attackingShapeExplanation: 'In possession, one fullback (typically the LB) steps higher to join the attacking line, while the opposite fullback stays deep to create a temporary back three. The double pivot stays central, providing rest defense. The wingers push high and wide, while the No. 10 and striker occupy central spaces, creating five attacking threats.',
    defensiveShapeExplanation: 'Out of possession, the No. 10 steps forward to defend alongside the striker. The two wide attacking midfielders recover deep to form a midfield bank of four alongside the double pivot, shifting the team into a secure 4-4-2.',
    overview: 'The 4-2-3-1 is one of the most popular formations in modern soccer. It utilizes two holding midfielders (the "double pivot") to shield the back four, allowing fullbacks and the front four to attack with freedom. It creates natural triangles across the pitch and offers a clean bridge between defense and attack through the central attacking midfielder.',
    strengths: [
      'Excellent defensive shield provided by the two holding central midfielders.',
      'Highly flexible in transition: can easily attack as a 4-2-3-1 and defend as a 4-4-2 or 4-5-1.',
      'Creates a clear, dedicated role for a creative playmaker (No. 10) behind the striker.',
      'Maintains both central passing lanes and wide width.'
    ],
    weaknesses: [
      'The lone striker can easily become isolated if the three attacking midfielders fail to join the attack quickly.',
      'Requires highly disciplined holding midfielders who understand when to sit and when to press.',
      'If the attacking wingers do not track back, the fullbacks can become severely overloaded.'
    ],
    keyRoles: {
      gk: { name: 'Sweeper Goalkeeper', description: 'Needs to act as an outlet for the back pass and sweep up balls behind a higher line.' },
      cb: { name: 'Composed Center Backs', description: 'Comfortable passing to the double pivot and defending in isolation when fullbacks push high.' },
      fb: { name: 'Attacking Fullbacks', description: 'Encouraged to support attacks and provide width, overlapping when wingers tuck inside.' },
      cdm: { name: 'Double Pivot (x2)', description: 'One defensive destroyer who anchors the midfield, one transition passer who links to the attack.' },
      cam: { name: 'Creative Playmaker (No. 10)', description: 'Operates in the pockets of space between the opponent\'s defense and midfield, creating chances.' },
      winger: { name: 'Inside Forwards/Wingers', description: 'Look to cut inside to shoot or combine with the No. 10, while recovering defensively.' },
      st: { name: 'Complete Lone Striker', description: 'Must hold up the ball, make runs in behind, and press the opponent\'s center backs.' }
    },
    attackingPrinciples: [
      'Ensure the double pivot remains connected to protect the center.',
      'Get attacking midfielders close to the lone striker to provide support.',
      'Encourage one fullback to overlap when the winger cuts inside.',
      'Occupy the five attacking spaces: wide left, left half-space, striker central, right half-space, wide right.'
    ],
    defensivePrinciples: [
      'No. 10 drops alongside striker to form a front two.',
      'Wide wingers recover deep to form a flat midfield line of four.',
      'The double pivot screens passing lanes into the opponent\'s strikers.',
      'Force the opponent wide, then press with the fullback and winger.'
    ],
    transitionPrinciples: {
      attacking: 'Find the No. 10 immediately in transition, or play direct vertical passes to the lone striker to hold up play and release wide wingers.',
      defensive: 'Double pivot immediately slows down the counter. If the ball is not won, recover into the 4-4-2 mid-block fallback shape.'
    },
    trainingTopics: [
      {
        title: 'Building into a 3-2-5 Attacking Shape',
        setup: '10v8 build-up game. The attacking team starts with the goalkeeper and must pass through the double pivot to feed the front five players.',
        coachingPoints: 'One fullback staying deep to form the back three. Wingers holding width. No. 10 receiving between lines.',
        matchLink: 'Teaches players how to transition from starting layout to attacking threat.'
      },
      {
        title: 'Defending in a 4-4-2 Mid-Block',
        setup: 'Defending phase. The team in 4-2-3-1 defends a half-pitch. The No. 10 steps up to join the striker, and the wingers drop to make a midfield bank.',
        coachingPoints: 'Denying central spaces. Forcing play wide. Slide as a unit. Clear recovery runs.',
        matchLink: 'Prevents our midfield from getting stretched and protects the back four.'
      },
      {
        title: 'Supporting the Lone Striker',
        setup: 'Attacking transitions drill. Striker receives a long pass under pressure. Three attacking midfielders must sprint to support and combine.',
        coachingPoints: 'Striker protecting the ball. Timing of supporting runs. Third-man runs into the box.',
        matchLink: 'Ensures our striker is never isolated on match day.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Does the No. 10 understand their defensive recovery role alongside the striker?',
        'Do the holding midfielders know who screens and who joins the build-up?',
        'Do the fullbacks know they cannot overlap at the same time?'
      ],
      during: [
        'Is our double pivot staying disciplined, or are they both chasing the ball?',
        'Is the striker too isolated, or are wide players and the No. 10 joining quickly?',
        'Are wide players recovering to help their fullbacks?'
      ],
      halftime: [
        'Is the No. 10 finding space in the half-spaces between the opponent\'s lines?',
        'Are the holding midfielders protecting the space in front of our center backs?',
        'Do we need to ask our fullbacks to play more conservatively?'
      ],
      after: [
        'Did our double pivot protect the defense effectively?',
        'Did our lone striker get enough support from the attacking midfielders?',
        'What was our main breakdown point in transitions?'
      ]
    },
    commonProblems: [
      'Striker gets isolated and starved of service.',
      'Wide players fail to track back, overloading our fullbacks.',
      'The double pivot gets flat or both players push high.'
    ],
    fixes: [
      'Instruct the No. 10 to operate closer to the striker in possession.',
      'Set clear defensive recovery lines for wide players (forming a bank of four).',
      'Coach the double pivot to stagger (one deep anchor, one box-to-box engine).'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 110, y: 240, label: 'CDM' },
      { x: 190, y: 240, label: 'CDM' },
      { x: 45, y: 150, label: 'LW' },
      { x: 150, y: 155, label: 'CAM' },
      { x: 255, y: 150, label: 'RW' },
      { x: 150, y: 75, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 120, y: 220, label: 'CDM' },
      { x: 180, y: 220, label: 'CDM' },
      { x: 30, y: 80, label: 'LW' },
      { x: 100, y: 90, label: 'CAM' },
      { x: 150, y: 70, label: 'ST' },
      { x: 200, y: 90, label: 'RW' },
      { x: 270, y: 80, label: 'RB' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 45, y: 210, label: 'LM' },
      { x: 120, y: 220, label: 'CDM' },
      { x: 180, y: 220, label: 'CDM' },
      { x: 255, y: 210, label: 'RM' },
      { x: 120, y: 140, label: 'CAM' },
      { x: 180, y: 140, label: 'ST' }
    ]
  },
  {
    id: '4-3-3',
    name: '4-3-3',
    category: 'four-at-back',
    shortDesc: 'Aggressive, possession-oriented system utilizing wide forwards and a three-man midfield.',
    bestFor: 'Teams with athletic fullbacks, strong wide forwards, a dominant holding midfielder, and a desire to press high or control possession.',
    avoidIf: 'Avoid when your squad lacks fitness, when your center backs are slow, or when your midfielders do not recover defensively.',
    defaultShape: 'Back four, one holding midfielder, two advanced central midfielders (No. 8s), two wide wing forwards, and one striker.',
    recommendedAttackingShape: '2-3-5 or 3-2-5',
    recommendedDefensiveShape: '4-1-4-1 or 4-5-1',
    fallbackDefensivePrinciple: 'If the high press is broken, recover immediately into a compact 4-1-4-1 or drop one No. 8 alongside the striker to form a 4-4-2 mid-block. Protect the central space in front of the center backs.',
    attackingShapeExplanation: 'In possession, both wingers stretch wide to hold width. The two advanced midfielders (No. 8s) push high to occupy the half-spaces, while the striker stays central. Fullbacks can invert into midfield or one fullback joins the attack to create a 3-2-5 or 2-3-5 structure, ensuring at least five players threaten the box.',
    defensiveShapeExplanation: 'Out of possession, the team drops into a compact 4-1-4-1. The two wingers recover deep to flank the two advanced midfielders, while the single defensive midfielder (No. 6) screens the space in front of the center backs.',
    overview: 'The 4-3-3 is the ultimate formation for fluid, attacking, and high-pressing soccer. It features a single defensive midfielder (the "pivot") supporting two advanced, creative central midfielders. Up front, two wide forwards stretch the opponent\'s defense, creating space for underlapping runs and central combinations. It is ideal for teams that want to dominate possession and recover the ball high up the pitch.',
    strengths: [
      'Excellent attacking width and natural wing rotations.',
      'Possession domination: The midfield trio creates natural passing triangles.',
      'Superb high-pressing structure with a front three ready to pressure the opposition backline.',
      'Creates constant 1v1 situations for talented wide wingers.'
    ],
    weaknesses: [
      'Highly vulnerable to counterattacks if fullbacks push high without a structured "rest defense".',
      'The single holding midfielder can easily get overloaded if the two advanced midfielders do not recover quickly.',
      'Demands massive physical fitness and tactical intelligence from all three midfielders and fullbacks.'
    ],
    keyRoles: {
      gk: { name: 'Sweeper-Keeper', description: 'Acts as a relief passer and sweeps up balls behind a high defensive line.' },
      cb: { name: 'Pacey Center Backs', description: 'Must be comfortable defending large spaces behind them and building from the back.' },
      fb: { name: 'Attacking Wingbacks', description: 'Provide width, support the midfield, and possess the engine to run the entire flank.' },
      cdm: { name: 'Anchor Man (No. 6)', description: 'Sits in front of the defense, screens passing lanes, and dictates the tempo of build-up play.' },
      cm: { name: 'Box-to-Box / Advanced 8s', description: 'Create chances in the attacking third and sprint back to defend alongside the No. 6.' },
      winger: { name: 'Wide Forwards', description: 'Attack defenders 1v1, make diagonal runs in behind, and score goals.' },
      st: { name: 'Dynamic Center Forward', description: 'Combines with midfielders, holds up play, and occupies the opponent\'s center backs.' }
    },
    attackingPrinciples: [
      'Wingers hold width to stretch the opponent\'s backline.',
      'Advanced 8s attack the half-spaces and run into the box.',
      'Holding midfielder dictates tempo and sits to protect central areas.',
      'Maintain rest defense with at least three players behind the ball.'
    ],
    defensivePrinciples: [
      'Midfield trio stays compact and protects central passing lanes.',
      'Wingers recover deep to join the midfield out of possession.',
      'Holding midfielder stays connected to center backs to prevent gaps.',
      'Coordinated high press triggered by wide passes.'
    ],
    transitionPrinciples: {
      attacking: 'Circulate possession immediately to control tempo, or release the wing forwards quickly to exploit wide channels.',
      defensive: 'Counterpress aggressively for 3-5 seconds to win the ball back high. If broken, recover immediately into a compact midfield block.'
    },
    trainingTopics: [
      {
        title: 'Midfield Rotation & Possession',
        setup: '6v6 + 3 neutral players inside a central grid. Midfielders must rotate (one deep, two high) to maintain triangles and circulate the ball.',
        coachingPoints: 'Create angles. Open body shape. Timing of rotations.',
        matchLink: 'Helps control central areas and dominate possession in matches.'
      },
      {
        title: 'Attacking the Half-Spaces in a 2-3-5',
        setup: 'Phase of play in the attacking half. Wingers hold width. Advanced midfielders (8s) run into half-spaces to receive and create overloads.',
        coachingPoints: 'Underlapping runs. Wingers pulling defenders wide. Quick combinations in the box.',
        matchLink: 'Creates our five-man attacking threat in the final third.'
      },
      {
        title: 'Defensive Recovery and Block Compactness',
        setup: '11v11 on a full pitch. When the attacking team loses the ball, they must immediately recover into a 4-1-4-1 shape and defend the middle third.',
        coachingPoints: 'Speed of recovery. Staying narrow. Communication between No. 6 and center backs.',
        matchLink: 'Prevents the team from getting stretched and counterattacked.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Do advanced midfielders know their recovery duties?',
        'Are our center backs prepared to defend large spaces behind them?',
        'Do fullbacks understand their rest defense roles?'
      ],
      during: [
        'Are our advanced midfielders recovering to help the No. 6?',
        'Are fullbacks pushing up together, or is one staying back to maintain balance?',
        'Are we counterpressing successfully, or getting bypassed too easily?'
      ],
      halftime: [
        'Is the opponent overloading the space around our single No. 6?',
        'Are our wingers stretching the pitch, or tucking in too early?',
        'Do we need to drop into a mid-block to protect space?'
      ],
      after: [
        'Did our high press work effectively?',
        'Did we keep enough protection behind the ball when attacking?',
        'Did our advanced midfielders recover into shape?'
      ]
    },
    commonProblems: [
      'Fullbacks push high together, leaving center backs exposed.',
      'The single No. 6 gets isolated and bypassed on counters.',
      'Wingers remain high, leaving wide defensive areas unprotected.'
    ],
    fixes: [
      'Keep one fullback deeper as a defensive anchor (forming a back 3).',
      'Coach advanced 8s to drop quickly in transition to support the No. 6.',
      'Set strict recovery rules for wingers to drop into a flat midfield line.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 150, y: 235, label: 'CDM' },
      { x: 95, y: 185, label: 'CM' },
      { x: 205, y: 185, label: 'CM' },
      { x: 45, y: 95, label: 'LW' },
      { x: 150, y: 75, label: 'ST' },
      { x: 255, y: 95, label: 'RW' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 90, y: 200, label: 'LCM' },
      { x: 150, y: 215, label: 'CDM' },
      { x: 210, y: 200, label: 'RCM' },
      { x: 30, y: 80, label: 'LW' },
      { x: 95, y: 90, label: 'LCF' },
      { x: 150, y: 70, label: 'ST' },
      { x: 205, y: 90, label: 'RCF' },
      { x: 270, y: 80, label: 'RW' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 150, y: 245, label: 'CDM' },
      { x: 45, y: 170, label: 'LM' },
      { x: 120, y: 180, label: 'CM' },
      { x: 180, y: 180, label: 'CM' },
      { x: 255, y: 170, label: 'RM' },
      { x: 150, y: 110, label: 'ST' }
    ]
  },
  {
    id: '4-1-4-1',
    name: '4-1-4-1',
    category: 'four-at-back',
    shortDesc: 'Ultra-compact defensive setup with a single pivot and a dense, hard-working midfield bank of four.',
    bestFor: 'Teams needing extreme compactness, midfield numerical superiority, defensive discipline, and protection against stronger, possession-heavy opponents.',
    avoidIf: 'Avoid when you are the clear favorite and need to break down a defensive low block, or when you lack an athletic striker who can occupy center backs alone.',
    defaultShape: 'Back four, single defensive midfielder, flat midfield bank of four, and one striker.',
    recommendedAttackingShape: '3-2-5 or 2-3-5',
    recommendedDefensiveShape: '4-1-4-1 compact block',
    fallbackDefensivePrinciple: 'If the midfield block is breached, recover immediately into a low-block 4-1-4-1. Keep the single No. 6 screen narrow and protect the box.',
    attackingShapeExplanation: 'In possession, fullbacks support wide areas, while the wide midfielders and one central midfielder push high to join the lone striker. The single pivot (No. 6) remains deep to anchor the rest defense, keeping 3 players behind the ball.',
    defensiveShapeExplanation: 'Out of possession, the team forms a dense 4-1-4-1 mid-block. The midfield bank of four remains narrow to choke central space, while the holding midfielder sits behind them to sweep up entries.',
    overview: 'The 4-1-4-1 is a highly disciplined defensive structure designed to deny space in central areas. By positioning a dedicated defensive midfielder (the "screen") between the defensive line and a flat bank of four midfielders, it makes playing through the center incredibly difficult. It is excellent for underdog teams or when protecting a lead, transitioning into a counterattacking setup.',
    strengths: [
      'Incredible central compactness that suffocates the spaces between lines.',
      'Very difficult to play through; forces opponents into low-value wide crosses.',
      'Creates a clear, simple defensive role for the holding midfielder.',
      'Provides a strong platform for structured, low-risk possession.'
    ],
    weaknesses: [
      'Can lack attacking support, leaving the lone striker isolated.',
      'Requires the wide players to cover massive distances to transition from defense to attack.',
      'Can become too passive and defensive if the midfield line drops too deep.'
    ],
    keyRoles: {
      gk: { name: 'Commanding Keeper', description: 'Must be vocal in organizing the lines and active in claiming deep crosses.' },
      cb: { name: 'Solid Center Backs', description: 'Stay deep, win headers, and clear dangers without needing to step out of line.' },
      fb: { name: 'Stay-Back Fullbacks', description: 'Focus heavily on defensive containment and rarely overlap unless safe.' },
      cdm: { name: 'Dedicated Screen (No. 6)', description: 'Pivots laterally in front of the center backs, blocking passing lanes and tackling playmakers.' },
      cm: { name: 'Disciplined Central Midfielders', description: 'Must work hard defensively to press the ball, then break forward to support the striker in possession.' },
      winger: { name: 'Two-Way Wide Midfielders', description: 'Provide defensive cover to the fullbacks and lead counterattacks on the wings.' },
      st: { name: 'Hard-Working Lone Striker', description: 'Must defend from the front, hold up long clearances, and run channels in transition.' }
    },
    attackingPrinciples: [
      'Ensure the lone striker is supported by at least one central midfielder.',
      'Wide midfielders provide width to create central passing lanes.',
      'Holding midfielder remains deep to anchor the rest defense.',
      'Avoid high-risk dribbles in central build-up.'
    ],
    defensivePrinciples: [
      'Midfield bank of four stays narrow and compact.',
      'Holding No. 6 laterally screens in front of the center backs.',
      'Wide players track opposing fullbacks to prevent wide overloads.',
      'Force the opponent to play wide, then lock down the touchline.'
    ],
    transitionPrinciples: {
      attacking: 'Secure the first pass out of pressure to establish possession, or release wide midfielders quickly on the counter.',
      defensive: 'Drop off immediately into defensive shape. The lone striker delays, while the midfield bank of four compresses central spaces.'
    },
    trainingTopics: [
      {
        title: 'Lateral Shifting of the Midfield Bank',
        setup: '8v8 tactical shifting drill. The defending team is in a 4-1 block. They must shift laterally as the ball is circulated, keeping gaps closed.',
        coachingPoints: 'Coordinated shifting. Stay narrow. Communication between No. 6 and midfielders.',
        matchLink: 'Ensures the opponent cannot pass through our midfield block during games.'
      },
      {
        title: 'Supporting the Lone Striker in Transition',
        setup: 'Counterattack drill. When defending team wins the ball, they must pass to the striker and support with runs from midfield to finish within 10 seconds.',
        coachingPoints: 'Striker protecting ball. Speed of supporting runs. Midfielders breaking past the striker.',
        matchLink: 'Prevents our striker from getting isolated on match day.'
      },
      {
        title: 'Holding Midfielder Screening Position',
        setup: 'Defending training. Playmakers attempt to pass to strikers. The No. 6 must move laterally to intercept passes.',
        coachingPoints: 'Do not get drawn to the ball. Screen passing lanes. Step up to tackle only when cover is secure.',
        matchLink: 'Provides maximum protection to our back four.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Does the No. 6 know their lateral screening zones?',
        'Do central midfielders know who breaks forward and when?',
        'Is the striker prepared to defend from the front?'
      ],
      during: [
        'Is our holding midfielder keeping his position, or getting drawn to the ball?',
        'Are central midfielders recovering, or leaving the No. 6 exposed?',
        'Is the striker isolated, or getting support quickly?'
      ],
      halftime: [
        'Are we defending too deep and conceding shots from distance?',
        'Are wide midfielders recovering fast enough to help fullbacks?',
        'Do we need to secure possession more before launching counters?'
      ],
      after: [
        'Did our midfield block remain compact?',
        'Did our lone striker hold up the ball successfully?',
        'What was our biggest issue in transitions?'
      ]
    },
    commonProblems: [
      'Lone striker is starved of support and loses possession.',
      'The midfield bank drops too deep, creating a shooting gallery.',
      'No. 6 gets drawn wide, leaving central space empty.'
    ],
    fixes: [
      'Instruct one central midfielder to break forward past the striker in possession.',
      'Encourage the midfield line to stay higher (mid-block) rather than dropping into our box.',
      'Instruct No. 6 to stay central and let shuttling midfielders defend wide spaces.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 150, y: 245, label: 'CDM' },
      { x: 45, y: 180, label: 'LM' },
      { x: 110, y: 190, label: 'CM' },
      { x: 190, y: 190, label: 'CM' },
      { x: 255, y: 180, label: 'RM' },
      { x: 150, y: 75, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 120, y: 230, label: 'CDM' },
      { x: 180, y: 210, label: 'LCM' },
      { x: 35, y: 80, label: 'LM' },
      { x: 100, y: 95, label: 'CM' },
      { x: 150, y: 70, label: 'ST' },
      { x: 265, y: 80, label: 'RM' },
      { x: 230, y: 100, label: 'RB' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 150, y: 245, label: 'CDM' },
      { x: 45, y: 170, label: 'LM' },
      { x: 120, y: 180, label: 'CM' },
      { x: 180, y: 180, label: 'CM' },
      { x: 255, y: 170, label: 'RM' },
      { x: 150, y: 110, label: 'ST' }
    ]
  },
  {
    id: '3-5-2',
    name: '3-5-2',
    category: 'three-at-back',
    shortDesc: 'Dominate central areas with three center backs, a strong midfield engine, and two strikers.',
    bestFor: 'Teams with three reliable center backs, highly energetic wingbacks, a strong central midfield trio, and a preference for two-striker partnerships.',
    avoidIf: 'Avoid when your wingbacks lack the fitness or tactical understanding to cover the entire flank, or when you only have two reliable center backs in the squad.',
    defaultShape: 'Three center backs, two wingbacks, three central midfielders, and two strikers.',
    recommendedAttackingShape: '3-2-5',
    recommendedDefensiveShape: '5-3-2 compact block',
    fallbackDefensivePrinciple: 'If the press is broken or wingbacks are caught high, the remaining three center backs must protect the width of the box while the holding midfielder covers. Wingbacks recover immediately to make a back five.',
    attackingShapeExplanation: 'In possession, the wingbacks push high and wide to provide width. The three central defenders stay deep to form the rest defense. The central midfielders dictate play, while one central midfielder or advanced No. 8 steps higher to join the two strikers in the final third, creating a 3-2-5 structure.',
    defensiveShapeExplanation: 'Out of possession, both wingbacks drop into the defensive line to form a compact back five. The three central midfielders stay narrow to block passing lanes, shifting the team into a solid 5-3-2 shape.',
    overview: 'The 3-5-2 is a dynamic, tactically sophisticated system that matches central dominance with two-striker pressure. Defensively, three center backs secure the box while wingbacks cover the flanks. In possession, the wingbacks provide the width, freeing up three central midfielders to dominate the ball and support the two central forwards directly.',
    strengths: [
      'Overload in central midfield (3v2) and a permanent 2-v-2 matchup up front.',
      'Three central defenders provide excellent protection against two-striker systems.',
      'Wingbacks have the freedom to attack the back post and cross the ball.',
      'Highly effective for controlling possession and playing through midfield.'
    ],
    weaknesses: [
      'Extreme physical demands placed on the wingbacks, who must defend and attack the entire flank.',
      'Vulnerable in wide defensive areas if the wingbacks are caught high up the pitch.',
      'Requires tactically intelligent center backs who are comfortable defending wide spaces.'
    ],
    keyRoles: {
      gk: { name: 'Distributor Goalkeeper', description: 'Must be comfortable passing to the three center backs to start build-up play.' },
      cb: { name: 'Outside & Central CBs', description: 'Central CB organizes the line; outside CBs must step out to defend wide spaces when wingbacks are high.' },
      wb: { name: 'Engine Wingbacks', description: 'Responsible for the entire width of the pitch. Must have elite fitness to attack and recover.' },
      cdm: { name: 'Midfield Controller', description: 'Sits deep, orchestrates play, and covers for advancing wingbacks.' },
      cm: { name: 'Box-to-Box Midfielders (x2)', description: 'Provide energy, break into the box to support the strikers, and press opponents.' },
      st: { name: 'Two-Striker Partnership', description: 'Combine closely, run opposing center backs ragged, and press together in transition.' }
    },
    attackingPrinciples: [
      'Wingbacks push high to provide attacking width.',
      'Strikers split or run channels to drag center backs apart.',
      'Midfield trio dominates possession and controls tempo.',
      'Three center backs stay compact behind the ball for rest defense.'
    ],
    defensivePrinciples: [
      'Wingbacks drop deep to form a back five out of possession.',
      'Three central midfielders stay narrow to deny entries.',
      'Forwards screen passes into midfield and press wide defenders.',
      'Outside center backs step out to engage wide threats.'
    ],
    transitionPrinciples: {
      attacking: 'Release the high wingbacks immediately on the flanks, or play direct vertical passes to the front two to combine.',
      defensive: 'Wingbacks must sprint back immediately. The three center backs hold their shape to protect the box while midfielders delay.'
    },
    trainingTopics: [
      {
        title: 'Wingback Recovery and Defensive Line Shift',
        setup: ' Tactical game on a full pitch. When possession is lost, the wingbacks must sprint to recover, transforming a back-three to a back-five.',
        coachingPoints: 'Speed of recovery. Adjusting the back line. Communication between central defender and wingbacks.',
        matchLink: 'Protects our wide flanks when matches become chaotic.'
      },
      {
        title: 'Possession Building with Three Center Backs',
        setup: '3 center backs + 1 holding midfielder building against a 3-player pressing line. Focus on circulating the ball to draw pressure.',
        coachingPoints: 'Use the goalkeeper. Draw the press, then pass wide. Central defender dictating play.',
        matchLink: 'Establishes clean build-up from the back on match day.'
      },
      {
        title: 'Striker Partnership Combinations',
        setup: '2 strikers combining against 3 center backs. Midfielders feed passes into the forwards, who must link up to shoot.',
        coachingPoints: 'Staggered runs (one short, one deep). Split runs to drag defenders. Quick lay-offs.',
        matchLink: 'Unlocks our attacking threat in the final third.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Are our wingbacks fit enough to cover the entire flank?',
        'Do the outside center backs know when to slide wide?',
        'Do the strikers know how to coordinate their pressing?'
      ],
      during: [
        'Are the wingbacks getting high enough to support attacks?',
        'Are our outside center backs stepping out to defend channels?',
        'Is our midfield trio controlling the tempo of the game?'
      ],
      halftime: [
        'Are our wingbacks stuck too deep (forming a passive 5-3-2)?',
        'Are we getting overloaded in wide areas on the counter?',
        'Do we need to ask our holding midfielder to sit deeper?'
      ],
      after: [
        'Did our wingbacks recover fast enough out of possession?',
        'Did our strikers create enough central threat?',
        'Did the three center backs manage channel spaces?'
      ]
    },
    commonProblems: [
      'Wingbacks pin deep, turning the system into a passive 5-3-2.',
      'Opponents exploit the channels behind outside center backs.',
      'Midfielders get disconnected from the striker pair.'
    ],
    fixes: [
      'Instruct wingbacks to start higher in possession, backed by the holding midfielder.',
      'Coach outside center backs to step out and engage threats in channels.',
      'Instruct one central midfielder to break forward to connect with the forwards.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 80, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 220, y: 315, label: 'CB' },
      { x: 25, y: 205, label: 'LWB' },
      { x: 100, y: 215, label: 'CM' },
      { x: 150, y: 240, label: 'CDM' },
      { x: 200, y: 215, label: 'CM' },
      { x: 275, y: 205, label: 'RWB' },
      { x: 110, y: 95, label: 'ST' },
      { x: 190, y: 95, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 75, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 225, y: 315, label: 'CB' },
      { x: 25, y: 80, label: 'LWB' },
      { x: 100, y: 95, label: 'LCM' },
      { x: 150, y: 220, label: 'CDM' },
      { x: 200, y: 220, label: 'RCM' },
      { x: 275, y: 80, label: 'RWB' },
      { x: 135, y: 70, label: 'ST' },
      { x: 165, y: 70, label: 'ST' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 35, y: 280, label: 'LWB' },
      { x: 90, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 210, y: 315, label: 'CB' },
      { x: 265, y: 280, label: 'RWB' },
      { x: 80, y: 200, label: 'CM' },
      { x: 150, y: 185, label: 'CM' },
      { x: 220, y: 200, label: 'CM' },
      { x: 120, y: 110, label: 'ST' },
      { x: 180, y: 110, label: 'ST' }
    ]
  },
  {
    id: '5-3-2',
    name: '5-3-2',
    category: 'five-at-back',
    shortDesc: 'Robust defensive system prioritizing compact lines, box protection, and fast counterattacks.',
    bestFor: 'Teams needing maximum defensive security, protection against stronger opponents, and a solid counterattacking structure.',
    avoidIf: 'Avoid when you are expected to dominate the game, when your wingbacks cannot run the flanks, or when you lack pace in your forward line to counterattack.',
    defaultShape: 'Five defenders (3 CBs + 2 deep wingbacks), three central midfielders, and two strikers.',
    recommendedAttackingShape: '3-2-5 or 3-4-3',
    recommendedDefensiveShape: '5-3-2 compact low-block',
    fallbackDefensivePrinciple: 'Maintain a dense, low-block back five. Keep the three central midfielders extremely narrow in front of the box, denying space in behind.',
    attackingShapeExplanation: 'In possession, wingbacks step higher to support midfield. The central midfielders circulate the ball safely, while one CM breaks forward to support the strikers, shifting into a 3-2-5 or 3-4-3 shape during fast transitions.',
    defensiveShapeExplanation: 'Out of possession, the wingbacks sit deep to form a flat back five. The midfield three remain narrow, blocking passing channels into the box. Strikers drop to screen entries, suffocating the central spaces.',
    overview: 'The 5-3-2 is a defensive variation of the 3-5-2. By keeping the wingbacks positioned deeper, it creates a permanent five-man defensive line that is incredibly difficult to break down. Backed by a compact midfield bank of three, this system relies on defensive discipline, denying central space, and exploiting spaces left behind by attacking opponents through fast counterattacks.',
    strengths: [
      'Exceptional defensive security with five defenders covering the width of the box.',
      'Highly compact central structure that limits opportunities in the final third.',
      'Perfect setup for absorbing pressure and counterattacking quickly.',
      'Always maintains a two-striker presence for outlets.'
    ],
    weaknesses: [
      'Can become too passive and defensive if the wingbacks never join the attack.',
      'Midfield bank of three can become overworked covering the width of the pitch.',
      'Extremely difficult to establish high possession if the blocks drop too deep.'
    ],
    keyRoles: {
      gk: { name: 'Shot Stopper', description: 'Excellent under pressure, good at claiming crosses and distributing quickly to start counters.' },
      cb: { name: 'Defensive Anchor Trio', description: 'Central CB coordinates line and clearances; outside CBs mark tightly and cover channel spaces.' },
      wb: { name: 'Defensive Wingbacks', description: 'Focus first on forming the back five, then look to exploit space on the counter.' },
      cm: { name: 'Engine Room Trio', description: 'Must be highly disciplined, narrow, and athletic to cover lateral spaces across midfield.' },
      st: { name: 'Counterattacking Strikers', description: 'Must be fast and capable of combining together with minimal support to score goals.' }
    },
    attackingPrinciples: [
      'Exploit space quickly on the counter before opponent recovers.',
      'Wingbacks step higher when possession is secured.',
      'One midfielder breaks forward to support the strikers.',
      'Minimize risk in central areas.'
    ],
    defensivePrinciples: [
      'Form a flat back five to protect the penalty area.',
      'Keep the midfield trio narrow and disciplined.',
      'Force play wide to low-risk areas.',
      'Protect the central box spaces at all costs.'
    ],
    transitionPrinciples: {
      attacking: 'Fast counterattacking transitions: look for direct passes into strikers or release wingbacks sprinting down flanks.',
      defensive: 'Recover immediately into the 5-3-2 block. The closest midfielder delays, while wingbacks drop to form the back five.'
    },
    trainingTopics: [
      {
        title: 'Defensive Block Shift in the 5-3-2',
        setup: ' Tactical shifting on a half-pitch. Defending team (5-3) shifts side-to-side to prevent attacking team from passing into the penalty box.',
        coachingPoints: 'Maintain distances. Slide together. Outside center backs covering channels.',
        matchLink: 'Prevents opponent from finding gaps inside our final third.'
      },
      {
        title: 'Fast Counterattacking Transitions',
        setup: 'Defending team wins ball in their own third and must release to strikers or wingbacks to score inside 12 seconds.',
        coachingPoints: 'Direct release passes. Speed of support. Striker run selection.',
        matchLink: 'Maximizes our counterattacking threat on match day.'
      },
      {
        title: 'Wingback Timing & Pressing',
        setup: 'Wide play drill. Wingbacks practice when to step up to press opponent\'s wide midfielder, and when to drop to form the back five.',
        coachingPoints: 'Communication with outside CB. Timing of press. recovery runs.',
        matchLink: 'Ensures our flanks remain secure out of possession.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Do the wingbacks know their recovery boundaries?',
        'Do the central midfielders understand how narrow they must play?',
        'Are our strikers prepared to carry the counterattack load?'
      ],
      during: [
        'Are our wingbacks staying too deep, or stepping out to engage wide threats?',
        'Are the three central midfielders staying narrow to block the middle?',
        'Are we releasing the ball quickly to start counters?'
      ],
      halftime: [
        'Is the opponent dominating the flanks because our wingbacks are too deep?',
        'Are our strikers too isolated when we win the ball?',
        'Do we need to encourage one central midfielder to step higher?'
      ],
      after: [
        'Did our low-block protect the penalty area effectively?',
        'Did our counters create high-value chances?',
        'Did our midfielders slide side-to-side effectively?'
      ]
    },
    commonProblems: [
      'Team gets pinned in their own half, unable to transition.',
      'Opponent\'s fullbacks have too much time on the ball.',
      'Central midfielders get exhausted from lateral shifting.'
    ],
    fixes: [
      'Instruct strikers to hold the ball longer to let wingbacks push up.',
      'Coach wingbacks to step up to press opponent fullbacks when triggers are met.',
      'Encourage forwards to drop deeper to help screen central midfield spaces.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 35, y: 280, label: 'LWB' },
      { x: 90, y: 310, label: 'CB' },
      { x: 150, y: 320, label: 'CB' },
      { x: 210, y: 310, label: 'CB' },
      { x: 265, y: 280, label: 'RWB' },
      { x: 80, y: 200, label: 'CM' },
      { x: 150, y: 190, label: 'CM' },
      { x: 220, y: 200, label: 'CM' },
      { x: 110, y: 95, label: 'ST' },
      { x: 190, y: 95, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 80, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 220, y: 315, label: 'CB' },
      { x: 120, y: 210, label: 'CM' },
      { x: 180, y: 210, label: 'CM' },
      { x: 30, y: 80, label: 'LWB' },
      { x: 95, y: 100, label: 'LCM' },
      { x: 110, y: 70, label: 'ST' },
      { x: 190, y: 70, label: 'ST' },
      { x: 270, y: 80, label: 'RWB' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 35, y: 280, label: 'LWB' },
      { x: 90, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 210, y: 315, label: 'CB' },
      { x: 265, y: 280, label: 'RWB' },
      { x: 80, y: 200, label: 'CM' },
      { x: 150, y: 185, label: 'CM' },
      { x: 220, y: 200, label: 'CM' },
      { x: 120, y: 110, label: 'ST' },
      { x: 180, y: 110, label: 'ST' }
    ]
  },
  {
    id: '3-4-3',
    name: '3-4-3',
    category: 'three-at-back',
    shortDesc: 'High-risk, high-reward system designed for aggressive pressing and final-third overloads.',
    bestFor: 'Teams with three excellent center backs, athletic wide players, creative wingers, and an aggressive, attacking coaching philosophy.',
    avoidIf: 'Avoid when your center backs are slow, when you face a technical opponent with three central midfielders, or when your wide players do not track back.',
    defaultShape: 'Three center backs, four midfielders, two wide wingers, and one striker.',
    recommendedAttackingShape: '3-2-5',
    recommendedDefensiveShape: '5-4-1 or 5-2-3',
    fallbackDefensivePrinciple: 'If the press is beaten, recover immediately into a back five (5-4-1). Wingbacks drop deep, and wide forwards tuck into the midfield line.',
    attackingShapeExplanation: 'In possession, wingbacks push high to provide width. The two central midfielders stay connected underneath, while the wingers tuck inside to occupy the half-spaces, forming a highly offensive 3-2-5 structure.',
    defensiveShapeExplanation: 'Out of possession, the wingbacks drop deep to form a back five. The wingers recover into the midfield line to form a flat bank of four, protecting wide areas and supporting central midfielders.',
    overview: 'The 3-4-3 is an ultra-attacking formation that prioritizes high pressing, wing rotations, and overloads in the final third. It features three center backs defending the channels, a four-man midfield bank, and a front three. While it offers devastating attacking power and high turnover potential, it is a high-risk system that requires immense tactical discipline to avoid being exposed in central midfield and wide areas.',
    strengths: [
      'Devastating attacking power with five players (front three + wingbacks) attacking the box.',
      'Superb high-pressing structure that locks opponents in their own half.',
      'Creates constant 2v1 and 3v2 overload opportunities in wide areas.',
      'Encourages fluid positional rotations between wingers and wingbacks.'
    ],
    weaknesses: [
      'Highly vulnerable in central midfield, where a two-man pivot can easily be outnumbered.',
      'Massive spaces left behind the wingbacks that opponents can exploit on the counter.',
      'Extremely demanding on center backs, who must defend 1v1 in wide channel spaces.'
    ],
    keyRoles: {
      gk: { name: 'Sweeper-Keeper', description: 'Must be highly active, sweeping behind a high defensive line and acting as a build-up outlet.' },
      cb: { name: 'Athletic Center Backs (x3)', description: 'Must excel in 1v1 defending, possess pace, and be comfortable defending large channel spaces.' },
      wb: { name: 'Winger-Wingbacks', description: 'Attackers converted to cover the flanks. Must support the front three and recover defensively.' },
      cm: { name: 'Powerhouse Central Duo', description: 'Two central midfielders who must possess elite work rates, discipline, and passing range.' },
      winger: { name: 'Inside Wingers (LW/RW)', description: 'Tuck inside to operate in the half-spaces, creating space for the wingbacks to overlap.' },
      st: { name: 'Pressing Center Forward', description: 'Triggers the press, holds up the ball, and finishes chances inside the box.' }
    },
    attackingPrinciples: [
      'Overload the final third with five attackers (3-2-5).',
      'Wingers tuck inside to occupy half-spaces.',
      'Wingbacks stay wide to stretch the opponent\'s back line.',
      'Keep the central midfield duo secure behind the ball.'
    ],
    defensivePrinciples: [
      'Wingbacks drop deep to create a back five.',
      'Wingers recover into midfield to prevent central overloads.',
      'Press the opponent\'s build-up high in their own third.',
      'Center backs defend wide channels aggressively.'
    ],
    transitionPrinciples: {
      attacking: 'Exploit the high positions immediately: combine quickly wide and shoot before the opponent organizes.',
      defensive: 'Counterpress aggressively for 3-5 seconds. If broken, recover wingbacks immediately to form a back five.'
    },
    trainingTopics: [
      {
        title: 'Coordinating the High Press in 3-4-3',
        setup: 'Front 3 + wingbacks pressing opponent\'s back 4 building from the back. Focus on triggers and blocking outlets.',
        coachingPoints: 'Striker cuts off one center back. Wingers press outside center backs. Wingbacks block fullbacks.',
        matchLink: 'Locks opponents in their own half and forces turnovers.'
      },
      {
        title: 'Wingback and Winger Rotations',
        setup: 'Wide combinations drill. Winger tucks inside, wingback overlaps, central midfielder support underneath.',
        coachingPoints: 'Timing of runs. Space awareness. Underlapping and overlapping runs.',
        matchLink: 'Creates our attacking width and half-space threat.'
      },
      {
        title: 'Defensive Recovery to 5-4-1 Block',
        setup: '11v11 match. When attacking team loses possession, wingbacks and wingers must sprint to recover into a 5-4-1 shape.',
        coachingPoints: 'Speed of recovery. Maintain line of 4 in midfield. Outside CBs cover channels.',
        matchLink: 'Protects wide flanks and chokes central spaces.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Are our center backs prepared to defend 1v1 in channels?',
        'Do the wingbacks know their recovery lines?',
        'Are our two central midfielders ready to cover massive ground?'
      ],
      during: [
        'Are our two central midfielders staying connected, or getting overrun?',
        'Are the wingbacks recovering to form a back five out of possession?',
        'Are our center backs defending channels successfully?'
      ],
      halftime: [
        'Is the opponent bypassing our two-man midfield easily?',
        'Are we getting counterattacked behind our high wingbacks?',
        'Do we need to ask our wingers to drop deeper out of possession?'
      ],
      after: [
        'Did our high press work effectively?',
        'Did our center backs manage channel spaces well?',
        'Did our wingbacks recover into shape?'
      ]
    },
    commonProblems: [
      'The two-man central midfield is overrun by opponent trios.',
      'Wingbacks fail to track back, leaving channels exposed.',
      'Center backs are beaten in 1v1 channel duels.'
    ],
    fixes: [
      'Instruct wingers to drop deeper to support central midfielders in defense.',
      'Set strict recovery rules for wingbacks (forming a back 5).',
      'Deploy pacey, athletic defenders as outer center backs.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 80, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 220, y: 315, label: 'CB' },
      { x: 25, y: 200, label: 'LWB' },
      { x: 110, y: 210, label: 'CM' },
      { x: 190, y: 210, label: 'CM' },
      { x: 275, y: 200, label: 'RWB' },
      { x: 50, y: 95, label: 'LW' },
      { x: 150, y: 75, label: 'ST' },
      { x: 250, y: 95, label: 'RW' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 75, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 225, y: 315, label: 'CB' },
      { x: 120, y: 210, label: 'CM' },
      { x: 180, y: 210, label: 'CM' },
      { x: 25, y: 80, label: 'LWB' },
      { x: 90, y: 90, label: 'LW' },
      { x: 150, y: 70, label: 'ST' },
      { x: 210, y: 90, label: 'RW' },
      { x: 275, y: 80, label: 'RWB' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 35, y: 280, label: 'LWB' },
      { x: 90, y: 315, label: 'CB' },
      { x: 150, y: 325, label: 'CB' },
      { x: 210, y: 315, label: 'CB' },
      { x: 265, y: 280, label: 'RWB' },
      { x: 45, y: 200, label: 'LW' },
      { x: 120, y: 210, label: 'CM' },
      { x: 180, y: 210, label: 'CM' },
      { x: 255, y: 200, label: 'RW' },
      { x: 150, y: 110, label: 'ST' }
    ]
  },
  {
    id: '4-3-1-2',
    name: '4-3-1-2',
    category: 'four-at-back',
    shortDesc: 'Narrow central-heavy formation featuring a midfield diamond and two strikers.',
    bestFor: 'Teams with strong central midfielders, a creative number 10, two reliable strikers, and a lack of natural wide players.',
    avoidIf: 'Avoid when your fullbacks are defensive-minded, when your central midfielders lack lateral mobility, or when the opponent has dominant wide players.',
    defaultShape: 'Back four, midfield diamond (one deep, two box-to-box, one attacking midfielder), and two strikers.',
    recommendedAttackingShape: '2-1-4-3 or 2-3-5',
    recommendedDefensiveShape: '4-3-1-2 narrow block',
    fallbackDefensivePrinciple: 'If opponent wide players overlap, the two outer box-to-box midfielders must slide wide to cover, while the No. 10 drops to assist, forming a temporary 4-4-2 mid-block.',
    attackingShapeExplanation: 'In possession, fullbacks push high and wide to provide the only width. The holding midfielder screens, and the No. 10 operates behind the two strikers who split wide, creating central spaces for late runs.',
    defensiveShapeExplanation: 'Out of possession, the team forms a narrow central block. The midfield diamond chokes the center of the pitch. Shuttling box-to-box midfielders slide wide to defend wide threat passes.',
    overview: 'The 4-3-1-2 is a central-heavy formation that maximizes midfield numbers and two-striker pressure. Utilizing a diamond midfield (one holding, two box-to-box, and one attacking midfielder), it allows teams to dominate central areas and overload opponents. Since it lacks natural width, it relies on athletic fullbacks to cover the flanks in possession.',
    strengths: [
      'Devastating central dominance with a 4-man midfield diamond.',
      'Permanent 2v2 matchup for the two strikers against opposing center backs.',
      'Excellent platform for quick combinations through the creative No. 10.',
      'Perfect for squads that lack natural wide wingers.'
    ],
    weaknesses: [
      'Lacks natural width, making it easy for opponents to block the center and isolate attacks.',
      'Places massive defensive and offensive work rates on the fullbacks to cover wide areas.',
      'Can become too congested in the final third if midfielders do not make lateral runs.'
    ],
    keyRoles: {
      gk: { name: 'Balanced Goalkeeper', description: 'Acts as a passing outlet for the diamond and coordinates the defense.' },
      cb: { name: 'Strong Center Backs', description: 'Must stay disciplined, defend central threats, and pass cleanly to the holding midfielder.' },
      fb: { name: 'Wingback-Style Fullbacks', description: 'Responsible for providing the entire width of the team. Must attack and recover.' },
      cdm: { name: 'Diamond Anchor (No. 6)', description: 'Sits deep, screens passing lanes, covers for advancing fullbacks, and dictates play.' },
      cm: { name: 'Shuttling Midfielders (x2)', description: 'Left and right of the diamond; must slide wide to cover flanks and run forward to support attacks.' },
      cam: { name: 'Creative Tip (No. 10)', description: 'Sits at the top of the diamond, linking the midfield to the two strikers with key passes.' },
      st: { name: 'Two-Striker Pair', description: 'Combine together, drag center backs wide to create space for the No. 10, and finish chances.' }
    },
    attackingPrinciples: [
      'Fullbacks push high and wide to create width.',
      'Strikers split to pull opposing center backs apart.',
      'No. 10 operates in the central spaces between lines.',
      'Holding midfielder dictates build-up centrally.'
    ],
    defensivePrinciples: [
      'Choke central spaces with the narrow diamond.',
      'Shuttling midfielders slide wide to block crosses.',
      'Strikers screen passes into opponent pivots.',
      'Keep lines compact to force play wide.'
    ],
    transitionPrinciples: {
      attacking: 'Pass immediately to No. 10 or strikers to combine centrally while fullbacks sprint to provide wide outlets.',
      defensive: 'Holding No. 6 screen holds position. Shuttling midfielders slide wide to delay, allowing fullbacks to recover.'
    },
    trainingTopics: [
      {
        title: 'Central Overloads with Midfield Diamond',
        setup: '4v3 central possession game. Midfielders must circulate ball through the diamond (No. 6, two 8s, No. 10) to progress.',
        coachingPoints: 'Body position. Quick passing. No. 10 finding pockets of space.',
        matchLink: 'Establishes central dominance and midfield control in games.'
      },
      {
        title: 'Fullback Integration and Wide Outlets',
        setup: 'Diamond midfield building centrally. When the opponent compacts the center, players must switch wide to overlapping fullbacks.',
        coachingPoints: 'Timing of fullback run. Switch passes. Rest defense behind.',
        matchLink: 'Creates our attacking width in possession.'
      },
      {
        title: 'Shuttling Midfielders Slide Coverage',
        setup: 'Defending wide attacks. The opponent attacks wide. The shuttling midfielder must slide wide to cover, supported by the fullback.',
        coachingPoints: 'Coordination between midfielder and fullback. Denying the cross. No. 6 covering the box.',
        matchLink: 'Prevents our flanks from getting overloaded.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Are our fullbacks fit enough to cover the flanks?',
        'Do the shuttling midfielders know their sliding boundaries?',
        'Do the strikers know how to stretch opponent CBs?'
      ],
      during: [
        'Are fullbacks pushing high enough, or are we playing too narrow?',
        'Are shuttling midfielders sliding wide defensively?',
        'Is our No. 10 finding space between lines?'
      ],
      halftime: [
        'Is the opponent packing the center and blocking our No. 10?',
        'Are our fullbacks getting caught out of possession?',
        'Do we need to split strikers wider to create space?'
      ],
      after: [
        'Did our diamond dominate central midfield?',
        'Did fullbacks provide enough width?',
        'Did shuttling midfielders slide wide effectively?'
      ]
    },
    commonProblems: [
      'Team plays too narrow, making attacks predictable.',
      'Fullbacks get exhausted and caught high on counters.',
      'Shuttling midfielders fail to slide, exposing flanks.'
    ],
    fixes: [
      'Coach strikers to make runs into channels to create width.',
      'Ensure one central midfielder sits deep when one fullback attacks.',
      'Train box-to-box midfielders on shifting wide out of possession.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 80, y: 230, label: 'CM' },
      { x: 150, y: 215, label: 'CDM' },
      { x: 220, y: 230, label: 'CM' },
      { x: 150, y: 145, label: 'CAM' },
      { x: 110, y: 75, label: 'ST' },
      { x: 190, y: 75, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 150, y: 235, label: 'CDM' },
      { x: 50, y: 120, label: 'LB' },
      { x: 110, y: 130, label: 'LCM' },
      { x: 190, y: 130, label: 'RCM' },
      { x: 250, y: 120, label: 'RB' },
      { x: 150, y: 80, label: 'CAM' },
      { x: 115, y: 65, label: 'ST' },
      { x: 185, y: 65, label: 'ST' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 150, y: 240, label: 'CDM' },
      { x: 90, y: 210, label: 'LCM' },
      { x: 210, y: 210, label: 'RCM' },
      { x: 150, y: 170, label: 'CAM' },
      { x: 120, y: 110, label: 'ST' },
      { x: 180, y: 110, label: 'ST' }
    ]
  },
  {
    id: '4-5-1',
    name: '4-5-1',
    category: 'four-at-back',
    shortDesc: 'Extremely defensive, flat midfield structure built for compactness and low-risk counterattacking.',
    bestFor: 'Teams needing midfield protection, defensive compactness, a hard-to-beat identity, and counterattacking opportunities.',
    avoidIf: 'Avoid when you need to score multiple goals to win, when you are the dominant team, or when you lack an athletic striker to run channels.',
    defaultShape: 'Back four, flat midfield bank of five, and one striker.',
    recommendedAttackingShape: '2-4-4 or 3-2-5',
    recommendedDefensiveShape: '4-5-1 flat mid-block',
    fallbackDefensivePrinciple: 'Recover immediately into a flat midfield bank of five. Compress the center and force the opponent to play wide.',
    attackingShapeExplanation: 'In possession, wide midfielders push high to support the lone striker, while one central midfielder breaks forward. Fullbacks step up to provide outlets, shifting the team into a 2-4-4 or 3-2-5 shape to threaten the opponent.',
    defensiveShapeExplanation: 'Out of possession, the team forms a flat midfield line of five in front of the back four. This denies all central space and forces the opponent wide.',
    overview: 'The 4-5-1 is a highly structured defensive formation designed to deny space across the entire pitch. By utilizing a flat bank of five midfielders in front of a back four, it leaves virtually no space for opponents to build attacks. It is a low-risk, defensive setup ideal for underdog teams, men\'s/women\'s amateur teams seeking organization, or when defending against technical opposition.',
    strengths: [
      'Outstanding defensive compactness covering the entire width of the midfield.',
      'Extremely difficult to break down, minimizing conceding chances.',
      'Provides a simple, structured system that requires minimal training time.',
      'Excellent platform for long-range counterattacks.'
    ],
    weaknesses: [
      'The lone striker can easily become isolated, holding up the ball with no support.',
      'Very difficult to score goals or control possession in the opponent\'s half.',
      'Can lead to defending too deep if the midfield line is not encouraged to step up.'
    ],
    keyRoles: {
      gk: { name: 'Shot Stopper', description: 'Must excel at claiming crosses and distributing quickly to start counterattacks.' },
      cb: { name: 'Defensive-First CBs', description: 'Stay disciplined, win central duels, and clear threats immediately.' },
      fb: { name: 'Conservative Fullbacks', description: 'Focus heavily on defensive duties, staying deep to support the back line.' },
      cm: { name: 'Central Midfield Trio', description: 'Maintain a flat, compact line of three, blocking passing lanes and tackling playmakers.' },
      winger: { name: 'Hard-Working Wide Midfielders', description: 'Sprint back to defend and lead counterattacks down the flanks.' },
      st: { name: 'Pacey Lone Striker', description: 'Must chase clearances, hold up play under pressure, and run channel spaces.' }
    },
    attackingPrinciples: [
      'Sustain supporting runs from midfield to help the striker.',
      'Wide midfielders provide width in transition.',
      'Keep three players behind the ball to maintain rest defense.',
      'Minimize risk in central areas.'
    ],
    defensivePrinciples: [
      'Form a flat midfield bank of five out of possession.',
      'Keep lines compact vertically and horizontally.',
      'Force the opponent wide to low-risk areas.',
      'Midfielders shift side-to-side together.'
    ],
    transitionPrinciples: {
      attacking: 'Play a direct release pass to the lone striker or into the channels for wide midfielders sprinting forward.',
      defensive: 'Drop off immediately into the compact 4-5-1 shape, compressing spaces and forcing the opponent wide.'
    },
    trainingTopics: [
      {
        title: 'Shifting the Midfield Bank of Five',
        setup: 'Tactical shifting on a half-pitch. The midfield bank of five shifts together to deny gaps as the opponent passes.',
        coachingPoints: 'Stay connected. Slide as a unit. Do not get drawn out of line.',
        matchLink: 'Ensures the opponent cannot play through our midfield.'
      },
      {
        title: 'Counterattacking Transitions in the 4-5-1',
        setup: 'Defending team wins ball in their own third and must release to the striker or wide midfielders to score inside 12 seconds.',
        coachingPoints: 'Direct release passes. Wide midfielders sprinting forward. Striker hold-up play.',
        matchLink: 'Maximizes our counterattacking threat on match day.'
      },
      {
        title: 'Lone Striker Hold-Up Play',
        setup: 'Striker receives a long pass under pressure from 2 center backs and must shield the ball until support arrives.',
        coachingPoints: 'Use body to shield. Look for wide outlets. Support runs from midfield.',
        matchLink: 'Prevents our striker from getting isolated.'
      }
    ],
    matchDayChecklist: {
      before: [
        'Do players understand their recovery positions in the flat five?',
        'Is the striker prepared to chase clearances under pressure?',
        'Do fullbacks know when to support wide areas?'
      ],
      during: [
        'Are our five midfielders staying connected, or are gaps opening up?',
        'Is our lone striker isolated, or getting support quickly?',
        'Are wide players recovering to help their fullbacks?'
      ],
      halftime: [
        'Are we defending too deep and conceding shots from distance?',
        'Are wide midfielders recovering fast enough?',
        'Do we need to release the ball quicker on the counter?'
      ],
      after: [
        'Did our midfield bank remain compact?',
        'Did our lone striker hold up the ball successfully?',
        'What was our main breakdown point in transitions?'
      ]
    },
    commonProblems: [
      'Lone striker is starved of support and loses possession.',
      'The midfield bank drops too deep, creating a shooting gallery.',
      'Wide players are too exhausted to join counterattacks.'
    ],
    fixes: [
      'Instruct one central midfielder to break forward past the striker in possession.',
      'Encourage the midfield line to stay higher (mid-block) rather than dropping into our box.',
      'Set clear recovery lines and rotate wide players frequently.'
    ],
    positions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 110, y: 310, label: 'CB' },
      { x: 190, y: 310, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 45, y: 190, label: 'LM' },
      { x: 105, y: 205, label: 'CM' },
      { x: 150, y: 195, label: 'CM' },
      { x: 195, y: 205, label: 'CM' },
      { x: 255, y: 190, label: 'RM' },
      { x: 150, y: 75, label: 'ST' }
    ],
    attackingPositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 50, y: 210, label: 'LB' },
      { x: 110, y: 220, label: 'LCM' },
      { x: 190, y: 220, label: 'RCM' },
      { x: 250, y: 210, label: 'RB' },
      { x: 45, y: 90, label: 'LM' },
      { x: 150, y: 95, label: 'CM' },
      { x: 255, y: 90, label: 'RM' },
      { x: 150, y: 70, label: 'ST' }
    ],
    defensivePositions: [
      { x: 150, y: 370, label: 'GK' },
      { x: 50, y: 300, label: 'LB' },
      { x: 115, y: 315, label: 'CB' },
      { x: 185, y: 315, label: 'CB' },
      { x: 250, y: 300, label: 'RB' },
      { x: 45, y: 200, label: 'LM' },
      { x: 105, y: 210, label: 'CM' },
      { x: 150, y: 200, label: 'CM' },
      { x: 195, y: 210, label: 'CM' },
      { x: 255, y: 200, label: 'RM' },
      { x: 150, y: 120, label: 'ST' }
    ]
  }
];

export function getFormation(id) {
  return FORMATIONS.find(f => f.id === id);
}
