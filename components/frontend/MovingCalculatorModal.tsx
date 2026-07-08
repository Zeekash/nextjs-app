"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";

type ModalState = {
    open: boolean;
    from: string;
    to: string;
};

type ModalContextType = {
    isOpen: boolean;
    from: string;
    to: string;
    openModal: (from?: string, to?: string) => void;
    closeModal: () => void;
    setFrom: (val: string) => void;
    setTo: (val: string) => void;
};

const MovingCalculatorContext = createContext<ModalContextType | null>(null);

export function MovingCalculatorProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, setState] = useState<ModalState>({
        open: false,
        from: "",
        to: "",
    });

    const openModal = useCallback((from = "", to = "") => {
        setState({ open: true, from, to });
    }, []);

    const closeModal = useCallback(() => {
        setState((prev) => ({ ...prev, open: false }));
    }, []);

    const setFrom = useCallback((val: string) => {
        setState((prev) => ({ ...prev, from: val }));
    }, []);

    const setTo = useCallback((val: string) => {
        setState((prev) => ({ ...prev, to: val }));
    }, []);

    const value = useMemo(
        () => ({
            isOpen: state.open,
            from: state.from,
            to: state.to,
            openModal,
            closeModal,
            setFrom,
            setTo,
        }),
        [state.open, state.from, state.to, openModal, closeModal, setFrom, setTo]
    );

    return (
        <MovingCalculatorContext.Provider value={value}>
            {children}
            <MovingCalculatorModal />
        </MovingCalculatorContext.Provider>
    );
}

export function useMovingCalculatorModal() {
    const context = useContext(MovingCalculatorContext);

    if (!context) {
        throw new Error(
            "useMovingCalculatorModal must be used within MovingCalculatorProvider"
        );
    }

    return context;
}

