# Finoa - Quality Assurance - API Test Automation Challenge

Hi there,

this is the Finoa Quality Assurance API Test Automation challenge. With this
challenge we want you to show us how comfortable you are with automatically
testing an API.

Besides this task's introduction you'll find the following files within this
directory:

- `api-authentication.js`: Example JS code how to authenticate at our API
- `api-documentation.pdf`: Parts of the Finoa API documentation required for this task
- `demo.json`: Contains the data that is returned by the addresses endpoint without any filters
- `license.txt`: License for our example code
- `package.json`: NPM dependency description file

## Specific requirements:

We want you to provide us with a small setup that is capable of testing the FINOA
API endpoint `GET /v1/addresses` automatically. Doing so, we expect that your
solution is capable of testing all functionalities of the said endpoint including
all optional parameters (`address, currency, limit, offset`). There are no
specifications regarding the used technologies as long as you are familiar with
them and capable of setting them up on a company-level scale. Please show us how
your solution provides testing reports and please let us know how you would report
a bug. In case you detect a bug, feel free to report this one!

## Required information:

Subsequently, we provide you with a list of all information you require to 
connect to our API:

- API url: `https://demoapi.finoa.io`,
- User: `quixote.rocinante`,
- Password: `rO4mWhT2mm`,
- API key: `a1699852-1947-45b3-a9fb-a18f86d2a913`,
- API secret: `Quixote de la Mancha`.

A more in-depth description of how our API works can be found in `api-documentation.pdf`.

## Additional task:

If you have completed the previous task, there is one more thing we'd like you
to do. Assume (actually this endpoint does not exist yet) there is another
endpoint at our API `GET /v1/toNumber/{number}`. This endpoint expects a string as
argument `{number}` and returns this argument converted
into a number, in case it contains a valid number and otherwise `NaN`. Please,
write down all test cases required to be sure that this endpoint does what it
is supposed to do. If there is something unspecified, please make assumptions as
required and indicate these to us.

## How to submit:

Please send a zip-archive containing your submission.