function daysToMs_(days){
  return days*24*60*60*1000;
}

/*
 * labels setup - the period (in days) should correspond to the label text
 * there's no need for precision, so month is 30 days and the year is 365
 */
function initLabels_(){
  var labels = {name: "auto delete"};
  labels.children = [{name: labels.name + "/in a month", ms: daysToMs_( 30)},
                     {name: labels.name + "/in a year" , ms: daysToMs_(365)}];
  return labels
}

/*
 * forEach taken from Marijn Haverbeke's "Eloquent JavaScript"
 * http://eloquentjavascript.net/
 */
function forEach_(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

// creates the labels in Gmail
function createGmailLabels(){
  var labelSettings = initLabels_();
  
  GmailApp.createLabel(labelSettings.name);
  forEach_(labelSettings.children, function(child){
    GmailApp.createLabel(child.name);
  });
}

function deleteGmailLabelByName_(name){
  GmailApp.deleteLabel(GmailApp.getUserLabelByName(name));
}

// removes the labels from Gmail
function deleteGmailLabels(){
  var labelSettings = initLabels_();
  
  deleteGmailLabelByName_(labelSettings.name);
  forEach_(labelSettings.children, function(child){
    deleteGmailLabelByName_(child.name);
  });
}

// processes a single label
function trashExpiredThreadsFor_(label){
  var page, thread, offset, now;
  var sourceLabel = GmailApp.getUserLabelByName(label.name);
  var PAGE_LENGTH = 100;
  
  page = null;
  offset = 0; //counter for not yet expired threads
  now = new Date();
    
  /*
   * Get threads in "pages" of PAGE_LENGTH at a time
   * Technique from the Gmail Snooze code, updated to use 'offset'
   * http://googleappsdeveloper.blogspot.com/2011/07/gmail-snooze-with-apps-script.html
   */
  while(!page || page.length == PAGE_LENGTH) {
   page = sourceLabel.getThreads(offset, PAGE_LENGTH);

    forEach_(page, function(thread){
      if ((now - thread.getLastMessageDate()) > label.ms){
        thread.moveToTrash();
        thread.removeLabel(sourceLabel);
      }
      else {
        offset++;
      }
    });
  }
}

// labels expired threads as Trash
function trashExpiredThreads(){
  var labelSettings = initLabels_();
  
  forEach_(labelSettings.children, function(child){
    trashExpiredThreadsFor_(child);
  });
}
