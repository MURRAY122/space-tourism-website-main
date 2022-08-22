/* ---- Navigation ----  */
function openNav() {
  document.getElementById("navBar").style.width = "254px";
}
function closeNav() {
  document.getElementById("navBar").style.width = "0";
}
/* ---- Navigation End ----  */


document.addEventListener("DOMContentLoaded", function(){
/* Fetch JSON data then filter */
function getData(filterGroup ,filter){
    return fetch("./data.json")
     .then(response => {
        return response.json();
     })
     .then(jsondata => { 
       let dataToReturn = [];
       if(filterGroup == 'all'){
         return jsondata;
       } else {
         jsondata[filterGroup].forEach(element => {
           if(filter == 'all'){
             dataToReturn.push(element);
           } else {
              dataToReturn.push(element[filter]);
           }
         });
         return dataToReturn;
       }
     });
}  


/* ---- Destinations ----  */
if (document.title.toLowerCase().includes('destinations')){
var destinationImgEle = document.getElementById('destinationImg');
var destinationTabs = document.getElementById('destinationTabs').children;
var destinationNameEle = document.getElementById("destinationName");
var destinationDescEle = document.getElementById('destinationDesc');
var destinationDistanceEle = document.getElementById('destinationDistance');
var destinationTravelEle = document.getElementById('destinationTravel');

//Make the tabs
function makeDestinationTabs(someData){
  for (var i = 0; i < destinationTabs.length; i++) {
    destinationTabs[i].innerHTML = someData[i];
    destinationTabs[i].addEventListener('click', function(e){
      fillDestinations(e);
    });
  }
}


//Fill the content
function fillDestinations(tab){
  let destination = tab.target.innerText;

  //Quick lowercase to capitlise to match json data
  destination = destination.toLowerCase();
  destination = destination[0].toUpperCase() + destination.slice(1, destination.length);

  //Remove old active tab class
  let oldTab = document.getElementsByClassName('destination__link-active');
  oldTab[0].classList.remove('destination__link-active');
  
  //Add class to new active tab
  tab.target.classList.add("destination__link-active");

  //Get the data by filter and update display
  getData('destinations', 'all').then(response => {
    const destinationData = response.find(element => element['name'] == destination);
    destinationImgEle.setAttribute('src', destinationData['images']['webp']);
    destinationImgEle.setAttribute('alt','View of the ' + destination + ' Planet')
    destinationNameEle.innerText = destinationData['name'];
    destinationDescEle.innerText = destinationData['description'];
    destinationDistanceEle.innerText = destinationData['distance'];
    destinationTravelEle.innerText = destinationData['travel'];
  });

}
    getData('destinations', 'name').then(response => {
      makeDestinationTabs(response);
    });
  }
/* ---- Destinations End ----  */
/* ---- Crew ---- */
if (document.title.toLowerCase().includes('crew')){
var crewImgEle = document.getElementById('crewImg');
var crewTabs = document.getElementById('crewTabs').children;
var crewNameEle = document.getElementById("crewName");
var crewJobEle = document.getElementById("crewJob");
var crewDescEle = document.getElementById('crewDesc');

//Make the tabs
function makeCrewTabs(someData){
  for (var i = 0; i < crewTabs.length; i++) {
    let crewName = someData[i] 
    crewTabs[i].setAttribute("aria-label", crewName + " Information button");
    crewTabs[i].setAttribute("title", crewName + "'s Information button");
    crewTabs[i].addEventListener('click', function(e){
      fillCrewDetails(e, crewName);
    });
  }
}

function fillCrewDetails(tab, crewMember){
  //Remove old active tab class
  let oldTab = document.getElementsByClassName('crew__tab-active');
  oldTab[0].classList.remove('crew__tab-active');
  
  //Add class to new active tab
  tab.target.classList.add("crew__tab-active");

  //Get the data by filter and update display
  getData('crew', 'all').then(response => {
    const crewData = response.find(element => element['name'] == crewMember);
    crewImgEle.setAttribute('src', crewData['images']['webp']);
    crewImgEle.setAttribute('alt', crewData["role"] + " " + crewData["name"])
    crewNameEle.innerText = crewData['name'];
    crewDescEle.innerText = crewData['bio'];
    crewJobEle.innerText = crewData['role'];
  });

}

getData('crew', 'name').then(response => {
  makeCrewTabs(response);
});


};
/* ---- Crew end ---- */


/* ---- Technology ----  */
if (document.title.toLowerCase().includes('technology')){
  var techImgEleDesktop = document.getElementById('technologyImg_desktop');
  var techImgEleMobile = document.getElementById('technologyImg_mobile');
  var techTabs = document.getElementById('technologyTabs').children;
  var technologyNameEle = document.getElementById("technologyName");
  var technologyDescEle = document.getElementById('technologyDesc');
  
  //Make the tabs
  function makeTechTabs(someData){
    for (var i = 0; i < techTabs.length; i++) {
      let techName = someData[i] 
      techTabs[i].addEventListener('click', function(e){
        fillTechDetails(e, techName);
      });
    }
  }

  function fillTechDetails(tab, techName){
    //Remove old active tab class
    let oldTab = document.getElementsByClassName('technology__tab-active');
    oldTab[0].classList.remove('technology__tab-active');
    
    //Add class to new active tab
    tab.target.classList.add("technology__tab-active");
  
    //Get the data by filter and update display
    getData('technology', 'all').then(response => {
      const techData = response.find(element => element['name'] == techName);
      techImgEleDesktop.setAttribute('srcset', techData['images']['portrait']);
      techImgEleMobile.setAttribute('src', techData['images']['landscape']);
      techImgEleMobile.setAttribute('alt', techData['name'])
      technologyNameEle.innerText = techData['name'];
      technologyDescEle.innerText = techData['description'];
    });
  }
  getData('technology', 'name').then(response => {
    makeTechTabs(response);
});
}
/* ---- Technology End ----  */
});