import { ThemeProvider } from "./providers/ThemeProvider";
import { LenisProvider } from "./providers/LenisProvider";
import { CustomCursor } from "./components/CustomCursor";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { LaptopIntro } from "./sections/LaptopIntro";

export default function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <Loader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {/* The entire portfolio is hosted INSIDE the LaptopIntro section —
           the laptop is pinned for the whole page, the intro choreography
           runs first, then About / Skills / Journey / Projects / Terminal /
           Contact scroll inside the laptop's screen so the laptop frame
           reads as a permanent browser window. */}
        <main>
          <LaptopIntro />
        </main>
      </LenisProvider>
    </ThemeProvider>
  );
}
