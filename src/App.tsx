/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence, useTransform } from 'motion/react';
import { 
  Moon, 
  Sun, 
  User, 
  Zap, 
  Shield, 
  Heart, 
  Anchor, 
  ArrowRight,
  ExternalLink,
  Code2,
  ChevronDown,
  X
} from 'lucide-react';

// Importando las imágenes de la carpeta assets
import imgAutonomia from '@/assets/img/01.jpg';
import imgResiliencia from '@/assets/img/02.jpg';
import imgAutoconciencia from '@/assets/img/03.jpg';

// --- Data ---

const NARRATIVE_DATA = {
  autonomy: {
    title: "La autonomía forjó mis conocimientos",
    content: `Llegué a quinto semestre sintiendo que lo que aprendía en clase era insuficiente, desconectado de la realidad de la industria y muchas veces desactualizado. La brecha entre lo que necesitaba saber y lo que me estaban enseñando era visible, y nadie parecía estar cerrándola. \n
    
      La decisión de aprender por mi cuenta fue necesaria. Me senté frente a tutoriales, documentación, proyectos fallidos y foros de desarrolladores que habían pasado por lo mismo. Hubo noches en las que un error incomprensible me tuvo durante horas sin solución, buscando en internet si alguien más había encontrado ese mismo obstáculo. La frustración en esos momentos era real y física: tensión en el pecho, ganas de cerrar todo y pretender que el problema no existía. \n
    
      Pero también aprendí algo que ningún salón de clases me habría enseñado de la misma manera: que la autonomía no es una virtud con la que se nace, sino una capacidad que se construye en la incomodidad. Cada error resuelto por mi cuenta fue una pequeña victoria sobre mi propia impaciencia. Hoy, lo que sé de verdad (no lo que memoricé para un parcial) lo sé porque lo busqué, lo rompí y lo reconstruí. Esa forma de aprender me formó más que cualquier semestre. \n
    
      Desde una perspectiva personal, las emociones que experimenté fueron contradictorias: frustración, vergüenza de no saber, orgullo cuando algo funcionaba, y una satisfacción profunda que ninguna nota podría replicar. La estrategia que desarrollé fue sencilla pero poderosa: cada vez que quería rendirme, me preguntaba si el resultado (poder crear algo funcional con mis propias manos) valía el proceso. La respuesta siempre fue sí. Esa pregunta me salvó más de una vez.` 
  },
  resilience: {
    title: "Una batalla de resistencia",
    content: `Cuando ese pilar empezó a tambalearse, el impacto no fue solo económico: fue emocional, silencioso y constante. Lo que más recuerdo de ese período no son los números ni las conversaciones sobre gastos, sino la sensación de miedo que se instaló en mí sin que yo lo diga en voz alta. Era un miedo difuso, que aparecía en los momentos menos inesperados: en medio de una clase, antes de dormir, cuando veía a mis papás hablar en voz baja. No era pánico: era incertidumbre pura, la de no saber cuánto tiempo duraría ni cómo terminaría. \n

      Como familia, nos adaptamos. Recortamos gastos, ajustamos expectativas y, sobre todo, aprendimos a apoyarnos sin necesidad de decir mucho. Mi mamá asumió más carga. Mis hermanos y yo entendimos que había momentos en los que lo mejor que podíamos hacer era no añadir más presión. Fue una especie de acuerdo tácito que no se habló pero que todos cumplimos. \n
      
      Y en ese acuerdo silencioso encontré algo que no esperaba: la certeza de que mi familia, cuando las cosas se ponen difíciles, sabe cómo juntarse. La situación comenzó a mejorar en 2026, y con esa mejoría llegó también una perspectiva que antes no tenía. Entendí que la estabilidad nunca es un estado permanente, y que la capacidad de adaptarse (sin perder la calma ni la unidad) es una de las cosas más valiosas que una familia puede tener. Esa crisis me hizo más consciente de lo que tengo, más agradecido por lo cotidiano, y más maduro frente a lo que no puedo controlar.`
  },
  awareness: {
    title: "El Espejo de la Autoconciencia",
    content: `Mi primera reacción fue defensiva. Sentí que yo tenía razón y que la otra persona estaba equivocada. Me aferré a esa certeza durante un tiempo, porque es más cómodo estar seguro de que uno es el lado correcto del conflicto. Pero con los días, cuando el ruido emocional bajó, empecé a ver la situación con más claridad. Y lo que vi no me gustó del todo: había cosas en mi comportamiento que habían contribuido a que las cosas llegaran hasta ahí. \n

      Ese momento de reconocimiento fue incómodo de una manera distinta a la frustración de no saber programar o al miedo de la crisis económica. Era una incomodidad más íntima, porque implicaba revisar cómo me relaciono, qué tan bien escucho, cuándo priorizo tener razón sobre entender. El proceso de reconstruir ese vínculo fue lento y exigió de mí cosas que no se aprenden en ninguna clase: humildad real, escucha genuina, y la capacidad de disculparme sin condiciones. \n
      
      Esto evidencia que la experiencia me dejó una comprensión más honesta de lo que significa relacionarme con otros. Soy una persona que construye su identidad a través de sus vínculos, y ese conflicto me mostró que cuidar esos vínculos requiere algo más que buenas intenciones. Requiere trabajo, atención y la disposición de mirarme a mí mismo con la misma claridad con la que miro al otro. No cambiaría esa experiencia porque me enseñó lo que ninguna otra me había enseñado hasta entonces.`
  },
  conclusion: {
    title: "Conclusión",
    content: `Si tuviera que encontrar un hilo que conecta estas tres experiencias, sería este: todas me pusieron en un punto en el que no bastaba con seguir haciendo lo que siempre había hecho. La programación me exigió autonomía. La crisis familiar me exigió madurez. El conflicto me exigió honestidad. Y en los tres casos, lo que más resistencia me generó fue exactamente lo que más necesitaba desarrollar.

      La resiliencia, entendida no como la ausencia de impacto sino como la capacidad de seguir funcionando bajo presión, se fue construyendo en mí a través de estas experiencias sin que yo lo planificara. No decidí volverme resiliente: simplemente no tuve otra opción que seguir, y en ese seguir encontré recursos que no sabía que tenía.

      La autoconciencia llegó después, cuando el polvo de cada experiencia se asentó y pude mirar lo que había ocurrido con algo de distancia. Entendí que tengo tendencia a intelectualizar lo emocional, a analizar cuando debería sentir, a buscar soluciones cuando debería simplemente estar presente. Ese patrón no desaparece de un día para otro, pero reconocerlo ya es un primer paso.

      Hacia adelante, mi proyecto de vida está construido sobre una base que estas experiencias me ayudaron a definir: quiero ser un profesional que sabe hacer las cosas por sí mismo, pero que también sabe cuándo apoyarse en otros. Quiero ser alguien que enfrenta las dificultades sin perder la calma ni la claridad. Y quiero seguir siendo una persona para la que los vínculos importan, no a pesar de los conflictos que generan, sino también gracias a ellos.

      Lo que viví no me quitó nada que no mereciera ser cuestionado. Lo que me dejó, en cambio, no lo habría encontrado de otra manera.`
  }
};

