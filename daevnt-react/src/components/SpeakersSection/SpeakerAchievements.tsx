import React from "react";

interface Achievement {
  id: number | string;
  title: string;
  description: string;
}

interface SpeakerAchievementsProps {
  achievements: Achievement[];
}

const SpeakerAchievements: React.FC<SpeakerAchievementsProps> = ({ achievements }) => (
  <div className="speaker-details__achievement">
    <div className="accordion-benifits">
      <div className="accordion custom-accordion" id="accordionExample">
        {achievements.map((item, index) => (
          <div className="accordion-item" key={item.id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${item.id}`}
                aria-expanded={index === 0}
                aria-controls={`collapse-${item.id}`}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={`collapse-${item.id}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SpeakerAchievements;
