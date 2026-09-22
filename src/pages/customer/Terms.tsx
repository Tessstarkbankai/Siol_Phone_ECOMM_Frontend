import { LegalPageLayout, LegalSectionBlock } from "../../components/legal/LegalPageLayout";

const SECTIONS = [
  { id: "acceptable-use", title: "Acceptable use of the site" },
  { id: "account-responsibilities", title: "Your account responsibilities" },
  { id: "pricing-and-payments", title: "Pricing, taxes, and payment" },
  { id: "limits-on-liability", title: "Limits on our liability" },
  { id: "governing-law", title: "Governing law and disputes" },
  { id: "changes-to-terms", title: "Changes to these terms" },
  { id: "company-information", title: "Company information" },
];

export function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      eyebrow="Legal Agreement"
      subtitle="The clear, transparent terms that govern your purchases, account, and use of our store."
      heroImage="/policy-terms-hero.jpg"
      lastUpdated="[Date, e.g. September 22, 2026]"
      sections={SECTIONS}
    >
      <LegalSectionBlock
        id="acceptable-use"
        title="Acceptable use of the site"
        summary="You may use our website solely for personal, lawful browsing and purchasing."
        isFirst={true}
      >
        <p>
          You may not use automated bots, spiders, scrapers, or scripts to collect product information, pricing, or catalog images from our website.
        </p>
        <p>
          You may not probe, scan, or test the vulnerability of our systems, bypass security barriers, or introduce viruses or malicious code.
        </p>
        <p>
          You may not place fraudulent orders or use unauthorized credit cards, stolen bank credentials, or fictitious delivery identities.
        </p>
        <p>
          We reserve the right to suspend or permanently deactivate accounts that violate these rules.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="account-responsibilities"
        title="Your account responsibilities"
        summary="You are responsible for keeping your login credentials secure and for all activity on your account."
      >
        <p>
          When you register an account or place an order, you agree to provide accurate, current, and complete personal and delivery information.
        </p>
        <p>
          You must protect your password and one-time verification passcodes (OTPs). Do not share them with anyone, including individuals claiming to represent our customer support team.
        </p>
        <p>
          If you believe your account has been compromised, notify us immediately at <a href="mailto:[support@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[support@siol.in]</a> so we can secure your profile.
        </p>
        <p>
          We are not liable for losses caused by unauthorized use of your login credentials if you failed to keep them confidential.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="pricing-and-payments"
        title="Pricing, taxes, and payment"
        summary="All prices are listed in Indian Rupees (INR) and include applicable Goods and Services Tax (GST)."
      >
        <p>
          Prices shown on product pages are final and inclusive of statutory GST. Any applicable delivery charges are calculated and displayed transparently before you complete payment.
        </p>
        <p>
          We process online payments through our certified partner [Razorpay]. Supported payment methods include UPI apps, major credit and debit cards, net banking, and verified digital wallets.
        </p>
        <p>
          An order is officially accepted once your payment is authorized and our system issues a digital order confirmation receipt.
        </p>
        <p>
          In the rare event that a product is displayed with an incorrect price due to a technical error, we will cancel the order and promptly refund the full amount paid to your original payment method.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="limits-on-liability"
        title="Limits on our liability"
        summary="Our products and services are provided without warranties beyond manufacturer warranties and statutory guarantees."
      >
        <p>
          We guarantee that all smartphones and hardware accessories sold through our store are 100% genuine, brand-new, and sourced through official distribution channels.
        </p>
        <p>
          Hardware warranties, repair services, and post-sales technical support are governed by the respective manufacturer's brand warranty terms.
        </p>
        <p>
          To the maximum extent permitted by Indian law, our total financial liability for any claim relating to an order will not exceed the amount you actually paid for that specific item.
        </p>
        <p>
          We are not liable for indirect, incidental, special, or consequential losses, including lost profits, commercial disruption, or lost data.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="governing-law"
        title="Governing law and disputes"
        summary="These terms are governed by the laws of India, and any legal disputes will be resolved in Indian courts."
      >
        <p>
          These terms and all transactions on our website are governed by and construed in accordance with the substantive laws of India.
        </p>
        <p>
          Any dispute, controversy, or claim arising out of your use of our platform or purchase of goods shall fall under the exclusive jurisdiction of the competent courts in [New Delhi / Gurugram, India].
        </p>
        <p>
          If any individual clause in these terms is found invalid or unenforceable by a court of competent jurisdiction, the remaining clauses will remain in full force.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="changes-to-terms"
        title="Changes to these terms"
        summary="We update these terms occasionally to reflect new features, operational policies, or statutory requirements."
      >
        <p>
          Whenever we revise these terms, we will update the "Last updated" date at the top of this document.
        </p>
        <p>
          Your continued use of our platform after revised terms are posted indicates your acceptance of the updated terms.
        </p>
        <p>
          If you do not agree with any updated terms, you should discontinue using our website and may request the closure of your account.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="company-information"
        title="Company information"
        summary="For formal legal inquiries or statutory communications, you can reach our corporate office."
      >
        <p>
          Entity Name: [Business Name]<br />
          Corporate Registration / CIN: [Company Registration / CIN Number]<br />
          GST Identification Number: [GSTIN: 06AAAAA0000A1Z5]<br />
          Registered Office: [Registered Office Address, City, State, PIN Code, India]<br />
          Legal Inquiries: <a href="mailto:[legal@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[legal@siol.in]</a><br />
          Telephone: [Contact Phone Number, e.g. +91-XXXXXXXXXX]
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}

export default TermsPage;
