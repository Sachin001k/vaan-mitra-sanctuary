// Media from the team's Drive folder "Website Images & Videos", converted to WebP/MP4
// under public/media/<section>/ (location metadata stripped). Each folder has a manifest.json.
export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type Video = {
  src: string;
  poster: string;
  title: string;
  caption?: string;
};

// Home hero: RAPTOR field test in farmland at a forest edge (cropped 16:9 from the RAPTOR folder).
export const HERO_IMAGE: Photo & { srcSmall: string } = {
  src: "/media/home/hero-field.webp",
  srcSmall: "/media/home/hero-field-1200.webp",
  alt: "RAPTOR prototype on a tripod in dry farmland with trees and a tiled-roof shelter",
  caption: "Field test of the RAPTOR prototype",
  width: 2400,
  height: 1350,
};

export type ParkMap = Photo & { park: string; state: string; width: number; height: number };

// Kanha and Tadoba maps are in public/media/maps but not shown: they appear to be a lodge's
// promotional graphic and a cropped newspaper infographic. Add them once rights are confirmed.
export const PARK_MAPS: ParkMap[] = [
  {
    src: "/media/maps/kaziranga-national-park-gates.webp",
    alt: "Map of Kaziranga National Park showing its ranges and entry gates along the Brahmaputra",
    park: "Kaziranga National Park",
    state: "Assam",
    caption: "Ranges and entry gates",
    width: 1024,
    height: 537,
  },
  {
    src: "/media/maps/jim-corbett-tiger-reserve.webp",
    alt: "Sketch map of Corbett Tiger Reserve showing zones, roads and rivers",
    park: "Corbett Tiger Reserve",
    state: "Uttarakhand",
    caption: "Sketch map of the reserve",
    width: 1692,
    height: 1107,
  },
];

const raptor = (n: string, alt: string, caption: string, width = 1800, height = 1350): Photo => ({
  src: `/media/raptor/raptor-${n}.webp`,
  alt,
  caption,
  width,
  height,
});

// Captions state the stage (field test / prototype / design) as the master copy asks.
export const RAPTOR_HERO = raptor(
  "03",
  "RAPTOR prototype on a tripod in a dry harvested field, a tiled-roof shelter behind",
  "Field test · prototype on a tripod in farmland",
);

export const RAPTOR_BENCH = raptor(
  "21",
  "RAPTOR components laid out on a desk: Raspberry Pi in a green case, webcam, microphone, power bank and enclosure panel",
  "Prototype · components before assembly",
);

export const RAPTOR_GALLERY: Photo[] = [
  raptor("01", "RAPTOR unit on a tripod on a dirt track through scrubland", "Field test · scrubland"),
  raptor("06", "Wide view of the RAPTOR unit on a tripod in an open field with a shelter and power lines behind", "Field test · open farmland"),
  raptor("08", "Rear view of the tripod unit showing the microphone base", "Field test · microphone and camera unit"),
  raptor("02", "RAPTOR unit on a tripod beside green shrubs, hills in the distance", "Field test · scrub edge"),
  raptor("20", "Computer screen showing a 3D CAD model of the RAPTOR enclosure with a vent grille", "Design · enclosure CAD model"),
  raptor("27", "Hands fitting the Raspberry Pi into the green 3D-printed case", "Prototype · assembly"),
  raptor("33", "Hands closing the green 3D-printed case over the Raspberry Pi", "Prototype · assembly"),
  raptor("10", "Green 3D-printed case with USB and Ethernet ports, mounted for indoor testing", "Prototype · indoor test mount", 1600, 898),
  raptor("11", "Assembled RAPTOR unit with webcam and microphone zip-tied for indoor testing", "Prototype · indoor test mount", 1600, 898),
];

export const RAPTOR_VIDEO: Video = {
  src: "/media/raptor/raptor-video-01.mp4",
  poster: "/media/raptor/raptor-video-01-poster.webp",
  title: "RAPTOR prototype components",
  caption: "Prototype · a walk-through of the components",
};

const photo = (n: string, alt: string, caption: string, width: number, height: number): Photo => ({
  src: `/media/photography/photo-${n}.webp`,
  alt,
  caption,
  width,
  height,
});

