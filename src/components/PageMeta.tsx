import { Helmet } from "react-helmet-async";

const SITE_URL = "https://vannmitra.org";
const SITE_NAME = "Vann Mitra Foundation";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
};

// Page-specific title, description, canonical URL and Open Graph preview.
const PageMeta = ({ title, description, path }: PageMetaProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
