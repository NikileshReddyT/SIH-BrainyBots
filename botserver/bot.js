const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5173");

    console.log("Waiting for form to load...");
    await page.waitForSelector("form", { timeout: 5000 });

    // Set typing delay to simulate a bot typing speed
    const typingDelay = 140; // Adjusted delay to simulate fast bot typing

    // Select the visible input field by its name
    const inputField = await page.$('input[name="userInput"]');
    if (!inputField) {
      throw new Error('No element found for selector: input[name="userInput"]');
    }

    // Type into the visible input field
    await inputField.type(
      "3467 3364 6991",
      {
        delay: typingDelay,
      }
    );
    console.log("Visible input field filled.");

    // Use evaluate to directly set the hidden input field value
    await page.evaluate(() => {
      const hiddenInput = document.querySelector('input[name="hiddenInput"]');
      if (hiddenInput) {
        hiddenInput.value = "bot@example.com"; // Set the value directly
        console.log(
          "Hidden input field found and value set to 'bot@example.com'."
        );
      } else {
        console.error("Hidden input field not found.");
      }

      // Log the current state of the form for debugging
      const form = document.querySelector("form");
      console.log("Form data:", new FormData(form));
    });

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
