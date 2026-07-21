const list = document.getElementById("infi-list");
const container = document.getElementById("container");

let count = 0;

function addItems(num){
    for(let i=0;i<num;i++){
        count++;

        const li = document.createElement("li");
        li.textContent = "Item " + count;

        list.appendChild(li);
    }
}

// Initial items
addItems(10);

// Infinite scroll
container.addEventListener("scroll", () => {

    if(container.scrollTop + container.clientHeight >= container.scrollHeight - 5){
        addItems(2);
    }

});