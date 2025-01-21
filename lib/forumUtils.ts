export const getPostLevelTagColour = (level: string): string => {
  switch (level) {
    case "H1 Chemistry":
      return "bg-tag-green";
    case "H2 Chemistry":
      return "bg-primary-700";
    default:
      return "bg-primary-700";
  }
};

export const getPostTopicTagColour = (topic: string): string => {
  switch (topic) {
    case "Atomic Structure":
      return "bg-tag-castaway";
    case "Chemical Bonding":
      return "bg-tag-spearmint";
    case "Acid-Base Equilibrium":
      return "bg-tag-strawberry";
    case "Intro to Organic Chemistry":
      return "bg-tag-caramel";
    // case "topic 1":
    //   return "#84be6c";
    // case "topic 2":
    //   return "#beb36c";
    default:
      return "bg-secondary-600";
  }
};
