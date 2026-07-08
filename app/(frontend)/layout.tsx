import Header  from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import { MovingCalculatorProvider } from "@/components/frontend/MovingCalculatorModal";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MovingCalculatorProvider>
      <Header />

      <main>{children}</main>

      <Footer />
    </MovingCalculatorProvider>
  );
}