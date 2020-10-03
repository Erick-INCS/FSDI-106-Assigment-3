let isVisible = false,
important = false,
UI,
taskList = [];

var showIcon = '<i class="fas fa-eye"></i>';
var hiddenIcon = '<i class="fas fa-eye-slash"></i>';

function showDetails() {

    if (!isVisible) {
        UI.secFrom.removeClass('d-none');
        UI.btnShow.html(hiddenIcon + ' Hide details');
    } else {
        UI.secFrom.addClass('d-none');
        UI.btnShow.html(showIcon + ' Show details');
    }

    isVisible = !isVisible;
}

function toggleMark() {
    cls = ['far dark-light','fas text-danger'];

    if (important) cls.reverse();
    
    UI.btnImportant.removeClass(cls[0]).addClass(cls[1]);

    important = !important;
}

function saveTask() {
    var title = UI.txtTitle.val(),
    date = UI.txtDate.val(),
    desc = UI.txtDescription.val(),
    alert = UI.txtAlert.val(),
    location = UI.txtLocation.val();
    

    var task = new Task(title, important, date, desc, alert, location);
  
    $.ajax({ 
        url: 'http://fsdi.azurewebsites.net/api/tasks',
        type: 'POST',
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function(res) {
            
            UI.successAlert.fadeIn().delay(3000).fadeOut();
            clearForm();
            taskList.push(task);
            console.log(taskList);
            
            // setTimeout (alternative)

        }, error: function(details) {
            console.log('Error ' + details);
        }
    });
}

function testGet() {
    $.ajax({
        url: 'http://restclass.azurewebsites.net/api/test',
        type: 'GET',
        success: function() {
            alert('success');
        }, error: function() {
            alert('error');
        }
    });
}

function clearForm() {
    $(".control").val("");
    UI.btnImportant.removeClass('fas text-danger').addClass('far');
    important = false;
}

function init() {

    UI = {
        btnShow: $('#btnShow'),
        btnImportant: $('#btnT'),
        secFrom: $('#secForm'),
        btnSave: $('#btnSave'),
        txtTitle: $('#txtTitle'),
        txtDate: $('#txtDate'),
        txtDescription: $('#txtDescription'),
        txtAlert: $('#txtAlert'),
        txtLocation: $('#txtLocation'),
        successAlert: $('#successAlert')
    }

    // get data from server

    // hook events
    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toggleMark);
    UI.btnSave.click(saveTask);
}

window.onload = init; 

/* HTTP Request * Http methods (verbs) * Http status codes * * Http vs https */
// http://fsdi.azurewebsites.net/explorer/ 