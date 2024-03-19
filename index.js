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
        message: `Please provide a description of your project, some things to consider are:
        - why you created the project,
        - what your motivations were,
        - what problem the project solves,
        - what you learnt,
        - any plans for future developments.`
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
        message: 'Please list the collaborators if any for your project. (please seperate collaborators with a comma or leave blank if none)'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose a license for your project.',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'n/a']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please provide guidelines for contributing to your project. (if none please type n/a)'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide tests for your project.'
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide your github username and email address seperated by a comma. (e.g. username, email)'
    }
];

const licenseBadges = {
    'MIT': '![Static Badge](https://img.shields.io/badge/MIT-License-red)',
    'Apache 2.0': '![Static Badge](https://img.shields.io/badge/apache-2.0-blue)',
    'GPL 3.0': '![Static Badge](https://img.shields.io/badge/GPL-3.0-Yellow)',
    'BSD 3': '![Static Badge](https://img.shields.io/badge/BSD-3-Purple)',
    'n/a': ''
}

const generateCollaboratorText = (collaborators) => {
    if (collaborators === '') {
        return 'n/a';
    }
    const collaboratorList = collaborators.split(',').map(collaborator => collaborator.trim());
    return collaboratorList.map(collaborator => `@${collaborator}`).join('\n');
}

const licenseSectionText = (license) => {
    switch (license) {
        case 'n/a':
            return 'n/a';
        default:
            return `This project is licensed under the license: ${license} see license.txt for more details.`
    } 
}

const tableOfContentsLinkFunctionality = (questions) => {
    return questions.map(question => {
        const name = question.name.charAt(0).toUpperCase() + question.name.slice(1);
        return `- [${name}](#${question.name})`;
      }).join('\n');
}

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Successfully wrote to ${fileName}`);
      });
}

// function to initialize app
const init  = () => {
    inquirer.prompt(questions).then((answers) => {

        const selectedBadge = licenseBadges[answers.license]
        const licenseSection = licenseSectionText(answers.license)
        const tableOfContents = tableOfContentsLinkFunctionality(questions)
        const collaboratorText = generateCollaboratorText(answers.credits)

        const [githubUsername, email] = answers.questions.split(',').map(item => item.trim());
        const readmeContent = 
`
${selectedBadge}

# ${answers.title} 

## Description
${answers.description}

## Table of Contents

${tableOfContents}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Credits
${collaboratorText}

## License
${licenseSection}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
for any questions you can reach me at: ${email} 
or visit my github profile: github.com/${githubUsername}

`
        writeToFile('README.md', readmeContent);
    })
    
}

// Function call to initialize app
init();

