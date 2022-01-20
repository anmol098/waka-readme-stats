# Contributing


**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

---

Thanks for taking the time to look at `CONTRIBUTING.md`.

All contributions to this project should follow the `CODE_OF_CONDUCT.md`.

### Reporting issues and providing feedback

If you found any issues or bugs, be sure to open up an issue so I can check it out!


### Opening a pull request

Once you've worked on your feature/bugfix etc, you can open a pull request using the `Alpha` branch as the base branch. Write a clear and concise PR title, and a detailed description of why you made the change, whether it is related to any issues etc. And I will review it as soon as I can.
**If the code is not linted properly or not reformatted the PR will be rejected**

### Setting up development environment

This project is written in Python, requires **Python 3.6 or higher**, and uses `pip` .

To set it up, just fork + clone it, install all the dependencies:

```bash
$ pip install -r requirements.txt
```

The command will install all the requirements needed to run project.

create a `.env` file in the project directory for information you can refer to the `.env.example` file for all the environment variable

If you want to contribute the chart module then you have enable that flag in `.env` file and install nodeJs and NPM for charting library to work
```bash
npm install -g vega-lite vega-cli canvas
```

If everything is installed, you are good to go 👍.
```bash
python main.py
``` 
to run the program

**Linting checks**

It is recommended to use proper linting. if you using Jetbrains IntelliJ IDE please reformat code before making pull request 
for more info [How to reformat code in Intellij](https://www.jetbrains.com/help/idea/reformat-and-rearrange-code.html)


**Commit Messages**

It is recommended to use proper sementic commit messages. [Sementic commit message](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

