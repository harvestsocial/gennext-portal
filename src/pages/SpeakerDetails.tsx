import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import SpeakerImage from "@components/SpeakersSection/SpeakerImage";
import SpeakerBio from "@components/SpeakersSection/SpeakerBio";
import SpeakerAchievements from "@components/SpeakersSection/SpeakerAchievements";
import SpeakerPreviousEvents from "@components/SpeakersSection/SpeakerPreviousEvents";

import speakerDetailsData from "../jsonData/speakerDetailsData.json";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}
interface SpeakersData {
  id: number;
  name: string;
  position: string;
  image: string;
  content: string;
  contact: { phone: string; email: string; website: string; };
  socials: { id: string; icon: string; url: string; }[];
  achievements: { id: string; title: string; description: string; }[];
  previousEvents: { id: number; title: string; location: string; date: string; image: string; }[];
}

const breadcrumbData: BreadcrumbData = {
  title: "Speaker Details",
  image: "/assets/img/hero/comm-breadcrumb.png",
  links: [{ label: "Home", path: "/" }, { label: "Speaker Details" }],
};

const SpeakerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const speakerDetails = (speakerDetailsData as SpeakersData[]).find(
    (item) => item.id === Number(id)
  );

  if (!speakerDetails) {
    return (
      <p style={{ padding: "150px", textAlign: "center" }}>
        SpeakerDetailsData not found!
      </p>
    );
  }
  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>

      <div className="container speaker-details" id="containerAround">
        <div className="speaker-details__right-side" id="infoProduto">
          <SpeakerImage
            image={speakerDetails.image}
            name={speakerDetails.name}
            contact={speakerDetails.contact}
            socials={speakerDetails.socials}
          />
        </div>

        <div className="speaker-details__left-side" id="scrollGaleria">
          <div className="speaker-details__speaker-content">
            <SpeakerBio
              name={speakerDetails.name}
              position={speakerDetails.position}
              content={speakerDetails.content}
            />
            <SpeakerAchievements achievements={speakerDetails.achievements} />
            <SpeakerPreviousEvents
              name={speakerDetails.name}
              events={speakerDetails.previousEvents}
            />
          </div>
        </div>
      </div>

      <div className="tm-height-125 tm-height-lg-80"></div>
    </>
  );
};

export default SpeakerDetails;
