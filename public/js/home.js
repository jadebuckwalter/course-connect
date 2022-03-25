// Clear the contents of a div
// id (string): id of the div
// container (string): id of the container surrounding the div
// type (string): the type of element being created
function clear(id, container, type) {
    // Remove the div
    let div = document.getElementById(id);
    div.parentNode.removeChild(div);
    
    // Create a new div with the same id and append it to the container div
    div = document.createElement(type);
    div.id = id;
    document.getElementById(container).appendChild(div);
}