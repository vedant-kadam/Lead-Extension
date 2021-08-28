
let myLeads =[];

const inputEl = document.getElementById("input-el");

const saveLeadBtn = document.getElementById("input-btn");

const saveTabBtn = document.getElementById("saveTab-btn");

const ulEl = document.getElementById("ul-el");

const deleteBtn = document.getElementById("delete-btn");

console.log(localStorage.getItem("Name"))

const ledsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


 
updateList =  (leads)=>{
    let str="";
    
    leads.forEach(element=>{
        str +=` <li> 
            <a target = "_blank" herf = "${element}">${element}</a>
         </li> `
    })
    

    ulEl.innerHTML = str;
}






saveLead = ()=>{
    console.log("test")
    
   
       if(inputEl.value)
       {
        myLeads.push(inputEl.value);
        
        console.log("pushed "+ inputEl.value);
        inputEl.value = "";

        let tempStr = JSON.stringify(myLeads);
        localStorage.setItem("myLeads",tempStr)

        console.log(tempStr);

        updateList(myLeads);
       }
        
        // str +=` <li> <a href= ${inputEl.value} target ="_blank">${inputEl.value}</a> </li> `
   
    
    
        //  ulEl.innerHTML = str;

}

DeleteAll = ()=>{
    localStorage.clear();
    //ulEl.innerHTML = null;
    myLeads = [];
    updateList(myLeads);
}

SaveTab = ()=>{

    chrome.tabs.query({active:true ,
                       currentWindow: true},function(tabs){
                        console.log(tabs);
                        myLeads.push( tabs[0].url)

                        let tempStr = JSON.stringify(myLeads);
                        localStorage.setItem("myLeads",tempStr)
                        
                        updateList(myLeads)
                       })

}

if(ledsFromLocalStorage)
{
    myLeads = ledsFromLocalStorage
    updateList(myLeads);
}
saveLeadBtn.addEventListener("click" , saveLead)
deleteBtn.addEventListener("dblclick", DeleteAll)
saveTabBtn.addEventListener("click",SaveTab)




 