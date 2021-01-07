# PWA-Webpack-IndexDB_Budget-Tracker

[![github-follow](https://img.shields.io/github/followers/jdhprogrammer?label=Follow&logoColor=purple&style=social)](https://github.com/jdhprogrammer) [![project-languages-used](https://img.shields.io/github/languages/count/jdhprogrammer/Online-Offline_Budget-Tracker?color=important)](https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker) [![project-top-language](https://img.shields.io/github/languages/top/jdhprogrammer/Online-Offline_Budget-Tracker?color=blueviolet)](https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker) [![license](https://img.shields.io/badge/License-mit-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

## Developer

### David Harris

Email: jdh.programmer@gmail.com  
GitHub: https://github.com/jdhprogrammer  
LinkedIn: https://www.linkedin.com/in/jdhprogrammer/

Project Repository: [https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker](https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker)  
<br>
Project Deployment: [https://jdhprogrammer-budget-tracker.herokuapp.com/](https://jdhprogrammer-budget-tracker.herokuapp.com/)<br>

## Table of Contents

- [About the Project](#about-the-project)

  - [Description](#description)
  - [User Story](#user-story)
  - [More Details](#more-details)
  - [Technologies](#technologies)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)

- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Contact](#contact)

## About The Project

[<img src="./screenshots/Budget_App_Transaction_list.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Transaction_list.jpeg?raw=true)

### Description

```
Budget Tracker application with Offline access and functionality. The user will be able to add expenses and deposits to their budget with or without a connection. When entering transactions offline, they should populate the total when brought back online.
```

#### User Story

```
Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.
```

#### More Details

```
GIVEN a user is on Budget App without an internet connection
WHEN the user inputs a withdrawal or deposit
THEN that will be shown on the page, and added to their transaction history when their connection is back online.
```

### Technologies Used

```
 * Javascript.   * Node.JS.
 * Service-Worker.   * Manifest.json.
 * Icons.   * IndexDB.
 * Webpack.  * Bundle.js.
```

## Getting Started

### Prerequisites

Visit the Webpage. Use the App online. If you lose your connection it will save any data entered while offline as long as you don't refresh. On Google Chrome you can click the three dots ... in the top right to find page settings and look for the option to Install Budget Tracker. then you can use this app on desktop.

### Installation

On Google Chrome you can click the three dots ... in the top right to find page settings and look for the option to Install Budget Tracker. then you can use this app on desktop.

### Usage

Add Income and Expense Transactions. And save them to your Budget.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Fork the Repo on GitHub @ [https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker](https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker)
2. Create your Feature Branch ('git checkout -b feature/AmazingFeature')
3. Commit your Changes ('git commit -m "Add some AmazingFeature"')
4. Push to the Branch ('git push origin feature/AmazingFeature")
5. Open a Pull Request

### Screenshots

Budget Tracker - Transaction List.
<br>
[<img src="./screenshots/Budget_App_Transaction_list.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Transaction_list.jpeg?raw=true)<br>

Budget Tracker - Budget Balance Line Chart & Budget Item Bar Chart.
<br>
[<img src="./screenshots/Budget_App_LineBar_Charts.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_LineBar_Charts.jpeg?raw=true)<br>

Budget Tracker - Income and Expenses Pie Charts.
<br>
[<img src="./screenshots/Budget_App_PieCharts.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_PieCharts.jpeg?raw=true)<br>

Budget Tracker - WebPack PWA Manifest.
<br>
[<img src="./screenshots/Budget_App_WebPack-PwaManifest.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_WebPack-PwaManifest.jpeg?raw=true)<br>

Budget Tracker - Service Worker Cache Names Correct.
<br>
[<img src="./screenshots/Budget_App_CacheNames_Correct_noErrors.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_CacheNames_Correct_noErrors.jpeg?raw=true)<br>

Budget Tracker - Pending Transaction Saved in IndexDB.
<br>
[<img src="./screenshots/Budget_App_PendingTransactions_SavedIndexDB.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_PendingTransactions_SavedIndexDB.jpeg?raw=true)<br>

Budget Tracker - Offline Transaction Fetch Failed.
<br>
[<img src="./screenshots/Budget_App_Offline_transactionFetch_Failed.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Offline_transactionFetch_Failed.jpeg?raw=true)<br>

Budget Tracker - Bulk Save to MongoDB on reconnection.
<br>
[<img src="./screenshots/Budget_App_BulkSave_MongoDB.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_BulkSave_MongoDB.jpeg?raw=true)<br>

Budget Tracker - Google Lighthouse first Report.
<br>
[<img src="./screenshots/Budget_App_Lighthouse_99-84-100-89-PWA.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Lighthouse_99-84-100-89-PWA.jpeg?raw=true)<br>

Budget Tracker - Fixed Performance, Accessibility, Optimization, SEO, and PWA - Google Lighthouse 100s and PWA ready.
<br>
[<img src="./screenshots/Budget_App_Google100_PWA.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Google100_PWA.jpeg?raw=true)<br>

Budget Tracker - Deployed to Heroku - Connected to Mongo Atlas DB - Lighthouse 100s.
<br>[<img src="./screenshots/Budget_App_Heroku_Mongo_Lighthouse100_PWA_Installable.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Heroku_Mongo_Lighthouse100_PWA_Installable.jpeg?raw=true)<br>

Budget Tracker - App Installed on Computer.
<br>
[<img src="./screenshots/Budget_App_Installed.jpeg?raw=true" height="300"/>](./screenshots/Budget_App_Installed.jpeg?raw=true)<br>

### Acknowledgements

https://www.chartjs.org/docs/latest/charts/line.html  
https://webpack.js.org/guides/code-splitting/  
https://stackoverflow.com/questions/7324456/favicon-not-showing-up  
HardWork
<br>

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/). See LICENSE for more information.

## Contact

David Harris - jdh.programmer@gmail.com

Project Link: [https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker](https://github.com/jdhprogrammer/Online-Offline_Budget-Tracker)

<br>

Project Deployment: [https://jdhprogrammer-budget-tracker.herokuapp.com/](https://jdhprogrammer-budget-tracker.herokuapp.com/)<br>

Copyright © 2021 [DAVID HARRIS](https://github.com/jdhprogrammer)
