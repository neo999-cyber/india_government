import Link from '@/components/Link';
import { STORY_INDEX } from '@/lib/story-index';

const APPROACHABLE_STORIES = STORY_INDEX.filter((story) => story.slug !== 'who-counts-the-dead');

export function GuidedStoryPicks({
  title = 'Three approachable places to begin',
}: {
  title?: string;
}) {
  return (
    <section className="story-picks" aria-labelledby="story-picks-title">
      <div className="story-picks-head">
        <div>
          <p className="home-kicker mono">Guided explanations</p>
          <h2 id="story-picks-title">{title}</h2>
        </div>
        <Link href="/stories/">See all seven stories →</Link>
      </div>
      <div className="story-picks-grid">
        {APPROACHABLE_STORIES.slice(0, 3).map((story) => (
          <Link key={story.slug} href={`/stories/${story.slug}/`}>
            <span className="mono">{story.topic}</span>
            <strong>{story.title}</strong>
            <small>Read the evidence step by step →</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
