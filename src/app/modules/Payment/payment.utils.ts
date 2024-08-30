import axios from "axios";
import config from "../../config";
type TPaymentInfo = {
  transactionId: string;
  payment: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};
export const initiatePayment = async ({
  transactionId,
  payment,
  name,
  email,
  phone,
  address,
}: TPaymentInfo) => {
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: transactionId,
    success_url: `https://game-grouhnds-sports-facility-booking-backend.vercel.app/api/payment`,
    fail_url:
      "https://game-grouhnds-sports-facility-booking-backend.vercel.app/api/payment/failed",
    cancel_url: "https://game-grounds-frontend.vercel.app",
    amount: payment,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: name,
    cus_email: email,
    cus_add1: address,
    cus_add2: "N/A",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: phone,
    type: "json",
  });

  return response.data;
};
