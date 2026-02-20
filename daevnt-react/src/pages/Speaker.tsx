import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import SpeakerCard from "@components/SpeakersSection/SpeakerCard";

import speakersData from "../jsonData/speakersData.json";

interface SpeakersData {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

const breadcrumbData: BreadcrumbData = {
  title: "Speakers",
  image: "/assets/img/hero/comm-breadcrumb.png",
  links: [{ label: "Home", path: "/" }, { label: "Speakers" }],
};

const Speaker: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="speakers-members">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 row-gap-3 row-cols-xl-4">
            {speakersData.map((speaker: SpeakersData) => (
              <div className="col" key={speaker.id}>
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default Speaker;