// Curated from 34 photos in Drive. Left out: two with third-party watermarks (23, 24), a photo
// of a screen (15), blurry shots (18, 25), a painting (22), a graphic kill (28), one with
// identifiable children (34) and near-duplicates. Photographer credits to be added when supplied.
export const WILDLIFE_PHOTOS: Photo[] = [
  photo("12", "Tigress walking past fallen logs while two cubs play beside her", "Tiger with cubs · April 2026", 1290, 791),
  photo("21", "Tiger lying under a mossy fallen log in red leaf litter, looking at the camera", "Tiger · April 2026", 1290, 1595),
  photo("19", "Leopard on a narrow forest track looking back at the camera", "Leopard · May 2026", 1219, 1600),
  photo("16", "Tiger swiping at the hind leg of a gaur on a red dirt track", "Tiger and gaur · February 2026", 1290, 774),
  photo("26", "Tiger walking out of green undergrowth with its tail raised", "Tiger · July 2025", 1028, 810),
  photo("27", "Leopard crossing a shaded dirt track, seen in profile", "Leopard · June 2026", 1290, 827),
  photo("29", "Tiger standing in shaded forest, looking at the camera", "Tiger · June 2026", 1274, 1600),
  photo("11", "Two leopards climbing in a leafless tree", "Leopards · April 2026", 1165, 1600),
  photo("02", "Herd of Asian elephants with calves at a lake edge", "Asian elephants · April 2026", 1280, 960),
  photo("13", "Young leopard resting its forepaws on a rock ledge", "Leopard · June 2026", 1290, 824),
  photo("14", "Gaur and spotted deer feeding together under shade trees", "Gaur and chital · April 2026", 1280, 960),
  photo("07", "Leopard walking in profile along a dirt track", "Leopard · June 2026", 1146, 1600),
  photo("10", "Bird of prey perched on a bare tree branch", "Bird of prey · April 2026", 845, 1280),
  photo("04", "Tiger resting among boulders, framed by leaves", "Tiger · April 2026", 1152, 1600),
  photo("30", "Sunlight filtering through a tall forest canopy", "Forest canopy", 1350, 1800),
];

export const WILDLIFE_VIDEO: Video = {
  src: "/media/photography/video-01.mp4",
  poster: "/media/photography/video-01-poster.webp",
  title: "Tiger sitting in a waterhole as a red junglefowl walks past",
  caption: "Tiger and red junglefowl at a waterhole · June 2026",
};

const impact = (n: string, alt: string, caption: string, width: number, height: number): Photo => ({
  src: `/media/impact/impact-${n}.webp`,
  alt,
  caption,
  width,
  height,
});

// Outreach photos from the Impact folder. Shots where children's faces are identifiable are not
// used (master copy: safeguarding review first); school screenings are shown from behind.
export const OUTREACH_PHOTOS: Photo[] = [
  impact("12", "Two men outside a village shop reading a booklet with a tiger-stripe cover", "Field listening · sharing conflict-prevention guidance at a village shop", 1400, 1050),
  impact("08", "Four men on a village road, two holding up booklets", "Field listening · conversations with residents", 1400, 1050),
  impact("13", "A man shows a booklet to two men on a dirt road, cattle behind", "Field listening · on the village road", 1400, 1050),
];

export const SCREENING_PHOTOS: Photo[] = [
  impact("36", "Wide view from the back of a school computer lab during a wildlife film screening", "Conservation storytelling · school screening", 1280, 720),
  impact("28", "Rows of students, seen from behind, watching a film on a projector screen", "Conservation storytelling · school screening", 1280, 720),
  impact("31", "Students seen from behind watching footage of monkeys", "Community education · wildlife behaviour session", 1280, 720),
];

export const ARTWORK_PHOTOS: Photo[] = [
  impact("18", "Linocut-style print of a tiger among grasses", "Artwork · tiger print", 1050, 1400),
  impact("01", "Pencil sketch of an Asian elephant", "Artwork · Asian elephant sketch", 1080, 822),
  impact("19", "Painting of a sea turtle on an easel", "Artwork · sea turtle painting", 1050, 1400),
];

export const FIELD_WALK_VIDEO: Video = {
  src: "/media/impact/impact-video-01.mp4",
  poster: "/media/impact/impact-video-01-poster.webp",
  title: "Group walking through dry forest during a field visit",
  caption: "Field visit · walking through dry forest",
};

export const LANDSCAPE_IMAGES = {
  central: impact("02", "Tiger sculptures above a sign reading Nagpur – The Tiger Capital of India", "Nagpur, gateway to central India's tiger landscapes", 1400, 1050),
  ranthambore: impact("07", "Tiger sculptures and a plaque reading Machali – A Legacy in Stripes at Ranthambhore", "Machali memorial, Ranthambhore", 1400, 1050),
  elephants: photo("02", "Herd of Asian elephants with calves at a lake edge", "Asian elephants · April 2026", 1280, 960),
};

export const ALL_PHOTOS_BY_CATEGORY: { id: string; label: string; photos: Photo[] }[] = [
  { id: "wildlife", label: "Wildlife and habitat", photos: WILDLIFE_PHOTOS },
  { id: "people", label: "People and coexistence", photos: OUTREACH_PHOTOS },
  { id: "research", label: "Field research", photos: [RAPTOR_HERO, ...RAPTOR_GALLERY.slice(0, 4), RAPTOR_BENCH] },
  { id: "education", label: "Education and outreach", photos: [...SCREENING_PHOTOS, ...ARTWORK_PHOTOS] },
];
