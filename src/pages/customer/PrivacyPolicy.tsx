import { LegalPageLayout, LegalSectionBlock } from "../../components/legal/LegalPageLayout";

const SECTIONS = [
  { id: "what-we-collect", title: "What we collect" },
  { id: "why-we-collect", title: "Why we collect your information" },
  { id: "how-we-use", title: "How we use your information" },
  { id: "who-we-share-with", title: "Who we share your information with" },
  { id: "retention", title: "How long we keep your information" },
  { id: "requesting-deletion", title: "How to request deletion" },
  { id: "cookies", title: "Cookies and local storage" },
  { id: "questions", title: "Questions about privacy" },
];

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      eyebrow="Data Protection & Compliance"
      subtitle="How we safeguard your information, secure your transactions, and respect your privacy across all SiOL services."
      heroImage="/privacy.jpg"
      lastUpdated="[Date, e.g. September 22, 2026]"
      sections={SECTIONS}
    >
      <LegalSectionBlock
        id="what-we-collect"
        title="What we collect"
        summary="We collect only the information necessary to fulfill your orders, provide customer support, and keep your account secure."
        isFirst={true}
      >
        <p>
          When you create an account or make a purchase, we collect your name, email address, and mobile phone number.
        </p>
        <p>
          When you place an order, we collect your recipient name, shipping address, landmark, and postal PIN code so our logistics team can deliver your package.
        </p>
        <p>
          When you pay for an order, our payment partner [Razorpay] processes your payment method over an encrypted connection. We receive transaction verification details, such as the payment status and transaction identifier. We never see, process, or store your raw payment card numbers, CVV codes, UPI PINs, or net banking passwords.
        </p>
        <p>
          When you browse our site, our systems automatically log technical device information, including your IP address, browser type, operating system version, and general network location. We use this data strictly to diagnose technical faults and optimize loading speeds.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="why-we-collect"
        title="Why we collect your information"
        summary="Every piece of information we collect is tied directly to delivering your purchases and supporting your experience."
      >
        <p>
          We use your contact and delivery information to ship your orders, send order confirmations, and transmit live delivery updates by SMS and email.
        </p>
        <p>
          We use your purchase records to help our customer support team verify your identity, answer technical questions, process returns, and confirm warranty claims.
        </p>
        <p>
          We use your billing details to generate valid Goods and Services Tax (GST) invoices and maintain financial records required under Indian law.
        </p>
        <p>
          We use technical access logs to detect fraudulent payment attempts, safeguard customer accounts, and protect our store against malicious automated attacks.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="how-we-use"
        title="How we use your information"
        summary="We use your personal data strictly to operate our store and deliver the products you purchase."
      >
        <p>
          We do not sell your personal information. We do not monetize your browsing history.
        </p>
        <p>
          We do not display third-party advertisements on our website, nor do we disclose your information to external advertising brokers or behavioral tracking networks.
        </p>
        <p>
          If you opt in to receive product announcements, we send occasional updates about new flagship devices and software updates. You can unsubscribe at any time by clicking the unsubscribe link at the bottom of any email.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="who-we-share-with"
        title="Who we share your information with"
        summary="We share your information only with essential partners who help us process payments and deliver your orders."
      >
        <p>
          We share your name, delivery address, and phone number with our verified logistics carriers, such as [Delhivery, Blue Dart, or designated carrier], so they can transport and hand over your package.
        </p>
        <p>
          We share checkout transaction values with our payment gateway partner, [Razorpay], which handles card and UPI authentication under PCI-DSS Level 1 compliance standards.
        </p>
        <p>
          We share your email and mobile phone number with our transactional messaging infrastructure providers solely to transmit receipts, one-time passwords (OTPs), and shipment tracking alerts.
        </p>
        <p>
          We disclose customer information only when compelled by a valid court order, lawful governmental inquiry, or binding statutory requirement under the laws of India.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="retention"
        title="How long we keep your information"
        summary="We keep your information only as long as required to serve you and fulfill statutory obligations."
      >
        <p>
          We retain your profile and order history for as long as your account remains open and active on our platform.
        </p>
        <p>
          We retain financial transaction logs, invoices, and GST tax records for [7 years] following an order to comply with statutory accounting and tax regulations in India.
        </p>
        <p>
          We retain customer support chat logs and correspondence for up to [2 years] to resolve warranty claims, replacement requests, or service disputes.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="requesting-deletion"
        title="How to request deletion of your information"
        summary="You have the right to request the deletion of your account and personal data at any time."
      >
        <p>
          To delete your account and associated personal data, send an email to <a href="mailto:[privacy@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[privacy@siol.in]</a> from your registered email address or use the account deletion option in your profile settings.
        </p>
        <p>
          We verify your identity to protect against unauthorized requests, and permanently erase your account data within [30 days] of verification.
        </p>
        <p>
          Statutory financial records, such as past tax invoices generated for completed purchases, cannot be erased immediately and will be retained until the legally prescribed retention period expires.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="cookies"
        title="Cookies and local storage"
        summary="We use essential cookies strictly to keep your shopping bag intact and your sign-in session secure."
      >
        <p>
          Session cookies ensure that items you add to your cart remain saved as you navigate between pages.
        </p>
        <p>
          Authentication tokens stored in secure local storage keep you safely signed in to your account.
        </p>
        <p>
          We do not use third-party cookies that track your browsing activity across other websites.
        </p>
        <p>
          You can disable cookies in your web browser settings at any time. Disabling cookies will prevent you from signing in or adding products to your cart.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="questions"
        title="Questions about privacy"
        summary="If you have questions about how we handle your data, our designated Grievance Officer is here to help."
      >
        <p>
          In accordance with the Information Technology Act, 2000 and applicable consumer protection rules, our designated Grievance Officer can be reached directly:
        </p>
        <p>
          Grievance Officer: [Grievance Officer Name]<br />
          Email: <a href="mailto:[privacy@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[privacy@siol.in]</a><br />
          Entity: [Business Name]<br />
          Registered Address: [Registered Office Address, City, State, PIN Code, India]<br />
          Phone: [Contact Phone Number, e.g. +91-XXXXXXXXXX]
        </p>
        <p>
          We acknowledge all privacy inquiries within [24 hours] and provide a resolution within [15 business days].
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}

export default PrivacyPolicyPage;
