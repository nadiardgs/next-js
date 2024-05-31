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

    function removeChar(str: string, char: any) {
      return str.replace(new RegExp(char, 'g'), () => '');
  }

    function getElementFromJson(json : any, element: string): string
            {
            const jsonAsString = JSON.stringify(json);
            const arrayJson = jsonAsString.split(',');
            let line = '';

            for (let i = 0; i < arrayJson.length; i++)
            {
                if (arrayJson[i].includes(element))
                {
                    line = arrayJson[i];
                }
            }

            if (line == '') return line;

            let value = line.split(':')[1];
            value = removeChar(value, "\\");
            value = removeChar(value, "\"");
            return value;
        }

    test.beforeEach(async ({request}) => {
      const res = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-user?userName=${USER.userName}&userEmail=${USER.userEmail}`);
      
      expect(res.status()).toBe(200);

      const response = await res.json();
      const json = JSON.stringify(response);

      const id = getElementFromJson(json, 'id');

      USER.userId = parseInt(id);
    });

    test.afterEach(async ({request}) => {
      const res = await request.delete('https://next-js-lilac-tau-38.vercel.app/api/delete-payment',{
          data:{
              "name": PAYMENT.paymentName
          }
      });
      expect(res.status()).toBe(200);
      });

      test.only('API Get Request', async ({ request }) => {
        const response = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-payment?paymentName=${PAYMENT.paymentName}&userId=${USER.userId}&paymentAmount=${PAYMENT.paymentAmount}`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        const json = JSON.stringify(body);

        const name = getElementFromJson(json, 'name');
        console.log(name);
        const userId = getElementFromJson(json, 'userId');
        console.log(userId);
        const amount = getElementFromJson(json, 'amount');
        console.log(amount);

        expect(name).toBe(PAYMENT.paymentName);
        expect(userId).toBe(PAYMENT.userId);
        expect(amount).toBe(PAYMENT.paymentAmount);
    })
    
  });