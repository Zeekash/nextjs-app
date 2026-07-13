import type { ReviewFormData } from "@/types/review";


export async function submitReview(
  slug: string,
  formData: ReviewFormData
): Promise<unknown> {
  const body = new FormData();

  body.append("company_id", formData.company_id);
  body.append("name", formData.name);
  body.append("email", formData.email);
  body.append("overall_rating", String(formData.overall_rating));
  body.append("review_subject", formData.review_subject);
  body.append("your_review", formData.your_review);
  body.append("service_cost", formData.service_cost);
  body.append("currency", formData.currency);
  body.append("move_type", formData.move_type);
  body.append("move_size", formData.move_size);
  body.append("pick_up_country_id", formData.pick_up_country_id);
  body.append("pick_up_state_id", formData.pick_up_state_id);
  body.append("pick_up_city_id", formData.pick_up_city_id);
  body.append("delivery_country_id", formData.delivery_country_id);
  body.append("delivery_state_id", formData.delivery_state_id);
  body.append("delivery_city_id", formData.delivery_city_id);

  if (formData.quote) {
    body.append("quote", formData.quote);
  }

  if (formData.image1) {
    body.append("image1", formData.image1);
  }

  if (formData.image2) {
    body.append("image2", formData.image2);
  }

  if (formData.image3) {
    body.append("image3", formData.image3);
  }

  const response = await fetch(`http://localhost:8000/api/review/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message || "Failed to submit review");
  }

  return response.json();
}