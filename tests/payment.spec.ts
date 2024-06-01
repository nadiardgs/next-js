import test, { expect } from "@playwright/test";

test.describe('API add-payment', () => {
  const USER = {
    userName: "Playwright",
    userEmail: "play@wright.com",
    userId: 0
  }
  
  const PAYMENT = {
      paymentName: "Payment",
      userId: USER.userId,
      paymentAmount: 10
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
      value = removeCharacterFromElement(`/['"]`, '');
      value = removeCharacterFromElement(`/\\`, '');

      return value;
    }

    function removeCharacterFromElement(element : string, character : string) : string
    {
      return element.replace(character+'+/g', '');
    }

    test.beforeAll(async ({request}) => {
      const res = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-user?userName=${USER.userName}&userEmail=${USER.userEmail}`);
      
      expect(res.status()).toBe(200);

      const response = await res.json();

      const id = getElementFromJson(response, 'id');

      USER.userId = parseInt(id);
      console.log(USER.userId);
    });

    test.afterAll(async ({request}) => {
      const res = await request.delete('https://next-js-lilac-tau-38.vercel.app/api/delete-payment',{
          data:{
              "name": PAYMENT.paymentName
          }
      });
      expect(res.status()).toBe(200);
      });

      console.log(PAYMENT.paymentName);
      console.log(PAYMENT.paymentAmount);

      test.only('API Get Request', async ({ request }) => {
        const response = await request.get(`https://next-js-lilac-tau-38.vercel.app/api/add-payment?paymentName=${PAYMENT.paymentName}&userId=${USER.userId}&paymentAmount=${PAYMENT.paymentAmount}`);

        expect(response.status()).toBe(200);

        const json = await response.json();

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