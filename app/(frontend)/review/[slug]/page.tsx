"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import { FaCamera, FaStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

import { searchCompanies } from "@/server/company";
import { submitReview } from "@/server/review";
import { getStates, getCitiesByState } from "@/server/registration";

import type { CompanyDetails } from "@/types/company";
import type { CityOption, StateOption } from "@/types/registration";
import type { ReviewFormData } from "@/types/review";

const US_COUNTRY_ID = "1";

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "PKR", value: "PKR" },
  { label: "GBP", value: "GBP" },
  { label: "EUR", value: "EUR" },
  { label: "CAD", value: "CAD" },
];

const moveTypeOptions = [
  { label: "Local Move", value: "local_move" },
  { label: "Long Distance Move", value: "long_distance_move" },
  { label: "International Move", value: "international_move" },
  { label: "Office Move", value: "office_move" },
  { label: "Storage Move", value: "storage_move" },
];

const moveSizeOptions = [
  { label: "Studio", value: "studio" },
  { label: "1 Bedroom", value: "one_bedroom" },
  { label: "2 Bedrooms", value: "two_bedroom" },
  { label: "3 Bedrooms", value: "three_bedroom" },
  { label: "4+ Bedrooms", value: "four_plus_bedroom" },
  { label: "Office", value: "office" },
];

const imageFields = ["image1", "image2", "image3"] as const;

const initialFormData: ReviewFormData = {
  company_id: "",
  name: "",
  email: "",
  overall_rating: 0,
  review_subject: "",
  your_review: "",
  service_cost: "",
  currency: "USD",
  move_type: "",
  move_size: "",
  quote: "",
  pick_up_country_id: US_COUNTRY_ID,
  pick_up_state_id: "",
  pick_up_city_id: "",
  delivery_country_id: US_COUNTRY_ID,
  delivery_state_id: "",
  delivery_city_id: "",
  image1: null,
  image2: null,
  image3: null,
};

type SelectOption = {
  label: string;
  value: string;
};

type RouteType = "pick_up" | "delivery";

function humanizeSlug(slug: string) {
  return slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getCompanyName(company: CompanyDetails | null, slug: string) {
  return company?.label || company?.value || humanizeSlug(slug);
}

function getCompanyBasedIn(company: CompanyDetails | null) {
  return company?.address || "";
}

function normalizeImageUrl(path?: string | null) {
  if (!path) {
    return "";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000/api"
  ).replace(/\/api\/?$/, "");

  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

function toSelectOptions(items: Array<{ id: string | number; name: string }>) {
  return items.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));
}

