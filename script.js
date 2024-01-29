"use strict"; //Giver flere fejlmelderlser så det nemmere at finde sine fejl.

window.addEventListener("DOMContentLoaded", start); //Sørger for at at hele HTML siden er loaded inden JavaScripten bliver loaded.

function start() { //Functionen start
  console.log("JavaScript kører"); //Skriver String i console
  hideAll(); //Kalder hideAll functionen
  askAboutName(); //Kalder askAboutName functionen
}

function hideAll() { //Sætter alle elementer som ikke skal vises i starten til at være gemt
  document.querySelector("#ask-name").classList.add("hide"); //Tilføjer ask-name id'et til class hide som har visibility: hidden som gør at den bliver hidden. 
  document.querySelector("#ask-age").classList.add("hide");
  document.querySelector("#ask-birthyear").classList.add("hide");
  document.querySelector("#success").classList.add("hide");
  document.querySelector("#failure").classList.add("hide");
}

function fillInFields(fieldname, value) { //Funktionen fillInFields som modtager en String som skal være navnet på det data field som værdien skal indsættes i.
  document.querySelectorAll(`[data-field=${fieldname}]`).forEach(element => (element.textContent = value)); //fieldname bliver sat ind som navnet på et data-field og for hvert af de elementer skal value variablen indsættes som tekst.
}

function askAboutName() { //Funktionen askAboutName
  const form = document.querySelector("#ask-name"); //Gør ask-name id'et til en variable kaldet form
  form.addEventListener("submit", answeredName); //Laver en event listener i form som lytter efter et submit og så kalder answeredName funktionen
  form.classList.remove("hide"); //Fjerner form, altså ask-name id'et fra hide classen så den bliver vist
}

function answeredName(event) { //Funktionen answeredName, bliver kaldt af event listeneren i askAboutName
  event.preventDefault(); //Ved det event som answeredName modtager, (altså et submit fra ask-name formen) så bliver preventDefault() kaldt som forhindre at siden bliver refreshed ved submit.

  const form = event.target; //Gør elementet hvor eventet skete til en variable. altså event.target tager det event som answeredName har taget imod og med .target vælger det element som eventet skete i, altså ask-name. At gøre det her gør at vi kan have elementet som en variable uden at have det globalt så fejl så vidt muligt bliver forhindret.
  form.removeEventListener("submit", answeredName); //Fjerner event listeneren fra answeredName
  form.querySelector("button").disabled = true; //Deaktivere knappen så det ikke er muligt at submitte længere, da både input fæltet og knappen ikke bliver gemt så er det vigtigt at deaktivere at kunne submitte så variabler og værdier ikke bliver skabt igen og overskrevet.

  const firstname = form.firstname.value; //Går ind i form under firstname input fæltet og tager værdien der er indtastet og gør det til en variable firstname (skulle måske have heddet firstName?)
  console.log("Answered name: " + firstname); //Skriver String i consolen og tilføjer firstname.

  fillInFields("firstname", firstname); //Kalder funktionen fillInFields og sender værdierne "firstname" String og firstname variablen med. Indsætter firstname i alle datafields med id'et firstname

  askAboutAge(); //Klader funktionen askAboutAge
}

function askAboutAge() { //funktionen askAboutAge
  const form = document.querySelector("#ask-age");
  form.addEventListener("submit", answeredAge);
  form.classList.remove("hide");
}

function answeredAge(event) { //Tager imod eventet fra askAboutAge
  event.preventDefault();

  const form = event.target;
  form.removeEventListener("submit", answeredAge);
  form.querySelector("button").disabled = true; //Linje 50-55 gør det samme som 29-34 bare med askAboutAge og answeredAge

  const age = form.age.valueAsNumber; //Gør værdien fra age i form til en variable. Fordi input typen er number så skal .valueAsNumber bruges så vi ikke får en String men en int
  console.log("Answered age: " + age); 

  fillInFields("age", age); //kalder funktionen fillInFields, så age bliver sat ind i de data fields som hedder age

  askAboutBirthYear(age); //Kalder funktionen askAboutBirthYear og sender age med
}

function askAboutBirthYear(age) { //Funktionen askAboutBirthYear tager imod age
  // calculate birthyear - expect that the person HASN'T had their birthday yet this year
  const birthyear = 2024 - 1 - age; //Laver en varible birthyear som tager det nuværende år (men er hardcoded så næste år vil den regne forkert) trækker 1 fra fordi udregningen går ud fra at personen ikke har haft sin fødselsdag endnu (et godt bud i Januar, men senere på året ville det måske give mere mening at tage den nuværende dato og hvis mere end halvdelen af året er gået så lad vær med at træk 1 fra) og så trækker man age fra og så har man fødselsåret hvis de ikke har haft fødselsdag endnu. Ellers er svaret et år senere

  fillInFields("birthyear", birthyear); //Kalder fillInFields og indsætter birthyear i alle data fields der hedder birthyear

  const form = document.querySelector("#ask-birthyear"); //Gør ask-birthyear til en variable form
  form.addEventListener("submit", answeredBirthyear);
  form.classList.remove("hide");
}

function answeredBirthyear(event) {
  event.preventDefault();

  const form = event.target;
  form.removeEventListener("submit", answeredBirthyear);
  form.querySelector("button").disabled = true;

  const correct = form.correct.value; //Laver en variable correct af værdien fra correct elementet i form
  console.log("Answered correct: " + correct); //Skriver String og værdien af correct i console

  if (correct === "yes") { //If statement hvis correct værdien er en String "yes" så kald showSucces funktionen
    showSuccess(); //Kalder showSucces funktionen
  } else {
    showFailure(); //Kalder showFailure funktionen hvis ikke correct værdien var en String "yes"
  }
}

function showSuccess() {
  document.querySelector("#success").classList.remove("hide"); //showSucces funktionen viser elementet succes ved at fjerne det fra classen hide
}

function showFailure() {
  document.querySelector("#failure").classList.remove("hide"); //showFailure funktioen gør det samme som showSucces funktionen bare for elementet failure istedet.
}
