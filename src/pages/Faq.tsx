import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import FAQsContent from "@/components/Accordion/FAQsContent";
import Videos from "@/components/Videos/Videos";
import SponsorsSlider from "@components/Slider/SponsorsSlider/SponsorsSlider";
import CtaSection from "@components/Cta/CtaSection";


interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}


const breadcrumbData:BreadcrumbData = {
  title: "FAQs",
  image: "/assets/img/hero/comm-breadcrumb.png",
  links: [{ label: "Home", path: "/" }, { label: "FAQs" }],
};

const Faq: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <FAQsContent />
      <Videos />
      <SponsorsSlider />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <CtaSection />
    </>
  );
};

export default Faq;
