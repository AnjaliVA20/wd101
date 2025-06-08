let userForm= document.getElementById("user-form");
let retrieve=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries){
       entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
let display=()=>{
    let entries=retrieve();
    let tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`; 
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`; 
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`; 
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`; 
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedterms}</td>`; 

        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
    <tr> 
        <th class="px-4 py-2">Name</th> 
        <th class="px-4 py-2">Email</th> 
        <th class="px-4 py-2">Password</th> 
        <th class="px-4 py-2">Dob</th> 
        <th class="px-4 py-2">Accepted terms?</th> 
    </tr>${tableEntries}</table>`;
    document.getElementById("user-entries").innerHTML =  "<h1 class='text-center text-[28px]'><b>Entries<b></h1>"+ table;
}

let saveUserForm =(event)=>{
    event.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let dob =document.getElementById('dob').value;
    let acceptedterms=document.getElementById('acceptTerms').checked;
    
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthdiff = today.getMonth() - birthDate.getMonth();
    if (monthdiff < 0 || (monthdiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18 || age > 55) {
        return;
    }
    let entry={
        name,
        email,
        password,
        dob,
        acceptedterms
    };
    let userEntries=retrieve();
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    display();
}
userForm.addEventListener('submit',saveUserForm);
display();
//date of birth
let today = new Date();
let minDate= new Date(today.getFullYear()-55,today.getMonth(),today.getDate());
let maxDate= new Date(today.getFullYear()-18,today.getMonth(),today.getDate());

let formatDate= date => date.toISOString().split('T')[0];

document.getElementById("dob").setAttribute("min",formatDate(minDate));
document.getElementById("dob").setAttribute("max",formatDate(maxDate));

