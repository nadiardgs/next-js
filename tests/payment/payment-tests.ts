import test, { expect } from "@playwright/test";

test('should create a bug report', async ({ request }) => {
    const newIssue = await request.post(`/add-user`, {
      data: {
        userName: 'John Doe',
        userEmail: 'johndoe@john.com',
      }
    });
    expect(newIssue.ok()).toBeTruthy();
  
    const issues = await request.get(`/get-all-users`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
      title: 'John Doe',
      body: 'johndoe@john.com'
    }));
  });