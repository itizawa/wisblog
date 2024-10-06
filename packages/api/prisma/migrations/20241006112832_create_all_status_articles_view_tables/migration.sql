CREATE VIEW articles AS
  SELECT
    id,
    title,
    body,
    blog_id,
    author_id,
    created_at,
    updated_at,
    'publish' AS status
  FROM
    publish_articles


  UNION ALL

  SELECT
    id,
    title,
    body,
    blog_id,
    author_id,
    created_at,
    updated_at,
    'draft' AS status
  FROM
    draft_articles;