// --- Components ---

const Navbar = ({ activeSection, isDark, toggleTheme }: { 
  activeSection: string; 
  isDark: boolean; 
  toggleTheme: () => void 
}) => {
  const navItems = [
    { id: 'hero', label: 'Ensayo' },
    { id: 'autonomy', label: 'Autonomía' },
    { id: 'resilience', label: 'Resiliencia' },
    { id: 'awareness', label: 'Autoconciencia' },
    { id: 'conclusion', label: 'Conclusión' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 lg:px-20 xl:px-32 py-4 md:py-5 flex flex-wrap justify-between items-center backdrop-blur-md bg-bg/80 border-b border-border shadow-sm gap-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-sans font-bold text-xs md:text-[13px] tracking-[0.2em] uppercase shrink-0"
      >
        GABRIEL NAVARRO<span className="hidden lg:inline font-light text-muted"> | JUNIOR DEVELOPER</span>
      </motion.div>
      
      <div className="hidden md:flex gap-4 lg:gap-8 items-center flex-wrap">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-[13px] uppercase tracking-widest transition-colors hover:text-accent ${
              activeSection === item.id ? 'text-primary font-bold underline underline-offset-8 decoration-accent' : 'text-muted'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-border/50 transition-colors text-primary border border-border"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
};

const ExpandedNarrative = ({ isOpen, content, onClose }: { isOpen: boolean; content: any; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto card-responsive relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-border transition-colors border border-border text-primary"
            >
              <X size={20} />
            </button>
            
            <span className="text-accent-warm text-caption mb-6 block">Texto Ampliado</span>
            <h2 className="text-heading-2 mb-10">
              {content.title}
            </h2>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {content.content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-body mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="mt-12 w-full py-4 rounded-xl border border-border hover:bg-border transition-colors font-bold text-primary"
            >
              Volver a la vista general
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BackgroundScene = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-[10%] left-[15%] w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-accent-warm/20 rounded-full blur-[120px]"
      />
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
};

const SectionSkeleton = () => (
  <div className="grid-responsive w-full">
    <div className="space-y-6">
      <div className="skeleton h-6 w-32" />
      <div className="skeleton h-12 w-full" />
      <div className="skeleton h-12 w-3/4" />
      <div className="space-y-3 pt-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
    <div className="skeleton img-responsive" />
  </div>
);

const Section = ({ 
  id, 
  title, 
  content, 
  image, 
  reversed = false,
  onExplore
}: { 
  id: string; 
  title: string; 
  content: string; 
  image: string;
  reversed?: boolean;
  onExplore: (id: string) => void;
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Simulate content "loading" or preparation
      const timer = setTimeout(() => setIsLoaded(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section ref={containerRef} id={id} className="min-h-screen section-padding flex items-center overflow-hidden bg-bg relative">
      <div className="container-max">
        {!isLoaded ? (
          <SectionSkeleton />
        ) : (
          <div className={`grid-responsive ${reversed ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={reversed ? 'md:order-2' : ''}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="card-num font-serif italic text-accent tracking-tighter text-xl">
                  {id === 'autonomy' ? '[01] — Autonomía' : id === 'resilience' ? '[02] — Resiliencia' : '[03] — Autoconciencia'}
                </div>
              </div>
              
              <h2 className="text-heading-3 mb-8">
                {title}
              </h2>
              
              <p className="text-body mb-10 max-w-xl">
                {content}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExplore(id)}
                className="flex items-center gap-3 bg-primary text-secondary px-6 py-3 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] group transition-all hover:bg-neutral-800 shadow-lg hover:shadow-accent/10 w-fit"
              >
                Explorar narrativa <ArrowRight size={18} className="transition-transform group-hover:translate-x-2 text-accent" />
              </motion.button>
            </motion.div>

            <div className={`relative ${reversed ? 'md:order-1' : ''}`}>
              <motion.div
                style={{ y, opacity }}
                className="rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-xl relative z-10"
              >
                <img 
                  src={image} 
                  alt={title} 
                  className="img-responsive" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                style={{ y: bgY }}
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-warm/20 rounded-full blur-[80px] -z-10" 
              />
              <motion.div 
                style={{ scale: bgScale }}
                className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-[60px] -z-10" 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const { scrollYProgress } = useScroll();
  const progressText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    return progressText.on("change", (latest) => {
      setReadingProgress(Math.round(latest));
    });
  }, [progressText]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'autonomy', 'resilience', 'awareness', 'conclusion'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="relative selection:bg-accent/30 min-h-screen bg-bg">
      <BackgroundScene />
      {!expandedSection && (
        <Navbar activeSection={activeSection} isDark={isDark} toggleTheme={toggleTheme} />
      )}
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-60 origin-left shadow-lg"
        style={{ scaleX }}
      />

      <ExpandedNarrative 
        isOpen={!!expandedSection} 
        content={expandedSection ? (NARRATIVE_DATA as any)[expandedSection] : null} 
        onClose={() => setExpandedSection(null)} 
      />

      {/* Hero Section */}
      <header id="hero" className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-24 xl:px-32 pt-32 md:pt-40 pb-20">
        <div className="w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent-warm text-caption tracking-[0.3em] mb-8"
          >
            <span className="accent-dot w-2 h-2 bg-accent-warm rounded-full animate-pulse" /> Un vistaso a mi identidad
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-heading-1 mb-10"
          >
            Análisis a mi Desarrollo <br/>
            y Madurez
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body-lg mb-16 max-w-3xl"
          >
            Explorando la construcción de mi identidad a través de la superación personal, el aprendizaje autónomo y el valor invaluable de mis vínculos sociales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row items-start gap-8"
          >
            <a 
              href="#autonomy"
              className="px-12 py-5 bg-primary text-secondary rounded-2xl font-bold transition-all hover:bg-neutral-800 hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent/20"
            >
              Comenzar lectura
            </a>
            <div className="flex items-center gap-4 text-muted text-[10px] uppercase tracking-[0.2em] font-semibold mt-4 md:mt-0 px-2 py-4">
              <span className="w-12 h-px bg-border" /> Por Gabriel Navarro
            </div>
          </motion.div>
        </div>
      </header>

      {/* Section 01: Autonomía */}
      <Section
        id="autonomy"
        title="// EDUCACION_
        AUTONOMA"
        image={imgAutonomia}
        content="Cuando entré a Ingeniería de Sistemas, asumí que la universidad me daría las herramientas para convertirme en el profesional que quería ser. Con el tiempo, esa expectativa se fue erosionando. Llegué a quinto semestre sintiendo que lo que aprendía en clase era insuficiente, desconectado de la realidad de la industria y muchas veces desactualizado. La brecha entre lo que necesitaba saber y lo que me estaban enseñando era visible, y nadie parecía estar cerrándola..."
        onExplore={setExpandedSection}
      />

      {/* Section 02: Resiliencia */}
      <Section
        id="resilience"
        title="// INSERTIDUMBRE_Y
        _CRISIS"
        image={imgResiliencia}
        content="A finales de 2025, la empresa donde trabaja mi papá (Monómeros) entró en una crisis profunda. Problemas de carácter internacional, con implicaciones entre Estados Unidos y Venezuela, paralizaron prácticamente las operaciones. Mi papá es el sustento principal de mi familia: aporta entre el 70% y el 80% de los ingresos del hogar..."
        onExplore={setExpandedSection}
      />

      {/* Section 03: Autoconciencia */}
      <Section
        id="awareness"
        title="// CONFLICOS_CON_
        MIS_VINCULOS"
        image={imgAutoconciencia}
        content="Hubo un momento, hace no tanto, en el que tuve un conflicto fuerte con alguien cercano a mí. No fue un desacuerdo menor ni una discusión pasajera: fue una de esas situaciones en las que las palabras que se dicen no se pueden devolver, y en las que uno descubre cosas de sí mismo que preferiría no haber descubierto todavía. No voy a detallar las circunstancias porque lo que importa no es la historia sino lo que dejó..."
        onExplore={setExpandedSection}
      />

      {/* Conclusion */}
      <footer id="conclusion" className="section-padding bg-bg/50 backdrop-blur-sm border-t border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/5 blur-3xl rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="w-full flex flex-col xl:flex-row items-start xl:items-end justify-between gap-12 xl:gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h3 className="text-caption text-accent-warm tracking-[0.4em] mb-6">Conclusión del Proyecto de Vida</h3>
            <p className="text-heading-2 italic font-light">
              "Busco ser un profesional lleno de valores, donde mi código refleje mi ética y mis principios."
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
               <motion.button
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => setExpandedSection('conclusion')}
                 className="flex items-center gap-3 bg-primary text-secondary px-6 py-3 rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] group transition-all hover:bg-neutral-800 shadow-lg hover:shadow-accent/10 w-fit"
               >
                 Leer Conclusión <ArrowRight size={18} className="transition-transform group-hover:translate-x-2 text-accent" />
               </motion.button>
               <a href="https://github.com/TDev-GabrielNavarro" target="_blank" rel="noreferrer" className="group cursor-pointer flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted border-b border-border group-hover:text-accent group-hover:border-accent transition-colors">GitHub</span>
                  <ExternalLink size={12} className="text-muted group-hover:text-accent transition-colors" />
               </a>
            </div>
          </motion.div>
          
          <div className="w-full xl:w-auto mt-12 xl:mt-0">
            <div className="flex justify-between w-full xl:w-[400px] text-[10px] uppercase tracking-[0.3em] text-muted mb-4 font-bold">
              <span>Lectura de Ensayo</span>
              <span>{readingProgress}% Completado</span>
            </div>
            <div className="w-full xl:w-[400px] h-[3px] bg-border relative overflow-hidden rounded-full">
              <motion.div 
                style={{ scaleX: scrollYProgress }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-accent origin-left shadow-[0_0_10px_var(--color-accent)]"
              />
            </div>
            <div className="mt-12 text-muted text-[10px] uppercase tracking-[0.4em] font-bold text-left xl:text-right">
              © 2026 Gabriel Navarro <br/>
              <span className="font-normal opacity-60 text-[8px]">Análisis de mi Identidad y Desarrollo</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Vertical Timeline Indicator */}
      {!expandedSection && (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 z-40 items-center">
          {['hero', 'autonomy', 'resilience', 'awareness', 'conclusion'].map((item, idx) => (
            <div key={item} className="group relative flex items-center justify-center">
               <a
                href={`#${item}`}
                className={`w-2 h-2 rounded-full transition-all duration-500 border border-accent ${
                  activeSection === item ? 'bg-accent scale-150 shadow-[0_0_8px_var(--color-accent)]' : 'bg-transparent hover:bg-accent/40'
                }`}
              />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-widest font-bold text-accent whitespace-nowrap bg-bg px-2 py-1 border border-border rounded-md pointer-events-none">
                {idx + 1}. {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
