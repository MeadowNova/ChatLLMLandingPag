import Image from 'next/image'

export function ChatbotPricingHook() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
        {/* Left: Fiverr pricing */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            The Shocking Truth About Chatbot Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">What "Experts" on Fiverr Charge:</span>
            <br />
            <span className="text-3xl font-bold text-destructive">$18,000+</span> for Custom AI Chatbots
          </p>
          <div className="rounded-lg overflow-hidden border border-border shadow mb-4 w-full max-w-xs">
            <Image
              src="/fiver-1.png"
              alt="Fiverr Chatbot Pricing Example 1"
              width={400}
              height={250}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden border border-border shadow w-full max-w-xs">
            <Image
              src="/fiver-2.png"
              alt="Fiverr Chatbot Pricing Example 2"
              width={400}
              height={250}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        {/* Right: Course value */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            What You Can Build With This Course:
          </h3>
          <p className="text-lg mb-4">
            <span className="text-3xl font-bold text-success">Same Quality Chatbot for $20/month</span>
            <br />using Abacus.AI
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
            <span className="text-primary font-semibold">Why is nobody talking about this?!</span>
          </div>
          <p className="text-base text-muted-foreground mb-2">
            This course will give you all the tools you need to go from <span className="font-semibold text-foreground">zero to running enterprise bots</span> with top tier clients, commanding serious money—while AI does <span className="font-semibold text-foreground">99% of the work</span> for you.
          </p>
          <p className="text-base text-muted-foreground">
            Stop overpaying for "custom" chatbots. Learn the secrets, skip the hype, and start building real value for yourself and your clients.
          </p>
        </div>
      </div>
      {/* Comparison Table */}
      <div className="mt-12 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-background border border-border rounded-lg p-6 shadow text-center md:text-left">
          <h4 className="text-lg font-bold text-destructive mb-3">What They're Really Selling:</h4>
          <ul className="text-base text-muted-foreground space-y-2">
            <li>• Basic conversational AI</li>
            <li>• Simple integration scripts</li>
            <li>• Standard training on your data</li>
            <li>• Basic customization</li>
          </ul>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 shadow text-center md:text-left">
          <h4 className="text-lg font-bold text-primary mb-3">What You Get With Our Method:</h4>
          <ul className="text-base text-foreground space-y-2">
            <li>✓ Advanced Enterprise Grade AI capabilities</li>
            <li>✓ No-code visual builder</li>
            <li>✓ Unlimited customization</li>
            <li>✓ Full control and ownership</li>
            <li>✓ <span className="font-semibold">$20/month</span> to use Abacus.AI's ChatLLM and charge clients <span className="font-semibold text-destructive">$18,000+</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
