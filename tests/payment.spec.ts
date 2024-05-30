import test, { expect } from "@playwright/test";

test.describe('API add-payment', () => {
  const PAYMENT = {
      paymentName: "Payment",
      userId: null,
      paymentAmount: 10
    }
  
    const USER = {
      userName: "Playwright",
      userEmail: "play@wright.com",
      userId: null
    }

    test.beforeAll(async ({request}) => {
      const res = await request.get('https://next-js-lilac-tau-38.vercel.app/api/add-user',{
          data:{
              "userName": USER.userName,
              "userEmail": USER.userEmail,
          }
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      const id = body.data[0].id;
      USER.userId = id;
    });

    test.afterAll(async ({request}) => {
      const res = await request.delete('https://next-js-lilac-tau-38.vercel.app/api/delete-payment',{
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
            "userId": USER.userId,
            "paymentAmount": PAYMENT.paymentAmount
          }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        const name = body.data[0].paymentName;
        const id = body.data[0].userId;
        const amount = body.data[0].paymentAmount;

        expect(name).toBe(PAYMENT.paymentName);
        expect(id).toBe(PAYMENT.userId);
        expect(amount).toBe(PAYMENT.paymentAmount);
    })
  });