
module.exports = templateData => {
  // destructure page data by section
  const { name, description, installation, usage,contribution,test,licenseType,projects,confirmAddProject,...header } = templateData;
  console.log(templateData);

  // const licensearry = animalArr.map(licensearry => {
  //   console.log(licenseType);
  //   return `${licenseType} are really cool animals.`;
  // });
  return `
                                  ${name}
   Description  
   ${description}
   
   
   
   Installation 
  ${installation}



   userage  
   ${usage}



   Contribution guideline 
    ${contribution}
   
   
    Testing   
    ${test}

    License
    ${licenseType}

    Link
    ${generateLink(projects)}
    
    `}
   
   
    const generateLink = x => {
      return `
     ${x.map(({  link }) => {
       console.log(link)
            return `${link};
        `
      }
     )}`};
    //  
   


 

