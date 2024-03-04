const apiUrl = 'http://backendchallenge.test/api/getAll';
let currentPage = 1;

// Função para buscar notícias com base no número da página
async function fetchNews(page) {
    const url = `${apiUrl}?page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data);
        
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

// Função para exibir as notícias em cards
function displayNews(newsData) {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const array = newsData.data.data;
    
    array.forEach(news => {
        const cardHtml = `
            <div class="card p-0 m-2 shadow border border-0 bg-white" style="min-width: 420px; cursor: pointer;">
                <div class="row g-0">
                
                    <div class="col-6">
                        <img src="${news.image}" class="m-1 rounded-start" alt="..." style="max-width: 200px;">
                    </div>
                    
                    <div class="col-6 d-flex align-self-center">
                        <div class="card-body d-flex flex-column p-2">
                            <h5 class="card-title line-clamp">${news.title}</h5>
                            <p class="card-text line-clamp">${news.description}</p>
                            
                            <div class="d-flex flex-row-reverse">
                                <a href="./src/detailsNews/details.html?id=${news.id}" class="btn btn-primary">Ver mais</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += cardHtml;
    });
}

function createPageLinks(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Adiciona li para voltar para a página anterior
    const liPrev = document.createElement('li');
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    const liNext = document.createElement('li');

    liPrev.classList.add('page-item');
    liPrev.innerHTML = '<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
    liPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchNews(currentPage);
        }
    });
    pagination.appendChild(liPrev);

    // Adiciona links para as páginas
    for (let i = startPage; i <= endPage; i++) {
        createPageLink(i);
    }

    // Adiciona li para avançar para a próxima página
    liNext.classList.add('page-item');
    liNext.innerHTML = '<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
    liNext.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchNews(currentPage);
        }
    });
    pagination.appendChild(liNext);

    function createPageLink(pageNumber) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.href = '#';
        link.textContent = pageNumber;
        link.addEventListener('click', () => {
            currentPage = pageNumber;
            fetchNews(currentPage);
        });
        li.appendChild(link);
        pagination.appendChild(li);
    }
}


// Função para buscar o número total de páginas
async function fetchTotalPages() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const totalPages = data.data.last_page;
        createPageLinks(totalPages);
    } catch (error) {
        console.error('Erro ao buscar número total de páginas:', error);
    }
}

fetchTotalPages();
fetchNews(currentPage);