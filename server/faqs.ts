export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export async function getFaqs(): Promise<Faq[]> {
  // ===========================
  // Dummy Data (Remove Later)
  // ===========================
  return [
    {
      id: 1,
      question: "What is the best time of day to move in hot weather?",
      answer:
        "The best time is early morning or late evening when temperatures are lower.",
    },
    {
      id: 2,
      question: "How can I protect my furniture from heat during a summer move?",
      answer:
        "Wrap furniture properly and avoid leaving it in direct sunlight for long periods.",
    },
    {
      id: 3,
      question: "What should I wear when moving in the summer heat?",
      answer:
        "Wear lightweight, breathable clothing and comfortable shoes.",
    },
    {
      id: 4,
      question: "How do I prevent dehydration while moving in the heat?",
      answer:
        "Drink plenty of water, take breaks, and avoid excessive sun exposure.",
    },
    {
      id: 5,
      question: "Should I use air conditioning during my summer move?",
      answer:
        "Yes, keeping the AC on can help protect both people and certain belongings.",
    },
  ];

  // ==========================================
  // API Implementation (Uncomment When Ready)
  // ==========================================

  /*
  const res = await fetch(
    `${process.env.APP_URL}/faqs`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const json = await res.json();

  return json.data;
  */
}