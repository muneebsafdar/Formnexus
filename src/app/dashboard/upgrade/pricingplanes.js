const pricingPlans = [
  {
    link: "https://buy.stripe.com/test_00wbJ0dl6dvxbGz9pe14401",
    duration: "Monthly",
    name: "Pro",
    description: "Perfect for growing creators and small businesses.",
    features: [
      "Unlimited forms",
      "Custom branding",
      "Email notifications",
      "Basic analytics",
      "Priority support",
    ],
    color: "from-purple-500 to-indigo-500",
    price: 7.99,
  },
  {
    link: "https://buy.stripe.com/test_5kQaEW3Kw9fh7qj6d214400",
    duration: "Yearly",
    name: "Premium",
    description: "For teams and professionals who want full control.",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced analytics",
      "API access",
      "24/7 dedicated support",
    ],
    color: "from-indigo-500 to-blue-500",
    price: 49.99,
  },
];

export { pricingPlans };
