<div align="center">
  <h1 align="center">📋 Healthcare RCM Analytics Platform</h1>
  <p align="center">
    A simulated web application to demonstrate key functionalities of a Revenue Cycle Management (RCM) dashboard and analytics system.
    <br /><br />
    <a href="https://tabitha-dev.github.io/RCM-Dashboard-Analytics/"><strong>View Live Site »</strong></a>
    <br /><br />
    <a href="https://github.com/tabitha-dev/RCM-Dashboard-Analytics/issues">Report Bug</a>
    ·
    <a href="https://github.com/tabitha-dev/RCM-Dashboard-Analytics/issues">Request Feature</a>
  </p>
</div>

<p align="center">
  <a href="https://img.shields.io/github/issues/tabitha-dev/RCM-Dashboard-Analytics">
    <img src="https://img.shields.io/github/issues/tabitha-dev/RCM-Dashboard-Analytics" alt="GitHub issues">
  </a>
  <a href="https://img.shields.io/github/forks/tabitha-dev/RCM-Dashboard-Analytics">
    <img src="https://img.shields.io/github/forks/tabitha-dev/RCM-Dashboard-Analytics" alt="GitHub forks">
  </a>
  <a href="https://img.shields.io/github/stars/tabitha-dev/RCM-Dashboard-Analytics">
    <img src="https://img.shields.io/github/stars/tabitha-dev/RCM-Dashboard-Analytics" alt="GitHub stars">
  </a>
  <a href="https://img.shields.io/github/languages/top/tabitha-dev/RCM-Dashboard-Analytics">
    <img src="https://img.shields.io/github/languages/top/tabitha-dev/RCM-Dashboard-Analytics" alt="Top language">
  </a>
  <a href="https://img.shields.io/github/last-commit/tabitha-dev/RCM-Dashboard-Analytics">
    <img src="https://img.shields.io/github/last-commit/tabitha-dev/RCM-Dashboard-Analytics" alt="Last commit">
  </a>
  <a href="https://tabitha-dev.github.io/RCM-Dashboard-Analytics/">
    <img src="https://img.shields.io/badge/demo-live-blue.svg" alt="Live Demo">
  </a>
  <a href="https://github.com/tabitha-dev/RCM-Dashboard-Analytics/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://github.com/tabitha-dev/RCM-Dashboard-Analytics/issues">
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="Contributions welcome">
  </a>
</p>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features--simulated-functionality">Key Features & Simulated Functionality</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#how-it-works">How It Works</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#future-enhancements-ideas">Future Enhancements Ideas</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