function MovingCalculatorModal() {
    const { isOpen, from, to, closeModal, setFrom, setTo } =
        useMovingCalculatorModal();

    const [step, setStep] = useState(1);
    const [bedrooms, setBedrooms] = useState("");
    const [packing, setPacking] = useState(false);
    const [storage, setStorage] = useState(false);
    const [movingDate, setMovingDate] = useState<Date | null>(null);
    const [calendarMonth, setCalendarMonth] = useState(new Date());
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notRobot, setNotRobot] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setBedrooms("");
            setPacking(false);
            setStorage(false);
            setMovingDate(null);
            setCalendarMonth(new Date());
            setName("");
            setEmail("");
            setPhone("");
            setNotRobot(false);
        }
    }, [isOpen]);

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        let formatted = value;

        if (value.length > 6) {
            formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length > 3) {
            formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
        }

        setPhone(formatted);
    }

    function canProceed() {
        if (step === 1) {
            return from.trim() && to.trim();
        }
        if (step === 2) {
            return bedrooms.trim();
        }
        if (step === 3) {
            return movingDate !== null;
        }
        if (step === 4) {
            return name.trim() && email.trim() && phone.length >= 12 && notRobot;
        }
        return false;
    }

    const bedroomOptions = [
        "Studio",
        "1 Bedroom",
        "2 Bedroom",
        "3 Bedroom",
        "4 Bedroom",
        "5 Bedroom",
    ];

    function handleNext() {
        if (!canProceed()) {
            return;
        }
        setStep((s) => s + 1);
    }

    function handleBack() {
        setStep((s) => Math.max(1, s - 1));
    }

    function handleSubmit() {
        if (!canProceed()) {
            return;
        }

        const data = {
            from,
            to,
            bedrooms,
            packing,
            storage,
            movingDate: movingDate ? movingDate.toISOString().split("T")[0] : "",
            name,
            email,
            phone,
        };

        console.log("Moving calculator data:", data);
        closeModal();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#0B3A4F]/80 backdrop-blur-sm"
                onClick={closeModal}
            />

            <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800"
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="mb-5 flex items-center  gap-2">
                    <img
                        src="/assets/img/navigation/logo.webp"
                        alt="My Moving Journey"
                        className=" w-26 object-contain"
                    />
                   
                </div>

                <p className="text-center text-[18px] text-[#333]">
                    Find your best price in just a few clicks.
                </p>

                {step === 1 && (
                    <>
                        <h2 className="mt-4 text-center text-[24px] font-bold text-[#111827]">
                            Where Are You Headed?
                        </h2>

                        <p className="text-center text-[15px] text-gray-600">
                            Tell us your route and we&apos;ll help you save instantly.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="mb-1 block text-[15px] font-semibold text-[#111827]">
                                    Moving from<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    placeholder="City Name or Zip Code"
                                    className="w-full rounded-lg border border-[#C7D7E4] px-4 py-3 text-[16px] outline-none focus:border-[#116087]"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-[15px] font-semibold text-[#111827]">
                                    Moving to<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    placeholder="City Name or Zip Code"
                                    className="w-full rounded-lg border border-[#C7D7E4] px-4 py-3 text-[16px] outline-none focus:border-[#116087]"
                                />
                            </div>

                            <ActionButtons
                                primaryText="Next"
                                onPrimary={handleNext}
                                disabled={!canProceed()}
                            />
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="mt-4 text-center text-[24px] font-bold text-[#111827]">
                            Tell Us What You&apos;re Moving
                        </h2>

                        <p className="text-center text-[15px] text-gray-600">
                            Pick your space and we&apos;ll handle the details.
                        </p>

                        <div className="mt-6 space-y-5">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {bedroomOptions.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setBedrooms(option)}
                                        className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition ${
                                            bedrooms === option
                                                ? "border-[#116087] bg-[#e6f4f1]"
                                                : "border-[#C7D7E4] bg-white hover:bg-[#f8fbfd]"
                                        }`}
                                    >
                                        <HomeIcon active={bedrooms === option} />
                                        <span className="text-[15px] font-medium text-[#111827]">
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <h3 className="mb-3 text-[17px] font-semibold text-[#111827]">
                                    Additional Services
                                </h3>

                                <div className="flex flex-wrap gap-4">
                                    <label className="flex cursor-pointer items-center gap-2 text-[15px] text-[#111827]">
                                        <input
                                            type="checkbox"
                                            checked={packing}
                                            onChange={(e) =>
                                                setPacking(e.target.checked)
                                            }
                                            className="h-4 w-4 accent-[#116087]"
                                        />
                                        <BoxIcon />
                                        Packing Service
                                    </label>

                                    <label className="flex cursor-pointer items-center gap-2 text-[15px] text-[#111827]">
                                        <input
                                            type="checkbox"
                                            checked={storage}
                                            onChange={(e) =>
                                                setStorage(e.target.checked)
                                            }
                                            className="h-4 w-4 accent-[#116087]"
                                        />
                                        <StorageIcon />
                                        Storage Service
                                    </label>
                                </div>
                            </div>

                            <ActionButtons
                                showBack
                                onBack={handleBack}
                                primaryText="Next"
                                onPrimary={handleNext}
                                disabled={!canProceed()}
                            />
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="mt-4 text-center text-[24px] font-bold text-[#111827]">
                            Choose a date that works best for you
                        </h2>

                        <div className="mt-6 space-y-5">
                            <Calendar
                                month={calendarMonth}
                                setMonth={setCalendarMonth}
                                selected={movingDate}
                                onSelect={setMovingDate}
                            />

                            {movingDate && (
                                <div className="rounded-xl border border-dashed border-[#116087] bg-[#eef5f8] px-4 py-3 text-center text-[15px] font-medium text-[#116087]">
                                    Selected Date:{" "}
                                    {movingDate.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                            )}

                            <ActionButtons
                                showBack
                                onBack={handleBack}
                                primaryText="Next"
                                onPrimary={handleNext}
                                disabled={!canProceed()}
                            />
                        </div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2 className="mt-4 text-center text-[24px] font-bold text-[#111827]">
                            Just One Last Step!
                        </h2>

                        <p className="text-center text-[18px] font-semibold text-[#111827]">
                            Tell Us How We Can Reach You
                        </p>

                        <div className="mt-6 space-y-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full rounded-lg border border-[#C7D7E4] px-4 py-3 text-[16px] outline-none focus:border-[#116087]"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email Address"
                                className="w-full rounded-lg border border-[#C7D7E4] px-4 py-3 text-[16px] outline-none focus:border-[#116087]"
                            />

                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="(xxx) xxx - xxxx"
                                className="w-full rounded-lg border border-[#C7D7E4] px-4 py-3 text-[16px] outline-none focus:border-[#116087]"
                            />

                            <RecaptchaBox
                                checked={notRobot}
                                onChange={setNotRobot}
                            />

                            <ActionButtons
                                showBack
                                onBack={handleBack}
                                primaryText="Submit"
                                onPrimary={handleSubmit}
                                disabled={!canProceed()}
                            />

                            <p className="text-center text-[13px] leading-5 text-gray-600">
                                By submitting, you agree to our{" "}
                                <a href="#" className="text-[#116087] hover:underline">
                                    Terms
                                </a>{" "}
                                &amp;{" "}
                                <a href="#" className="text-[#116087] hover:underline">
                                    Privacy Policy
                                </a>{" "}
                                and consent to be contacted by moving companies via
                                call, text, or email.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function HomeIcon({ active }: { active?: boolean }) {
    const color = active ? "#116087" : "#9CA3AF";

    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function BoxIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    );
}

function StorageIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3h18v18H3z" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
        </svg>
    );
}

function ActionButtons({
    showBack,
    onBack,
    primaryText,
    onPrimary,
    disabled,
}: {
    showBack?: boolean;
    onBack?: () => void;
    primaryText: string;
    onPrimary: () => void;
    disabled?: boolean;
}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {showBack ? (
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full rounded-full border border-[#116087] bg-white py-3 text-[16px] font-semibold text-[#116087] transition hover:bg-[#f0f9fb]"
                >
                    Back
                </button>
            ) : (
                <div />
            )}

            <button
                type="button"
                onClick={onPrimary}
                disabled={disabled}
                className="w-full rounded-full bg-[#116087] py-3 text-[16px] font-semibold text-white transition hover:bg-[#0d5570] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {primaryText}
            </button>
        </div>
    );
}

function Calendar({
    month,
    setMonth,
    selected,
    onSelect,
}: {
    month: Date;
    setMonth: (date: Date) => void;
    selected: Date | null;
    onSelect: (date: Date) => void;
}) {
    const daysInMonth = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = new Date(
        month.getFullYear(),
        month.getMonth(),
        1
    ).getDay();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthLabel = month.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function prevMonth() {
        setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    }

    function nextMonth() {
        setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    }

    function selectDay(day: number) {
        onSelect(new Date(month.getFullYear(), month.getMonth(), day));
    }

    function isSelected(day: number) {
        if (!selected) {
            return false;
        }
        return (
            selected.getDate() === day &&
            selected.getMonth() === month.getMonth() &&
            selected.getFullYear() === month.getFullYear()
        );
    }

    function isToday(day: number) {
        return (
            today.getDate() === day &&
            today.getMonth() === month.getMonth() &&
            today.getFullYear() === month.getFullYear()
        );
    }

    return (
        <div className="rounded-2xl border border-[#C7D7E4] bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={prevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5f8] text-[#116087] hover:bg-[#d6e8f0]"
                >
                    ‹
                </button>
                <span className="text-[17px] font-semibold text-[#111827]">
                    {monthLabel}
                </span>
                <button
                    type="button"
                    onClick={nextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef5f8] text-[#116087] hover:bg-[#d6e8f0]"
                >
                    ›
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[13px] text-gray-500">
                {weekDays.map((d) => (
                    <div key={d} className="py-2">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => {
                        const currentDate = new Date(
                            month.getFullYear(),
                            month.getMonth(),
                            day
                        );
                        const past = currentDate < today;

                        return (
                            <button
                                key={day}
                                type="button"
                                disabled={past}
                                onClick={() => selectDay(day)}
                                className={`aspect-square rounded-lg text-[14px] transition ${
                                    isSelected(day)
                                        ? "bg-[#116087] font-semibold text-white"
                                        : isToday(day)
                                          ? "border border-[#116087] text-[#116087]"
                                          : past
                                            ? "cursor-not-allowed text-gray-300"
                                            : "text-[#111827] hover:bg-[#eef5f8]"
                                }`}
                            >
                                {day}
                            </button>
                        );
                    }
                )}
            </div>
        </div>
    );
}

function RecaptchaBox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-[#f9f9f9] p-3">
            <label className="flex cursor-pointer items-center gap-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="h-5 w-5 accent-[#116087]"
                />
                <span className="text-[14px] text-[#111827]">
                    I&apos;m not a robot
                </span>
            </label>

            <div className="flex flex-col items-center">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#116087]"
                >
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                        fill="currentColor"
                    />
                </svg>
                <span className="text-[9px] text-gray-500">reCAPTCHA</span>
            </div>
        </div>
    );
}
