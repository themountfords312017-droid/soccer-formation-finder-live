import { navigate } from '../router.js';

export function renderReviewsPage(container) {
  const html = `
    <div class="container animate-fade-in mt-5 mb-6">
      
      <!-- Hero Header -->
      <div class="text-center mb-6">
        <span class="tag tag-accent mb-3">Coach Testimonials</span>
        <h1 class="font-heading fw-800">Coach Feedback & Reviews</h1>
        <p class="text-secondary mx-auto" style="max-width: 600px; font-size: var(--text-md);">
          Read how grassroots, high school, academy, and amateur league coaches use their Team Tactical Blueprints to organize their squads and training.
        </p>
      </div>

      <!-- Reviews Grid -->
      <div class="grid-3 mb-6" style="gap: var(--space-4);">
        
        <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
          <div>
            <div style="color: var(--color-accent); font-size: var(--text-sm); margin-bottom: var(--space-2);">⭐⭐⭐⭐⭐</div>
            <p class="text-secondary" style="font-size: var(--text-sm); line-height: 1.5; font-style: italic; margin-bottom: var(--space-3);">
              "Our players were always running out of position and we conceded far too many counterattacks. The Formation Finder matched us to a double-pivot system, and for the first time, our back four had protection. The halftime troubleshooting points helped us salvage a draw in our last game."
            </p>
          </div>
          <div>
            <h4 class="font-heading mb-1" style="font-size: var(--text-sm);">Coach Mark S.</h4>
            <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">Michigan, USA | U14 Grassroots Boys</p>
          </div>
        </div>

        <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
          <div>
            <div style="color: var(--color-accent); font-size: var(--text-sm); margin-bottom: var(--space-2);">⭐⭐⭐⭐⭐</div>
            <p class="text-secondary" style="font-size: var(--text-sm); line-height: 1.5; font-style: italic; margin-bottom: var(--space-3);">
              "I only get one training session a week with my team. We were trying to play a highly complex system that confused the players. The tool diagnosed our issues and suggested simplifying into a balanced 4-4-2. The weekly syllabus transformed how we structure our training."
            </p>
          </div>
          <div>
            <h4 class="font-heading mb-1" style="font-size: var(--text-sm);">Coach Sarah L.</h4>
            <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">Lancashire, UK | High School Varsity Girls</p>
          </div>
        </div>

        <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
          <div>
            <div style="color: var(--color-accent); font-size: var(--text-sm); margin-bottom: var(--space-2);">⭐⭐⭐⭐⭐</div>
            <p class="text-secondary" style="font-size: var(--text-sm); line-height: 1.5; font-style: italic; margin-bottom: var(--space-3);">
              "We had two excellent strikers but kept getting overrun in central midfield. The 3-5-2 blueprint solved both. The explanation of the 'Attacking Five' vertical channels helped our wingbacks understand exactly when to overlap and when to sit."
            </p>
          </div>
          <div>
            <h4 class="font-heading mb-1" style="font-size: var(--text-sm);">Coach David K.</h4>
            <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">Victoria, Aus | Adult Amateur Men</p>
          </div>
        </div>

        <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
          <div>
            <div style="color: var(--color-accent); font-size: var(--text-sm); margin-bottom: var(--space-2);">⭐⭐⭐⭐⭐</div>
            <p class="text-secondary" style="font-size: var(--text-sm); line-height: 1.5; font-style: italic; margin-bottom: var(--space-3);">
              "A brilliant diagnostic tool. This is not a random formation quiz. It identified that our center backs lacked recovery pace and guided us to a compact mid-block setup. It saved us months of trial and error."
            </p>
          </div>
          <div>
            <h4 class="font-heading mb-1" style="font-size: var(--text-sm);">Coach Robert M.</h4>
            <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">Toronto, Can | U16 Academy Girls</p>
          </div>
        </div>

        <div class="card card-hover flex-col" style="justify-content: space-between; padding: var(--space-4);">
          <div>
            <div style="color: var(--color-accent); font-size: var(--text-sm); margin-bottom: var(--space-2);">⭐⭐⭐⭐⭐</div>
            <p class="text-secondary" style="font-size: var(--text-sm); line-height: 1.5; font-style: italic; margin-bottom: var(--space-3);">
              "I'm a new coach and didn't know how to explain attacking shapes or transitions. The blueprint's visual board and coaching notes helped me simplify complex tactics into clear directions. The players have so much more confidence now."
            </p>
          </div>
          <div>
            <h4 class="font-heading mb-1" style="font-size: var(--text-sm);">Coach James T.</h4>
            <p class="text-muted" style="font-size: var(--text-xs); margin-bottom: 0;">Ohio, USA | U13 Boys Competitive</p>
          </div>
        </div>
      </div>

      <!-- CTA block -->
      <div class="card card-highlight text-center max-width-600 mx-auto" style="max-width: 600px; padding: var(--space-5);">
        <h3 class="font-heading mb-3">Generate Your Custom Blueprint</h3>
        <p class="text-secondary mb-4" style="font-size: var(--text-sm); line-height: 1.5;">
          Ready to diagnose your squad's profile and receive your recommended formation, attacking structure, and weekly syllabus?
        </p>
        <button id="reviews-start-btn" class="btn btn-primary">Start the Formation Finder</button>
      </div>

    </div>
  `;
  container.innerHTML = html;

  // Add click handler
  container.querySelector('#reviews-start-btn').addEventListener('click', () => navigate('#/quiz'));
}
