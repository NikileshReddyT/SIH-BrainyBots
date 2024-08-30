const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5173");

    console.log("Waiting for form to load...");
    await page.waitForSelector("form", { timeout: 5000 });

    // Set typing delay to 0 for very fast typing
    const typingDelay = 70;

    // Check if the input fields exist before attempting to type
    const nameField = await page.$('input[name="name"]');
    const emailField = await page.$('input[name="email"]');
    const messageField = await page.$('textarea[name="message"]');

    if (!nameField) {
      throw new Error('No element found for selector: input[name="name"]');
    }
    if (!emailField) {
      throw new Error('No element found for selector: input[name="email"]');
    }
    if (!messageField) {
      console.warn('No element found for selector: textarea[name="message"], skipping this field.');
    } else {
      await messageField.type("This is a test message", { delay: typingDelay });
    }

    // Fill out the form fields if they exist
    await nameField.type("Bot", { delay: typingDelay });
    await emailField.type("bot@example.com", { delay: typingDelay });

    console.log("Form fields filled. Looking for submit button...");

    // Click the submit button
    await page.click('button[type="submit"]');

    console.log("Submit button clicked.");

    // Wait for a short period (3 seconds) after clicking to let you observe the behavior
    await new Promise((resolve) => setTimeout(resolve, 3000));

  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    // await browser.close();
    console.log("Thank you.");
  }
})();
