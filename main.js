document.getElementById("button").addEventListener('click', loadUsers);
let pokedex = document.getElementById("blokje1");
let pokedex2 = document.getElementById("blokje2");
let pokedex1 = document.getElementById("blok1");
//load users


function loadUsers() {

    let pokemon = document.getElementById("search").value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' +pokemon, true);

    xhr.onload = function(){
        if(this.status == 200){
            let users = JSON.parse(this.responseText);
            let url = users.species.url;
            console.log(url);
            let users_moves = users.moves;
            let move1 = '<li>Moves:</li>';
            let output = 
                    
    
                    '<div class="user">' +
                        '<img src="'+users.sprites.front_shiny+'" width="120" height="120">' + 
                    '</div>';

                   pokedex1.innerHTML = output;


            let output1 = 

                    '<div class="user1">' + 'Name: '+users.name + '</div>' +
                    '<div class="user2">' +
                        '<ul>' + 
                        '<li>ID: '+users.id+'</li>' +
                      
                        '<li>Moves:</li>' +
                            '<ul>' +
                                '<li>move one: '+users.moves[0].move.name+'</li>' +
                                '<li>move two: '+users.moves[1].move.name+'</li>' +
                                '<li>move tree: '+users.moves[2].move.name+'</li>' +
                                '<li>move four: '+users.moves[3].move.name+'</li>' +
                            '</ul>'
                        '</ul>' +
                    '</div>';

                    pokedex.innerHTML = output1;
                    loadPrevEvolution(url);
                    

            }
    }
    xhr.send();
    
}

function loadPrevEvolution(i) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', i , true);

    xhr.onload = function(){
        if(this.status == 200) {
            let pokeEvolution = JSON.parse(this.response);
            console.log(pokeEvolution);
            
            let pokHabitat = pokeEvolution.habitat.name;
            let pokShape = pokeEvolution.shape.name;

            if(pokeEvolution.evolves_from_species == null){
                pokedex2.innerHTML = '<div class="user3">'+ "No previous pokemon" +'</div>';
            }
            else {
                let pokName = pokeEvolution.evolves_from_species.name;
                pokedex2.innerHTML = '<div class="user3">' + 'Preview evolution: '+ '<br>' +pokName + '</div>';
            }

            pokedex2.innerHTML += 
            '<div class="user4">' + 'Habitat: '+pokHabitat+'</div>' + 
            '<div class="user5">' + 'Shape: '+pokShape+'</div>';
            loadPrevEvolutionPic(pokName);
        }
    }

    xhr.send();
}

function loadPrevEvolutionPic(e){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://pokeapi.co/api/v2/pokemon/" + e, true);

    xhr.onload = function(){
        if(this.status == 200){
            let pokePicture = JSON.parse(this.response);
            console.log(pokePicture.sprites.front_default);

            pokedex1.innerHTML += `<img src ="${pokePicture.sprites.front_default}" width="120" height="120"</img>`;
        }
}

xhr.send();
}

