
import React from "react";

interface SpeakerBioProps {
  name: string;
  position: string;
  content: string;
}

const SpeakerBio: React.FC<SpeakerBioProps> = ({ name, position, content }) => (
  <div className="speaker-details__bio-info">
    <h6 className="speaker-details__bio-title">{name}</h6>
    <p className="speaker-details__bio-subtitle">{position}</p>
    <p className="speaker-details__bio-desp">{content}</p>
  </div>
);

export default SpeakerBio;
