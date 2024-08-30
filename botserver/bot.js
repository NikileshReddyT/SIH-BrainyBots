const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5173");

    console.log("Waiting for form to load...");
    await page.waitForSelector("form", { timeout: 5000 });

    // Set typing delay to simulate a very fast typing speed
    const typingDelay = 20; // 20 ms per character to simulate a bot typing speed

    // Select the name input field
    const inputField = await page.$('input[type="text"]');
    if (!inputField) {
      throw new Error('No element found for selector: input[type="text"]');
    }

    // Type into the input field to simulate a bot typing
    await inputField.type("Bot typing simulation at a very fast speed", { delay: typingDelay });
    console.log("Input field filled.");

    // Click the submit button
    await page.click('button[type="submit"]');
    console.log("Submit button clicked.");

    // Wait for a short period to observe the behavior
    await new Promise((resolve) => setTimeout(resolve, 3000));

  } catch (error) {
    console.error("An error occurred:", error.message);
  } finally {
    // Close the browser if needed
    // await browser.close();
    console.log("Thank you.");
  }
})();