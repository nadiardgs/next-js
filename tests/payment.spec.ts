import test, { expect } from "@playwright/test";

test.describe('API add-payment', () => {
  const PAYMENT = {
      paymentName: "Playwright",
      userId: 3,
      paymentAmount: 10
  }

  test.afterAll(async ({request}) => {
    const res = await request.delete('https://next-js-lilac-tau-38.vercel.app/api/add-payment',{
        data:{
            "name": PAYMENT.paymentName
        }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
});

  test.only('API Post Request', async ({ request }) => {
    const response = await request.post('https://next-js-lilac-tau-38.vercel.app/api/add-payment', {
      data: {
        "paymentName" : PAYMENT.paymentName,
        "userId": PAYMENT.userId,
        "paymentAmount": PAYMENT.paymentAmount
      }
    });

    expect(response.status()).toBe(200);

    console.log(await response.json());

    const body = await response.json();
    const name = body.data[0].paymentName;
    const id = body.data[0].userId;
    const amount = body.data[0].paymentAmount;

    expect(name).toBe(PAYMENT.paymentName);
    expect(id).toBe(PAYMENT.userId);
    expect(amount).toBe(PAYMENT.paymentAmount);
  });
});