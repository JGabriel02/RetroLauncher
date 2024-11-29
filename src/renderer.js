const games = [
    {
        id: "pokemon_radicalred",
        title: "Pokémon Radical Red",
        img: "img/pokemon-radical-red.jpg",
        description: ["Autor: Yuuiii", "Idioma: Inglês","A mesma história de Fire Red, com atualização e implementação de novas mecânicas."],
    },
    {
        id: "pokemon_gaia",
        title: "Pokémon Gaia",
        img: "img/pokemongaia.png",
        description: ["Autor: Spherical Ice", "Idioma: Inglês", "A região rural de Orbtus tem uma rica história.Há muito tempo, uma antiga civilização habitava sua paisagem rochosa.Foram responsáveis por criar monumentos para seus deuses.Acredita-se que foram aniquilados por uma série de terremotos,e tudo o que sobrou foram templos e ídolos ,que viraram relíquias do passado.Agora,uma grande atividade sísmica aparece subitamente,o que preocupa o arqueólogo e professor ,Prof. Redwood.Agora cabe a você ajudá-lo a desvendar os motivos do porque que tal fenômeno está acontecendo."],
    },
    {
        id: "pokemon_liquid",
        title: "Pokémon Liquid Crystal",
        img: "img/liquid_crystal.jpg",
        description: [
            "Autores: inkandzelda, Synyster Zeikku, Jambo51, Magnius, Ray Maverick, FIQ",
            "Idioma: Inglês", "Trata-se de um Remake de Pokémon Crystal, com Continentes Jotho e Kanto completos,Ilhas laranjas, Trilha sonora remasterizada e Novas texturas ao estilo DS."
        ],
    },
    {
        id: "pokemon_SwSh",
        title: "Pokemon Sword/Shield Ultimate",
        img: "img/sword_shield.png",
        description: ["Autores: Pcl.g e Jean Stars", "Idioma: Português (BR)", "A mesma Historia dos Jogos “Pokemon Sword” e “Pokemon Shield” do Nintendo Switch + A historia das DLCs “Isle of Armor” e “Crown Tundra”."],
    },
    {
        id: "pokemon_verde_musgo",
        title: "Pokémon Verde Musgo",
        img: "img/verde_musgo.png",
        description: ["Autor: IRMÃOS PURPLE(ABJOPE TEAM)", "Idioma: Português (BR)", "Já imaginou viajar por dois continentes e suas províncias? Ir de foguete até marte? Que tal conhecer a cidade de PRYPIAT e a famosa usina de CHERNOBYL? Combater o crime e os terríveis ILUMINATIS? Andar por um continente completamente dominado por uma organização criminosa? Conhecer personalidades excêntricas, como: CAP. NASCIMENTO, ELTON JOHN, HARRY POTER, HÉRCULES, MESTE YODA, AL CAPONNE, os mortos vivos no PET CEMETERY, etc.?"],
    },
    {
        id: "pokemon_fusion",
        title: "Pokemon Fusion 3",
        img: "img/fusion.png",
        description: ["Autores: Grillo e Lugre", "Idioma: Espanhol", "Pokémon Emerald com várias poke-fusões, incluindo pokémon de alola."],
    },
    {
        id: "pokemon_light_platinum",
        title: "Pokémon Light Platinum",
        img: "img/lightplatinum.png",
        description: ["Autor: WesleyFG", "Idioma: Português (BR)","Light Platinum é um HACK para GBA que se passa em um novo continente,os mapas foram refeitos ,HMs foram adicionadas,e há pokémons da quarta e quinta geração,novos eventos e possibilidade de capturar lendários ao decorrer do jogo como Mew Deoxys,Darkai,Etc.E seu criador é um Brasileiro. De longe uma das melhores hacks de pokémon já feitas."],
    },
    {
        id: "pokemon_emerald_randomizer",
        title: "Pokémon Emerald Randomizer",
        img: "img/Pokémon_Emerald.png",
        description: ["Autor: Souma", "Idioma: Inglês", "É uma rom onde várias particularidades do jogo foram colocados de maneira aleatória.Os itens randomizados podem ser por exemplo , Pokémon selvagens encontrados nas graminhas, Pokémon de todos os treinadores,iniciais, golpes aprendidos por cada Pokémon,habilidades,TMs compatíveis, itens encontrados,etc.Isso significa que você poderá encontrar um Gengar ,nas primeiras graminhas do jogo, encontrar o primeiro líder de Gyn com um Alakazam"],
    },
    {
        id: "pokemon_blue_star",
        title: "Pokémon Blue Stars 4",
        img: "img/blue-stars-4-cover-pokemona.jpg",
        description: ["Autor: JEAN STAR", "Idioma: Português (BR)", "Seja bem-vindo, a Região de Shinstar. Seu Objetivo é tornar-se o campeão da região e derrotar a organização maligna. Emilly e Bruno serão seus companheiros nessa jornada. Aqui você enfrentará desafios, missões secundárias e muitas outras experiências."],
    },
];

const itemsPerPage = 3;
let currentPage = 1;

function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleGames = games.slice(start, end);

    const container = document.getElementById("game-container");
    container.innerHTML = ""; 

    visibleGames.forEach((game) => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${game.img}" alt="${game.title}">
            <div class="game-title">${game.title}</div>
            <div class="game-description">
                <ul>
                    ${game.description.map((desc) => `<li>${desc}</li>`).join("")}
                </ul>
            </div>
        `;
        card.addEventListener("click", () => launchGame(game.id));
        container.appendChild(card);
    });

   
    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("total-pages").textContent = Math.ceil(games.length / itemsPerPage);
}

function nextPage() {
    if (currentPage < Math.ceil(games.length / itemsPerPage)) {
        currentPage++;
        renderPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
}

function setupPagination() {
    document.getElementById("next-page").addEventListener("click", nextPage);
    document.getElementById("prev-page").addEventListener("click", prevPage);
}

renderPage(currentPage);
setupPagination();
