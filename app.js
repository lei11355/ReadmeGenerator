const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter project description',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Would you like to enter installation information about your project?',
      validate: installationInput=>{
      if (installationInput) {
        return true;
      } else {
        console.log('Please enter installation instruction!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Would you like to enter some information about Usage?',
    validate: usageInput=>{
    if (usageInput) {
      return true;
    } else {
      console.log('Please enter usage information!');
      return false;
    }
  }
},
  {
    type: 'input',
    name: 'contribution',
    message: 'Would you like to enter some contribution information ?',
    validate: contributionInput=>{
    if (contributionInput) {
      return true;
    } else {
      console.log('Please enter contribution instruction!');
      return false;
    }
  }
},

{
  type: 'input',
  name: 'test',
  message: 'Would you like to enter some test information ?',
  validate: testInput=>{
  if (testInput) {
    return true;
  } else {
    console.log('Please enter test instruction!');
    return false;
  }
}
},

{
  type: 'list',
  name: 'licenseType',
  message: 'Would you like to enter license type? (Check all that apply)',
  choices: ['500', '1000', '1500', '2000', '2500', '3000', '3500']
},
  ])
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    console.log("prompProject is : " + promptProject);
    console.log("the portfoliodata is " + JSON.stringify(portfolioData));
    // fs.writeFile('./index.html', pageHTML, err => {
      fs.writeFile('./index.md', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

// If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  else portfolioData.projects=[];
  return inquirer
    .prompt([
      
     
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);

      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    console.log("prompProject is : " + promptProject);
    console.log("the portfoliodata is " + JSON.stringify(portfolioData));
    // fs.writeFile('./index.html', pageHTML, err => {
      fs.writeFile('./index.md', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });
