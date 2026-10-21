import type { Metadata } from "next";

// Client demos are standalone HTML files in public/demos/<slug>/demo.html.
// This route gives them a clean URL (/demos/<slug>/) that forwards to the file.
// Plain HTML redirect (meta refresh + location.replace) because next/navigation's
// redirect() does not fire in the static export.
const DEMOS = ["platterie-box", "cotridis-b2b"];

export const dynamicParams = false;

export async function generateStaticParams() {
  return DEMOS.map((slug) => ({ slug }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = `/demos/${slug}/demo.html`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <script
        dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(href)})` }}
      />
      <p style={{ padding: "120px 16px", textAlign: "center" }}>
        <a href={href}>Άνοιγμα demo →</a>
      </p>
    </>
  );
}
