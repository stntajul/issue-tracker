document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
let totalIssueCount;
let closedIssueCount;

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  

  
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  //console.log(currentIssue.status);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue=> issue.id != id );
  //console.log(remainingIssues.length);
  
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}
// function setStatusClosed(id){
//   const issues = JSON.parse(localStorage.getItem('issues'));
//   for(let i=0;i<issues.length;i++)
//   {
//     if(issues[i].id==id)
//     {
//       issues[i].status='Closed';
//       //console.log(issues[i].status);
//       localStorage.setItem('issues[i].status', 'closed');
    
//       //localStorage.setItem("issues[i].status", "closed");
      
      
//     }

//   }
//   console.log(id);
 
// }

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i <issues.length; i++) {
        //console.log(issues.length);

   
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})"class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  // totalIssueCount=issues.length;
  // console.log(totalIssueCount);
  //console.log(issues.status);
  totalIssueCount=JSON.parse(localStorage.getItem('issues')).length;
   closedIssueCount = issues.filter(iss=> iss.status =='Closed');
   console.log('closed issue'+closedIssueCount.length);


document.getElementById('totalIssue').innerHTML='total issue : '+totalIssueCount +',  closed issue :'+closedIssueCount.length;
}

