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
        message: 'Please list the collaborators if any for your project.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose a license for your project.',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'n/a']
    }
];

const licenseBadges = {
    'MIT': '![Static Badge](https://img.shields.io/badge/MIT-License-red)',
    'Apache 2.0': '![Static Badge](https://img.shields.io/badge/apache-2.0-blue)',
    'GPL 3.0': '![Static Badge](https://img.shields.io/badge/GPL-3.0-Yellow)',
    'BSD 3': '![Static Badge](https://img.shields.io/badge/BSD-3-Purple)',
    'n/a': ''
}

const licenseSectionText = (license) => {
    switch (license) {
        case 'n/a':
            return 'n/a';
        default:
            return `This project is licensed under the license: ${license} see license.txt for more details.`
    } 
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
        const tableOfContents = questions.map(question => {
            const name = question.name.charAt(0).toUpperCase() + question.name.slice(1);
            return `- [${name}](#${question.name})`;
          }).join('\n');
          
        const readmeContent = 
`
# ${answers.title} ${selectedBadge}

## Description
${answers.description}

## Table of Contents

${tableOfContents}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Credits
${answers.credits}

## License
${licenseSection}
## Contributing

## Tests

## Questions

`
        writeToFile('README.md', readmeContent);
    })
    
}

// Function call to initialize app
init();

