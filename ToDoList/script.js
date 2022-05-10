$(document).ready(function(){
    
    
    $("#home").click(function(){
        if($("#input").val() == ""){
            alert("Write something!");
        }
        else{
            $("#ToDoList_Home").append("<p class ='added'>"  + $("#input").val() + "</p>");
            $("#input").val("");
        }
        
    });
    $("#work").click(function(){
        if($("#input").val() == ""){
            alert("Write something!");
        }
        else{
            $("#ToDoList_Work").append("<p class ='added'>"  + $("#input").val() + "</p>");
    
            $("#input").val("");
        }
        
    });
    $("#clearAll").click(function(){
        $('#ToDoList_Home').find('*').not('h1').remove();
        $('#ToDoList_Work').find('*').not('h1').remove();
    });
    
    $('body').on("click", ".added", function(){
        $(this).remove();
    });
});

