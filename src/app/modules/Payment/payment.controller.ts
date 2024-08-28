import catchAsync from "../../utils/catchAsync";

const createPayment = catchAsync(async (req, res) => {
  res.send(`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; color: #333;">
    <div style="background-color: #fff; padding: 40px; border-radius: 8px; text-align: center; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #4CAF50; margin: 0 0 20px 0;">GameGrounds</h1>
        <h2 style="color: #4CAF50; margin: 0 0 20px 0;">Booking Payment Successful</h2>
        <h3 style="margin: 0 0 10px 0;">Thank you for your booking!</h3>
        <p style="margin: 0 0 20px 0;">Your payment has been successfully processed.</p>
        <p style="margin: 0 0 20px 0;">You will receive a confirmation email with your booking details shortly.</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Go to Homepage</a>
    </div>
</div>
`);
});

export const paymentController = {
  createPayment,
};
