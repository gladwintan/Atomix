import { Post, PostReply } from "@/types/type";

export const formatCourseName = (courseName: string) => {
  return courseName.split(" ").join("-").toLowerCase();
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-GB", options);
  return formattedDate.replace(/(\d{2})$/, "'$1");
};

export const formatPostTime = (date: string): string => {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const diff = currentDate.getTime() - pastDate.getTime(); // Difference in milliseconds

  const units: [string, number][] = [
    ["years", Math.floor(diff / (1000 * 60 * 60 * 24 * 365))],
    ["months", Math.floor(diff / (1000 * 60 * 60 * 24 * 30))],
    ["weeks", Math.floor(diff / (1000 * 60 * 60 * 24 * 7))],
    ["days", Math.floor(diff / (1000 * 60 * 60 * 24))],
    ["hours", Math.floor(diff / (1000 * 60 * 60))],
    ["minutes", Math.floor(diff / (1000 * 60))],
    ["seconds", Math.floor(diff / 1000)],
  ];

  for (const [unit, value] of units) {
    if (value == 1 && unit == "years") {
      return "last year";
    }
    if (value == 1 && unit == "months") {
      return "last month";
    }
    if (value == 1 && unit == "weeks") {
      return "last week";
    }
    if (value == 1 && unit == "days") {
      return "yesterday";
    }
    if (value >= 1) {
      return value + " " + unit + " ago";
    }
  }

  return "just now";
};

export const createRepliesWithNestLevel = (
  replies: (PostReply & { nestLevel: never })[]
): PostReply[] => {
  replies.sort(
    (a, b) =>
      new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
  );

  // Map replies by ID for quick lookup
  const replyMap = new Map();
  replies.forEach((reply) => replyMap.set(reply.replyId, reply));

  const flattenedReplies: PostReply[] = [];

  // Recursive function to compute nest level
  function addReplyWithNestLevel(reply: PostReply, nestLevel: number) {
    flattenedReplies.push({ ...reply, nestLevel }); // Add reply with nest level

    replies
      .filter((r) => r.parentReplyId === reply.replyId) // Find children of this reply
      .forEach((child) => addReplyWithNestLevel(child, nestLevel + 1)); // Recursive call for children
  }

  // Start building array from top-level replies
  replies
    .filter((reply) => !reply.parentReplyId) // Top-level replies have no parentReplyId
    .forEach((reply) => addReplyWithNestLevel(reply, 0)); // Start nest level at 0

  return flattenedReplies;
};

export const appendNewReply = (
  replies: PostReply[],
  newReply: PostReply & { nestLevel: never }
): PostReply[] => {
  const parentReplyId = newReply.parentReplyId;
  const parentIndex = replies.findIndex(
    (reply) => reply.replyId === parentReplyId
  );

  if (parentIndex === -1) {
    const newReplyWithNestLevel = { ...newReply, nestLevel: 0 };
    return [...replies, newReplyWithNestLevel];
  }
  const parentNestLevel = replies[parentIndex].nestLevel;
  const newReplyWithNestLevel = { ...newReply, nestLevel: parentNestLevel + 1 };

  let insertionIndex = parentIndex + 1;
  while (
    insertionIndex < replies.length &&
    replies[insertionIndex].nestLevel > parentNestLevel
  ) {
    insertionIndex++;
  }

  const updatedReplies = [...replies];
  updatedReplies.splice(insertionIndex, 0, newReplyWithNestLevel);

  return updatedReplies;
};

export const removeReplyTree = (
  replies: PostReply[],
  deletedReplyId: string
): PostReply[] => {
  const idsToRemove = new Set<string>();

  // Recursive function to collect all descendants of a reply
  function collectDescendants(id: string) {
    idsToRemove.add(id);
    replies
      .filter((reply) => reply.parentReplyId === id) // Find direct children
      .forEach((child) => collectDescendants(child.replyId)); // Recursively collect their descendants
  }

  collectDescendants(deletedReplyId);

  return replies.filter((reply) => !idsToRemove.has(reply.replyId));
};

export const getPostTopicTagColour = (topic: string): string => {
  switch (topic) {
    case "Atomic Structure":
      return "bg-tag-atomic";
    case "Chemical Bonding":
      return "bg-tag-bonding";
    case "Acid-Base Equilibrium":
      return "bg-tag-acidBase";
    case "Intro to Organic Chem":
      return "bg-tag-organic";
    // case "topic 1":
    //   return "#84be6c";
    // case "topic 2":
    //   return "#beb36c";
    default:
      return "bg-secondary-600";
  }
};
