import test, { expect } from "@playwright/test";

test.describe('API add-payment', () => {
  const PAYMENT = {
      paymentName: "Payment",
      userId: 0,
      paymentAmount: 10
    }
  
    const USER = {
      userName: "Playwright",
      userEmail: "play@wright.com",
      userId: 0
    }

    test.beforeAll(async ({request}) => {
      const res = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-user?userName=${USER.userName}&userEmail=${USER.userEmail}`);
      expect(res.status()).toBe(200);

      const response = await res.json();
      const json = JSON.stringify(response);

      const line = json.split(':');
      const id = line[1].split(',');
      USER.userId = parseInt(id[0]);
      console.log(line[0]);
      console.log(line[1]);
      console.log(line[2]);
      console.log(line[3]);
      console.log(line[4]);
      console.log(line[5]);
      console.log(line[6]);
      console.log(line[7]);
      console.log(line[8]);

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

      test.only('API Get Request', async ({ request }) => {
        const response = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-payment?paymentName=${PAYMENT.paymentName}&userId=${USER.userId}&paymentAmount=${PAYMENT.paymentAmount}`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        const name = body.paymentName;
        const id = body.userId;
        const amount = body.paymentAmount;

        expect(name).toBe(PAYMENT.paymentName);
        expect(id).toBe(PAYMENT.userId);
        expect(amount).toBe(PAYMENT.paymentAmount);
    })
  });