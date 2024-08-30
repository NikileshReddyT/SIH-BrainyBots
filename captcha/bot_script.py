from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from selenium.webdriver.common.action_chains import ActionChains
import time
import random

# Set up the WebDriver
service = Service(executable_path=r"C:\Users\Seela\chromedriver-win64\chromedriver.exe")
driver = webdriver.Chrome(service=service)

# Load the CAPTCHA page
driver.get("file:///D:/captcha/captcha.html")

# Function to simulate realistic mouse movements
def simulate_mouse_movement(element):
    actions = ActionChains(driver)
    actions.move_to_element(element).perform()
    time.sleep(random.uniform(0.5, 1.0))  # Random delay to simulate checking

# Function to fill the honeypot field
def fill_honeypot():
    driver.execute_script("document.getElementById('botField').value = 'bot_test';")
    print("Filled the honeypot field.")

# Wait for the honeypot field to be present and interact with it
try:
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.ID, 'botField'))
    )
    fill_honeypot()
except TimeoutException:
    print("Timeout: Honeypot field not present.")

# Simulate human-like behavior before selecting the image
def simulate_human_interaction():
    time.sleep(random.uniform(1, 1.5))  # Random delay
    driver.execute_script("window.scrollBy(0, 100);")  # Simulate scrolling
    time.sleep(random.uniform(0.5, 1.0))  # Additional random delay

simulate_human_interaction()

# Find the correct image and an incorrect image
correct_image = None
incorrect_image = None

try:
    images = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.XPATH, "//img"))
    )
    
    # Identify correct and incorrect images
    for image in images:
        if image.get_attribute('data-shadow') == 'left':
            correct_image = image
        elif not incorrect_image:
            incorrect_image = image
    
    # Hover over each image one by one
    for i, image in enumerate(images):
        simulate_mouse_movement(image)
        print(f"Hovered over image with alt text: {image.get_attribute('alt')}")
        time.sleep(1)  # Delay between each hover
        
        if i == len(images) - 1:  # Last image
            if random.choice([True, False]) and correct_image:
                # 50% chance to select the correct image
                simulate_mouse_movement(correct_image)
                correct_image.click()
                print("Selected the correct image.")
                selected_image = correct_image
            elif incorrect_image:
                # Select the incorrect image
                simulate_mouse_movement(incorrect_image)
                incorrect_image.click()
                print("Selected an incorrect image.")
                selected_image = incorrect_image
            else:
                print("No images to select.")
            
            # Hover over the selected image
            if selected_image:
                simulate_mouse_movement(selected_image)

except StaleElementReferenceException:
    print("Encountered a stale element reference, skipping this image.")
except Exception as e:
    print(f"Error selecting image: {e}")

# Simulate human-like behavior before submission
simulate_human_interaction()

# Automatically submit the CAPTCHA
try:
    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "submitButton"))
    )
    simulate_mouse_movement(submit_button)  # Simulate moving to the element
    submit_button.click()
    print("Submitted the CAPTCHA.")
    
    # Display bot detected warning
    time.sleep(1)  # Wait for the submission to complete and to simulate some processing

    # Debugging output before checking the selected image
    if selected_image:
        print(f"Selected image has shadow: {selected_image.get_attribute('data-shadow')}")

    if selected_image and selected_image.get_attribute('data-shadow') == 'left':
        print("Bot detected: correct image selected.")
    elif selected_image:
        print("Bot detected: incorrect image selected.")
    else:
        print("Bot detected: no image selected.")

except Exception as e:
    print(f"Error clicking submit button: {e}")

# Close the browser after a short delay
time.sleep(1)
driver.quit()
