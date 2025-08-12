# Contributing


**Working on your first Pull Request?** You can learn how from this *free* series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

---

Thanks for taking the time to look at `CONTRIBUTING.md`.

All contributions to this project should follow the [Code of Conduct (CoC)](./CODE_OF_CONDUCT.md).

### Reporting issues and providing feedback

If you found any issues or bugs, be sure to open up an issue so I can check it out!

### Opening a pull request

Once you've worked on your feature/bugfix, you can open a pull request using the `master` branch as the base branch. Write a clear and concise PR title, and a detailed description of why you made the change, whether it is related to any issues etc. and we will review it as soon as I can. \
**If the code is not linted properly or not reformatted the PR _can_ and _will_ be rejected.**

### Setting up a development environment

This project is written in Python. \
It requires **Python 3.8 or higher**, and uses `pip`.

To set it up, just fork this repository and clone the newly opened fork. \
Then install all the dependencies using:
```bash
$ pip install -r requirements.txt
```
This command will install all the requirements needed to run the project.

Create a `.env` file in the project directory. For information you can refer to the `.env.example` file for all the environment variables.

If you want to contribute to the chart module, then you have enable that flag in `.env` file and install Node.js and NPM the for charting library to work:
```bash
npm install -g vega-lite vega-cli canvas
```

If everything is installed, you are good to go 👍.

Use
```bash
python main.py
``` 
to run the program.

**Linting checks**

It is recommended to use proper linting. if you're using JetBrains' IntelliJ IDEA, please reformat your code before making a pull request. \
For more info see [how to reformat code in IntelliJ IDEA](https://www.jetbrains.com/help/idea/reformat-and-rearrange-code.html).


**Commit Messages**

It is recommended to use proper [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

