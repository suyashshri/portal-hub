import { Button } from "../ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["1 Resume upload", "1 JD comparison", "Basic ATS score"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹299 / month",
    features: [
      "Unlimited resumes",
      "Unlimited JD comparisons",
      "Advanced ATS breakdown",
      "Skill gap analysis",
      "Resume improvement tips",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 px-6 bg-black text-white">
      <h2 className="text-4xl font-bold font-mono text-center text-green-400">
        Simple pricing
      </h2>

      <p className="mt-4 text-center text-gray-400">
        Start free. Upgrade only when you need more power.
      </p>

      <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 border ${
              plan.highlighted
                ? "border-green-400 bg-green-400/5"
                : "border-green-500/20"
            }`}
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="mt-4 text-3xl font-bold text-green-400">
              {plan.price}
            </p>

            <ul className="mt-6 space-y-3 text-gray-300 text-sm">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <Button
              className={`mt-8 w-full h-11 ${
                plan.highlighted
                  ? "bg-green-400 text-black hover:bg-green-300"
                  : "border border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
              }`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
