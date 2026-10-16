import { StoryPage } from '../../components/organisms/StoryPage';
import { careParagraphs, careStats } from '../../data/stories';

export function CareScreen() {
  const figures = careStats.map(stat => `${stat.figure} — ${stat.label}`);
  return (
    <StoryPage
      kicker="Care"
      title="Driven by purpose, grounded in care."
      paragraphs={[...careParagraphs, ...figures]}
    />
  );
}
