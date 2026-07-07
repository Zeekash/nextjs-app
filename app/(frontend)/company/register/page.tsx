"use client";

import { useEffect, useState } from "react";
import {
    registerCompany,
    getStates,
    getCitiesByState,
} from "@/server/registration";
import type { StateOption, CityOption } from "@/types/registration";

const serviceOptions = [
    {
        name: "local_mover",
        label: "Local Moving",
    },
    {
        name: "long_distance_mover",
        label: "Long Distance Moving",
    },
    {
        name: "residential_moving",
        label: "Residential Moving",
    },
    {
        name: "commercial_office_moving",
        label: "Commercial / Office Moving",
    },
    {
        name: "packing_unpacking_services",
        label: "Packing and Unpacking Services",
    },
    {
        name: "storage_services",
        label: "Storage Services",
    },
    {
        name: "international_moving",
        label: "International Moving",
    },
    {
        name: "specialty_moving",
        label: "Specialty Moving",
    },
    {
        name: "labor_only_moving",
        label: "Labor-Only Moving",
    },
    {
        name: "truck_rental",
        label: "Truck Rental",
    },
    {
        name: "containers_moving",
        label: "Moving Containers",
    },
];

export default function RegistrationPage() {
    const [loading, setLoading] = useState(false);
    const [statesLoading, setStatesLoading] = useState(true);
    const [citiesLoading, setCitiesLoading] = useState(false);

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [states, setStates] = useState<StateOption[]>([]);
    const [cities, setCities] = useState<CityOption[]>([]);

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [phone, setPhone] = useState("");
    const [aboutCount, setAboutCount] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        async function loadStates() {
            setStatesLoading(true);

            try {
                const data = await getStates();
                setStates(data || []);
            } catch {
                setStates([]);
            } finally {
                setStatesLoading(false);
            }
        }

        loadStates();
    }, []);

    async function handleStateChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const stateId = e.target.value;

        setSelectedState(stateId);
        setSelectedCity("");
        setCities([]);
        setErrors((prev) => ({
            ...prev,
            state_id: [],
            city_id: [],
        }));

        if (!stateId) {
            return;
        }

        setCitiesLoading(true);

        try {
            const data = await getCitiesByState(stateId);
            setCities(data || []);
        } catch {
            setCities([]);
        } finally {
            setCitiesLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await registerCompany(formData);

            if (!res.success) {
                setErrors(res.errors || {});
                alert(res.message || "Validation failed.");
                return;
            }

            alert(res.message || "Company registered successfully.");

            form.reset();
            setSelectedState("");
            setSelectedCity("");
            setCities([]);
            setPhone("");
            setAboutCount(0);
        } catch (error: any) {
            alert(error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);

        let formatted = value;

        if (value.length > 6) {
            formatted = `${value.slice(0, 3)}-${value.slice(
                3,
                6
            )}-${value.slice(6)}`;
        } else if (value.length > 3) {
            formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
        }

        setPhone(formatted);
    }

    const inputClass =
        "w-full h-[52px] rounded-md bg-[#eef5f8] px-5 text-[15px] text-gray-700 outline-none border border-transparent placeholder:text-gray-500 focus:border-[#126987]";

    const selectClass =
        "w-full h-[52px] rounded-md bg-[#eef5f8] px-4 text-[15px] text-gray-700 outline-none border border-gray-300 focus:border-[#126987] disabled:cursor-not-allowed disabled:opacity-70";

    return (
        <main className="min-h-screen bg-[#f5f5f5] px-3 py-6">
            <div className="mx-auto max-w-[980px] overflow-hidden rounded-[18px] bg-white shadow-lg">
                <div className="bg-[#126987] px-6 py-12 text-center text-white">
                    <h1 className="font-serif text-[34px] font-bold uppercase tracking-wide">
                        Company Register
                    </h1>

                    <p className="mx-auto mt-3 max-w-[580px] text-[17px] leading-7">
                        Join our business network and unlock premium services for
                        your company
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6 md:px-10">
                    <SectionTitle title="Personal Information" />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <FieldError errors={errors} name="name">
                            <input
                                required
                                name="name"
                                placeholder="Your Name"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="email">
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="password">
                            <div className="relative">
                                <input
                                    required
                                    minLength={8}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className={`${inputClass} pr-12`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#126987]"
                                    aria-label="Toggle password"
                                >
                                    <EyeIcon />
                                </button>
                            </div>
                        </FieldError>

                        <FieldError
                            errors={errors}
                            name="password_confirmation"
                        >
                            <div className="relative">
                                <input
                                    required
                                    minLength={8}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    className={`${inputClass} pr-12`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#126987]"
                                    aria-label="Toggle confirm password"
                                >
                                    <EyeIcon />
                                </button>
                            </div>
                        </FieldError>
                    </div>

                    <SectionTitle title="Company Details" />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <FieldError errors={errors} name="company_name">
                            <input
                                required
                                name="company_name"
                                placeholder="Company Name"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="company_email">
                            <input
                                required
                                type="email"
                                name="company_email"
                                placeholder="Company Email"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="company_website">
                            <input
                                required
                                type="url"
                                name="company_website"
                                placeholder="Company Website"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="phone_no">
                            <input
                                required
                                type="text"
                                name="phone_no"
                                placeholder="Phone No"
                                maxLength={12}
                                value={phone}
                                onChange={handlePhoneChange}
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="us_dot_no">
                            <input
                                required
                                type="number"
                                name="us_dot_no"
                                placeholder="D.O.T No."
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="icc_mc_license_no">
                            <input
                                required
                                type="number"
                                name="icc_mc_license_no"
                                placeholder="MC No."
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="trucks">
                            <input
                                required
                                type="number"
                                name="trucks"
                                placeholder="No. of Trucks"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="founding_year">
                            <input
                                required
                                type="number"
                                name="founding_year"
                                placeholder="Years in Business"
                                className={inputClass}
                            />
                        </FieldError>
                    </div>

                    <div className="mt-5">
                        <FieldError errors={errors} name="image">
                            <input
                                required
                                type="file"
                                name="image"
                                accept=".jpg,.jpeg,.png,.webp,.svg"
                                className="w-full rounded-md bg-[#eef5f8] p-4 text-[15px] text-gray-700 file:mr-4 file:rounded file:border-0 file:bg-white file:px-4 file:py-2 file:text-gray-700"
                            />
                        </FieldError>
                    </div>

                    <div className="mt-6">
                        <FieldError errors={errors} name="about_company">
                            <textarea
                                required
                                minLength={600}
                                name="about_company"
                                placeholder="Tell us About Your Company"
                                rows={10}
                                onChange={(e) =>
                                    setAboutCount(e.target.value.length)
                                }
                                className="w-full resize-none rounded-lg border border-[#126987] px-5 py-5 text-[15px] text-gray-700 outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-[#126987]"
                            />
                        </FieldError>

                        <div className="mt-1 text-right text-[15px] text-gray-700">
                            {aboutCount} characters, min: 600
                        </div>
                    </div>

                    <SectionTitle title="Location Details" />

                    <input type="hidden" name="country_id" value="1" />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <input
                            value="United States"
                            readOnly
                            className={`${inputClass} cursor-not-allowed`}
                        />

                        <FieldError errors={errors} name="state_id">
                            <select
                                required
                                name="state_id"
                                value={selectedState}
                                onChange={handleStateChange}
                                className={selectClass}
                                disabled={statesLoading}
                            >
                                <option value="">
                                    {statesLoading
                                        ? "Loading states..."
                                        : "-- Select State --"}
                                </option>

                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </FieldError>

                        <FieldError errors={errors} name="city_id">
                            <select
                                required
                                name="city_id"
                                value={selectedCity}
                                onChange={(e) =>
                                    setSelectedCity(e.target.value)
                                }
                                className={selectClass}
                                disabled={!selectedState || citiesLoading}
                            >
                                <option value="">
                                    {!selectedState
                                        ? "-- Select State First --"
                                        : citiesLoading
                                          ? "Loading cities..."
                                          : cities.length === 0
                                            ? "No cities found"
                                            : "-- Select City --"}
                                </option>

                                {cities.map((city) => {
                                    const zip = city.zip_code
                                        ? String(city.zip_code).padStart(5, "0")
                                        : "";

                                    return (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                            {zip ? `, ${zip}` : ""}
                                        </option>
                                    );
                                })}
                            </select>
                        </FieldError>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]">
                        <FieldError errors={errors} name="street">
                            <input
                                required
                                name="street"
                                placeholder="Street Address"
                                className={inputClass}
                            />
                        </FieldError>

                        <FieldError errors={errors} name="company_address">
                            <input
                                required
                                name="company_address"
                                placeholder="Company Address"
                                className={inputClass}
                            />
                        </FieldError>
                    </div>

                    <SectionTitle title="Service Options" />

                    <div className="grid grid-cols-1 gap-3 pl-1 text-[15px] text-gray-900 md:grid-cols-2">
                        {serviceOptions.map((service) => (
                            <Checkbox
                                key={service.name}
                                name={service.name}
                                label={service.label}
                            />
                        ))}
                    </div>

                    <div className="my-8 border-t border-gray-300" />

                    <FieldError errors={errors} name="allow">
                        <label className="flex items-center gap-3 text-[15px] text-gray-900">
                            <input
                                required
                                type="checkbox"
                                name="allow"
                                value="1"
                                className="h-4 w-4"
                            />
                            Terms of service
                        </label>
                    </FieldError>

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="min-w-[220px] rounded-md bg-[#126987] px-8 py-3 text-[15px] font-medium text-white transition hover:bg-[#0d5570] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Registering..." : "Register Company"}
                        </button>

                        <p className="mt-5 text-sm text-[#064f7d]">
                            Already have an account?{" "}
                            <a href="/login" className="hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}

function SectionTitle({ title }: { title: string }) {
    return (
        <div className="mb-5 mt-7">
            <h2 className="text-[18px] font-semibold text-[#006598]">
                {title}
                <span className="text-red-600">*</span>
            </h2>

            <div className="mt-3 border-t border-gray-300" />
        </div>
    );
}

function FieldError({
    children,
    errors,
    name,
}: {
    children: React.ReactNode;
    errors: Record<string, string[]>;
    name: string;
}) {
    const message = errors?.[name]?.[0];

    return (
        <div>
            {children}

            {message && (
                <p className="mt-1 text-sm text-red-600">{message}</p>
            )}
        </div>
    );
}

function Checkbox({ name, label }: { name: string; label: string }) {
    return (
        <label className="flex items-center gap-2">
            <input type="checkbox" name={name} value="1" className="h-4 w-4" />
            {label}
        </label>
    );
}

function EyeIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}