// lib/contentful.ts
// Shared fetch helpers for Contentful articles

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string | null;
  categoryClass: string;
  categoryTextClass: string;
}

// Map category names to Tailwind color classes
function categoryStyles(category: string) {
  const map: Record<
    string,
    { categoryClass: string; categoryTextClass: string }
  > = {
    "Web Development": {
      categoryClass: "bg-primary text-on-primary",
      categoryTextClass: "text-primary",
    },
    "E-commerce": {
      categoryClass: "bg-secondary/10 text-secondary",
      categoryTextClass: "text-secondary",
    },
    SEO: {
      categoryClass: "bg-tertiary/10 text-tertiary",
      categoryTextClass: "text-tertiary",
    },
    "Business Growth": {
      categoryClass: "bg-secondary/10 text-secondary",
      categoryTextClass: "text-secondary",
    },
  };
  return (
    map[category] ?? {
      categoryClass: "bg-primary/10 text-primary",
      categoryTextClass: "text-primary",
    }
  );
}

export async function getAllArticles(): Promise<Article[]> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

  const url =
    `https://cdn.contentful.com/spaces/${spaceId}/entries` +
    `?content_type=blogPost&order=-fields.date&include=1&access_token=${accessToken}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) return [];

  const data = await res.json();

  if (!data.items?.length) return [];

  return data.items.map((item: any) => {
    const fields = item.fields;

    const imageAsset = data.includes?.Asset?.find(
      (a: any) => a.sys.id === fields.coverImage?.sys?.id,
    );

    return {
      slug: fields.slug ?? "",
      title: fields.title ?? "",
      excerpt: fields.excerpt ?? "",
      category: fields.category ?? "",
      readTime: fields.readTime ?? "5 min read",
      date: fields.date ?? "",
      coverImage: imageAsset ? `https:${imageAsset.fields.file.url}` : null,
      ...categoryStyles(fields.category ?? ""),
    };
  });
}
