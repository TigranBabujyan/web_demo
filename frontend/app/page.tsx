import styles from "./page.module.css";
import FeaturedWorks from "@/components/FeaturedWorks";
import CourseSection from "@/components/CourseSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";

// Fetch sections from backend
async function getSections() {
  try {
    const res = await fetch("http://localhost:3001/api/sections", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    // Fallback mock data for Featured Works
    return [
      {
        id: "works",
        label: "/ works",
        title: "FEATURED WORKS",
        subtitle: "Concept-driven work turned into real outcomes.\nIdeas developed through research, intuition, and\nmaking until they create value.",
        rows: [
          {
            id: "row-1",
            cards: [
              {
                id: "card-1",
                image: "https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=800&q=80",
                category: "Logo Animation",
                title: "Don't Panic",
                description: "Branding for creative agency",
              },
              {
                id: "card-2",
                image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
                category: "Logo Animation",
                title: "Don't Panic",
                description: "Branding for creative agency",
              },
            ],
          },
          {
            id: "row-2",
            cards: [
              {
                id: "card-3",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
                category: "Logo Animation",
                title: "Don't Panic",
                description: "Branding for creative agency",
              },
              {
                id: "card-4",
                image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
                category: "Logo Animation",
                title: "Don't Panic",
                description: "Branding for creative agency",
              },
            ],
          },
        ],
      },
    ];
  }
}

export default async function Home() {
  const sections = await getSections();

  return (
    <main className={styles.main}>
      {/* Hero 3D Section */}
      <HeroSection />

      {/* Featured Works */}
      <FeaturedWorks sections={sections} />

      {/* Course Section */}
      <CourseSection />

      {/* Contact Section (olive green) */}
      <ContactSection />

      {/* Footer is in layout */}
    </main>
  );
}
