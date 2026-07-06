import { getFaqs } from "@/server/faqs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const [faqs, postRes] = await Promise.all([
    getFaqs(),
    fetch(`${process.env.APP_URL}/blogs/${slug}`, {
      cache: "no-store",
    }),
  ]);

  const json = await postRes.json();
  const post = json.data.post;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {post.title}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {faqs?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-4xl font-bold mb-6">
            Frequently Asked Questions (FAQs)
          </h2>

          <div className="space-y-4">
            {faqs.map((faq: any) => (
              <details
                key={faq.id}
                className="group overflow-hidden rounded-lg"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-[#006d9f] px-6 py-5 text-xl font-semibold text-white sm:text-xl">
                  <span>{faq.question}</span>

                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>

                <div className="border border-t-0 rounded-b-lg p-5">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}