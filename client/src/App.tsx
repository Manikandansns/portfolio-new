import { ThemeProvider } from "./providers/ThemeProvider";
import { LenisProvider } from "./providers/LenisProvider";
import { CustomCursor } from "./components/CustomCursor";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Terminal } from "./sections/Terminal";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <Loader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Journey />
          <Projects />
          <Terminal />
          <Contact />
        </main>
      </LenisProvider>
    </ThemeProvider>
  );
}
