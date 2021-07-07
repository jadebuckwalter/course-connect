// Miscellaneous functions that are used in multiple parts of the program

// Clear the contents of a div
// id (string): id of the div
// container (string): id of the container surrounding the div
function clear(id, container) {
    // Remove the div
    let div = document.getElementById(id);
    div.parentNode.removeChild(div);
    
    // Create a new div with the same id and append it to the container div
    div = document.createElement("div");
    div.id = id;
    document.getElementById(container).appendChild(div);
}