/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()





/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
        .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Spouse: ${person.spouse}\n`;
    
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}

function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}



/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????
    



function searchByTraits(people) {
    let listOfPeople = "";
    let filteredPeople;




    let searchResults;
    let userInput = prompt(
        "Do you want to search by Gender, DOB, Height, Weight, Eye Color, Occupation or Parents? Or, press 1 to search multiple traits"
       
    );
    userInput.toLowerCase();
    switch(userInput) {
        case "1":
            searchResults = multiTrait(people);
            if(searchResults.length === 0){
                alert("No individuals match this search!")
                
            }else
                displayTraitPeople(searchResults)
            break
        case "gender":
            searchResults = searchByGender(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "DOB":
            searchResults = searchByDOB(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "Weight":
            searchResults = searchByWeight(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "Height":
            searchResults = searchByHeight(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "Eye Color":
            searchResults = searchByEyeColor(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "Occupation":
            searchResults = searchByOccupation(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
        case "Parents":
            searchResults = searchByParents(people);
            if (searchResults.length === 0){
                alert("No individuals match this search!")
            }else
            displayTraitPeople(searchResults)
            break
    
            }
 }

            

        function multiTrait(people){
       
    
            var listed = "";
            var filteredPeople;
        
            filteredPeople = searchByGender(filteredPeople);
            filteredPeople = searchByDOB(filteredPeople);
            filteredPeople = searchByHeight(filteredPeople);
            filteredPeople = searchByWeight(filteredPeople);
            filteredPeople = searchByEyeColor(filteredPeople);
            filteredPeople = searchByOccupation(filteredPeople);
            filteredPeople = searchByParents(filteredPeople);
            filteredPeople = searchByCurrentSpouse(filteredPeople)

            if (filteredList.length === 22) {
                alert("You said no to all filters, there is no one to display.");
            }           
            else {
                for (var i = 0; i < filteredList.length; i++) {
                    listed += filteredList[i].firstName + " " + filteredList[i].lastName + ". ";
                }
                alert(listed);
            }
        
          app(people)
    
        }

function searchByGender(people){
let gender  = promptFor("What is the person's gender?", chars)   
let foundPerson = people.filter(function(person){
        if (person.gender === gender){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}
function searchByDOB(people){
let dob  = promptFor("What is the person's date of birth?", chars)   
foundPerson = people.filter(function(person){
        if (person.dob === dob){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}
function searchByHeight(people){
    let height  = promptFor("What is the person's height?", chars)   
    foundPerson = people.filter(function(person){
        if (person.height === height){
            return true;
        }
        alert(foundPerson)
    })
    app(people)
}


function searchByEyeColor(people){
    let eyeColor  = promptFor("What is the person's eye color?", chars)   
    foundPerson = people.filter(function(person){
        if (person.eyeColor === eyeColor){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}


function searchByOccupation(people){
    let occupation  = promptFor("What is the person's occupation?", chars)   
    foundPerson = people.filter(function(person){
        if (person.occupation === occupation){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}


function searchByParents(people){
    let parents  = promptFor("Who is the person's parents?", chars)   
    foundPerson = people.filter(function(person){
        if (person.parents === parceFloat(parents)){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}



function searchByCurrentSpouse(people){
    let currentSpouse  = promptFor("What is the person's current spouse?", chars)   
    foundPerson = people.filter(function(person){
        if (person.currentSpouse === currentSpouse){
            return true;
        }
    }
    
    )
    for (let i = 0; i < foundPerson.length; i++) {
        var listed ;
        listed += foundPerson[i].firstName + " " + foundPerson[i].lastName + ".";
    }
    alert(listed);

    app(people)
}

function findPersonFamily(personArray, people){
    var listed = "";
    let personFamily = people.filter(function(person){
        if (personArray.lastName === person.lastName){
        return true;
    }

    }

    )
    for (let i = 0; i < personFamily.length; i++) {
        
        listed += personFamily[i].firstName + " " + personFamily[i].lastName + ".";
    }
    return listed
}

function findPersonDescendants(personArray, people){
    var listed = "";
    let personFamily = people.filter(function(person){
        if (personArray.id === people.parents.id){
            return true;
       }
    })
}

