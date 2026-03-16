# Smart Food Waste Helper
Final project for the Building AI course
https://smart-food-waste-helper.vercel.app

## Summary
Smart Food Waste Helper is an AI-based app that helps people reduce food waste 
by tracking food items at home, sending expiry reminders, and suggesting meals 
based on available ingredients. It helps families, students, and busy adults 
save money and reduce unnecessary waste.

## Background
Food waste is a very common problem in everyday life. Many people buy too much 
food, forget what they already have, or fail to use ingredients before they expire.
This affects households worldwide and has both financial and environmental consequences.

Problems this idea solves:
* People forgetting what food they already have at home
* Food expiring before it gets used
* Not knowing what meals to cook with available ingredients
* Unnecessary spending on food that gets thrown away

I chose this topic because it is something many people experience personally, 
and I believe AI can make a practical, everyday difference in reducing waste 
and saving money.

## How is it used?
The app is used at home by anyone who shops for food and cooks meals. Users can:
* Upload photos of food items for automatic recognition
* Scan receipts to log purchases automatically
* Enter food items manually if preferred

The app then organizes the food inventory, sends reminders when items are close 
to expiring, and suggests recipes to use up ingredients before they go to waste.

Target users include:
* Families managing household groceries
* Students on tight budgets
* Busy working adults with limited time to plan meals

## Data sources and AI methods
The app would rely on the following data:
* Food item names and expiry dates
* Photos of food and product labels
* Shopping receipts
* Recipe databases

| AI Method | Purpose |
| --------- | ------- |
| Image Recognition | Identifying food items from photos |
| Text Recognition (OCR) | Reading expiry dates from labels and receipts |
| Recommendation System | Suggesting recipes based on available ingredients |

These techniques combined make the app convenient, accurate, and genuinely useful 
in daily life without requiring too much manual effort from the user.

## Challenges
The project has some important limitations to consider:

* Image recognition may fail if photo quality is poor or lighting is bad
* Expiry dates can be difficult to read if labels are unclear or damaged
* The system depends on users keeping their food list up to date — 
  if items are not added or removed, accuracy will suffer
* Privacy considerations around receipt scanning and household data storage
* The app cannot account for food stored in unlabelled containers or 
  items bought from markets without standard packaging

## What next?
The project could grow in several directions:

* Integration with grocery delivery apps and supermarket loyalty systems 
  to log purchases automatically
* Connection with smart kitchen devices (smart fridges, scales) for 
  automatic inventory tracking
* Nutrition-based meal recommendations to support both health and sustainability
* Shopping suggestions based on what the user is already running low on
* Community recipe sharing features to inspire users with new meal ideas

To move forward, the project would benefit from partnerships with grocery 
retailers, access to large recipe databases, and expertise in mobile app 
development and computer vision.

## Acknowledgments
* Inspired by a common real-life problem experienced in households worldwide
* Recipe data could be sourced from open databases such as 
  [Open Food Facts](https://world.openfoodfacts.org/) / 
  [Open Database License](https://opendatacommons.org/licenses/odbl/)
* Image recognition could build on open-source tools such as 
  [TensorFlow](https://www.tensorflow.org/) / Apache 2.0 License
* All external data, images, and tools would be used with proper 
  credit and in accordance with their respective licenses
