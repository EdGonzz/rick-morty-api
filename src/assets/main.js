const API = 'https://rickandmortyapi.com/api/character'

const section = document.querySelector('#section')

async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json()
    return data;
}

(async () => {
    try {
        const response = await fetchData(API);
        const pageCount = response?.info.pages;
        const randomPage = Math.floor(Math.random() * pageCount) + 1;
        const characters = await fetchData(`${API}/?page=${randomPage}`)
        let view = `
            ${characters?.results.map(character => `
            <article class="content__card">
                <img class="card__img" src="${character.image}" alt="${character.name}">
                <div class="cards__inf">
                    <div class="inf">
                        <h2>${character.name}</h2>
                        <p>Status</p>
                        <span class="icon__status">
                        <span class="${character.status}"></span>
                        ${character.status} - ${character?.species}
                        </span>
                        <p>Origin</p>
                        <span>${character.origin.name}</span>
                        <p>Location</p>
                        <span>${character?.location.name}</span>
                    </div>
                </div>
            </article>
            `).slice(0,10).join('')}
        `;
        section.innerHTML = view;
    } catch (error) {
        console.log(error)
    }
})();