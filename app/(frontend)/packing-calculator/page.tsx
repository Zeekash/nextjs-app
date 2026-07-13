"use client";

import {
    type FormEvent,
    useRef,
    useState,
} from "react";
import Breadcrumbs from "@/components/frontend/BreadCrumbs";
import {
    AVERAGE_BOX_ROWS,
    BOX_COUNT_FACTORS,
    BOX_PRICES,
    BOX_SIZE_GUIDE,
    BOX_TYPE_ROWS,
    CALCULATOR_RESULT_ROWS,
    CALCULATOR_STEPS,
    FAQS,
    PACKING_STYLE_OPTIONS,
    PACKING_TIPS,
    PAGE_COPY,
} from "./calculator.constants";

import type {
    PackingCalculation,
    PackingStyle,
} from "./calculator.types";

import {
    calculatePacking,
    formatCurrency,
} from "./calculatePacking";
import Faqs from "@/components/frontend/Faqs";

export default function MovingBoxCalculatorPage() {
    const [rooms, setRooms] = useState("");
    const [people, setPeople] = useState("");

    const [packingStyle, setPackingStyle] =
        useState<PackingStyle>("average");

    const [calculation, setCalculation] =
        useState<PackingCalculation | null>(null);

    const [error, setError] = useState("");

    const resultsRef =
        useRef<HTMLDivElement | null>(null);

    function handleCalculate(
        event: FormEvent<HTMLFormElement>,
    ): void {
        event.preventDefault();

        try {
            const result = calculatePacking(
                Number(rooms),
                Number(people),
                packingStyle,
            );

            setCalculation(result);
            setError("");

            window.setTimeout(() => {
                resultsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        } catch (calculationError) {
            setCalculation(null);

            setError(
                calculationError instanceof Error
                    ? calculationError.message
                    : "Unable to calculate the moving box estimate.",
            );
        }
    }

     const breadcrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Packing Calculator",
      href: "/packing-calculator",
    }
    
  ];

    return (
        <main className="flex min-h-screen w-full flex-col items-center bg-white py-[5vh] text-slate-700 mt-30">
            <div className="flex w-[92vw] max-w-[1000px] flex-col gap-[5vh] max-sm:w-[94vw] justify-center">
                {/* Hero section */}

                <section className="flex w-full flex-col items-center gap-3 text-center">
                     <Breadcrumbs items={breadcrumbs} className={"lg:text-lg md:text-base"} />

                    <h1 className="font-serif text-5xl font-semibold leading-tight text-slate-950 max-sm:text-3xl md:text-5xl lg:text-6xl">
                        {PAGE_COPY.title}
                    </h1>

                    <p className="flex w-[75vw] max-w-[760px] text-center text-sm leading-7 text-slate-600 max-sm:w-[90vw] md:text-base">
                        {PAGE_COPY.description}
                    </p>
                </section>

                {/* Calculator section */}

                <section className="flex w-full flex-col gap-5">
                    <form
                        onSubmit={handleCalculate}
                        noValidate
                        className="flex w-full flex-wrap items-end gap-3 rounded-2xl border border-sky-200 bg-sky-100 p-5 md:flex-nowrap"
                    >
                        <label className="flex w-full flex-col gap-2 md:w-[24%]">
                            <span className="text-xs font-semibold text-slate-700">
                                Number of Rooms
                            </span>

                            <input
                                type="number"
                                min="1"
                                step="1"
                                inputMode="numeric"
                                value={rooms}
                                onChange={(event) => {
                                    setRooms(
                                        event.target.value,
                                    );

                                    setError("");
                                }}
                                placeholder="Enter rooms"
                                aria-label="Number of rooms"
                                className="flex h-12 w-full rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-sky-700"
                            />
                        </label>

                        <label className="flex w-full flex-col gap-2 md:w-[24%]">
                            <span className="text-xs font-semibold text-slate-700">
                                Number of People Moving
                            </span>

                            <input
                                type="number"
                                min="1"
                                step="1"
                                inputMode="numeric"
                                value={people}
                                onChange={(event) => {
                                    setPeople(
                                        event.target.value,
                                    );

                                    setError("");
                                }}
                                placeholder="Enter people"
                                aria-label="Number of people moving"
                                className="flex h-12 w-full rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-sky-700"
                            />
                        </label>

                        <label className="flex w-full flex-col gap-2 md:w-[27%]">
                            <span className="text-xs font-semibold text-slate-700">
                                Packing Style
                            </span>

                            <select
                                value={packingStyle}
                                onChange={(event) => {
                                    setPackingStyle(
                                        event.target
                                            .value as PackingStyle,
                                    );

                                    setError("");
                                }}
                                aria-label="Packing style"
                                className="flex h-12 w-full rounded-full border border-slate-200 bg-white px-5 text-sm text-slate-900 outline-none transition focus:border-sky-700"
                            >
                                {PACKING_STYLE_OPTIONS.map(
                                    (option) => (
                                        <option
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >
                                            {option.label}
                                        </option>
                                    ),
                                )}
                            </select>
                        </label>

                        <button
                            type="submit"
                            className="flex h-12 w-full items-center justify-center rounded-full bg-sky-700 px-6 text-sm font-semibold text-white transition hover:bg-sky-800 md:w-[25%]"
                        >
                            Calculate
                        </button>
                    </form>

                    {error && (
                        <p
                            role="alert"
                            className="flex w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </p>
                    )}

                    {calculation && (
                        <div
                            ref={resultsRef}
                            aria-live="polite"
                            className="flex w-full scroll-mt-[12vh] flex-col gap-5 rounded-2xl border border-sky-200 bg-white p-5 shadow-sm md:p-6"
                        >
                            <div className="flex w-full flex-wrap items-start justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-serif text-2xl font-semibold text-slate-950 md:text-3xl">
                                        Your Moving Box Estimate
                                    </h2>

                                    <p className="text-sm leading-6 text-slate-600">
                                        Estimated using your
                                        rooms, people, and
                                        selected packing style.
                                    </p>
                                </div>

                                <span className="flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold capitalize text-sky-800">
                                    {packingStyle} packer
                                </span>
                            </div>

                            {/* Calculation summary */}

                            <div className="flex w-full flex-wrap gap-3">
                                <div className="flex w-full flex-col gap-1 rounded-xl bg-slate-50 p-4 sm:w-[31%]">
                                    <span className="text-xs font-semibold uppercase text-slate-500">
                                        Base Boxes
                                    </span>

                                    <span className="text-2xl font-bold text-slate-950">
                                        {
                                            calculation.baseBoxes
                                        }
                                    </span>
                                </div>

                                <div className="flex w-full flex-col gap-1 rounded-xl bg-slate-50 p-4 sm:w-[31%]">
                                    <span className="text-xs font-semibold uppercase text-slate-500">
                                        Multiplier
                                    </span>

                                    <span className="text-2xl font-bold text-slate-950">
                                        {
                                            calculation.multiplier
                                        }
                                    </span>
                                </div>

                                <div className="flex w-full flex-col gap-1 rounded-xl bg-sky-50 p-4 sm:w-[31%]">
                                    <span className="text-xs font-semibold uppercase text-sky-700">
                                        Total Boxes
                                    </span>

                                    <span className="text-2xl font-bold text-sky-800">
                                        {
                                            calculation.totalBoxes
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* Result rows */}

                            <div className="flex w-full flex-col overflow-hidden rounded-xl border border-slate-200">
                                <div className="flex w-full bg-sky-50 px-4 py-3 text-xs font-semibold uppercase text-slate-600">
                                    <span className="flex w-[42%]">
                                        Box Type
                                    </span>

                                    <span className="flex w-[16%] justify-center">
                                        Qty
                                    </span>

                                    <span className="flex w-[20%] justify-center">
                                        Price
                                    </span>

                                    <span className="flex w-[22%] justify-end">
                                        Cost
                                    </span>
                                </div>

                                {CALCULATOR_RESULT_ROWS.map(
                                    (row) => (
                                        <div
                                            key={row.key}
                                            className="flex w-full items-center border-t border-slate-200 px-4 py-4 text-sm"
                                        >
                                            <span className="flex w-[42%] font-medium text-slate-950">
                                                {
                                                    row.label
                                                }
                                            </span>

                                            <span className="flex w-[16%] justify-center text-slate-700">
                                                {
                                                    calculation
                                                        .results[
                                                        row
                                                            .key
                                                    ]
                                                }
                                            </span>

                                            <span className="flex w-[20%] justify-center text-slate-700">
                                                {formatCurrency(
                                                    BOX_PRICES[
                                                        row
                                                            .key
                                                    ],
                                                )}
                                            </span>

                                            <span className="flex w-[22%] justify-end font-semibold text-slate-950">
                                                {formatCurrency(
                                                    calculation
                                                        .costs[
                                                        row
                                                            .key
                                                    ],
                                                )}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>

                            <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl bg-sky-700 px-5 py-5 text-white">
                                <span className="text-base font-semibold md:text-lg">
                                    Estimated Total Cost
                                </span>

                                <span className="text-2xl font-bold md:text-3xl">
                                    {formatCurrency(
                                        calculation.totalCost,
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </section>

                {/* Box size guide */}

                <section className="flex w-full flex-col gap-4">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        Box Size Guide
                    </h2>

                    <div className="flex w-full flex-col gap-3">
                        {BOX_SIZE_GUIDE.map((item) => (
                            <div
                                key={item.title}
                                className="flex w-full items-start gap-3"
                            >
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sky-700 text-xs font-bold text-sky-700">
                                    ✓
                                </span>

                                <p className="text-sm leading-7 text-slate-600 md:text-base">
                                    <strong className="text-slate-950">
                                        {item.title}:
                                    </strong>{" "}
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How calculator works */}

                <section className="flex w-full flex-col gap-4">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        How Our Moving Box Calculator Works
                    </h2>

                    <p className="text-sm leading-7 text-slate-600 md:text-base">
                        {PAGE_COPY.calculatorDescription}
                    </p>

                    <div className="flex w-full flex-col gap-3">
                        {CALCULATOR_STEPS.map((step) => (
                            <div
                                key={step.title}
                                className="flex w-full items-start gap-3"
                            >
                                <span className="flex min-w-[65px] font-semibold text-sky-700">
                                    {step.title}
                                </span>

                                <p className="text-sm leading-7 text-slate-600 md:text-base">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Factors */}

                <section className="flex w-full flex-col gap-5">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        What Affects How Many Boxes You Need?
                    </h2>

                    <div className="flex w-full flex-wrap gap-4">
                        {BOX_COUNT_FACTORS.map(
                            (factor) => (
                                <article
                                    key={factor.title}
                                    className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 p-5 sm:w-[48%]"
                                >
                                    <h3 className="font-serif text-xl font-semibold text-slate-950">
                                        {
                                            factor.title
                                        }
                                    </h3>

                                    <p className="text-sm leading-7 text-slate-600">
                                        {factor.text}
                                    </p>
                                </article>
                            ),
                        )}
                    </div>
                </section>

                {/* Average boxes table */}

                <section className="flex w-full flex-col gap-4">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        Average Box Count by Home Size
                    </h2>

                    <p className="text-sm leading-7 text-slate-600 md:text-base">
                        {
                            PAGE_COPY.averageBoxesDescription
                        }
                    </p>

                    <div className="flex w-full overflow-x-auto rounded-xl border border-slate-200">
                        <div className="flex w-full min-w-[720px] flex-col">
                            <div className="flex w-full bg-sky-100 text-sm font-semibold text-slate-800">
                                <div className="flex w-[28%] border-r border-slate-200 px-4 py-4">
                                    Home Size
                                </div>

                                <div className="flex w-[24%] items-center justify-center border-r border-slate-200 px-4 py-4 text-center">
                                    Estimated Boxes
                                </div>

                                <div className="flex w-[48%] items-center justify-center px-4 py-4 text-center">
                                    Suggested Box Types
                                </div>
                            </div>

                            {AVERAGE_BOX_ROWS.map(
                                (row) => (
                                    <div
                                        key={
                                            row.homeSize
                                        }
                                        className="flex w-full border-t border-slate-200 text-sm"
                                    >
                                        <div className="flex w-[28%] items-center border-r border-slate-200 px-4 py-4 font-medium text-slate-950">
                                            {
                                                row.homeSize
                                            }
                                        </div>

                                        <div className="flex w-[24%] items-center justify-center border-r border-slate-200 px-4 py-4 text-center">
                                            {
                                                row.estimatedBoxes
                                            }
                                        </div>

                                        <div className="flex w-[48%] items-center justify-center px-4 py-4 text-center">
                                            {
                                                row.suggestedBoxes
                                            }
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>

                {/* Box types */}

                <section className="flex w-full flex-col gap-4">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        Types of Moving Boxes and Standard
                        Sizes
                    </h2>

                    <p className="text-sm leading-7 text-slate-600 md:text-base">
                        {PAGE_COPY.boxTypesDescription}
                    </p>

                    <div className="flex w-full overflow-x-auto rounded-xl border border-slate-200">
                        <div className="flex w-full min-w-[720px] flex-col">
                            <div className="flex w-full bg-sky-100 text-sm font-semibold text-slate-800">
                                <div className="flex w-[30%] border-r border-slate-200 px-4 py-4">
                                    Box Type
                                </div>

                                <div className="flex w-[22%] items-center justify-center border-r border-slate-200 px-4 py-4 text-center">
                                    Standard Size
                                </div>

                                <div className="flex w-[48%] items-center justify-center px-4 py-4 text-center">
                                    Best For
                                </div>
                            </div>

                            {BOX_TYPE_ROWS.map(
                                (row) => (
                                    <div
                                        key={row.type}
                                        className="flex w-full border-t border-slate-200 text-sm"
                                    >
                                        <div className="flex w-[30%] items-center border-r border-slate-200 px-4 py-4 font-medium text-slate-950">
                                            {row.type}
                                        </div>

                                        <div className="flex w-[22%] items-center justify-center border-r border-slate-200 px-4 py-4 text-center">
                                            {row.size}
                                        </div>

                                        <div className="flex w-[48%] items-center justify-center px-4 py-4 text-center">
                                            {
                                                row.bestFor
                                            }
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </section>

                {/* Packing tips */}

                <section className="flex w-full flex-col gap-5">
                    <h2 className="font-serif text-3xl font-semibold text-slate-950 max-sm:text-2xl">
                        Expert Packing Tips to Save Time and
                        Money
                    </h2>

                    <div className="flex w-full flex-col gap-4">
                        {PACKING_TIPS.map((tip) => (
                            <div
                                key={tip.title}
                                className="flex w-full items-start gap-3"
                            >
                                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-700 text-xs font-bold text-white">
                                    ✓
                                </span>

                                <p className="text-sm leading-7 text-slate-600 md:text-base">
                                    <strong className="text-slate-950">
                                        {tip.title}:
                                    </strong>{" "}
                                    {tip.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQs */}
                <section className="flex w-full justify-center items-center flex-col gap-5">
                <Faqs
                        heading="Frequently Asked Questions"
                        faqs={FAQS}
                        questionBgColor="#F0F9FF"
                        textColor="#0369A1"
                    />
                </section> 

            </div>
        </main>
    );
}