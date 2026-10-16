export const referralOffer = {
  friendAed: 50,
  creditAed: 50,
};

export const referralSteps = [
  'Share your code with a friend who has not visited 1847 yet.',
  `They book their first service with your code and get AED ${referralOffer.friendAed} off.`,
  `After their visit, AED ${referralOffer.creditAed} credit is added to your account.`,
];

export function shareMessage(code: string) {
  return `Try 1847 Grooming for Men. Use my code ${code} for AED ${referralOffer.friendAed} off your first service.`;
}
