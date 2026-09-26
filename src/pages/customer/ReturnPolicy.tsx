import { LegalPageLayout, LegalSectionBlock } from "../../components/legal/LegalPageLayout";

const SECTIONS = [
  { id: "return-window", title: "Return window" },
  { id: "eligible-items", title: "What can be returned and in what condition" },
  { id: "ineligible-items", title: "Items that cannot be returned" },
  { id: "how-to-initiate", title: "How to initiate a return" },
  { id: "return-shipping-costs", title: "Who pays for return shipping" },
  { id: "refund-methods", title: "Refund methods and processing timelines" },
  { id: "replacements-and-warranty", title: "Replacements and brand warranty" },
];

export function ReturnPolicyPage() {
  return (
    <LegalPageLayout
      title="Return Policy"
      eyebrow="Customer Guarantee"
      subtitle="Hassle-free doorstep returns, complimentary reverse pickup, and prompt refunds with zero friction."
      heroImage="/ref.jpg"
      lastUpdated="[Date, e.g. September 22, 2026]"
      sections={SECTIONS}
    >
      <LegalSectionBlock
        id="return-window"
        title="Return window"
        summary="You can request a return within [7 days] of receiving your order."
        isFirst={true}
      >
        <p>
          The return window opens on the day the courier confirms delivery of your parcel.
        </p>
        <p>
          Return requests submitted after the [7-day] window closes cannot be accepted.
        </p>
        <p>
          Even after the return window expires, your purchase remains covered under the official manufacturer brand warranty.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="eligible-items"
        title="What can be returned and in what condition"
        summary="Products must be in brand-new condition with complete original packaging and accessories."
      >
        <p>
          Smartphones and electronics must be unactivated, unregistered, and free from any personal cloud accounts, passwords, or PIN locks.
        </p>
        <p>
          The product must be returned with all original accessories, including the retail box, charging cable, power adapter, documentation, and unbroken security seals where applicable.
        </p>
        <p>
          Items showing signs of physical wear, drops, screen scratches, moisture exposure, or software tampering will not pass inspection and cannot be refunded.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="ineligible-items"
        title="Items that cannot be returned"
        summary="Personal audio accessories, hygiene products, and digital items cannot be returned."
      >
        <p>
          In-ear headphones, earphones, and wearable items with broken hygiene packaging seals cannot be accepted for return due to health regulations.
        </p>
        <p>
          Digital gift cards, prepaid warranty extensions, and downloadable software licenses are non-returnable once issued.
        </p>
        <p>
          Items marked as "Final Sale" or promotional clearance at the time of purchase are ineligible for returns.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="how-to-initiate"
        title="How to initiate a return"
        summary="You can submit a return request in three simple steps through your account."
      >
        <p>
          Step 1: Sign in to your account, open Order History, and select "Request Return" next to the eligible order. You can also email <a href="mailto:[returns@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[returns@siol.in]</a> with your Order ID and clear photographs of the product and retail box.
        </p>
        <p>
          Step 2: Once your return is approved, our logistics partner will arrange a doorstep reverse pickup within [24 to 48 hours].
        </p>
        <p>
          Step 3: Pack the product securely inside its original shipping carton with all bundled components. Hand the parcel to the courier and retain the handover receipt.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="return-shipping-costs"
        title="Who pays for return shipping"
        summary="Return shipping is completely free if your product arrived damaged, defective, or incorrect."
      >
        <p>
          If your item arrived damaged in transit, with a verifiable manufacturing defect, or if we sent the wrong model, reverse pickup is [100% free of charge].
        </p>
        <p>
          For elective returns based on personal preference or change of mind, a reverse logistics fee of [₹150] is deducted from your refund to cover courier pickup costs.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="refund-methods"
        title="Refund methods and processing timelines"
        summary="Once our warehouse inspects the returned item, your refund is approved within [24 to 48 hours]."
      >
        <p>
          Our technical quality team examines the returned hardware within [2 business days] of arrival at our central facility.
        </p>
        <p>
          For prepaid transactions processed via [Razorpay] (credit cards, debit cards, UPI, and net banking), refunds are sent directly back to the original source payment account. Banks typically credit the amount within [5 to 7 business days].
        </p>
        <p>
          For Cash on Delivery (COD) orders, funds are remitted to your verified bank account via IMPS or NEFT after you provide your account details, or credited as instant store credit upon your request.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="replacements-and-warranty"
        title="Replacements and brand warranty"
        summary="If a device exhibits a manufacturing fault upon arrival, we provide an immediate brand-new replacement."
      >
        <p>
          If your device suffers an out-of-the-box hardware failure during the [7-day] return window, you may request an expedited direct replacement instead of a refund.
        </p>
        <p>
          After the [7-day] return window ends, any technical issues or hardware faults are serviced directly under the manufacturer's official warranty at authorized service centers nationwide.
        </p>
        <p>
          For assistance locating your nearest brand service center, contact our customer service desk at <a href="mailto:[support@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[support@siol.in]</a>.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}

export default ReturnPolicyPage;
