# Dynamic One-Page Website with React

## Overview

https://github.com/user-attachments/assets/97a25bc8-2ff4-4f0e-bea1-7c8c339b4371

LINK - https://dashboard-take-uforward.vercel.app/

This project is a dynamic one-page website built with React, designed to offer a clean and functional user experience. The website includes various features such as a toggleable banner, countdown timer, and an internal dashboard for managing banner content. Additionally, it integrates with MySQL for data storage and utilizes Cloudflare Workers for serverless backend deployment.

## Features

- **Simple, Clean Layout:**
  - A one-page design with an optional banner.
  - Banner visibility can be toggled on or off.

- **Frontend Countdown Display:**
  - A reverse clock countdown timer on the banner.
  - Displays the remaining time before the banner disappears.

- **Internal Dashboard:**
  - **Banner Controls:**
    - Toggle the banner visibility.
    - Update the banner's text content.
    - Set a timer to control how long the banner is displayed.
    - Add a clickable link to the banner directing users to a specified URL.

- **Database Integration:**
  - Utilizes MySQL to store banner details, including description, timer settings, and link.
  - The dashboard retrieves and updates this information from the database.

## Additional Features

- **/updateTimer Route:**
  - Allows users to update task details including year, month, date, and description.

- **Serverless Backend Deployment:**
  - Deployed using Cloudflare Workers to enhance scalability and performance.
