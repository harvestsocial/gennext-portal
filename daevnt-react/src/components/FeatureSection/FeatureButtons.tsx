

import React from "react";

interface Tab {
  id: "about" | "who" | "topic";
  label: string;
}

interface FeatureButtonsProps {
  activeTab: "about" | "who" | "topic";
  setActiveTab: React.Dispatch<React.SetStateAction<"about" | "who" | "topic">>;
}

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: Tab[] = [
    { id: "about", label: "ABOUT EXPO" },
    { id: "who", label: "WHO ATTENDS" },
    { id: "topic", label: "TOPIC KEY" },
  ];

  return (
    <div className="feature-content__buttons">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`feature-content__button ${activeTab === tab.id ? "button-active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FeatureButtons;
