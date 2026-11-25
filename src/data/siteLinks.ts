// Shared external links and contact details, from the website master copy.

export const CONTACT_EMAIL = "vannmitrafoundation.org@gmail.com";

export const FAULT_LINE_VIDEO_ID = "6fDL_dyWfio";
export const RAPTOR_VIDEO_ID = "3YR_UmPuDpQ";

export const IEEE_PAPER_URL = "https://ieeexplore.ieee.org/document/11580540";

export const PRESS_LINKS = [
  {
    outlet: "The Hitavada",
    title: "17-year-old Atharva builds AI device RAPTOR to detect elephant poaching",
    href: "https://www.thehitavada.com/Encyc/2025/11/25/17-year-old-atharva-builds-ai-device-raptor-to-detect-elephant-poaching.html",
  },
  {
    outlet: "EdexLive",
    title: "Listening to the forest: an AI innovator's mission to protect humans and wildlife",
    href: "https://www.edexlive.com/news/listening-to-the-forest-an-ai-innovators-mission-to-protect-humans-and-wildlife",
  },
];

export const RESEARCH_LINKS = [
  { label: "RAPTOR publication (IEEE Xplore)", href: IEEE_PAPER_URL },
  { label: "RAPTOR project video", href: `https://www.youtube.com/watch?v=${RAPTOR_VIDEO_ID}` },
  { label: "Fault Line documentary", href: `https://www.youtube.com/watch?v=${FAULT_LINE_VIDEO_ID}` },
  ...PRESS_LINKS.map((p) => ({ label: p.outlet, href: p.href })),
];
