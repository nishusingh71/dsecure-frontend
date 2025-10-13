import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function IconShowcase() {
  return (
    <>
      <SEOHead seo={getSEOForPage("icon-showcase")} />
    </>
  );
}
