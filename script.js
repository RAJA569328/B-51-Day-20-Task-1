function SearchMeaning() {
event.preventDefault();
displayNone()


let inputValue = document.getElementById("inputValue");

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue.value}`)
    .then((data) => data.json())
    .then((data) => {
        let meaning = data[0].meanings;
        let audio = data[0].phonetics[0].audio.toString()
        let div = document.getElementById("MeaningDiv");
        div.innerHTML = `
            <i class="fa-solid fa-volume-high" id='audio-icon'></i>
                <audio id='audio'>
                    <source src="${audio}" type="audio/mpeg">
                </audio>
                Word: <b>${data[0].word}</b>
            `

        document.getElementById("audio-icon").addEventListener('click',()=>{
            document.getElementById('audio').play()
        })

        let ul = document.getElementById("ul")
        ul.style.listStyleType = 'none'

        for(let value of meaning){
        let li = document.createElement("li")
        li.innerHTML = `PartOfSpeech: <b> ${value.partOfSpeech}</b>`;
            

        let definitions = value.definitions;
        
        let ol = document.createElement("ol")
        
        for(let values of definitions){
            let speechList = document.createElement("li");
            speechList.innerHTML = `${values.definition}`
            ol.append(speechList)
            
        }
        ul.append(li) 
        ul.append(ol) 
        }

        resetInputValue()
    })
    .catch((error) => {
        console.log(error)
    });
}

function displayNone(){
    document.getElementById('MeaningDiv').innerHTML = '';
    document.getElementById('ul').innerHTML = '';
}

function resetInputValue(){
    
    document.getElementById('inputValue').value = '';
}