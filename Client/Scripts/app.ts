"use strict";

(function() {
    // alarm when you click delete button
    function confirmDelete()
    {
    // confirm deletion
    $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
        event.preventDefault();
        location.href = '/survey-list';
        }       
    });
    }

    confirmDelete();      
    
})();