![image](https://github.com/user-attachments/assets/26cea6ff-3c2f-4eb8-ac04-9eac115f3ed4)


The **Healthcare RCM Analytics Platform** is a single-page web application mockup designed to showcase the core functionalities of a system that helps healthcare providers analyze and optimize their Revenue Cycle Management (RCM) performance. This project serves as a demonstration of front-end development skills using vanilla web technologies, simulating various interactions and data flows without a live backend.

It addresses critical aspects of RCM, including key performance indicator (KPI) tracking, trend analysis, patient account management, and reporting, all within a user-friendly and modern interface.

---

## Key Features & Simulated Functionality

This mockup provides a comprehensive simulated experience of a healthcare RCM analytics system:

* **📊 Dashboard Overview:**
    * **Holistic KPI Scorecards:** Displays key metrics like "Days in Accounts Receivable," "Net Collection Rate," "Denial Rate," and "Projected AR Days" with trend indicators (up/down arrows and percentage change).
    * **Interactive Trend Charts:** Visualizes "AR Trend Analysis," "Collections by Service," and "Denials by Reason" using HTML Canvas, with simulated dynamic data.
    * **Date Range Filtering:** Allows users to filter dashboard data by "Last 30 Days," "Last Quarter," "Year to Date," or "All Time."
    * **Threshold-Based Alerts:** Displays a prominent alert banner if "Days in AR" exceeds a customizable threshold.
    * **Drill-down Modals:** Clicking the "Denial Rate" KPI opens a modal with a simulated detailed breakdown of denials by payer, including a dedicated chart.
    * **Patient Accounts Table:** A dynamic table showing mock patient account details, with client-side search and pagination. A "View All Accounts" button scrolls to this section.

* **📈 Analytics Section:**
    * **Denial Analysis by Payer:** Features a dedicated chart visualizing denials across different payers, with a filter to highlight specific payers.
    * **Claim Submission Trends:** Displays a line chart showing simulated claim submission volumes over time.

* **🧾 Reports Section:**
    * **Report Parameters:** Allows users to select report type, data source, and output format via dropdowns.
    * **Calendar-Based Date Range:** Provides an interactive calendar for selecting custom date ranges for reports.
    * **Simulated Report Generation:** "Generate Report" button provides mock feedback.

* **🔧 Settings Management:**
    * **User Profile:** View and edit simulated user profile details (Name, Email, Role).
    * **Notifications:** Manage notification preferences (email, in-app, weekly summaries).
    * **Alert Thresholds:** Customize the "Days in AR Alert Threshold" value.
    * **Data Sources:** Select primary and secondary data sources.

* **📱 Mobile Responsiveness:**
    * The layout adapts gracefully to various screen sizes (mobile, tablet, desktop), ensuring usability across devices.
    * Tables intelligently collapse columns using container queries on narrower screens.

---

## Tech Stack

This project is built using fundamental web technologies, emphasizing a lightweight and client-side approach:

<p align="left">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
</p>

---

## How It Works

The application operates entirely within the browser, simulating complex functionalities using in-memory mock data and client-side JavaScript logic.

1.  **Initial Load:** The application loads directly to the Dashboard.
2.  **Data Simulation:** All data (KPIs, patient accounts, chart data) is stored in JavaScript arrays and objects within the browser's memory. There is no persistent backend database.
3.  **Dynamic Rendering:** JavaScript manipulates the DOM (Document Object Model) to dynamically update content, filter lists, and display simulated results based on user interactions.
4.  **Simulated Actions:** Buttons and form interactions trigger JavaScript functions that update in-memory data, display alerts, or render new chart visualizations, giving the impression of complex operations.
5.  **Navigation:** Section switching (Dashboard, Analytics, Reports, Settings) is handled by toggling the `display` CSS property of different content sections.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/tabitha-dev/RCM-Dashboard-Analytics.git](https://github.com/tabitha-dev/RCM-Dashboard-Analytics.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd RCM-Dashboard-Analytics
    ```
3.  **Open `index.html` in your browser:**
    You can simply double-click the `index.html` file or use a local server extension (like Live Server for VS Code) for convenience.

---

## Future Enhancements Ideas

To evolve this mockup into a more feature-rich and robust application, consider these enhancements:

* **Persistent Data Storage:** Integrate a lightweight client-side database (e.g., IndexedDB) or, for a more advanced version, a cloud-based NoSQL database (like Firebase Firestore) to persist user data across sessions.
* **Advanced Charting Library:** Replace custom canvas drawing with a professional JavaScript charting library (e.g., Chart.js, D3.js) for more complex visualizations and built-in interactivity.
* **Enhanced Drill-down:** Implement multi-level drill-down capabilities where clicking a chart segment filters related tables and other charts, providing deeper root-cause analysis.
* **Predictive Analytics Integration:** Integrate a simple machine learning model (even client-side, using libraries like TensorFlow.js) to generate more sophisticated future forecasts for KPIs.
* **Accessibility Audit:** Conduct a thorough accessibility audit to ensure the application is usable by individuals with disabilities, adding ARIA attributes and improving keyboard navigation.
* **User Authentication & Roles:** Implement a more robust mock authentication system with different user roles having truly distinct views and permissions.
* **Customizable Dashboards:** Allow users to rearrange, resize, and select which KPI cards and charts are visible on their dashboard.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See the `LICENSE` file for more information.

---

## 📬 Contact

* **Tabitha**
    * GitHub: [@tabitha-dev](https://github.com/tabitha-dev)
    * Email: tabitha@ieee.org
    * Project Link: [RCM-Dashboard-Analytics](https://github.com/tabitha-dev/RCM-Dashboard-Analytics)

