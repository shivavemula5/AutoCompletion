
// Node
class Node{
    constructor(){
        this.children = {};
        this.finish = false;
    }
}

// Trie Defination
class Trie {
    constructor(){
        this.root = new Node();
    }
    addData(root,data){
        for(let i of data){
            if(!(root.children.hasOwnProperty(i)))
                root.children[i]=new Node();            
            root=root.children[i];
        } 
        root.finish = true;
    }
    displayData(root,temp,result){
        if(root.finish === true){
            let temp_=[];
            for(let i of temp)
                temp_.push(i);
            result.push(temp_.join(""));
        }
        if(Object.keys(root).length!=0){
            for(let i in root.children){
                temp.push(i);
                this.displayData(root.children[i],temp,result);
                temp.pop();
           }
        }
        else{
            for(let i in root.children){
                temp.push(i);
                this.displayData(root.children[i],temp,result);
                temp.pop();
            }
        }
    }
    
}

// DOM Elements
let textInput = document.querySelector(".textInput");
let add = document.querySelector('.add');
let phoneBook = document.querySelector('.phoneBook');

// Trie Object
let t=new Trie();
let temp = [];
let result = [];
let words = {"ramu":"9765411029","raja gopal":"9786541230","karthik":"9631457801","uday":"96314587890","akash":"7892583690","ram":"9652389987","ranjan":"800870798","ravi":"7396361540","raja":"1472583690","abhi":"9874563210","ravi kanth":"4567891230","abhiram":"9632154870"};
for(let i in words)
    t.addData(t.root,i);
t.displayData(t.root,temp,result);

// Fuction That Gets Triggered For Every Input Character In Text Field
function autoComplete(event,ignore){
    let temp=[];
    let result=[];
    let mainResult=[];
    let flag=1;
    let root=t.root;
    let getData="";
    if(ignore==="Backspace")
       getData = textInput.value.substring(0,(textInput.value.length-1));
    else
        getData = textInput.value+event.key;
    for(let i of getData){
        if(!(root.children.hasOwnProperty(i))){
            flag=0;
            break;
        }
        root=root.children[i];
    }
    if(flag===1){
        t.displayData(root,temp,result);
    for(let i of result){
        let tempString = getData+i;
        mainResult.push(tempString);
        }
    while(phoneBook.hasChildNodes()) 
        phoneBook.removeChild(phoneBook.firstChild);
    for(let i of mainResult)
        addContact(i,words[i]);}
    else{
        while(phoneBook.hasChildNodes()) 
        phoneBook.removeChild(phoneBook.firstChild);
        addIncorrectContact("No Results Found",);
    }
 }

// Key Down Event [Handles Normal Key And Backspace Key As Well]
textInput.addEventListener('keydown',keyInput);
function keyInput(event){
    let ignore=" ";
    if(event.key==="Backspace"){
        ignore="Backspace";
    }
    autoComplete(event,ignore);
}

// Default Function That Show Contacts
function displayContact(){
    for(let i of result){
        addContact(i,words[i]);
    }
}
displayContact();

// Html For Displaying The Concact Card With Details
function addContact(name,phone){
    let divElement = document.createElement("div");
    let divPhoneText = document.createElement("div");
    let divPhoneNumber = document.createElement("div");
    let image = document.createElement('img');
    let divPhoneTextText = document.createTextNode(name);
    let divPhonePhoneNumberPhone=document.createTextNode(phone);
    divPhoneText.appendChild(divPhoneTextText);
    divPhoneNumber.appendChild(divPhonePhoneNumberPhone);
    image.src='call.png';
    divElement.classList.add('contact');
    image.classList.add('image');
    divElement.appendChild(divPhoneText);
    divElement.appendChild(divPhoneNumber);
    divElement.appendChild(image);
    phoneBook.appendChild(divElement);
}

// Displaying A Not Found Countact Card
function addIncorrectContact(message){
    let divElement = document.createElement("div");
    let divText = document.createElement('p');
    let pText = document.createTextNode(message);
    divText.appendChild(pText);
    divElement.appendChild(divText);
    divElement.classList.add('contact');
    phoneBook.appendChild(divElement);
}

add.addEventListener('click',getData);

function getData(){
    let name = prompt("enter a name");
    let mobile = prompt("enter mobile");
    words[name]=mobile;
    t.addData(t.root,name);
    while(phoneBook.hasChildNodes()) 
        phoneBook.removeChild(phoneBook.firstChild);
    console.log(words[name]);
    displayContact();
}
