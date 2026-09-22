import { LegalPageLayout, LegalSectionBlock } from "../../components/legal/LegalPageLayout";

const SECTIONS = [
  { id: "processing-time", title: "Order processing time" },
  { id: "delivery-timelines", title: "Delivery timelines across India" },
  { id: "shipping-charges", title: "Shipping charges and free shipping" },
  { id: "cash-on-delivery", title: "Cash on Delivery (COD)" },
  { id: "tracking-your-order", title: "Tracking your package" },
  { id: "delays", title: "Delays beyond our control" },
  { id: "undeliverable-or-lost", title: "Damaged, lost, or undelivered packages" },
];

export function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      title="Shipping Policy"
      eyebrow="Fulfillment & Logistics"
      subtitle="Fast dispatch, express delivery timelines, and doorstep tracking across all pin codes in India."
      heroImage="/policy-shipping-hero.jpg"
      lastUpdated="[Date, e.g. September 22, 2026]"
      sections={SECTIONS}
    >
      <LegalSectionBlock
        id="processing-time"
        title="Order processing time"
        summary="We process and hand over every confirmed order to our courier partners within [24 to 48 hours]."
        isFirst={true}
      >
        <p>
          Orders confirmed before [2:00 PM IST] on business days are queued for packaging and warehouse inspection the same day.
        </p>
        <p>
          Orders placed on Sundays or official national holidays are processed on the following working day.
        </p>
        <p>
          Each smartphone and precision accessory undergoes physical inspection and serial number scanning before it is sealed in tamper-evident shipping packaging.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="delivery-timelines"
        title="Delivery timelines across India"
        summary="Most shipments arrive at your doorstep within [2 to 5 business days], depending on your city."
      >
        <p>
          Metro and Tier 1 cities (including Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, and Pune): [2 to 3 business days].
        </p>
        <p>
          Tier 2 and Tier 3 cities: [3 to 5 business days].
        </p>
        <p>
          Northeastern states, island regions, and rural PIN codes: [5 to 8 business days].
        </p>
        <p>
          Business days do not include Sundays or gazetted public holidays.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="shipping-charges"
        title="Shipping charges and free shipping"
        summary="Standard delivery is complimentary on all orders valued at [₹999] or higher."
        >
        <p>
          Orders with a subtotal of [₹999] or more qualify for free standard shipping across all serviceable PIN codes in India.
        </p>
        <p>
          For orders under [₹999], a flat shipping fee of [₹99] is added at checkout to cover transit and packaging costs.
        </p>
        <p>
          Where express priority delivery is supported for your delivery address, you may select it at checkout for a flat surcharge of [₹199].
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="cash-on-delivery"
        title="Cash on Delivery (COD)"
        summary="Cash on Delivery is available for eligible PIN codes on orders up to [₹10,000]."
      >
        <p>
          A non-refundable handling fee of [₹50] applies to Cash on Delivery orders to cover dedicated courier cash collection and verification services.
        </p>
        <p>
          To ensure smooth delivery, please keep the exact cash amount ready at the time of delivery.
        </p>
        <p>
          Couriers cannot accept partial cash payments, nor can tamper-evident packages be opened before payment is handed to the courier.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="tracking-your-order"
        title="Tracking your package"
        summary="You will receive real-time SMS and email tracking links as soon as your parcel is dispatched."
      >
        <p>
          Your shipment notification email includes a direct tracking link and the assigned Air Waybill (AWB) tracking number from our logistics partner [Delhivery, Blue Dart, or designated carrier].
        </p>
        <p>
          You can track your package anytime by visiting your account dashboard and opening the Order History section.
        </p>
        <p>
          Live courier checkpoint scans typically appear online within [6 to 12 hours] after package pickup from our warehouse.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="delays"
        title="Delays beyond our control"
        summary="When logistical or weather disruptions happen, we work directly with couriers to keep you updated."
      >
        <p>
          Deliveries may experience unforeseen delays during extreme monsoons, regional holidays, state transit check-posts, or transport strikes.
        </p>
        <p>
          When an unexpected delay occurs, our team will proactively notify you with a revised delivery estimate by email and SMS.
        </p>
        <p>
          If your tracking status shows no movement for more than [4 consecutive days], contact our support desk at <a href="mailto:[support@siol.in]" className="text-[#0071e3] hover:underline underline-offset-4">[support@siol.in]</a> so we can expedite delivery with the carrier.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="undeliverable-or-lost"
        title="Damaged, lost, or undelivered packages"
        summary="If a package is damaged or lost during transit, we will replace the item or refund your purchase in full."
      >
        <p>
          If your parcel arrives visibly damaged, wet, or with broken security tape, refuse to accept the package from the courier and report it to us within [24 hours].
        </p>
        <p>
          If tracking indicates that your parcel was delivered but you have not received it, you must report the issue to us within [48 hours] so we can file an urgent courier dispute.
        </p>
        <p>
          Once a shipment is confirmed lost or damaged by our logistics partner, we will dispatch an immediate replacement or issue a full refund to your original payment method.
        </p>
      </LegalSectionBlock>
    </LegalPageLayout>
  );
}

export default ShippingPolicyPage;
