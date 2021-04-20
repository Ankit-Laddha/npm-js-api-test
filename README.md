<h2 align="center">API Automation Tests</h2>

----------------------

## Table of Contents

- [Framework](#framework)
- [How to execute](#how-to-execute)
- [Open Reports](#open-reports)
- [Other-tasks](#other-tasks)

----------------------
#### Framework

```text
   REST API's under test: https://demoapi.finoa.io
   Api library: request
   Runner: mocha
   Language: javascript
   Reporting: mochawesome
   Assertion: chai
```

#### How to execute

* We will use npm commands to trigger our tests. Open the solution in any of code editor (VScode or IntelliJ)

   ```bash
   cd api-tests
   npm test 
   ```

#### Open Reports

* Install Allure using command line

  ```bash
    npm run open:report
  ```

* Mochawesome reporting artefacts are generated in mochawesome-report folder. One can open the HTML reports with following command

   ```bash
   npm run open:report  
   ```
* Sample HTML report of the local run is attached [here](api-tests-html-report.png) <to-be-added>


#### Other Tasks

* I have add the pdf document regarding the bug and other scenarios related task in [this](bug-scenario-task.pdf) document