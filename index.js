// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide installation instructions for your project.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide usage information for your project.'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Please list the collaborators if any for your project.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose a license for your project.',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None']
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
const init  = () => {
    inquirer.prompt(questions).then((answers) => {
        const readmeContent = 
        `
        # ${answers.title}
        
        ## Description

        ## Installation

        ## Usage

        ## Credits

        ## License
        `
    })
}

// Function call to initialize app
init();
