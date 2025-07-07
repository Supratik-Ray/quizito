export default function personalizeQuestion(text, partnerName) {
  // Handle possessive form
  const possessive = partnerName.endsWith("s")
    ? `${partnerName}'`
    : `${partnerName}'s`;

  // Replace "your" with possessive
  let updated = text.replace(/\byour\b/gi, possessive);

  // Replace "you" when it's the subject (basic heuristic)
  updated = updated
    .replace(/\bDo you\b/gi, `Does ${partnerName}`)
    .replace(/\bAre you\b/gi, `Is ${partnerName}`)
    .replace(/\bHave you\b/gi, `Has ${partnerName}`)
    .replace(/\bCan you\b/gi, `Can ${partnerName}`)
    .replace(/\bWill you\b/gi, `Will ${partnerName}`)
    .replace(/\byou\b/gi, partnerName);

  return updated;
}
