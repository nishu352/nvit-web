import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleView from "@/components/layout/BlogArticleView";
import { BLOG_ARTICLES } from "@/config/resourcesContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_ARTICLES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) return { title: "Article Not Found" };

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://www.nvit.space/resources/blog/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.nvit.space/resources/blog/${article.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = BLOG_ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return <BlogArticleView article={article} />;
}
