import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Article } from '@shared/types/catalog';
import { catalogApi } from '../api/adapters/catalog';
import { PageHeader } from '../components/ui';

export function JournalPage() {
  const { articleId } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article | null | undefined>(articleId ? undefined : null);

  useEffect(() => {
    void catalogApi.articles().then(setArticles);
  }, []);

  useEffect(() => {
    if (!articleId) {
      setArticle(null);
      return;
    }
    void catalogApi.getArticle(articleId).then(setArticle);
  }, [articleId]);

  if (articleId) {
    if (article === undefined) {
      return <div className="empty">Loading…</div>;
    }
    if (!article) {
      return <div className="empty card"><h3>Article not found</h3></div>;
    }
    return (
      <article style={{ maxWidth: 720 }}>
        <PageHeader kicker={article.month} title={article.title} lead={`${article.minutes} min read`} />
        {article.body.map(paragraph => (
          <p key={paragraph} style={{ lineHeight: 1.7, color: 'var(--sage)' }}>{paragraph}</p>
        ))}
        <Link to="/journal" style={{ textDecoration: 'underline', fontWeight: 700 }}>Back to Journal</Link>
      </article>
    );
  }

  return (
    <div>
      <PageHeader kicker="Journal" title="From the lounge" lead="Short notes on grooming and life inside 1847." />
      <div className="grid-2">
        {articles.map(item => (
          <Link key={item.id} to={`/journal/${item.id}`} className="card">
            <p className="kicker">{item.month}</p>
            <h2 className="serif" style={{ margin: '8px 0 0', fontSize: 24 }}>{item.title}</h2>
            <p style={{ color: 'var(--muted)', marginTop: 8 }}>{item.excerpt}</p>
            <p style={{ marginTop: 10, fontSize: 12, color: 'var(--placeholder)' }}>{item.minutes} min</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
