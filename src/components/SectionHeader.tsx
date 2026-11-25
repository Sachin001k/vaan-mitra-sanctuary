import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

// Consistent eyebrow + serif heading + intro used across the site.
const SectionHeader = ({ eyebrow, title, children, align = "left", as = "h2" }: SectionHeaderProps) => {
  const Heading = as;
  const centered = align === "center";
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto" : ""} max-w-3xl`}>
      {eyebrow && (
        <p className="text-jungle-canopy uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-medium">
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-display text-ivory ${
          as === "h1" ? "text-4xl md:text-6xl mb-6" : "text-3xl md:text-5xl mb-5"
        }`}
      >
        {title}
      </Heading>
      {children && <div className="text-lg text-muted-foreground leading-relaxed space-y-4">{children}</div>}
    </div>
  );
};

export default SectionHeader;