function PageTitleCard({
  company,
  slug,
}: {
  company: CompanyDetails | null;
  slug: string;
}) {
  const companyName = getCompanyName(company, slug);
  const basedIn = getCompanyBasedIn(company);
  const imageUrl = normalizeImageUrl(company?.image);

  return (
    <section className="mx-auto w-[100%] mt-[46px] flex w-full max-w-[760px] items-center rounded-[16px] bg-white px-[32px] py-[30px] shadow-[0_8px_28px_rgba(15,23,42,0.08)] lg:max-w-[760px] md:max-w-[720px] sm:max-w-[92%] max-sm:mt-[28px] max-sm:flex-col max-sm:items-start max-sm:px-[20px] max-sm:py-[22px]">
      <div className="flex h-[76px] w-[160px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#f3f5f6] max-sm:h-[70px] max-sm:w-[140px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={companyName}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="px-3 text-center text-[12px] font-semibold text-slate-500">
            Company Image
          </span>
        )}
      </div>

      <div className="ml-[22px] max-sm:ml-0 max-sm:mt-[16px]">
        <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#141414] md:text-[32px] sm:text-[30px] max-sm:text-[27px]">
          {companyName}
        </h1>

        {basedIn ? (
          <div className="mt-[11px] inline-flex rounded-[4px] bg-[#eff3f5] px-[10px] py-[6px] text-[13px] font-medium text-[#8b98a1]">
            Based In: {basedIn}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FormSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-[#111111] max-sm:text-[21px]">
        {title}
      </h2>

      {children}
    </section>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      value={value}
      type={type}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-[43px] w-full rounded-[6px] border border-[#0d75a5] bg-white px-[14px] text-[13px] font-medium text-[#1f2937] outline-none placeholder:text-[#6f7d86] focus:border-[#075f86] focus:ring-2 focus:ring-[#0d75a5]/15"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  minHeight = "82px",
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minHeight?: string;
  required?: boolean;
}) {
  return (
    <textarea
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      style={{ minHeight }}
      className="w-full resize-none rounded-[6px] border border-[#0d75a5] bg-white px-[14px] py-[13px] text-[13px] font-medium text-[#1f2937] outline-none placeholder:text-[#6f7d86] focus:border-[#075f86] focus:ring-2 focus:ring-[#0d75a5]/15"
    />
  );
}

function SelectInput({
  value,
  onChange,
  placeholder,
  options,
  required = false,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        required={required}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-[36px] w-full appearance-none rounded-[4px] border border-[#0d75a5] bg-white px-[9px] pr-[30px] text-[12px] font-medium text-[#1f2937] outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-[#075f86] focus:ring-2 focus:ring-[#0d75a5]/15"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <FiChevronDown className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[14px] text-[#222]" />
    </div>
  );
}

function RatingStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="mt-[14px] flex items-center gap-[10px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoveredRating || value);

        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} star rating`}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => onChange(star)}
            className="text-[22px] transition-transform duration-150 hover:scale-110"
          >
            <FaStar
              className={isActive ? "text-[#f7b731]" : "text-[#7d858b]"}
            />
          </button>
        );
      })}
    </div>
  );
}

function ImageUploadBox({
  id,
  file,
  onChange,
}: {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;

    onChange(selectedFile);
  }

  return (
    <label
      htmlFor={id}
      className="flex h-[42px] cursor-pointer items-center rounded-[6px] border border-[#0d75a5] bg-white px-[14px] text-[13px] font-medium text-[#26323a] transition hover:bg-[#f7fbfd]"
    >
      <FaCamera className="mr-[12px] text-[15px] text-[#111]" />

      <span className="truncate">{file ? file.name : "Add Image"}</span>

      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}

function RouteRow({
  countryValue,
  stateValue,
  cityValue,
  states,
  cities,
  statePlaceholder,
  cityPlaceholder,
  cityDisabled,
  onCountryChange,
  onStateChange,
  onCityChange,
}: {
  countryValue: string;
  stateValue: string;
  cityValue: string;
  states: SelectOption[];
  cities: SelectOption[];
  statePlaceholder: string;
  cityPlaceholder: string;
  cityDisabled: boolean;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
}) {
  return (
    <div className="mt-[10px] flex gap-[9px] sm:flex-row max-sm:flex-col">
      <SelectInput
        value={countryValue}
        placeholder="Country"
        required
        options={[{ label: "United States", value: US_COUNTRY_ID }]}
        onChange={onCountryChange}
      />

      <SelectInput
        value={stateValue}
        placeholder={statePlaceholder}
        required
        options={states}
        onChange={onStateChange}
      />

      <SelectInput
        value={cityValue}
        placeholder={cityPlaceholder}
        required
        disabled={cityDisabled}
        options={cities}
        onChange={onCityChange}
      />
    </div>
  );
}

export default function ReviewPage() {
  const params = useParams();

  const slug = useMemo(() => {
    const paramSlug = params?.slug;

    if (Array.isArray(paramSlug)) {
      return paramSlug[0] || "";
    }

    return String(paramSlug || "");
  }, [params]);

  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [states, setStates] = useState<StateOption[]>([]);
  const [pickUpCities, setPickUpCities] = useState<CityOption[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<CityOption[]>([]);
  const [formData, setFormData] = useState<ReviewFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const stateOptions = useMemo(() => toSelectOptions(states), [states]);

  const pickUpCityOptions = useMemo(
    () => toSelectOptions(pickUpCities),
    [pickUpCities]
  );

  const deliveryCityOptions = useMemo(
    () => toSelectOptions(deliveryCities),
    [deliveryCities]
  );

  useEffect(() => {
    async function loadPageData() {
      try {
        setIsLoading(true);
        setPageError("");

        const companySearchText = decodeURIComponent(slug)
          .replaceAll("-", " ")
          .trim();

        const [companiesResult, statesResult] = await Promise.all([
          searchCompanies(companySearchText),
          getStates(),
        ]);

        const selectedCompany =
          companiesResult.data?.find((item) => item.slug === slug) ||
          companiesResult.data?.[0] ||
          null;

        setCompany(selectedCompany);
        setStates(statesResult);

        if (selectedCompany?.id) {
          setFormData((previous) => ({
            ...previous,
            company_id: String(selectedCompany.id),
          }));
        }
      } catch (error) {
        setPageError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      loadPageData();
    }
  }, [slug]);

  function updateField<K extends keyof ReviewFormData>(
    field: K,
    value: ReviewFormData[K]
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleRouteStateChange(stateId: string, routeType: RouteType) {
    if (routeType === "pick_up") {
      updateField("pick_up_state_id", stateId);
      updateField("pick_up_city_id", "");
      setPickUpCities([]);
    }

    if (routeType === "delivery") {
      updateField("delivery_state_id", stateId);
      updateField("delivery_city_id", "");
      setDeliveryCities([]);
    }

    if (!stateId) {
      return;
    }

    const cities = await getCitiesByState(stateId);

    if (routeType === "pick_up") {
      setPickUpCities(cities);
      return;
    }

    setDeliveryCities(cities);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitMessage("");
    setPageError("");

    if (!formData.company_id) {
      setPageError("Company not found. Please refresh and try again.");
      return;
    }

    if (formData.overall_rating < 1) {
      setPageError("Please select your rating.");
      return;
    }

    if (formData.your_review.trim().length < 100) {
      setPageError("Review must be at least 100 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      await submitReview(slug, formData);

      setSubmitMessage("Review submitted successfully.");

      setFormData({
        ...initialFormData,
        company_id: formData.company_id,
      });

      setPickUpCities([]);
      setDeliveryCities([]);
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : "Failed to submit review"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-[100vw] bg-white pb-[44px] mt-35">
      <div className="mx-auto w-full max-w-[1180px] px-4 lg:px-0 md:px-6 sm:px-5 max-sm:px-4">
        <PageTitleCard
          company={company}
          slug={slug}
        />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-[38px] w-full max-w-[760px] bg-[#eef6fa] px-[26px] pb-[16px] pt-[24px] lg:max-w-[760px] md:max-w-[720px] sm:max-w-[92%] max-sm:mt-[28px] max-sm:px-[18px] max-sm:pt-[22px]"
        >
          {isLoading ? (
            <div className="py-8 text-center text-[14px] font-medium text-slate-500">
              Loading form...
            </div>
          ) : (
            <>
              <FormSection title="Give Your Rating">
                <RatingStars
                  value={formData.overall_rating}
                  onChange={(value) => updateField("overall_rating", value)}
                />

                <div className="mt-[28px]">
                  <TextInput
                    value={formData.review_subject}
                    placeholder="Enter Subject"
                    required
                    onChange={(value) => updateField("review_subject", value)}
                  />
                </div>

                <div className="mt-[18px]">
                  <TextArea
                    value={formData.your_review}
                    placeholder="Review"
                    required
                    minHeight="82px"
                    onChange={(value) => updateField("your_review", value)}
                  />
                </div>

                <div className="mt-[10px] text-right text-[12px] font-medium text-[#333]">
                  {formData.your_review.length} characters (min100)
                </div>
              </FormSection>

              <FormSection
                title="Service Information"
                className="mt-[16px] pl-[10px] max-sm:pl-0"
              >
                <div className="mt-[26px] flex gap-[13px] sm:flex-row max-sm:flex-col">
                  <div className="flex-1">
                    <TextInput
                      value={formData.service_cost}
                      type="number"
                      placeholder="Service Cost"
                      required
                      onChange={(value) => updateField("service_cost", value)}
                    />
                  </div>

                  <div className="w-[170px] max-sm:w-full">
                    <SelectInput
                      value={formData.currency}
                      placeholder="Currency"
                      required
                      options={currencyOptions}
                      onChange={(value) => updateField("currency", value)}
                    />
                  </div>
                </div>
              </FormSection>

              <FormSection
                title="What Did You Move?"
                className="mt-[26px] pl-[10px] max-sm:pl-0"
              >
                <div className="mt-[20px]">
                  <SelectInput
                    value={formData.move_type}
                    placeholder="Select an option"
                    required
                    options={moveTypeOptions}
                    onChange={(value) => updateField("move_type", value)}
                  />
                </div>

                <div className="mt-[13px]">
                  <SelectInput
                    value={formData.move_size}
                    placeholder="Select Move Size"
                    required
                    options={moveSizeOptions}
                    onChange={(value) => updateField("move_size", value)}
                  />
                </div>

                <div className="mt-[18px]">
                  <TextArea
                    value={formData.quote}
                    placeholder="Quote or order ID (optional)"
                    minHeight="74px"
                    onChange={(value) => updateField("quote", value)}
                  />
                </div>
              </FormSection>

              <FormSection
                title="Moving Route"
                className="mt-[22px] pl-[10px] max-sm:pl-0"
              >
                <RouteRow
                  countryValue={formData.pick_up_country_id}
                  stateValue={formData.pick_up_state_id}
                  cityValue={formData.pick_up_city_id}
                  states={stateOptions}
                  cities={pickUpCityOptions}
                  statePlaceholder="Select Pick-Up State"
                  cityPlaceholder="Select Pick-Up City"
                  cityDisabled={!formData.pick_up_state_id}
                  onCountryChange={(value) =>
                    updateField("pick_up_country_id", value)
                  }
                  onStateChange={(value) =>
                    handleRouteStateChange(value, "pick_up")
                  }
                  onCityChange={(value) =>
                    updateField("pick_up_city_id", value)
                  }
                />

                <RouteRow
                  countryValue={formData.delivery_country_id}
                  stateValue={formData.delivery_state_id}
                  cityValue={formData.delivery_city_id}
                  states={stateOptions}
                  cities={deliveryCityOptions}
                  statePlaceholder="Select Delivery State"
                  cityPlaceholder="Select Delivery City"
                  cityDisabled={!formData.delivery_state_id}
                  onCountryChange={(value) =>
                    updateField("delivery_country_id", value)
                  }
                  onStateChange={(value) =>
                    handleRouteStateChange(value, "delivery")
                  }
                  onCityChange={(value) =>
                    updateField("delivery_city_id", value)
                  }
                />
              </FormSection>

              <FormSection
                title="Add Images"
                className="mt-[12px] pl-[10px] max-sm:pl-0"
              >
                <div className="mt-[12px] flex gap-[9px] sm:flex-row max-sm:flex-col">
                  {imageFields.map((field) => (
                    <div
                      key={field}
                      className="flex-1"
                    >
                      <ImageUploadBox
                        id={field}
                        file={formData[field]}
                        onChange={(file) => updateField(field, file)}
                      />
                    </div>
                  ))}
                </div>
              </FormSection>

              <FormSection
                title="Your Information"
                className="mt-[20px] pl-[10px] max-sm:pl-0"
              >
                <div className="mt-[26px]">
                  <TextInput
                    value={formData.name}
                    placeholder="Name"
                    required
                    onChange={(value) => updateField("name", value)}
                  />
                </div>

                <div className="mt-[13px]">
                  <TextInput
                    value={formData.email}
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(value) => updateField("email", value)}
                  />
                </div>
              </FormSection>

              {pageError ? (
                <p className="mt-[14px] rounded-[6px] bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                  {pageError}
                </p>
              ) : null}

              {submitMessage ? (
                <p className="mt-[14px] rounded-[6px] bg-green-50 px-4 py-3 text-[13px] font-medium text-green-700">
                  {submitMessage}
                </p>
              ) : null}

              <div className="mt-[12px] flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[33px] min-w-[132px] rounded-full bg-[#08658b] px-[22px] text-[12px] font-bold text-white transition hover:bg-[#064e6c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </>
          )}
        </form>

        <section className="mx-auto mt-[34px] w-full max-w-[760px] lg:max-w-[760px] md:max-w-[720px] sm:max-w-[92%]">
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111]">
            Recent Reviews
          </h2>
        </section>
      </div>
    </main>
  );
}